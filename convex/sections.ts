import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";
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
            .order("desc")
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

export const addClassToSection = mutation({
    args: {
        sectionId: v.id("sections"),
        subjectId: v.id("subjects"),
        teacherId: v.id("users"),
        semester: v.optional(v.string()),
        track: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const section = await ctx.db.get(args.sectionId)
        if (!section || !section.isActive) {
            throw new ConvexError("Invalid or inactive section")
        }

        const teacher = await ctx.db.get(args.teacherId);
        if (!teacher || teacher.role !== "teacher") {
            throw new ConvexError("Invalid teacher selected");
        }

        const gradeLevel = await ctx.db.get(section.gradeLevelId);
        const isSHS = gradeLevel?.level.includes("11") || gradeLevel?.level.includes("12");

        if (isSHS && (!args.semester || !args.track)) {
            throw new ConvexError("Semester and Track are required for Senior High School");
        }

        const classId = await ctx.db.insert("classes", {
            subjectId: args.subjectId,
            teacherId: args.teacherId,
            sectionId: args.sectionId,
            schoolYearId: section.schoolYearId,
            semester: isSHS ? args.semester : undefined,
            track: isSHS ? args.track : undefined
        });

        return classId;
    }
})

export const update = mutation({
    args: {
        id: v.id("sections"),
        name: v.string(),
        gradeLevelId: v.id("gradeLevels"),
        advisorId: v.id("users"),
        schoolYearId: v.id("schoolYears"),
        classes: v.array(v.object({
            id: v.optional(v.id("classes")),
            subjectId: v.id("subjects"),
            teacherId: v.id("users"),
            semester: v.optional(v.string()),
            track: v.optional(v.string())
        }))
    },
    handler: async (ctx, args) => {
        const section = await ctx.db.get(args.id);
        if (!section) {
            throw new ConvexError("Section not found");
        }

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

        // Update section details
        await ctx.db.patch(args.id, {
            name: args.name,
            gradeLevelId: args.gradeLevelId,
            advisorId: args.advisorId,
            schoolYearId: args.schoolYearId,
        });

        // Get existing classes
        const existingClasses = await ctx.db
            .query("classes")
            .filter(q => q.eq(q.field("sectionId"), args.id))
            .collect();

        // Delete classes that are not in the updated list
        const updatedClassIds = args.classes
            .filter(c => c.id)
            .map(c => c.id) as Id<"classes">[];

        for (const existingClass of existingClasses) {
            if (!updatedClassIds.includes(existingClass._id)) {
                await ctx.db.delete(existingClass._id);
            }
        }

        // Update or create classes
        for (const classData of args.classes) {
            if (classData.id) {
                // Update existing class
                await ctx.db.patch(classData.id, {
                    subjectId: classData.subjectId,
                    teacherId: classData.teacherId,
                    semester: isSHS ? classData.semester : undefined,
                    track: isSHS ? classData.track : undefined
                });
            } else {
                // Create new class
                await ctx.db.insert("classes", {
                    subjectId: classData.subjectId,
                    teacherId: classData.teacherId,
                    sectionId: args.id,
                    schoolYearId: args.schoolYearId,
                    semester: isSHS ? classData.semester : undefined,
                    track: isSHS ? classData.track : undefined
                });
            }
        }

        return args.id;
    }
});