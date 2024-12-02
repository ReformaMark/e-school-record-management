import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { createAccount, getAuthUserId } from "@convex-dev/auth/server";

const UserRole = v.union(
    v.literal("admin"),
    v.literal("teacher"),
    v.literal("school-head"),
    v.literal("staff")
);

export const createUser = mutation({
    args: {
        email: v.string(),
        password: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        middleName: v.optional(v.string()),
        role: v.union(
            v.literal("admin"),
            v.literal("teacher"),
            v.literal("school-head"),
            v.literal("staff")
        ),
        contactNumber: v.string(),
        department: v.optional(v.string()),
        specialization: v.optional(v.string()),
        yearsOfExperience: v.optional(v.number()),
        birthDate: v.string(),
        isActive: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        try {
            // Only admin can create users
            const adminId = await getAuthUserId(ctx);
            if (!adminId) throw new ConvexError("Not authenticated");

            const admin = await ctx.db.get(adminId);
            if (!admin || admin.role !== "admin") {
                throw new ConvexError("Unauthorized - Only admins can create users");
            }

            // Check if email already exists
            const existingUser = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("email"), args.email))
                .first();

            if (existingUser) throw new ConvexError("Email already exists");

            // Create account
            const { email, password, ...userData } = args;

            // @ts-expect-error - type error in convex auth
            const accountResponse = await createAccount(ctx, {
                provider: "password",
                account: {
                    id: email,
                    secret: password,
                },
                profile: {
                    email,
                    ...userData,
                },
            });

            if (!accountResponse?.user?._id) {
                throw new ConvexError("Failed to create account");
            }

            return accountResponse.user;
        } catch (error) {
            console.error("Error in createUser:", error);
            throw error;
        }
    },
});

export const createTeacher = mutation({
    args: {
        email: v.string(),
        password: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        middleName: v.optional(v.string()),
        contactNumber: v.string(),
        specialization: v.string(),
        yearsOfExperience: v.number(),
        birthDate: v.string(),
    },
    handler: async (ctx, args) => {
        return createUser(ctx, { ...args, role: "teacher" });
    },
});

export const createStaff = mutation({
    args: {
        email: v.string(),
        password: v.string(),
        firstName: v.string(),
        lastName: v.string(),
        middleName: v.optional(v.string()),
        contactNumber: v.string(),
        department: v.string(),
        birthDate: v.string(),
    },
    handler: async (ctx, args) => {
        return createUser(ctx, { ...args, role: "staff" });
    },
});

export const current = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;
        return await ctx.db.get(userId);
    },
});

export const role = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;

        const user = await ctx.db.get(userId);
        return user?.role;
    },
});
