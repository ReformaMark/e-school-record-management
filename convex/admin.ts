import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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

export const principal = query({
    args: { 

       type: v.string(),
    },
    handler: async (ctx, args) => {   
        return await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("role"), "school-head"))
            .filter((q) => q.eq(q.field("schoolHeadType"), args.type))
            .order("desc")
            .first();
    }
})


export const removeAdmin = mutation({
    args: {
        id: v.id("users")
    },
    handler: async (ctx, args) => {
        // Only admin can remove users
        const adminId = await getAuthUserId(ctx);
        if (!adminId) throw new ConvexError("Not authenticated");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new ConvexError("Unauthorized - Only admins can remove users");
        }

        return await ctx.db.delete(args.id);
    }
})