import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
    args: {
        batchName: v.string(),
        startDate: v.string(),
        endDate: v.string(),
        sy: v.string()
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
            throw new ConvexError("Unauthorized");
        }

        const user = await ctx.db.get(userId);

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        if (user.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        // does this batchName already exists?
        const existingBatchName = await ctx.db
            .query("schoolYears")
            .filter((q) => q.eq(q.field("batchName"), args.batchName))
            .first()

        if (existingBatchName) throw new ConvexError("Batch name already exists")


        // does this year exists? TODO

        return await ctx.db.insert("schoolYears", {
            ...args
        })
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {

        return await ctx.db
            .query("schoolYears")
            .order("desc")
            .collect()
    }
})


export const update = mutation({
    args: {
        id: v.id("schoolYears"),
        batchName: v.string(),
        startDate: v.string(),
        endDate: v.string(),
        sy: v.string()
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        
        // Check authorization
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new ConvexError("Unauthorized");
        
        const user = await ctx.db.get(userId);
        if (!user || user.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        // Check if batchName already exists (excluding current record)
        const existingBatchName = await ctx.db
            .query("schoolYears")
            .filter((q) => 
                q.and(
                    q.eq(q.field("batchName"), args.batchName),
                    q.neq(q.field("_id"), args.id)
                )
            )
            .first();

        if (existingBatchName) {
            throw new ConvexError("Batch name already exists");
        }

        return await ctx.db.patch(id, data);
    }
});

export const remove = mutation({
    args: { id: v.id("schoolYears") },
    handler: async (ctx, args) => {
        // Check authorization
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new ConvexError("Unauthorized");
        
        const user = await ctx.db.get(userId);
        if (!user || user.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        // Check if school year is being used
        const hasEnrollments = await ctx.db
            .query("enrollments")
            .filter(q => q.eq(q.field("schoolYearId"), args.id))
            .first();

        if (hasEnrollments) {
            throw new ConvexError("Cannot delete school year with existing enrollments");
        }

        await ctx.db.delete(args.id);
    }
});