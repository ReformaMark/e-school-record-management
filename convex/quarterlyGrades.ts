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
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id')
        if(!args.gradeLevel) return [];

        const cls = await ctx.db.get(args.classId)
        if(!cls) return []
        const section = await ctx.db.get(cls?.sectionId)
        if(!section) return []
        console.log(args.gradeLevel)
        console.log(args.classId)
        const quarterlyGrades = await ctx.db.query('quarterlyGrades')
        .filter(q => q.eq(q.field('gradeLevel'), args.gradeLevel))
        .filter(q => q.eq(q.field('classId'), args.classId))
        .filter(q => q.eq(q.field('teacherId'), teacherId))
        .collect();
        console.log(quarterlyGrades)
      
      const studentWithQG = await asyncMap(section.students, async (studentId) => {
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