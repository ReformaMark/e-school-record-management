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
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        city: v.optional(v.string()),
        barangay: v.optional(v.string()),
        street: v.optional(v.string()),
        houseNumber: v.optional(v.string()),
        postalCode: v.optional(v.string()),
        imageStorageId: v.optional(v.string()),
        gender: v.optional(v.string()),
        description: v.optional(v.string()),
        employeeId: v.optional(v.string()),
        position: v.optional(v.string()),
        advisoryClass: v.optional(v.string()),
        subjects: v.optional(v.array(v.string())),
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
            const { email, password, imageStorageId, ...userData } = args;

            // @ts-expect-error - type error in convex auth
            const accountResponse = await createAccount(ctx, {
                provider: "password",
                account: {
                    id: email,
                    secret: password,
                },
                profile: {
                    email,
                    imageStorageId,
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
        employeeId: v.string(),
        contactNumber: v.string(),
        birthDate: v.string(),
        gender: v.string(),
        specialization: v.string(),
        yearsOfExperience: v.number(),
        position: v.string(),
        advisoryClass: v.optional(v.string()),
        subjects: v.array(v.string()),
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        city: v.optional(v.string()),
        barangay: v.optional(v.string()),
        street: v.optional(v.string()),
        imageStorageId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        try {
            // Only admin can create teachers
            const adminId = await getAuthUserId(ctx);
            if (!adminId) throw new ConvexError("Not authenticated");

            const admin = await ctx.db.get(adminId);
            if (!admin || admin.role !== "admin") {
                throw new ConvexError("Unauthorized - Only admins can create teachers");
            }

            // Check if email already exists
            const existingUser = await ctx.db
                .query("users")
                .filter((q) => q.eq(q.field("email"), args.email))
                .first();

            if (existingUser) throw new ConvexError("Email already exists");

            // Create the teacher using createUser
            return createUser(ctx, {
                ...args,
                role: "teacher",
                isActive: true,
            });
        } catch (error) {
            console.error("Error in createTeacher:", error);
            throw error;
        }
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

export const updateUser = mutation({
    args: {
        id: v.id("users"),
        email: v.string(),
        firstName: v.string(),
        middleName: v.optional(v.string()),
        lastName: v.string(),
        contactNumber: v.string(),
        department: v.optional(v.string()),
        specialization: v.optional(v.string()),
        yearsOfExperience: v.optional(v.number()),
        birthDate: v.string(),
        isActive: v.boolean(),
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        city: v.optional(v.string()),
        barangay: v.optional(v.string()),
        street: v.optional(v.string()),
        houseNumber: v.optional(v.string()),
        postalCode: v.optional(v.string()),
        imageStorageId: v.optional(v.string()),
        gender: v.optional(v.string()),
        description: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db.get(args.id);
        if (!existingUser) {
            throw new Error("User not found");
        }

        // If there's a new image and an old one exists, you might want to delete the old one
        if (args.imageStorageId && existingUser.imageStorageId && args.imageStorageId !== existingUser.imageStorageId) {
            try {
                await ctx.storage.delete(existingUser.imageStorageId);
            } catch (error) {
                console.error("Failed to delete old image:", error);
                // Continue with update even if delete fails
            }
        }

        // Update user
        return await ctx.db.patch(args.id, {
            email: args.email,
            firstName: args.firstName,
            middleName: args.middleName,
            lastName: args.lastName,
            contactNumber: args.contactNumber,
            department: args.department,
            specialization: args.specialization,
            yearsOfExperience: args.yearsOfExperience,
            birthDate: args.birthDate,
            isActive: args.isActive,
            region: args.region,
            province: args.province,
            city: args.city,
            barangay: args.barangay,
            street: args.street,
            houseNumber: args.houseNumber,
            postalCode: args.postalCode,
            imageStorageId: args.imageStorageId,
            gender: args.gender,
            description: args.description,
        });
    },
});

export const getUser = query({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const deleteUserImage = mutation({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (user.imageStorageId) {
            try {
                await ctx.storage.delete(user.imageStorageId);
                await ctx.db.patch(args.userId, {
                    imageStorageId: undefined
                });
            } catch (error) {
                console.error("Failed to delete image:", error);
                throw new Error("Failed to delete image");
            }
        }

        return true;
    },
});

export const createPrincipal = mutation({
    args: {
        email: v.string(),
        password: v.string(),
        firstName: v.string(),
        middleName: v.optional(v.string()),
        lastName: v.string(),
        contactNumber: v.string(),
        birthDate: v.string(),
        gender: v.string(),
        description: v.optional(v.string()),
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        city: v.optional(v.string()),
        barangay: v.optional(v.string()),
        street: v.optional(v.string()),
        houseNumber: v.optional(v.string()),
        postalCode: v.optional(v.string()),
        imageStorageId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Set existing principals to inactive
        await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("role"), "school-head"))
            .collect()
            .then((principals) => {
                principals.forEach(async (principal) => {
                    await ctx.db.patch(principal._id, { isActive: false });
                });
            });

        // Create the principal using createUser
        return createUser(ctx, {
            ...args,
            role: "school-head",
            isActive: true,
            // department: args.description,
            description: args.description,
        });
    },
});

export const getTeachers = query({
    handler: async (ctx) => {
        const teachers = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("role"), "teacher"))
            .order("desc")
            .collect();

        return teachers.map(teacher => ({
            id: teacher._id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            middleName: teacher.middleName,
            email: teacher.email,
            employeeId: teacher.employeeId || "",
            position: teacher.position || "",
            specialization: teacher.specialization || "",
            advisoryClass: teacher.advisoryClass,
            imageUrl: teacher.image,
            isActive: teacher.isActive,
            contactNumber: teacher.contactNumber,
            gender: teacher.gender,
            yearsOfExperience: teacher.yearsOfExperience,
        }));
    },
});

