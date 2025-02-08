import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    day: v.string(),
    schoolPeriodId: v.id("schoolPeriods"),
    roomId: v.id("rooms"),
    teacherId: v.id("users")
  },
  handler: async (ctx, args) => {
    // Validate if schedule already exists
    const existingSchedule = await ctx.db
      .query("schedules")
      .filter(q =>
        q.eq(q.field("day"), args.day) &&
        q.eq(q.field("schoolPeriodId"), args.schoolPeriodId) &&
        q.eq(q.field("roomId"), args.roomId)
      )
      .first();

    if (existingSchedule) {
      throw new ConvexError("Schedule conflict: Time slot already taken for this room");
    }

    // Validate teacher availability
    const teacherSchedule = await ctx.db
      .query("schedules")
      .filter(q =>
        q.eq(q.field("day"), args.day) &&
        q.eq(q.field("schoolPeriodId"), args.schoolPeriodId) &&
        q.eq(q.field("teacherId"), args.teacherId)
      )
      .first();

    if (teacherSchedule) {
      throw new ConvexError("Schedule conflict: Teacher already has a class at this time");
    }

    return await ctx.db.insert("schedules", args);
  }
});

export const get = query({
  handler: async (ctx) => {
    const schedules = await ctx.db
      .query("schedules")
      .collect();

    return Promise.all(
      schedules.map(async (schedule) => {
        const [teacher, room, period] = await Promise.all([
          ctx.db.get(schedule.teacherId),
          ctx.db.get(schedule.roomId),
          ctx.db.get(schedule.schoolPeriodId)
        ]);

        return {
          ...schedule,
          teacher,
          room,
          period
        };
      })
    );
  }
});

export const getAvailableSchedules = query({
  args: {
    teacherId: v.optional(v.id("users")),
    day: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("schedules");

    if (args.teacherId) {
      query = query.filter(q => q.eq(q.field("teacherId"), args.teacherId));
    }

    if (args.day) {
      query = query.filter(q => q.eq(q.field("day"), args.day));
    }

    const schedules = await query.collect();

    return Promise.all(
      schedules.map(async (schedule) => {
        const [teacher, room, period] = await Promise.all([
          ctx.db.get(schedule.teacherId),
          ctx.db.get(schedule.roomId),
          ctx.db.get(schedule.schoolPeriodId)
        ]);

        return {
          ...schedule,
          teacher,
          room,
          period
        };
      })
    );
  }
});

export const remove = mutation({
  args: {
    id: v.id("schedules")
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});

export const update = mutation({
  args: {
    id: v.id("schedules"),
    day: v.string(),
    schoolPeriodId: v.id("schoolPeriods"),
    roomId: v.id("rooms"),
    teacherId: v.id("users")
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;


    const currentSchedule = await ctx.db.get(id);
    if (!currentSchedule) {
      throw new ConvexError("Schedule not found");
    }


    if (
      currentSchedule.day !== updates.day ||
      currentSchedule.schoolPeriodId !== updates.schoolPeriodId ||
      currentSchedule.roomId !== updates.roomId
    ) {

      const existingSchedule = await ctx.db
        .query("schedules")
        .filter(q =>
          q.and(
            q.eq(q.field("day"), updates.day),
            q.eq(q.field("schoolPeriodId"), updates.schoolPeriodId),
            q.eq(q.field("roomId"), updates.roomId),
            q.neq(q.field("_id"), id)
          )
        )
        .first();

      if (existingSchedule) {
        throw new ConvexError("Schedule conflict: Time slot already taken for this room");
      }


      const teacherConflict = await ctx.db
        .query("schedules")
        .filter(q =>
          q.and(
            q.eq(q.field("day"), updates.day),
            q.eq(q.field("schoolPeriodId"), updates.schoolPeriodId),
            q.eq(q.field("teacherId"), updates.teacherId),
            q.neq(q.field("_id"), id)
          )
        )
        .first();

      if (teacherConflict) {
        throw new ConvexError("Schedule conflict: Teacher already has a class at this time");
      }
    }

    return await ctx.db.patch(id, updates);
  }
});