import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { asyncMap } from "convex-helpers";

export const getSubjects = query({
    handler: async(ctx) =>{
        const subjects = await ctx.db.query('subjects').collect()
        return subjects
    }
})

export const getAssignSubjects = query({
    handler: async(ctx) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No Teacher Id found.');

        const sy = await ctx.db.query('schoolYears').order('desc').unique()
        if(!sy || sy === null) throw new ConvexError('School year not found.');

        const classes = await ctx.db.query('classes')
            .withIndex('by_teacherId')
            .filter(q=> q.eq(q.field('schoolYearId'), sy._id))
            .collect()

        const uniqueClasses = filterUniqueSubjects(classes);
        
        const assignedSubjects = await Promise.all(
            uniqueClasses.map(cls => ctx.db.get(cls.subjectId)) 
        );
        const filterAssignedSubjects = assignedSubjects.filter(s => s !== null)

        const subjectsWithGW = await asyncMap(filterAssignedSubjects, async(s)=>{
            const gw = await ctx.db.query('appliedGradeWeigths')
                .filter(q=> q.eq(q.field('teacherId'), teacherId))
                .filter(q=> q.eq(q.field('subjectId'), s._id))
                .unique()
            return {
                ...s,
                appliedGradeWeights: gw
            }
        })
        return subjectsWithGW
    }
})

function filterUniqueSubjects(classes : Doc<'classes'>[]): typeof classes {
    const seenSubjects = new Set<Id<"subjects">>();
    return classes.filter(cls => {
        if (seenSubjects.has(cls.subjectId)) {
            return false; // Skip duplicate subjectId
        }
        seenSubjects.add(cls.subjectId);
        return true;
    });
}