export const updateTeacher = mutation({
    args: {
        id: v.id("users"),
        email: v.string(),
        firstName: v.string(),
        middleName: v.optional(v.string()),
        lastName: v.string(),
        contactNumber: v.string(),
        employeeId: v.optional(v.string()),
        position: v.optional(v.string()),
        specialization: v.optional(v.string()),
        yearsOfExperience: v.optional(v.number()),
        birthDate: v.string(),
        gender: v.optional(v.string()),
        region: v.optional(v.string()),
        province: v.optional(v.string()),
        city: v.optional(v.string()),
        barangay: v.optional(v.string()),
        street: v.optional(v.string()),
        advisoryClass: v.optional(v.string()),
        subjects: v.optional(v.array(v.string())),
        imageStorageId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Only admin can update teachers
        const adminId = await getAuthUserId(ctx);
        if (!adminId) throw new ConvexError("Not authenticated");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new ConvexError("Unauthorized - Only admins can update teachers");
        }

        const teacher = await ctx.db.get(args.id);
        if (!teacher) throw new ConvexError("Teacher not found");
        if (teacher.role !== "teacher") throw new ConvexError("User is not a teacher");

        return await ctx.db.patch(args.id, {
            email: args.email,
            firstName: args.firstName,
            middleName: args.middleName,
            lastName: args.lastName,
            contactNumber: args.contactNumber,
            employeeId: args.employeeId,
            position: args.position,
            specialization: args.specialization,
            yearsOfExperience: args.yearsOfExperience,
            birthDate: args.birthDate,
            gender: args.gender,
            region: args.region,
            province: args.province,
            city: args.city,
            barangay: args.barangay,
            street: args.street,
            advisoryClass: args.advisoryClass,
            subjects: args.subjects,
            imageStorageId: args.imageStorageId,
        });
    },
});

export const getTeacher = query({
    args: { teacherId: v.id("users") },
    handler: async (ctx, args) => {
        const teacher = await ctx.db.get(args.teacherId);
        if (!teacher) throw new ConvexError("Teacher not found");
        if (teacher.role !== "teacher") throw new ConvexError("User is not a teacher");
        return teacher;
    },
});
