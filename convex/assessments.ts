import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { AssessmentTypes } from "@/lib/types";
import { asyncMap } from "convex-helpers";

export const getAssessments = query({

    handler: async(ctx) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No Teacher Id.')
        }
        const assessments = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field("teacherId"), teacherId))
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
        gradeLevel: v.number(),
        quarter: v.string(), 
        semester: v.optional(v.string()), // for senior high
        assessmentNo: v.number(),
        highestScore: v.number(),
        classId: v.array(v.id('classes')),
        schoolYear: v.optional(v.string()),
        subjectId: v.id('subjects')
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
        }
       
        if(args.type === 'Quarterly Assessment'){
            const quarterLyAssemessments = await ctx.db.query('assessments')
            .filter(q => q.eq(q.field('type'), args.type))
            .filter(q => q.eq(q.field('quarter'), args.quarter))
            .filter(q => q.eq(q.field('gradeLevel'), args.gradeLevel))
            .filter(q => q.eq(q.field('subjectId'), args.subjectId))
            .collect()
            if(quarterLyAssemessments.length > 0){
                throw new ConvexError('Quarterly Assessment already exists.')
            }
        }
        const ww = await ctx.db.insert('assessments', {
            type: args.type,
            teacherId: teacherId,
            gradeLevel: args.gradeLevel,
            semester: args.semester,
            assessmentNo: args.assessmentNo,
            highestScore: args.highestScore,
            classId: args.classId,
            quarter: args.quarter,
            schoolYear: args.schoolYear,
            subjectId: args.subjectId
        })
        return
    }
})

export const getTheHighestAssessmentNo = query({
    args:{
        type: v.string(),
        gradeLevel: v.optional(v.string()),
        subjectId: v.optional(v.id('subjects')),
        quarter: v.optional(v.string())

    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
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
});

export const editAssessment = mutation({
    args:{
        id: v.id('assessments'),
        type: v.string(), // ww, pp, qe
        gradeLevel: v.number(),
        quarter: v.string(), 
        semester: v.optional(v.string()), // for senior high
        assessmentNo: v.number(),
        highestScore: v.number(),
        classId: v.array(v.id('classes')),
        schoolYear: v.optional(v.string()),
        subjectId: v.id('subjects')
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId){
            throw new ConvexError('No teacher Id.')
        }

        const assessments = await ctx.db.query('assessments')
        .filter(q => q.eq(q.field('teacherId'), teacherId))
        .filter(q => q.eq(q.field('type'), args.type))
        .filter(q => q.eq(q.field('gradeLevel'), args.gradeLevel))
        .filter(q => q.eq(q.field('quarter'), args.quarter))
        .filter(q => q.eq(q.field('assessmentNo'), args.assessmentNo))
        .first()
    
        if(assessments){
            throw new ConvexError('Assessment already exists.')
        }

        const ww = await ctx.db.patch(args.id, {
            type: args.type,
            teacherId: teacherId,
            gradeLevel: args.gradeLevel,
            semester: args.semester,
            assessmentNo: args.assessmentNo,
            highestScore: args.highestScore,
            classId: args.classId,
            quarter: args.quarter,
            schoolYear: args.schoolYear,
            subjectId: args.subjectId
        })
        return
    }
})


export const deleteAssessment = mutation({
    args:{
        id: v.id('assessments')
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
        await ctx.db.delete(args.id)
        return
    }})