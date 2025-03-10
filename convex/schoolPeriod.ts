import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        period: v.string(),
        timeRange: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) throw new ConvexError("Unauthorized")

        const user = await ctx.db.get(userId)

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        if (user.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        return await ctx.db.insert("schoolPeriods", {
            ...args
        })
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx)

        if (!userId) throw new ConvexError("Unauthorized")

        const user = await ctx.db.get(userId)

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        return await ctx.db
            .query("schoolPeriods")
            .order("desc")
            .collect()
    }
})

export const update = mutation({
    args: {
        id: v.id("schoolPeriods"),
        period: v.string(),
        timeRange: v.string(),
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

        // Check if period already exists
        const existingPeriod = await ctx.db
            .query("schoolPeriods")
            .filter((q) => 
                q.and(
                    q.eq(q.field("period"), args.period),
                    q.neq(q.field("_id"), args.id)
                )
            )
            .first();

        if (existingPeriod) {
            throw new ConvexError("Period already exists");
        }

        return await ctx.db.patch(id, data);
    }
});

export const remove = mutation({
    args: { id: v.id("schoolPeriods") },
    handler: async (ctx, args) => {
        // Check authorization
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new ConvexError("Unauthorized");
        
        const user = await ctx.db.get(userId);
        if (!user || user.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.delete(args.id);
    }
});