import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { AssessmentTypes } from "@/lib/types";
import { asyncMap } from "convex-helpers";

export const getAssessments = query({
    args: {
        sy: v.optional(v.id('schoolYears'))
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No Teacher Id.')
        }
        if(!args.sy){
           return
        }
        const assessments = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field("teacherId"), teacherId))
            .filter(q => q.eq(q.field("schoolYear"), args.sy))
            .order('desc')
            .collect()

        const assessmentsData = await asyncMap(assessments, async(assessment) => {
            const subject = await ctx.db.get(assessment.subjectId)
            return {
                ...assessment,
                subject: subject
            }
        })

        return assessmentsData as AssessmentTypes[]
    }
})

export const getAssessment = query({
    args:{
        id: v.id('assessments')
    },
    handler: async(ctx, args) =>{
        const assessment = await ctx.db.get(args.id)
        if(!assessment){
            throw new ConvexError('Assessment not found.')
        }
        const subject = await ctx.db.get(assessment?.subjectId)
        return {
            ...assessment,
            subject: subject
        }
    }
})

export const getAssessmentsBySubject = query({
    args:{
        subjectId: v.optional(v.id('subjects'))
    },
    handler: async (ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher Id.')
        const assessments = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field('subjectId'), args.subjectId))
            .filter(q => q.eq(q.field('teacherId'), teacherId))
            .collect()
        
        return assessments
    }
})

export const addWrittenWorks = mutation({
    args:{
        type: v.string(), // ww, pp, qe
        gradeLevel: v.string(),
        quarter: v.string(), 
        semester: v.optional(v.string()), // for senior high
        assessmentNo: v.number(),
        highestScore: v.number(),
        classId: v.array(v.id('classes')),
        schoolYear: v.optional(v.id('schoolYears')),
        subjectId: v.id('subjects'),
        subComponent: v.optional(v.string())
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
        }

        const NumberGlevel = Number(args.gradeLevel = args.gradeLevel.replace('Grade ', ''));
       
        if(args.type === 'Quarterly Assessment'){
            const quarterLyAssemessments = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field('type'), args.type))
            .filter(q => q.eq(q.field('quarter'), args.quarter))
            .filter(q => q.eq(q.field('gradeLevel'),NumberGlevel))
            .filter(q => q.eq(q.field('subjectId'), args.subjectId))
            .collect()
            if(args.subComponent){
                const hasQA = await ctx.db.query('assessments')
                .filter(q => q.eq(q.field('type'), args.type))
                .filter(q => q.eq(q.field('quarter'), args.quarter))
                .filter(q => q.eq(q.field('gradeLevel'), NumberGlevel))
                .filter(q => q.eq(q.field('subjectId'), args.subjectId))
                .filter(q => q.eq(q.field('subComponent'), args.subComponent))
                .unique()

                if(hasQA) {
                    throw new ConvexError('Quarterly Assessment already exists.')
                } else {
                    const assessment = await ctx.db.insert('assessments', {
                        type: args.type,
                        teacherId: teacherId,
                        gradeLevel: NumberGlevel,
                        semester: args.semester,
                        assessmentNo: args.assessmentNo,
                        highestScore: args.highestScore,
                        classId: args.classId,
                        quarter: args.quarter,
                        schoolYear: args.schoolYear,
                        subjectId: args.subjectId,
                        subComponent: args.subComponent
                    })
                    return assessment
                }
            } else {
                if(quarterLyAssemessments.length > 0){
                    throw new ConvexError('Quarterly Assessment already exists.')
                } else {
                    const assessment = await ctx.db.insert('assessments', {
                        type: args.type,
                        teacherId: teacherId,
                        gradeLevel: NumberGlevel,
                        semester: args.semester,
                        assessmentNo: args.assessmentNo,
                        highestScore: args.highestScore,
                        classId: args.classId,
                        quarter: args.quarter,
                        schoolYear: args.schoolYear,
                        subjectId: args.subjectId,
                        subComponent: args.subComponent
                    })
                    return assessment
                }
            }
        } else {
            const assessment = await ctx.db.insert('assessments', {
                type: args.type,
                teacherId: teacherId,
                gradeLevel: NumberGlevel,
                semester: args.semester,
                assessmentNo: args.assessmentNo,
                highestScore: args.highestScore,
                classId: args.classId,
                quarter: args.quarter,
                schoolYear: args.schoolYear,
                subjectId: args.subjectId,
                subComponent: args.subComponent
            })
            return assessment
        }
    }
})

