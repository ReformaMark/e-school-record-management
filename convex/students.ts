
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { StudentsWithEnrollMentTypes, StudentTypes } from "@/lib/types";
import { Id } from "./_generated/dataModel";

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
            enrollmentStatus: v.optional(v.string()),
        
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
      .filter(q => q.eq(q.field('advisorId'), teacherId))
      .first()
   
    if(!section || section === null) {
      return undefined
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
    const semester = cls?.semester

    if(!cls) {
      throw new ConvexError("No class Found.")
    }
    const section = await ctx.db.get(cls.sectionId)
    if(!section) {
      throw new ConvexError("No section Found.")
    }

    if(!semester){
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
    } else {
      if(semester === "1st") {
        const students = await asyncMap(section.firstSemStudents, async(studentId) =>{
          const student = await ctx.db.get(studentId)
          const enrollment = await ctx.db.query('enrollments')
            .filter((q) => q.eq(q.field("studentId"), studentId))
            .filter((q) => q.eq(q.field("sectionId"), section._id))
            .filter((q) => q.eq(q.field("semester"), semester))
            .order('desc')
            .first()
            
          return {...student, enrollment: enrollment}
        })
        return students as StudentsWithEnrollMentTypes[]
      }

      if(semester === "2nd") {
        const students = await asyncMap(section.secondSemStudents, async(studentId) =>{
          const student = await ctx.db.get(studentId)
          const enrollment = await ctx.db.query('enrollments')
            .filter((q) => q.eq(q.field("studentId"), studentId))
            .filter((q) => q.eq(q.field("sectionId"), section._id))
            .filter((q) => q.eq(q.field("semester"), semester))
            .order('desc')
            .first()
            
          return {...student, enrollment: enrollment}
        })
        return students as StudentsWithEnrollMentTypes[]
      }
    }
  
  }
})

export const getStudentWithDetails = query({
  args:{
    id: v.optional(v.id('students'))
   
  }, handler: async(ctx, args) => {
    if(!args.id) throw new ConvexError('No student Id.')
    const teacherId = await getAuthUserId(ctx)
    if(!teacherId) throw new ConvexError('No teacher Id.')
    const teacher = await ctx.db.get(teacherId)
    const student = await ctx.db.get(args.id)
    if(!student) throw new ConvexError('No student found.')
    const schoolYear = await ctx.db.query('schoolYears').order('desc').collect()
    const latestSY = schoolYear[0]._id

    const teacherSections = await ctx.db.query('sections')
      .withIndex('by_advisorId')
      .filter(q => q.eq(q.field('schoolYearId'), latestSY))
      .collect();

    const studentSection = teacherSections.find( c => c.students.find(s => s === student._id))
    if(!studentSection) throw new ConvexError('No section found for the student')

    const gradeLevel = await ctx.db.get(studentSection?.gradeLevelId)
    if(!gradeLevel) throw new ConvexError('No gradeLevel found.')

    const teacherClasses = await ctx.db.query('classes')
    .filter(q => q.eq(q.field('sectionId'), studentSection._id))
    .filter(q => q.eq(q.field('teacherId'), teacherId))
    .first()

    const classes = await ctx.db.query('classes').filter(q => q.eq(q.field('sectionId'), studentSection._id)).collect()

    const classIds = classes.map((cls) => cls._id);

    const subjectsWithDetail = await asyncMap(classes, async(s)=>{
      const subject = await ctx.db.get(s.subjectId)
      if(!subject) return null
  
      return {
        ...s,
        subject: subject
      }
    })

    const filterSubject = subjectsWithDetail.filter( s => s !== null)

    const quarterlyGrades = await ctx.db.query('quarterlyGrades')
    .filter(q=> q.eq(q.field('studentId'), student._id))
    .collect()

    const filtererdQG = quarterlyGrades.filter(qg => classIds.find(c=> c === qg.classId))

    console.log(filtererdQG)

    const qgWithSubject = await asyncMap(filtererdQG, async(qg)=>{
      const cLAss = await ctx.db.get(qg.classId)
      if(!cLAss) return null
      const subject = await ctx.db.get(cLAss.subjectId)
      if(!subject) return null

      return {
        ...qg,
        subject: subject
      }
    })

    const notNull = qgWithSubject.filter(item => item !== null)
    
    return {
      ...student,
      quarterlyGrades: notNull,
      sectionDoc: {...studentSection, gradeLevel: gradeLevel},
      cLass: teacherClasses,
      advisor: teacher,
      subjects: filterSubject
    }
  }
})