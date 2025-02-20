import { getAuthUserId } from "@convex-dev/auth/server";
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
        sectionId: v.id('sections'),
        gradeLevelToEnroll: v.number(),
        semesterToEnroll: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (!args.studentId) {
            throw new Error("No student Id");
        }
        if (!args.sectionId) {
            throw new Error("No section Id");
        }
        const section = await ctx.db.get(args.sectionId)
        const isShs = args.gradeLevelToEnroll > 10

        if (isShs) {
            if (args.semesterToEnroll === "1st") {
                const sectionStudentsFirst = section?.firstSemStudents
                sectionStudentsFirst?.push(args.studentId)

                await ctx.db.patch(args.sectionId, {
                    firstSemStudents: sectionStudentsFirst
                })
            }
            if (args.semesterToEnroll === "2nd") {
                const sectionStudentsSecond = section?.secondSemStudents
                sectionStudentsSecond?.push(args.studentId)

                await ctx.db.patch(args.sectionId, {
                    secondSemStudents: sectionStudentsSecond
                })
            }
        } else {

            const sectionStudents = section?.students

            sectionStudents?.push(args.studentId)

            await ctx.db.patch(args.sectionId, {
                students: sectionStudents
            })
        }


    }
})

export const create = mutation({
    args: {
        name: v.string(),
        gradeLevelId: v.id("gradeLevels"),
        advisorId: v.id("users"),
        schoolYearId: v.id("schoolYears"),
        roomId: v.id("rooms"),
        classes: v.array(v.object({
            subjectId: v.id("subjects"),
            teacherId: v.id("users"),
            semester: v.optional(v.string()),
            track: v.optional(v.string()),
            schedules: v.optional(v.array(v.object({
                days: v.array(v.string()),
                schoolPeriodId: v.id("schoolPeriods"),
                roomId: v.id("rooms")
            }))),
        }))
    },
    handler: async (ctx, args) => {
        const room = await ctx.db.get(args.roomId);
        if (!room || !room.isActive) {
            throw new ConvexError("Invalid room selected");
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

        for (const classData of args.classes) {
            if (classData.schedules) {
                for (const schedule of classData.schedules) {
                    // Check room availability
                    const roomConflict = await ctx.db
                        .query("schedules")
                        .filter(q =>
                            q.and(
                                q.eq(q.field("roomId"), schedule.roomId),
                                q.eq(q.field("schoolPeriodId"), schedule.schoolPeriodId),
                                // Check if any of the days match
                                q.or(
                                    ...schedule.days.map(day =>
                                        q.eq(q.field("day"), [day])
                                    )
                                )
                            )
                        )
                        .first();

                    if (roomConflict) {
                        throw new ConvexError(
                            `Room schedule conflict: ${schedule.days.join(", ")} at period ${schedule.schoolPeriodId}`
                        );
                    }

                    // Check teacher availability
                    const teacherConflict = await ctx.db
                        .query("schedules")
                        .filter(q =>
                            q.and(
                                q.eq(q.field("teacherId"), classData.teacherId),
                                q.eq(q.field("schoolPeriodId"), schedule.schoolPeriodId),
                                // Check if any of the days match
                                q.or(
                                    ...schedule.days.map(day =>
                                        q.eq(q.field("day"), [day])
                                    )
                                )
                            )
                        )
                        .first();

                    if (teacherConflict) {
                        throw new ConvexError(
                            `Teacher schedule conflict: ${schedule.days.join(", ")} at period ${schedule.schoolPeriodId}`
                        );
                    }
                }
            }
        }

        const sectionId = await ctx.db.insert("sections", {
            name: args.name,
            gradeLevelId: args.gradeLevelId,
            advisorId: args.advisorId,
            schoolYearId: args.schoolYearId,
            roomId: args.roomId,
            isActive: true,
            students: [],
            firstSemStudents: [],
            secondSemStudents: []
        });

        for (const classData of args.classes) {
            const classId = await ctx.db.insert("classes", {
                subjectId: classData.subjectId,
                teacherId: classData.teacherId,
                sectionId,
                schoolYearId: args.schoolYearId,
                semester: classData.semester,
                track: classData.track
            });

            // Create schedules for each class if they exist
            if (classData.schedules) {
                for (const schedule of classData.schedules) {
                    await ctx.db.insert("schedules", {
                        day: schedule.days,
                        schoolPeriodId: schedule.schoolPeriodId,
                        roomId: schedule.roomId,
                        classId,
                        teacherId: classData.teacherId
                    });
                }
            }
        }

        return sectionId;
    }
});

export const getSchedulesByClassId = query({
    args: { classId: v.id("classes") },
    handler: async (ctx, { classId }) => {
        return await ctx.db
            .query("schedules")
            .filter(q => q.eq(q.field("classId"), classId))
            .collect();
    }
});

export const getSectionsByTeacher = query({
    args: {
        sy: v.optional(v.id('schoolYears'))
    },
    handler: async (ctx, args) => {
        const teacherId = await getAuthUserId(ctx)
        if (!teacherId) throw new ConvexError('No teacher id.')

        if (!args.sy) return

        const section = await ctx.db.query('sections')
            .filter(q => q.eq(q.field("advisorId"), teacherId))
            .filter(q => q.eq(q.field("schoolYearId"), args.sy))
            .unique()

        if (!section || section === null) return

        const gradeLevel = await ctx.db.get(section?.gradeLevelId)

        return {
            ...section,
            gradeLevel: gradeLevel
        }
    }
})

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

                const schedules = await ctx.db
                    .query("schedules")
                    .filter(q => q.eq(q.field("classId"), classItem._id))
                    .collect();

                // Fetch schedule details
                const schedulesWithDetails = await Promise.all(schedules.map(async (schedule) => {
                    const period = await ctx.db.get(schedule.schoolPeriodId);
                    const room = await ctx.db.get(schedule.roomId);

                    return {
                        _id: schedule._id,
                        day: schedule.day,
                        schoolPeriodId: schedule.schoolPeriodId,
                        roomId: schedule.roomId,
                        timeRange: period?.timeRange,
                        roomName: room?.name
                    };
                }));


                return {
                    _id: classItem._id,
                    subjectId: classItem.subjectId,
                    teacherId: classItem.teacherId,
                    semester: classItem.semester || "",
                    track: classItem.track || "",
                    teacher,
                    subject,
                    schedules: schedulesWithDetails
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
        schedules: v.optional(v.array(v.object({
            days: v.array(v.string()),
            schoolPeriodId: v.id("schoolPeriods"),
            roomId: v.id("rooms")
        })))
    },
    handler: async (ctx, args) => {
        const section = await ctx.db.get(args.sectionId);
        if (!section || !section.isActive) {
            throw new ConvexError("Invalid or inactive section");
        }

        // Validate teacher
        const teacher = await ctx.db.get(args.teacherId);
        if (!teacher || teacher.role !== "teacher") {
            throw new ConvexError("Invalid teacher selected");
        }

        // Check schedule conflicts if schedules are provided
        if (args.schedules) {
            for (const schedule of args.schedules) {
                // Check room availability
                const roomConflict = await ctx.db
                    .query("schedules")
                    .filter(q =>
                        q.and(
                            q.eq(q.field("roomId"), schedule.roomId),
                            q.eq(q.field("schoolPeriodId"), schedule.schoolPeriodId),
                            q.or(
                                ...schedule.days.map(day =>
                                    q.eq(q.field("day"), [day])
                                )
                            )
                        )
                    )
                    .first();

                if (roomConflict) {
                    throw new ConvexError(
                        `Room schedule conflict: ${schedule.days.join(", ")} at period ${schedule.schoolPeriodId}`
                    );
                }

                // Check teacher availability
                const teacherConflict = await ctx.db
                    .query("schedules")
                    .filter(q =>
                        q.and(
                            q.eq(q.field("teacherId"), args.teacherId),
                            q.eq(q.field("schoolPeriodId"), schedule.schoolPeriodId),
                            q.or(
                                ...schedule.days.map(day =>
                                    q.eq(q.field("day"), [day])
                                )
                            )
                        )
                    )
                    .first();

                if (teacherConflict) {
                    throw new ConvexError(
                        `Teacher schedule conflict: ${schedule.days.join(", ")} at period ${schedule.schoolPeriodId}`
                    );
                }
            }
        }

        // Create the class
        const classId = await ctx.db.insert("classes", {
            subjectId: args.subjectId,
            teacherId: args.teacherId,
            sectionId: args.sectionId,
            schoolYearId: section.schoolYearId,
            semester: args.semester,
            track: args.track
        });

        // Create schedules if provided
        if (args.schedules) {
            for (const schedule of args.schedules) {
                await ctx.db.insert("schedules", {
                    day: schedule.days,
                    schoolPeriodId: schedule.schoolPeriodId,
                    roomId: schedule.roomId,
                    classId,
                    teacherId: args.teacherId
                });
            }
        }

        return classId;
    }
});

