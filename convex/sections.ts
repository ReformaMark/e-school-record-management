import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSectionsUsingGradeLevel = query({
    args:{
        gradeLevel: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if(!args.gradeLevel){
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
    args:{
        studentId: v.id('students'),
        sectionId: v.id('sections')
    },
    handler: async (ctx, args) => {
        if(!args.studentId){
            throw new Error("No student Id");
        }
        if(!args.sectionId){
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