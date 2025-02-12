import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
    args:{
        subjectId: v.id('subjects'),
        learningMode: v.string(),
        written: v.number(),
        performance: v.number(),
        exam: v.optional(v.number())
    },
    handler: async(ctx, args)=>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id found.');

        const existingAGW = await ctx.db.query('appliedGradeWeigths')
            .filter(q => q.eq(q.field('subjectId'), args.subjectId))
            .filter(q => q.eq(q.field('teacherId'), teacherId))
            .first()
        if(existingAGW) {
            if(!args.exam){
                await ctx.db.patch(existingAGW._id,{
                    teacherId: teacherId,
                    subjectId: args.subjectId,
                    learningMode: args.learningMode,
                    written: args.written,
                    performance: args.performance,
                 
                })
            } else {
                await ctx.db.patch(existingAGW._id,{
                    teacherId: teacherId,
                    subjectId: args.subjectId,
                    learningMode: args.learningMode,
                    written: args.written,
                    performance: args.performance,
                    exam: args.exam
                })
            }

        } else {
            if(!args.exam){
                await ctx.db.insert('appliedGradeWeigths',{
                    teacherId: teacherId,
                    subjectId: args.subjectId,
                    learningMode: args.learningMode,
                    written: args.written,
                    performance: args.performance,
                 
                })
            } else {
                await ctx.db.insert('appliedGradeWeigths',{
                    teacherId: teacherId,
                    subjectId: args.subjectId,
                    learningMode: args.learningMode,
                    written: args.written,
                    performance: args.performance,
                    exam: args.exam
                })
            }
        }
    }
})

export const get = query({
    args:{
        subjectId: v.optional(v.id('subjects'))
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher id.')


        if(!args.subjectId) return 

        const appliedGradeWeigths= await ctx.db.query('appliedGradeWeigths')
        .filter(q=> q.eq(q.field('subjectId'), args.subjectId))
        .filter(q=> q.eq(q.field('teacherId'), teacherId))
        .unique()
        return appliedGradeWeigths
    }
})