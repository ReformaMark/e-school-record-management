
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { StudentsWithEnrollMentTypes, StudentTypes } from "@/lib/types";

export const getStudent = query({
    handler: async (ctx) => {
        const students = await ctx.db.query('students').order('desc').collect()
        return students
    }
})

export const createStudent = mutation({
    args: {
         withLrn: v.optional(v.string()),
            returning: v.optional(v.string()),
            als: v.optional(v.string()),
           
            //Learner Information
            birthCertificateNo: v.optional(v.string()),
            lrn: v.optional(v.string()),
            firstName: v.string(),
            middleName: v.optional(v.string()),
            lastName: v.string(),
            extensionName: v.optional(v.string()),
            birthDate: v.string(),
            birthPlace: v.string(),
            age: v.number(),
            sex: v.string(),
            motherTounge: v.optional(v.string()),
            indigenous: v.optional(v.string()),
            indigenousCommunity: v.optional(v.string()),
            fourPS: v.optional(v.string()),
            fourPSIdNumber: v.optional(v.string()),
        
            // Address
            currentAddress: v.object({
              province: v.string(),
              municipality: v.string(),
              barangay: v.string(),
              street: v.optional(v.string()),
              houseNum: v.optional(v.string()),
              completeAddress: v.string()
            }),
            sameAsCurrentAddress: v.string(),
            permanentAddress: v.object({
              province: v.optional(v.string()),
              municipality: v.optional(v.string()),
              barangay: v.optional(v.string()),
              street: v.optional(v.string()),
              houseNum: v.optional(v.string()),
              completeAddress: v.optional(v.string())
            }),
           
            // Parent/Guardian Info
            fatherFirstName: v.optional(v.string()),
            fatherMiddleName: v.optional(v.string()),
            fatherLastName: v.optional(v.string()),
            fatherContact: v.optional(v.string()),
            motherFirstName: v.optional(v.string()),
            motherMiddleName:v.optional(v.string()),
            motherLastName: v.optional(v.string()),
            motherContact: v.optional(v.string()),
            guardianFirstName: v.optional(v.string()),
            guardianMiddleName: v.optional(v.string()),
            guardianLastName: v.optional(v.string()),
            guardianContact: v.optional(v.string()),
        
            // Academic Info
            gradeLevel: v.optional(v.string()),
            section: v.optional(v.id('sections')),
            schoolYear: v.string(),
            gradeLevelToEnroll: v.optional(v.string()),
        
            // For Returning Student
            lastGradeLevelCompleted: v.optional(v.string()),
            lastSYCompleted: v.optional(v.string()),
            lastSchoolAttended: v.optional(v.string()),
            schoolId: v.optional(v.string()),
        
            // For SeniorHigh
            semester: v.optional(v.string()),
            strand: v.optional(v.string()),
            track: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const student = await ctx.db.insert('students', args)
        return student
    }
})

export const updateStudentGradeLevel = mutation({
  args:{
    studentId: v.id('students')
  },
  handler: async(ctx, args) =>{
  
    const student = await ctx.db.get(args.studentId)
  
    await ctx.db.patch(args.studentId, {
      gradeLevel: student?.gradeLevelToEnroll,
      enrollmentStatus: "Enrolled"
    })
  }
})


export const getStudentByTeacher = query({
  handler: async(ctx)=>{
    const teacherId = await getAuthUserId(ctx)

    if(!teacherId){
      throw new ConvexError("No teacher Id.")
    }

    const section = await ctx.db.query('sections')
      .withIndex('by_advisorId')
      .first()
   
    if(!section || section === null) {
      throw new ConvexError('No section found.')
    }

    const students = await asyncMap(section.students, async (studentId)=>{
      const student = await ctx.db.get(studentId)
      return student
    })

    return students as StudentTypes[]
  }
}) 

export const studentsInMasterList = query({
  args:{
    classId: v.optional(v.id('classes'))
  },
  handler: async(ctx, args) => {
    const teacherId = await getAuthUserId(ctx)
    if(!teacherId) {
      throw new ConvexError("No teacher Id.")
    }
    if(!args.classId){
    throw new ConvexError("Np section Id")
    }
    const cls = await ctx.db.get(args.classId)

    if(!cls) {
      throw new ConvexError("No class Found.")
    }
    const section = await ctx.db.get(cls.sectionId)
    if(!section) {
      throw new ConvexError("No section Found.")
    }
    const students = await asyncMap(section.students, async(studentId) =>{
      const student = await ctx.db.get(studentId)
      const enrollment = await ctx.db.query('enrollments')
        .filter((q) => q.eq(q.field("studentId"), studentId))
        .filter((q) => q.eq(q.field("sectionId"), section._id))
        .order('desc')
        .first()
        
      return {...student, enrollment: enrollment}
    })
    return students as StudentsWithEnrollMentTypes[]
  }
})