import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
    args: {
        gradeLevel: v.string()
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

        const existingGradeLevel = await ctx.db
            .query("gradeLevels")
            .filter((q) => q.eq(q.field("level"), args.gradeLevel))
            .first()

        if (existingGradeLevel) {
            throw new ConvexError("Grade level already exist")
        }

        return await ctx.db.insert("gradeLevels", {
            level: args.gradeLevel,
        })
    }
})

export const remove = mutation({
    args: {
        gradeLevelId: v.id("gradeLevels")
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

        return await ctx.db.delete(args.gradeLevelId)
    }
})

export const update = mutation({
    args: {
        gradeLevelId: v.id("gradeLevels"),
        newGradeLevel: v.string(),
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

        const existingGradeLevel = await ctx.db
            .query("gradeLevels")
            .filter((q) => q.eq(q.field("level"), args.newGradeLevel))
            .first()

        if (existingGradeLevel) {
            throw new ConvexError("Grade level already exists");
        }

        return await ctx.db.patch(args.gradeLevelId, {
            level: args.newGradeLevel,
        });
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
            .query("gradeLevels")
            .order("desc")
            .collect()
    }
})