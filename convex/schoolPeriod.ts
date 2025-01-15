import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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

