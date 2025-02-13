import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { asyncMap } from "convex-helpers";

export const get = query({
    handler: async (ctx) => {
        const classes = await ctx.db
            .query("classes")
            .collect()

        const classWithDetails = await asyncMap(classes, async (c) => {
            const subject = await ctx.db.get(c.subjectId)
            const teacher = await ctx.db.get(c.teacherId)
            const section = await ctx.db.get(c.sectionId)

            return {
                ...c,
                subject: {
                    ...subject,
                },
                teacher: teacher,
                section: {
                    ...section,
                },
            }
        })

        return classWithDetails
    }
})

export const getTeacherClasses = query({
    handler: async (ctx) => {
        const teacherId = await getAuthUserId(ctx)
        if (!teacherId) {
            throw new ConvexError('No Teacher Id.')
        }

        const classes = await ctx.db.query('classes').filter(q => q.eq(q.field('teacherId'), teacherId)).collect()

        // const classWithDetails = await asyncMap(classes, async (class)=>{

        // })

        const classWithDetails = await asyncMap(classes, async (c) => {
            const subject = await ctx.db.get(c.subjectId)
            const teacher = await ctx.db.get(c.teacherId)
            const section = await ctx.db.get(c.sectionId)
            if (!section) return
            const gradeLevel = await ctx.db.get(section?.gradeLevelId)

            const schedules = await ctx.db.query('schedules')
                .filter(q => q.eq(q.field('teacherId'), teacher?._id))
                .filter(q => q.eq(q.field('classId'), c._id))
                .collect()
            const schedWithdetails = await asyncMap(schedules, async (sched) => {
                const schoolPeriod = await ctx.db.get(sched.schoolPeriodId)
                const room = await ctx.db.get(sched.roomId)
                return {
                    ...sched,
                    schoolPeriod: schoolPeriod,
                    room: room
                }
            })
            const schoolYear = await ctx.db.get(c.schoolYearId)
            return {
                ...c,
                subject: {
                    ...subject,
                    gradeLevel: gradeLevel
                },
                teacher: teacher,
                section: {
                    ...section,
                    gradeLevel: gradeLevel
                },
                schedules: schedWithdetails,
                schoolYear: schoolYear,
            }
        })

        return classWithDetails
    }
})

export const getClassesBySection = query({
    args: { sectionId: v.id("sections") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("classes")
            .filter(q => q.eq(q.field("sectionId"), args.sectionId))
            .collect();
    }
});

export const getClassesByTeacherId = query({
    args: {
        teacherId: v.id("users")
    },
    handler: async (ctx, args) => {
        const classes = await ctx.db
            .query("classes")
            .filter(q => q.eq(q.field("teacherId"), args.teacherId))
            .collect()

        const classesWithDetails = await asyncMap(classes, async (cls) => {
            const subject = await ctx.db.get(cls.subjectId)
            const section = await ctx.db.get(cls.sectionId)

            if (!section) return null;

            const gradeLevel = await ctx.db.get(section.gradeLevelId)
            const schoolYear = await ctx.db.get(cls.schoolYearId)

            const schedules = await ctx.db
                .query("schedules")
                .filter(q => q.eq(q.field("classId"), cls._id))
                .collect()

            const schedulesWithDetails = await asyncMap(schedules, async (schedule) => {
                const schoolPeriod = await ctx.db.get(schedule.schoolPeriodId);
                const room = await ctx.db.get(schedule.roomId)

                return {
                    ...schedule,
                    schoolPeriod,
                    room
                }
            })

            return {
                ...cls,
                subject: {
                    ...subject,
                    gradeLevel,
                },
                section: {
                    ...section,
                    gradeLevel,
                },
                schedules: schedulesWithDetails,
                schoolYear
            }
        })

        return classesWithDetails.filter(Boolean)
    }
})