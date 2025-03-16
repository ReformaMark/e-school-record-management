import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { asyncMap } from "convex-helpers";

export const getSections = query({
    args: {},
    handler: async (ctx) => {
        const sections = await ctx.db
            .query("sections")
            .order("desc")
            .collect()

        return Promise.all(sections.map(async (section) => {
            const gradeLevel = await ctx.db.get(section.gradeLevelId)
            const advisor = await ctx.db.get(section.advisorId)
            const room = await ctx.db.get(section.roomId as Id<"rooms">)
            const students = section.students || []

            return {
                ...section,
                gradeLevel,
                advisor,
                room,
                studentCount: students.length
            };
        }));
    }
});

export const getSection = query({
    args: {
        sectionId: v.id("sections")
    },
    handler: async (ctx, args) => {
        const section = await ctx.db.get(args.sectionId);
        if (!section) return null;

        const gradeLevel = await ctx.db.get(section.gradeLevelId);
        const advisor = await ctx.db.get(section.advisorId);
        const room = await ctx.db.get(section.roomId as Id<"rooms">);

        // Get students with details using same pattern as students.ts
        const students = await asyncMap(section.students || [], async (studentId) => {
            const student = await ctx.db.get(studentId);
            if (!student) return null;

            const schoolYear = await ctx.db.query('schoolYears').order('desc').first();
            if (!schoolYear) return null;

            // Get classes for the section
            const classes = await ctx.db.query('classes')
                .filter(q => q.eq(q.field('sectionId'), section._id))
                .collect();

            const classIds = classes.map(c => c._id);

            // Get subjects with details
            const subjectsWithDetail = await asyncMap(classes, async (cls) => {
                const subject = await ctx.db.get(cls.subjectId);
                return subject ? {
                    ...cls,
                    subject
                } : null;
            });

            // Get quarterly grades
            const quarterlyGrades = await ctx.db.query('quarterlyGrades')
                .filter(q => q.eq(q.field('studentId'), student._id))
                .collect();

            const filteredQG = quarterlyGrades.filter(qg =>
                classIds.includes(qg.classId)
            );

            // Get grades with subjects
            const gradesWithSubjects = await asyncMap(filteredQG, async (qg) => {
                const cls = await ctx.db.get(qg.classId);
                if (!cls) return null;
                const subject = await ctx.db.get(cls.subjectId);
                return subject ? {
                    ...qg,
                    subject
                } : null;
            });

            const finalGrades = await ctx.db
                .query("finalGrades")
                .filter(q => q.eq(q.field("studentId"), studentId))
                .collect()

            return {
                ...student,
                finalGrades,
                quarterlyGrades: gradesWithSubjects.filter(Boolean),
                sectionDoc: {
                    ...section,
                    gradeLevel,
                    _id: section._id,
                    name: section.name
                },
                cLass: {
                    ...classes[0],
                    schoolYear
                },
                advisor,
                subjects: subjectsWithDetail.filter(Boolean)
            };
        });

        return {
            ...section,
            gradeLevel,
            advisor,
            room,
            students: students.filter(Boolean),
            studentCount: students.length
        };
    }
});