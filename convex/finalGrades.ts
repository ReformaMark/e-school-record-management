import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";

export const create = mutation({
    args:{
        advisorId: v.id('users'),
        studentId: v.id('students'),
        sectionId: v.id('sections'),
        schoolYearId: v.optional(v.id('schoolYears')),
        subjects: v.array(v.object({
            subjectName: v.string(),
            finalGrade: v.number(),
            forRemedial: v.boolean(),
            classId: v.id('classes'),
        })),
        generalAverage: v.number(),
        semester: v.optional(v.string())
    },
    handler: async(ctx, args) =>{
     
        const failedSubjects = args.subjects.filter(subject => subject.finalGrade <= 74)
        const isShs = args.semester ? true : false
        if(!isShs && failedSubjects.length >= 3) {
            await ctx.db.insert('finalGrades',{
                ...args 
            })

            return
        }

        //To recorrd the grades of the student
        await ctx.db.insert('finalGrades',{
            ...args 
        })
        //To promote the student
        const student = await ctx.db.get(args.studentId)
        const nextGradeLevel = (Number(student?.gradeLevel) ?? 0) + 1
        if(args.semester) {
            if(args.semester === "1st") {
                await ctx.db.patch(args.studentId,{
                    enrollmentStatus: 'Can Enroll',
                    semesterToEnroll: "2nd",
                    semester: undefined
                })
                return
            } else {
              
                const isGraduated = nextGradeLevel === 13
                if(isGraduated) return
                await ctx.db.patch(args.studentId,{
                    enrollmentStatus: 'Can Enroll',
                    gradeLevelToEnroll: nextGradeLevel.toString(),
                    gradeLevel: undefined
                })
                return
            }
        } else {
            await ctx.db.patch(args.studentId,{
                enrollmentStatus: 'Can Enroll',
                gradeLevelToEnroll: nextGradeLevel.toString(),
                gradeLevel: undefined
            })
        }
    
   
    }
})

export const isStudentPromoted = query({
    args:{
        sectionId: v.id('sections'),
        schoolYearId: v.optional(v.id('schoolYears')),
        studentId: v.id('students'),
        semester: v.optional(v.string())
    },
    handler: async(ctx, args) =>{
        const teacherId = await getAuthUserId(ctx)
        if(!teacherId) throw new ConvexError('No teacher Id')
        if(args.semester) {
            const studentFinalGradeExist = await ctx.db.query('finalGrades')
            .filter(q => q.eq(q.field('studentId'), args.studentId))
            .filter(q => q.eq(q.field('advisorId'), teacherId))
            .filter(q => q.eq(q.field('sectionId'), args.sectionId))
            .filter(q => q.eq(q.field('schoolYearId'), args.schoolYearId))
            .filter(q => q.eq(q.field('semester'), args.semester))
            .unique()
    
            if(studentFinalGradeExist) {
                return true
            } else {
                return false
            }
        } else {
            const studentFinalGradeExist = await ctx.db.query('finalGrades')
            .filter(q => q.eq(q.field('studentId'), args.studentId))
            .filter(q => q.eq(q.field('advisorId'), teacherId))
            .filter(q => q.eq(q.field('sectionId'), args.sectionId))
            .filter(q => q.eq(q.field('schoolYearId'), args.schoolYearId))
            .unique()
    
            if(studentFinalGradeExist) {
                return true
            } else {
                return false
            }
        }
    
    }
})

export const forRemedial = query({
    args:{
        classId: v.optional(v.id('classes')),
        sectionId:  v.optional(v.id('sections')),
    },
    handler: async(ctx, args)=>{
        if(!args.classId) return []
        if(!args.sectionId) return []
        
        const studentFinalGrades = await ctx.db.query('finalGrades')
        .filter(q => q.eq(q.field('sectionId'), args.sectionId))
        .collect()

        const forRemedial = await asyncMap (studentFinalGrades ,async(sfg)=>{
            const subjectForRemedial = sfg.subjects.find(s=> s.forRemedial === true && s.classId === args.classId)
            const student = await ctx.db.get(sfg.studentId)
            if(student === null) return null
            return {
                ...sfg,
                student: student,
                subjectForRemedial: subjectForRemedial
            }
        })

        const withRemedialSub = forRemedial.filter(fr => fr !== null).filter(fr => fr.subjectForRemedial !== undefined)

        return withRemedialSub
    }
})

export const updateStatus = mutation({
    args: {
        finalGradeId: v.id('finalGrades'),
        classId: v.id('classes'),
        status: v.string(), // New status to set
        remedialGrade: v.optional(v.number())
    },
    handler: async (ctx, args) => {
        const finalGrade = await ctx.db.get(args.finalGradeId);

        if (!finalGrade) {
            throw new Error('FinalGrade record not found');
        }

        if(args.remedialGrade) {
            const updatedSubjects = finalGrade.subjects.map((subject) => {
                if (subject.classId === args.classId) {
                    return {
                        ...subject,
                        remedialGrade: args.remedialGrade, // Update only the status field
                    };
                }
                return subject; // Keep other subjects unchanged
            });
            await ctx.db.patch(args.finalGradeId, {
                subjects: updatedSubjects,
            });
        } else {
            const updatedSubjects = finalGrade.subjects.map((subject) => {
                if (subject.classId === args.classId) {
                    return {
                        ...subject,
                        status: args.status, // Update only the status field
                    };
                }
                return subject; // Keep other subjects unchanged
            });
            await ctx.db.patch(args.finalGradeId, {
                subjects: updatedSubjects,
            });
        }

        // Update the specific subject within the subjects array
       

        // Save the updated subjects array back to the database
      

        return { success: true, message: 'Subject updated successfully' };
    },
});

export const remedialGrades = query({
    args:{
        studentId: v.id('students'),
        sectionId: v.optional(v.id('sections'))
    },
    handler: async(ctx, args) =>{
        if(!args.sectionId) return null
        const studentFinalGrades = await ctx.db.query('finalGrades')
        .filter(q => q.eq(q.field('sectionId'), args.sectionId))
        .filter(q => q.eq(q.field('studentId'), args.studentId))
        .unique()

        return studentFinalGrades
    }
})
