import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
    args:{
        studentId: v.id('students'),
        gradeLevel: v.number(),
        classId: v.id('classes'),
        quarter: v.string(),
        quarterlyGrade: v.number(), // score
        needsIntervention: v.boolean(),
        
        interventionGrade: v.optional(v.number()),
        interventionUsed: v.optional(v.string()), // ex. Big book, General remarks
        interventionRemarks: v.optional(v.string()),

        classRecordId: v.id('classRecords')
    },
    handler: async(ctx, args) => {
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id')
    
        await ctx.db.insert('quarterlyGrades',{
            studentId: args.studentId,
            gradeLevel: args.gradeLevel,
            classId: args.classId,
            quarter: args.quarter,
            quarterlyGrade: args.quarterlyGrade, // score
            needsIntervention: args.needsIntervention,
            teacherId: teacherId
        })
        //mark the class record as submitted
        await ctx.db.patch(args.classRecordId,{
            isSubmitted: true
        })

    },
})

export const get = query({
    args:{
        studentId: v.id('students'),
        gradeLevel: v.number(),
        classId: v.id('classes'),
        quarter: v.string(),
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id')

        const quarterlyGrades = await ctx.db.query('quarterlyGrades')
        .filter(q => q.eq(q.field('studentId'), args.studentId))
        .filter(q => q.eq(q.field('gradeLevel'), args.gradeLevel))
        .filter(q => q.eq(q.field('classId'), args.classId))
        .filter(q => q.eq(q.field('quarter'), args.quarter))
        .collect()

        return quarterlyGrades
    }
})