import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const fetchAdmins = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("users")
            .withIndex("by_role", (q) => q.eq("role", "admin"))
            .order("desc")
            .collect();
    }
})

export const mutateStatus = mutation({
    args: {
        adminId: v.id("users"),
        isActive: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db
            .patch(args.adminId, {
                isActive: args.isActive
            })
    }
})

export const fetchPrincipals = query({
    args: {},
    handler: async (ctx) => {
        const principals = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("role"), "school-head"))
            .order("desc")
            .collect();

        return principals;
    },
});