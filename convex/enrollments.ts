import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";

export const addEnrollment = mutation({
    args:{
        studentId: v.id('students'),
        sectionId: v.id('sections'),
        schoolYearId: v.id('schoolYears'),
        dateEnrolled: v.string(),
        dateWithdrawn: v.optional(v.string()),
        sem: v.optional(v.string()),
        status: v.string(),
    },
    handler: async(ctx, args) => {
        const userId = await getAuthUserId(ctx);
        
        if (!userId) throw new ConvexError("Not authenticated");

        await ctx.db.patch(args.studentId, { 
            enrollmentStatus: "Enrolled"
        })

        await ctx.db.insert('enrollments', {
            studentId: args.studentId,
            sectionId: args.sectionId,
            schoolYearId: args.schoolYearId,
            dateEnrolled: args.dateEnrolled,
            dateWithdrawn: args.dateWithdrawn,
            status: args.status,
            enrolledBy: userId,
            semester: args.sem
        })
    },
})

export const shsAdmission = query({
    args:{
        studentId: v.id('students')
    },
    handler: async(ctx,args) =>{
        const enrollments = await ctx.db.query('enrollments').filter(q => q.eq(q.field('studentId'), args.studentId)).collect()
        
        const enrll = await asyncMap(enrollments, async(enrollment)=>{
            const section = await ctx.db.get(enrollment.sectionId)
            if(!section) return undefined
            const gradeLevel = await ctx.db.get(section.gradeLevelId)
            if(!gradeLevel) return undefined

            const gradeEleven = gradeLevel.level === "11"

            if(gradeEleven){
                return {
                    ...enrollment,
                    section: section,
                    gradeLevel: gradeLevel
                }
            } else {
                return undefined
            }
        })

        const filterdEnrollment = enrll.find(e => e !== undefined)

        return filterdEnrollment

    }
})


export const unenrollStudent = mutation({
    args:{
        studentId: v.id('students'),
        isShs: v.boolean(),
        sem: v.string(),
    },
    handler: async(ctx, args) => {  
       const teacherId = await getAuthUserId(ctx);
        if (!teacherId) throw new ConvexError("Not authenticated");
        
        const sy = await ctx.db.query('schoolYears').order('desc').first()
        if(!sy) throw new ConvexError("No school year found")
        const studentEnrollments = await ctx.db.query('enrollments').filter(q => q.eq(q.field('studentId'), args.studentId)).collect()

        const enrollmentSection = await asyncMap(studentEnrollments, async(enrollment) => {
            const section = await ctx.db.get(enrollment.sectionId) 
            return {
                ...enrollment,
                section: section
            }
        }) 

        const filteredEnrollment = enrollmentSection.find(e => e.section?.advisorId === teacherId)

        if(!filteredEnrollment) throw new ConvexError("Student not found")

 
        if(args.isShs){
            if(args.sem === "1st") {
                await ctx.db.patch(filteredEnrollment.sectionId, {
                    firstSemStudents: filteredEnrollment.section?.firstSemStudents.filter((studentId: string) => studentId !== args.studentId)
                })
              
            } else if (args.sem === "2nd") {

                await ctx.db.patch(filteredEnrollment.sectionId, {
                    secondSemStudents: filteredEnrollment.section?.secondSemStudents.filter((studentId: string) => studentId !== args.studentId)
                })
            }

            await ctx.db.patch(filteredEnrollment._id, { 
                status: "Withdrawn",
                dateWithdrawn: new Date().toISOString()
            })

            await ctx.db.patch(args.studentId, {
                enrollmentStatus: "Can Enroll",
                gradeLevel: undefined
            })
        } else {
            
            await ctx.db.patch(args.studentId, {
                enrollmentStatus: "Can Enrolled",
                gradeLevel: undefined
            }) 

            await ctx.db.patch(filteredEnrollment.sectionId, {  
                students: filteredEnrollment.section?.students.filter((studentId: string) => studentId !== args.studentId)
            })
        }
        return {success: true}
    }
})