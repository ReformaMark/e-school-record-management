import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        name: v.string(),
        capacity: v.number(),
        type: v.string(),
        // features: v.optional(v.array(v.string())),
        teacherId: v.id("users"),
        description: v.optional(v.string()),
        gradeLevel: v.optional(v.string()),
        track: v.optional(v.string()),
    },
    handler: async (ctx, args) => {

        // Comment out muna for now, kasi possible ata 2 advisory class per teacher

        // const existingRoom = await ctx.db
        //     .query("rooms")
        //     .filter(q => q.eq(q.field("teacherId"), args.teacherId))
        //     .first();

        // if (existingRoom) {
        //     throw new ConvexError("Teacher already has an assigned room");
        // }

        const teacher = await ctx.db.get(args.teacherId);
        if (!teacher) {
            throw new ConvexError("Teacher not found");
        }

        return await ctx.db.insert("rooms", {
            capacity: args.capacity,
            name: args.name,
            type: args.type,
            description: args.description,
            // features: args.features,
            teacherId: args.teacherId,
            isActive: true
        });
    }
})

export const get = query({
    handler: async (ctx) => {
        const rooms = await ctx.db
            .query("rooms")
            .order("desc")
            .collect();

        const roomsWithTeachers = await Promise.all(
            rooms.map(async (room) => {
                const teacher = room.teacherId
                    ? await ctx.db.get(room.teacherId)
                    : null;
                return {
                    ...room,
                    teacher
                };
            })
        );

        return roomsWithTeachers;
    }
});

export const getTeachers = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("users")
            .filter(q => q.eq(q.field("role"), "teacher"))
            .filter(q => q.eq(q.field("isActive"), true))
            .collect();
    }
});

export const remove = mutation({
    args: { id: v.id("rooms") },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    }
});

export const update = mutation({
    args: {
        id: v.id("rooms"),
        name: v.string(),
        capacity: v.number(),
        type: v.string(),
        // features: v.optional(v.array(v.string())),
        teacherId: v.id("users"),
        description: v.optional(v.string()),
        // gradeLevel: v.optional(v.string()),
        // track: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;

        // Validate if room exists
        const room = await ctx.db.get(id);
        if (!room) {
            throw new ConvexError("Room not found");
        }

        // Validate if teacher exists
        const teacher = await ctx.db.get(args.teacherId);
        if (!teacher) {
            throw new ConvexError("Teacher not found");
        }

        return await ctx.db.patch(id, updates);
    }
});