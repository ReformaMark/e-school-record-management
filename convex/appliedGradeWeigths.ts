import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
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
    return
    }
})