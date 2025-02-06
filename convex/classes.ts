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
            const schedule = await ctx.db.get(c.scheduleId)
            if(!schedule) return
            const schoolPeriod = await ctx.db.get(schedule?.schoolPeriodId)
            if(!schedule){
                throw new ConvexError('No Schedule')
            }
            const room = await ctx.db.get(schedule?.roomId)
            const schoolYear = await ctx.db.get(c.schoolYearId)
            return {
                ...c,
                subject: subject,
                teacher: teacher,
                section: section,
                schedule: {...schedule, schoolPeriod:schoolPeriod,  room: room},
                schoolYear: schoolYear,
            }
        })

        return classWithDetails
    }
})