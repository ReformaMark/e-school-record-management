import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const addEnrollment = mutation({
    args:{
        studentId: v.id('students'),
        sectionId: v.id('sections'),
        schoolYearId: v.id('schoolYears'),
        dateEnrolled: v.string(),
        dateWithdrawn: v.optional(v.string()),
        status: v.string(),
    },
    handler: async(ctx, args) => {
        const userId = await getAuthUserId(ctx);
        
        if (!userId) throw new ConvexError("Not authenticated");

        await ctx.db.insert('enrollments', {
            studentId: args.studentId,
            sectionId: args.sectionId,
            schoolYearId: args.schoolYearId,
            dateEnrolled: args.dateEnrolled,
            dateWithdrawn: args.dateWithdrawn,
            status: args.status,
            enrolledBy: userId
        })
    },
})