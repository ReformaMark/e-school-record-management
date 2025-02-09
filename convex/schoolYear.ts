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