export const update = mutation({
    args: {
        id: v.id("sections"),
        name: v.string(),
        gradeLevelId: v.id("gradeLevels"),
        advisorId: v.id("users"),
        schoolYearId: v.id("schoolYears"),
        roomId: v.id("rooms"),
        classes: v.array(v.object({
            id: v.optional(v.id("classes")),
            subjectId: v.id("subjects"),
            teacherId: v.id("users"),
            semester: v.optional(v.string()),
            track: v.optional(v.string()),
            schedules: v.optional(v.array(v.object({
                days: v.array(v.string()),
                schoolPeriodId: v.id("schoolPeriods"),
                roomId: v.id("rooms"),
            })))
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
            roomId: args.roomId,
            ...(!section.firstSemStudents ? { firstSemStudents: [] } : {}),
            ...(!section.secondSemStudents ? { secondSemStudents: [] } : {})
        });

        // Get existing classes
        const existingClasses = await ctx.db
            .query("classes")
            .filter(q => q.eq(q.field("sectionId"), args.id))
            .collect();

        // Create a map of existing class IDs for easier lookup
        const existingClassMap = new Map(
            existingClasses.map(cls => [cls._id, cls])
        );

        // Track which existing classes are still being used
        const usedClassIds = new Set<Id<"classes">>();

        // Update or create classes
        for (const classData of args.classes) {
            if (classData.id && existingClassMap.has(classData.id)) {
                // Update existing class
                usedClassIds.add(classData.id);
                await ctx.db.patch(classData.id, {
                    subjectId: classData.subjectId,
                    teacherId: classData.teacherId,
                    semester: isSHS ? classData.semester : undefined,
                    track: isSHS ? classData.track : undefined,
                });

                // Handle schedules for existing class
                if (classData.schedules) {
                    // Delete existing schedules
                    const existingSchedules = await ctx.db
                        .query("schedules")
                        .filter(q => q.eq(q.field("classId"), classData.id))
                        .collect();

                    // Only update schedules if they've changed
                    const schedulesHaveChanged = existingSchedules.length !== classData.schedules.length ||
                        existingSchedules.some((schedule, index) => {
                            const newSchedule = classData.schedules?.[index];
                            if (!newSchedule) return true;

                            // Compare arrays properly
                            const daysChanged = schedule.day.length !== newSchedule.days.length ||
                                !schedule.day.every(day => newSchedule.days.includes(day));

                            return (
                                daysChanged ||
                                schedule.schoolPeriodId !== newSchedule.schoolPeriodId ||
                                schedule.roomId !== newSchedule.roomId
                            );
                        });

                    if (schedulesHaveChanged) {
                        // Delete old schedules first
                        for (const schedule of existingSchedules) {
                            await ctx.db.delete(schedule._id);
                        }

                        // Create new schedules with updated data
                        for (const schedule of classData.schedules) {
                            await ctx.db.insert("schedules", {
                                day: schedule.days,
                                schoolPeriodId: schedule.schoolPeriodId,
                                roomId: schedule.roomId,
                                classId: classData.id,
                                teacherId: classData.teacherId
                            });
                        }
                    }
                }
            } else {
                // Create new class
                const classId = await ctx.db.insert("classes", {
                    subjectId: classData.subjectId,
                    teacherId: classData.teacherId,
                    sectionId: args.id,
                    schoolYearId: args.schoolYearId,
                    semester: isSHS ? classData.semester : undefined,
                    track: isSHS ? classData.track : undefined,
                });

                // Create schedules for new class
                if (classData.schedules) {
                    for (const schedule of classData.schedules) {
                        await ctx.db.insert("schedules", {
                            day: schedule.days,
                            schoolPeriodId: schedule.schoolPeriodId,
                            roomId: schedule.roomId,
                            classId,
                            teacherId: classData.teacherId
                        });
                    }
                }
            }
        }

        // Delete classes that are no longer used
        for (const existingClass of existingClasses) {
            if (!usedClassIds.has(existingClass._id)) {
                // Delete associated schedules first
                const schedules = await ctx.db
                    .query("schedules")
                    .filter(q => q.eq(q.field("classId"), existingClass._id))
                    .collect();

                for (const schedule of schedules) {
                    await ctx.db.delete(schedule._id);
                }

                // Then delete the class
                await ctx.db.delete(existingClass._id);
            }
        }

        return args.id;
    }
});