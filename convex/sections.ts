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
        const sections = await ctx.db.query('sections')
            .filter(q => q.eq(q.field('gradeLevel'), Number(args.gradeLevel)))
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
        // roomId: v.optional(v.id("rooms")),
        classes: v.array(v.object({
            subjectId: v.id("subjects"),
            teacherId: v.id("users"),
            scheduleId: v.id("schedules"),
            semester: v.optional(v.string()),
            track: v.optional(v.string())
        }))
    },
    handler: async (ctx, args) => {
        const advisor = await ctx.db.get(args.advisorId);
        if (!advisor || advisor.role !== "teacher") {
            throw new ConvexError("Invalid advisor selected");
        }

        const sectionId = await ctx.db.insert("sections", {
            name: args.name,
            gradeLevelId: args.gradeLevelId,
            advisorId: args.advisorId,
            schoolYearId: args.schoolYearId,
            // roomId: args.roomId,
            isActive: true,
            students: []
        });

        const classPromises = args.classes.map(classData =>
            ctx.db.insert("classes", {
                ...classData,
                sectionId,
                schoolYearId: args.schoolYearId
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
            const classes = await ctx.db
                .query("classes")
                .filter(q => q.eq(q.field("sectionId"), section._id))
                .collect();

            const classesWithDetails = await Promise.all(classes.map(async (classItem) => {
                const teacher = await ctx.db.get(classItem.teacherId);
                const subject = await ctx.db.get(classItem.subjectId);
                const schedule = await ctx.db.get(classItem.scheduleId);

                return {
                    ...classItem,
                    teacher,
                    subject,
                    schedule
                };
            }));

            return {
                ...section,
                advisor,
                classes: classesWithDetails
            };
        }));
    }
});