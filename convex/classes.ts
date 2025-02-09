import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { ConvexError } from "convex/values";
import { asyncMap } from "convex-helpers";


export const getTeacherClasses = query({
    handler: async(ctx) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) {
            throw new ConvexError('No Teacher Id.')
        }

        const classes = await ctx.db.query('classes').collect()

        // const classWithDetails = await asyncMap(classes, async (class)=>{

        // })

        const classWithDetails = await asyncMap(classes, async (c)=>{
            const subject = await ctx.db.get(c.subjectId)
            const teacher = await ctx.db.get(c.teacherId)
            const section = await ctx.db.get(c.sectionId)
            if(!section) return
            const gradeLevel = await ctx.db.get(section?.gradeLevelId)
          
            const schedules = await ctx.db.query('schedules')
                .filter(q=> q.eq(q.field('teacherId'), teacher?._id))
                .filter(q=> q.eq(q.field('classId'), c._id))
                .collect()
            const schedWithdetails = await asyncMap(schedules,async(sched)=>{
               const schoolPeriod = await ctx.db.get(sched.schoolPeriodId)
               const room =  await ctx.db.get(sched.roomId)
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