export const getTheHighestAssessmentNo = query({
    args:{
        type: v.string(),
        gradeLevel: v.optional(v.string()),
        subjectId: v.optional(v.id('subjects')),
        quarter: v.optional(v.string()),
        subComponent: v.optional(v.string()),
        semester: v.optional(v.string())
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
        }

        if(args.subComponent){
            const assessment = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field('gradeLevel'), Number(args.gradeLevel)))
            .filter(q => q.eq(q.field('subjectId'), args.subjectId))
            .filter(q => q.eq(q.field('type'), args.type))
            .filter(q => q.eq(q.field('teacherId'), teacherId))
            .filter(q => q.eq(q.field('quarter'), args.quarter))
            .filter(q => q.eq(q.field('subComponent'), args.subComponent))
            .collect()
            const filteredAssessment = assessment?.sort((a,b) => b.assessmentNo - a.assessmentNo)
            return {
                ...filteredAssessment[0],
                assessments: filteredAssessment
            }
        } else {
            if(args.semester) {
                const assessment = await ctx.db.query('assessments')
                .filter(q => q.eq(q.field('gradeLevel'), Number(args.gradeLevel)))
                .filter(q => q.eq(q.field('subjectId'), args.subjectId))
                .filter(q => q.eq(q.field('type'), args.type))
                .filter(q => q.eq(q.field('teacherId'), teacherId))
                .filter(q => q.eq(q.field('quarter'), args.quarter))
                .filter(q => q.eq(q.field('semester'), args.semester))
                .collect()
                const filteredAssessment = assessment?.sort((a,b) => b.assessmentNo - a.assessmentNo)
                return {
                    ...filteredAssessment[0],
                    assessments: filteredAssessment
                }
            }
            const assessment = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field('gradeLevel'), Number(args.gradeLevel)))
            .filter(q => q.eq(q.field('subjectId'), args.subjectId))
            .filter(q => q.eq(q.field('type'), args.type))
            .filter(q => q.eq(q.field('teacherId'), teacherId))
            .filter(q => q.eq(q.field('quarter'), args.quarter))
            .collect()
            const filteredAssessment = assessment?.sort((a,b) => b.assessmentNo - a.assessmentNo)
            return {
                ...filteredAssessment[0],
                assessments: filteredAssessment
            }
        }
       
      
    }
});

export const editAssessment = mutation({
    args:{
        id: v.id('assessments'),
        schoolYear: v.id(('schoolYears')),
        highestScore: v.number(),
        type: v.string(),
        assessmentNo: v.number()
        
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
        }

        const assessment = await ctx.db.get(args.id)
      
        if(!assessment){
            throw new ConvexError('No Assessment found.')
        }

        await ctx.db.patch(args.id, {
            highestScore: args.highestScore,
        })

        const classRecords = await ctx.db.query('classRecords')
        .filter(q => q.eq(q.field('teacherId'), teacherId))
        .filter(q => q.eq(q.field('schoolYear'), args.schoolYear))
        .collect()

       
        const fieldToUpdate =
        args.type === "Written Works"
          ? "written"
          : args.type === "Performance Tasks"
          ? "performance"
          : args.type === "Quarterly Assessment"
          ? "quarterlyExam"
          : null;

        if (!fieldToUpdate) {
        throw new Error("Invalid type provided.");
        }

        const filteredCR = classRecords.filter(record => 
            record[fieldToUpdate].some(item => item.assessmentId === args.id)
        );


        return await asyncMap(filteredCR, async(c) => {
            
            const updatedField = c[fieldToUpdate].map((entry)=> {
                return entry.assessmentId === args.id
                ? { ...entry, highestScore: args.highestScore }
                : entry
                });
                
                
                await ctx.db.patch(c._id, {
                    [fieldToUpdate]: updatedField,
                });

                return { success: true, updatedCount: classRecords.length };
            })
      
    }
})


export const deleteAssessment = mutation({
    args:{
        id: v.id('assessments'),
        type: v.string(),
        sy: v.optional(v.id('schoolYears'))
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
        }
        const assessment = await ctx.db.get(args.id)
        if(!assessment){
            throw new ConvexError('Assessment not found.')
        }
        if(!args.sy){
            return
        }

        const fieldToUpdate =
        args.type === "Written Works"
          ? "written"
          : args.type === "Performance Tasks"
          ? "performance"
          : args.type === "Quarterly Assessment"
          ? "quarterlyExam"
          : null;

        if (!fieldToUpdate) {
            throw new Error("Invalid type provided.");
        }

        const classRecords = await ctx.db.query('classRecords')
        .filter(q => q.eq(q.field('teacherId'), teacherId))
        .filter(q => q.eq(q.field('schoolYear'), args.sy))
        .collect()

        const filteredCR = classRecords.filter(record => 
            record[fieldToUpdate].some(item => item.assessmentId === args.id)
          );
          
        await asyncMap(filteredCR, async(record)=>{
            await ctx.db.patch(record._id, {
                [fieldToUpdate]: []
            })
        })

        await ctx.db.delete(args.id)
        return
    }})