import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { ConvexError, v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const getSubjects = query({
    handler: async (ctx) => {
        const subjects = await ctx.db
            .query('subjects')
            .order("desc")
            .collect()
        const subWithGLevel = await asyncMap(subjects, async (s) => {
            const gradeLevel = await ctx.db.get(s.gradeLevelId)
            return {
                ...s,
                gradeLevel: gradeLevel
            }
        })
        return subWithGLevel
    }
})

export const getAssignSubjects = query({
    args: {
        sy: v.optional(v.id('schoolYears'))
    },
    handler: async (ctx, args) => {
        const teacherId = await getAuthUserId(ctx)
        if (!teacherId) throw new ConvexError('No Teacher Id found.');
        if (!args.sy) return []
        const classes = await ctx.db.query('classes')
            .filter(q => q.eq(q.field('teacherId'), teacherId))
            .filter(q => q.eq(q.field('schoolYearId'), args.sy))
            .collect()

        const uniqueClasses = filterUniqueSubjects(classes);

        const assignedSubjects = await Promise.all(
            uniqueClasses.map(cls => ctx.db.get(cls.subjectId))
        );
        const filterAssignedSubjects = assignedSubjects.filter(s => s !== null)

        const subjectsWithGW = await asyncMap(filterAssignedSubjects, async (s) => {
            const gw = await ctx.db.query('appliedGradeWeigths')
                .filter(q => q.eq(q.field('teacherId'), teacherId))
                .filter(q => q.eq(q.field('subjectId'), s._id))
                .unique()
            return {
                ...s,
                appliedGradeWeights: gw
            }
        })
        return subjectsWithGW
    }
})

function filterUniqueSubjects(classes: Doc<'classes'>[]): typeof classes {
    const seenSubjects = new Set<Id<"subjects">>();
    return classes.filter(cls => {
        if (seenSubjects.has(cls.subjectId)) {
            return false; // Skip duplicate subjectId
        }
        seenSubjects.add(cls.subjectId);
        return true;
    });
}

export const getSubject = query({
    args: {
        subjectId: v.optional(v.id('subjects'))
    },
    handler: async (ctx, args) => {
        if (!args.subjectId) return;
        return await ctx.db.get(args.subjectId)
    }
})

export const create = mutation({
    args: {
        name: v.string(),
        subjectCode: v.string(),
        subjectCategory: v.optional(v.union(v.literal("core"), v.literal("applied"), v.literal("specialized"))),
        gradeLevelId: v.id("gradeLevels"),
        gradeWeights: v.optional(v.object({
            written: v.number(),
            performance: v.number(),
            exam: v.optional(v.number())
        })),
        // isMapeh: v.boolean(),
        // mapehWeights: v.optional(v.object({
        //     music: v.object({
        //         written: v.number(),
        //         performance: v.number(),
        //         exam: v.optional(v.number())
        //     }),
        //     arts: v.object({
        //         written: v.number(),
        //         performance: v.number(),
        //         exam: v.optional(v.number())
        //     }),
        //     pe: v.object({
        //         written: v.number(),
        //         performance: v.number(),
        //         exam: v.optional(v.number())
        //     }),
        //     health: v.object({
        //         written: v.number(),
        //         performance: v.number(),
        //         exam: v.optional(v.number())
        //     })
        // }))
    },
    handler: async (ctx, args) => {
        // Check for existing MAPEH subject if trying to create one
        // if (args.isMapeh) {
        //     const existingMapeh = await ctx.db
        //         .query("subjects")
        //         .filter((q) => q.eq(q.field("isMapeh"), true))
        //         .first();

        //     if (existingMapeh) {
        //         throw new ConvexError("MAPEH subject already exists");
        //     }
        // }

        // Check for existing subject code
        const existingSubject = await ctx.db
            .query("subjects")
            .filter((q) => q.eq(q.field("subjectCode"), args.subjectCode))
            .first();

        if (existingSubject) {
            throw new ConvexError("Subject code already exists");
        }

        // Validate weights
        // if (args.isMapeh && args.mapehWeights) {
        //     // Validate each MAPEH component weights
        //     for (const component of ['music', 'arts', 'pe', 'health'] as const) {
        //         const weights = args.mapehWeights[component];
        //         const total = weights.written + weights.performance + (weights.exam || 0);

        //         if (total !== 100) {
        //             throw new ConvexError(`${component.toUpperCase()} weights must total 100%`);
        //         }
        //     }
        // } else
        if (args.gradeWeights) {
            // Validate regular subject weights
            const total = args.gradeWeights.written +
                args.gradeWeights.performance +
                (args.gradeWeights.exam || 0);

            if (total !== 100) {
                throw new ConvexError("Grade weights must total 100%");
            }
        }

        // Create the subject
        return await ctx.db.insert("subjects", {
            name: args.name,
            subjectCode: args.subjectCode,
            gradeLevelId: args.gradeLevelId,
            subjectCategory: args.subjectCategory,
            gradeWeights: args.gradeWeights,
            // isMapeh: args.isMapeh,
            // ...(args.isMapeh ? { mapehWeights: args.mapehWeights } : { gradeWeights: args.gradeWeights })
        });
    }
});

const componentWeightValidator = v.object({
    written: v.float64(),
    performance: v.float64(),
    exam: v.optional(v.float64())
});

export const update = mutation({
    args: {
        id: v.id("subjects"),
        name: v.string(),
        subjectCode: v.string(),
        gradeLevelId: v.id("gradeLevels"),
        subjectCategory: v.optional(v.union(
            v.literal("core"),
            v.literal("applied"),
            v.literal("specialized")
        )),
        gradeWeights: v.optional(componentWeightValidator),
        // isMapeh: v.boolean(),
        // mapehWeights: v.optional(v.object({
        //     music: componentWeightValidator,
        //     arts: componentWeightValidator,
        //     pe: componentWeightValidator,
        //     health: componentWeightValidator
        // }))
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;

        // Validate grade weights total 100%
        // if (!args.isMapeh && args.gradeWeights) {
        //     const total = args.gradeWeights.written +
        //         args.gradeWeights.performance +
        //         (args.gradeWeights.exam || 0);

        //     if (total !== 100) {
        //         throw new ConvexError("Grade weights must total 100%");
        //     }
        // }

        // // Validate MAPEH weights if present
        // if (args.isMapeh && args.mapehWeights) {
        //     for (const component of ['music', 'arts', 'pe', 'health']) {
        //         // @ts-expect-error slight type issue
        //         const weights = args.mapehWeights[component];
        //         const total = weights.written +
        //             weights.performance +
        //             (weights.exam || 0);

        //         if (total !== 100) {
        //             throw new ConvexError(`${component.toUpperCase()} weights must total 100%`);
        //         }
        //     }
        // }

        return await ctx.db.patch(id, updates);
    }
});

export const remove = mutation({
    args: {
        id: v.id("subjects")
    },
    handler: async (ctx, args) => {
        return await ctx.db.delete(args.id);
    }
});

export const getSubjectWithGradeLevel = query({
    handler: async (ctx) => {
        const subjects = await ctx.db
            .query("subjects")
            .order("desc")
            .collect();

        // Fetch grade level for each subject
        const subjectsWithGradeLevel = await Promise.all(
            subjects.map(async (subject) => {
                const gradeLevel = subject.gradeLevelId
                    ? await ctx.db.get(subject.gradeLevelId)
                    : null;
                return {
                    ...subject,
                    gradeLevel
                };
            })
        );

        return subjectsWithGradeLevel;
    }
});

export const getTeacherSubjects = query({
    handler: async (ctx) => {
        const teacherId = await getAuthUserId(ctx);
        if (!teacherId) throw new ConvexError("No teacher ID");

        // Get all classes taught by this teacher
        const teacherClasses = await ctx.db
            .query("classes")
            .filter(q => q.eq(q.field("teacherId"), teacherId))
            .collect();

        // Filter unique subjects using Set to avoid duplicates
        const uniqueSubjects = new Map();

        // Get subject details with grade level
        await Promise.all(teacherClasses.map(async (cls) => {
            // Skip if we already processed this subject
            if (uniqueSubjects.has(cls.subjectId.toString())) return;

            const subject = await ctx.db.get(cls.subjectId);
            if (!subject) return;

            const gradeLevel = await ctx.db.get(subject.gradeLevelId);
            if (!gradeLevel) return;

            // Get applied grade weights for this subject
            const appliedWeights = await ctx.db
                .query("appliedGradeWeigths")
                .filter(q => q.and(
                    q.eq(q.field("teacherId"), teacherId),
                    q.eq(q.field("subjectId"), subject._id)
                ))
                .first();

            uniqueSubjects.set(cls.subjectId.toString(), {
                _id: subject._id,
                name: subject.name,
                subjectCode: subject.subjectCode,
                subjectCategory: subject.subjectCategory || "core", // Default to core if not specified
                gradeLevel: gradeLevel,
                gradeWeights: subject.gradeWeights,
                appliedWeights: appliedWeights || null
            });
        }));

        return Array.from(uniqueSubjects.values());
    }
});

export const getById = query({
    args: {
        id: v.id("subjects")
    },
    handler: async (ctx, args) => {
        const subject = await ctx.db.get(args.id);
        if (!subject) return null;

        // Get grade level information
        const gradeLevel = await ctx.db.get(subject.gradeLevelId);

        return {
            ...subject,
            gradeLevel: gradeLevel || null
        };
    }
});