import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";

export const create = mutation({
    args:{
        studentId: v.id('students'),
        gradeLevel: v.number(),
        classId: v.id('classes'),
        quarter: v.string(),
        quarterlyGrade: v.number(), // score
        needsIntervention: v.boolean(),
        subComponent: v.optional(v.string()),
        
        interventionGrade: v.optional(v.number()),
        interventionUsed: v.optional(v.string()), // ex. Big book, General remarks
        interventionRemarks: v.optional(v.string()),

        classRecordId: v.id('classRecords')
    },
    handler: async(ctx, args) => {
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id')
            if(!args.subComponent){
                await ctx.db.insert('quarterlyGrades',{
                    studentId: args.studentId,
                    gradeLevel: args.gradeLevel,
                    classId: args.classId,
                    quarter: args.quarter,
                    quarterlyGrade: args.quarterlyGrade, // score
                    needsIntervention: args.needsIntervention,
                    teacherId: teacherId,
                })
            } else {
               
                await ctx.db.insert('quarterlyGrades',{
                    studentId: args.studentId,
                    gradeLevel: args.gradeLevel,
                    classId: args.classId,
                    quarter: args.quarter,
                    quarterlyGrade: args.quarterlyGrade, // score
                    needsIntervention: args.needsIntervention,
                    subComponent: args.subComponent,
                    teacherId: teacherId,
                })   
            }
       
        //mark the class record as submitted
        await ctx.db.patch(args.classRecordId,{
            isSubmitted: true
        })

    },
})

export const get = query({
    args:{
        gradeLevel: v.optional(v.number()),
        classId: v.id('classes'),
        needsIntervention: v.optional(v.boolean()),
        semester: v.optional(v.string())
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id')
        if(!args.gradeLevel) return [];

        const cls = await ctx.db.get(args.classId)
        if(!cls) return []
        const section = await ctx.db.get(cls?.sectionId)
        if(!section) return []
      
        const quarterlyGrades = await ctx.db.query('quarterlyGrades')
        .filter(q => q.eq(q.field('gradeLevel'), args.gradeLevel))
        .filter(q => q.eq(q.field('classId'), args.classId))
        .filter(q => q.eq(q.field('teacherId'), teacherId))
        .collect();
        const students = args.semester ? args.semester === "1st" ? section.firstSemStudents : section.secondSemStudents  : section.students

      const studentWithQG = await asyncMap(students, async (studentId) => {
        const student = await ctx.db.get(studentId);
        if (!student) return null; // Return null instead of []
      
        const filteredQG = quarterlyGrades.filter(q => q.studentId === studentId);
      
        return {
          ...student,
          quarterlyGrades: filteredQG
        };
      });
      
      // Remove null values (students not found)
      const filteredStudentWithQG = studentWithQG.filter(s => s !== null);


        return filteredStudentWithQG
    }
})
export const needIntervention = query({
    args:{
        gradeLevel: v.optional(v.number()),
        classId: v.id('classes'),
        needsIntervention: v.boolean(),
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id')

        const cls = await ctx.db.get(args.classId)
        if(!cls) return []
        const section = await ctx.db.get(cls?.sectionId)
        if(!section) return []
        
        const quarterlyGrades = await ctx.db.query('quarterlyGrades')
        .filter(q => q.eq(q.field('gradeLevel'), args.gradeLevel))
        .filter(q => q.eq(q.field('classId'), args.classId))
        .filter(q => q.eq(q.field('teacherId'), teacherId))
        .filter(q => q.eq(q.field('needsIntervention'), true))
        .collect();

      const studentWithQG = await asyncMap(section.students, async (studentId) => {
        const student = await ctx.db.get(studentId);
        if (!student) return null; // Return null instead of []
      
        const filteredQG = quarterlyGrades.filter(q => q.studentId === studentId);

        if(filteredQG.length < 1) return null
      
        return {
          ...student,
          quarterlyGrades: filteredQG
        };
      });
      
      // Remove null values (students not found)
      const filteredStudentWithQG = studentWithQG.filter(s => s !== null);
        return filteredStudentWithQG
    }
})


export const saveRemarks = mutation({
    args: {
        id: v.optional(v.id('quarterlyGrades')),
        remarks: v.string(),
        interventionUsed: v.array(v.string()),
        interventionGrade: v.number()
    },
    handler: async(ctx, args) => {
        if(!args.id) throw new ConvexError('No quarterlyGrades Id');
        await ctx.db.patch(args.id,{
            interventionRemarks: args.remarks,
            interventionGrade: args.interventionGrade,
            interventionUsed: args.interventionUsed
        })
    }
})