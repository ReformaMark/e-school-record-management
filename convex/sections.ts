import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSectionsUsingGradeLevel = query({
    args: {
        gradeLevel: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (!args.gradeLevel) {
            return []
        }
        const gradeLevel = await ctx.db.query('gradeLevels').filter(q => q.eq(q.field('level'), args.gradeLevel)).unique()
        const sections = await ctx.db.query('sections')
            .filter(q => q.eq(q.field('gradeLevelId'), gradeLevel?._id))
            .filter(q => q.eq(q.field('isActive'), true))
            .order('desc')
            .collect()
        return sections
    }
})

export const addStudentToSection = mutation({
    args: {
        studentId: v.id('students'),
        sectionId: v.id('sections')
    },
    handler: async (ctx, args) => {
        if (!args.studentId) {
            throw new Error("No student Id");
        }
        if (!args.sectionId) {
            throw new Error("No section Id");
        }

        const section = await ctx.db.get(args.sectionId)
        const sectionStudents = section?.students

        sectionStudents?.push(args.studentId)

        await ctx.db.patch(args.sectionId, {
            students: sectionStudents
        })

    }
})

export const create = mutation({
    args: {
        name: v.string(),
        gradeLevelId: v.id("gradeLevels"),
        advisorId: v.id("users"),
        schoolYearId: v.id("schoolYears"),
        classes: v.array(v.object({
            subjectId: v.id("subjects"),
            teacherId: v.id("users"),
            semester: v.optional(v.string()),
            track: v.optional(v.string())
        }))
    },
    handler: async (ctx, args) => {
        const advisor = await ctx.db.get(args.advisorId);
        if (!advisor || advisor.role !== "teacher") {
            throw new ConvexError("Invalid advisor selected");
        }

        const gradeLevel = await ctx.db.get(args.gradeLevelId);
        const isSHS = gradeLevel?.level.includes("11") || gradeLevel?.level.includes("12");

        if (isSHS) {
            const invalidClasses = args.classes.filter(
                cls => !cls.semester || !cls.track
            );
            if (invalidClasses.length > 0) {
                throw new ConvexError(
                    "Senior High School classes must have semester and track specified"
                );
            }
        }

        const sectionId = await ctx.db.insert("sections", {
            name: args.name,
            gradeLevelId: args.gradeLevelId,
            advisorId: args.advisorId,
            schoolYearId: args.schoolYearId,
            isActive: true,
            students: []
        });

        const classPromises = args.classes.map(classData =>
            ctx.db.insert("classes", {
                subjectId: classData.subjectId,
                teacherId: classData.teacherId,
                sectionId,
                schoolYearId: args.schoolYearId,
                semester: isSHS ? classData.semester : undefined,
                track: isSHS ? classData.track : undefined
            })
        );

        await Promise.all(classPromises);

        return sectionId;
    }
});

export const getSections = query({
    handler: async (ctx) => {
        const sections = await ctx.db
            .query("sections")
            .filter(q => q.eq(q.field("isActive"), true))
            .collect();

        return Promise.all(sections.map(async (section) => {
            const advisor = await ctx.db.get(section.advisorId);
            const sy = await ctx.db.get(section.schoolYearId);
            const gradeLevel = await ctx.db.get(section.gradeLevelId);
            const classes = await ctx.db
                .query("classes")
                .filter(q => q.eq(q.field("sectionId"), section._id))
                .collect();

            const classesWithDetails = await Promise.all(classes.map(async (classItem) => {
                const teacher = await ctx.db.get(classItem.teacherId);
                const subject = await ctx.db.get(classItem.subjectId);
                // const schedule = await await Promise.all(classItem.scheduleId.map(async (scheduleId) => { 
                //     const schedId = await ctx.db.get(scheduleId)

                //     return schedId
                // }))

                // const removeNullSched = schedule.filter(sched => sched !== null)

                const schedule = await ctx.db
                    .query("schedules")
                    .filter(q => q.eq(q.field("classId"), classItem._id))
                    .first();

                let periodDetails = null;
                if (schedule) {
                    periodDetails = await ctx.db.get(schedule.schoolPeriodId);
                }

                return {
                    ...classItem,
                    teacher,
                    subject,
                    schedule: schedule ? {
                        ...schedule,
                        period: periodDetails
                    } : null
                };
            }));

            return {
                ...section,
                advisor,
                gradeLevel,
                schoolYear: sy,
                classes: classesWithDetails
            };
        }));
    }
});