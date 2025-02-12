import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {
        studentId: v.optional(v.id('students')),
        classId: v.optional(v.id('classes')),
    },
    handler: async( ctx, args) =>{
        if(!args.studentId) return []
        if(!args.classId) return []
        const attendance = await ctx.db.query('attendance')
        .filter(q=> q.eq(q.field('studentId'), args.studentId))
        .filter(q=> q.eq(q.field('classId'), args.classId))
        .unique()
        return attendance
    }
})

export const add = mutation({
    args: {
        studentId: v.id('students'),
        classId: v.id('classes'),
        june: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        july: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        august: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        september: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        october: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        november: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        december: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        january: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        february: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        march: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        april: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
        may: v.object({
        totalSchooldays: v.optional(v.number()),
        daysAbsent: v.optional(v.number()),
        daysPresent: v.optional(v.number()),
        }),
    },
    handler: async(ctx, args) =>{
        const isExisting = await ctx.db.query('attendance')
        .filter(q => q.eq(q.field('studentId'), args.studentId))
        .filter(q => q.eq(q.field('classId'), args.classId))
        .first()

        if(isExisting){
            await ctx.db.patch(isExisting._id, {
                ...args
            })
        } else [
            await ctx.db.insert('attendance', {
                ...args
            })
        ]
        return
    }
})