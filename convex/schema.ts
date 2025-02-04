import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    // Basic Info
    firstName: v.string(),
    middleName: v.optional(v.string()),
    lastName: v.string(),
    email: v.string(),
    emailVerified: v.optional(v.boolean()),
    image: v.optional(v.string()),
    contactNumber: v.string(),
    birthDate: v.string(),

    // Role and Status
    role: v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("school-head"),
      v.literal("staff")
    ),
    isActive: v.optional(v.boolean()),

    // Address
    region: v.optional(v.string()),
    province: v.optional(v.string()),
    city: v.optional(v.string()),
    barangay: v.optional(v.string()),
    street: v.optional(v.string()),
    houseNumber: v.optional(v.string()),
    postalCode: v.optional(v.string()),

    // Additional fields for specific roles
    department: v.optional(v.string()), // for staff/registrar
    specialization: v.optional(v.string()), // for teachers
    yearsOfExperience: v.optional(v.number()),
    startDate: v.optional(v.string()), // primarily for school-head
    endDate: v.optional(v.string()), // primarily for school-head
    imageStorageId: v.optional(v.string()),
    gender: v.optional(v.string()),
    description: v.optional(v.string()),

    // New fields for teachers
    employeeId: v.optional(v.string()),
    position: v.optional(v.string()),
    advisoryClass: v.optional(v.string()),

    // reference for teachers
    subjectId: v.optional(v.array(v.id('subjects')))
  }).index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_department", ["department"])
    .index("by_name", ["firstName", "lastName"]),

  students: defineTable({
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

  }).index('by_section', ['section']),

  enrollments: defineTable({
    studentId: v.id('students'),
    sectionId: v.id('sections'),
    schoolYearId: v.id('schoolYears'),
    dateEnrolled: v.string(),
    dateWithdrawn: v.optional(v.string()),
    status: v.string(),
    enrolledBy: v.id('users'),
  }),

  sections: defineTable({
    name: v.string(),
    gradeLevel: v.number(),
    advisorId: v.id('users'), // references teacher in users table
    roomId: v.optional(v.id('rooms')),
    schoolYearId: v.id('schoolYears'),
    isActive: v.boolean(),
    students: v.array(v.id('students')),
  }).index('by_advisorId', ['advisorId']),

  classes: defineTable({
    subjectId: v.id('subjects'),
    teacherId: v.id('users'), // references teacher in users table
    sectionId: v.id('sections'),
    scheduleId: v.id('schedules'),
    schoolYearId: v.id('schoolYears'),
  }).index('by_teacherId', ['teacherId']),

  subjects: defineTable({
    name: v.string(),
    gradeLevel: v.number(),
    subjectCode: v.string(),
    subjectCategory: v.optional(v.string()), // core, applied and, specialized
    gradeWeights: v.optional(v.object({
      written: v.number(),
      performance: v.number(),
      exam: v.optional(v.number())
    }))
    // applicableGradeLevels: v.array(v.number()),
  }),

  appliedGradeWeigths: defineTable({
    subjectId: v.id('subjects'),
    teacherId: v.id('users'),
    learningMode: v.string(),
    written: v.number(),
    performance: v.number(),
    exam: v.optional(v.number())
  }).index('by_teacherId',['teacherId']).index('by_subjectId', ['subjectId']),

  schedules: defineTable({
    day: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    roomId: v.id('rooms'),
  }),

  schoolPeriods: defineTable({
    period: v.string(),
    timeRange: v.string(), // e.g time range Start time (e.g., "08:00") End time (e.g., "09:00")
  }),

  gradeLevels: defineTable({
    level: v.string()
  }),

  rooms: defineTable({
    name: v.string(),
    capacity: v.number(),
    type: v.string(),
    features: v.array(v.string()),
  }),

  schoolYears: defineTable({
    startDate: v.string(),
    endDate: v.string(),
    batchName: v.string(),
    // example: 2025-2026... need ilagay sa form kapag magaadd ng school year or pwedeng automatic
    sy: v.optional(v.string())
  }),

  studentClasses: defineTable({
    studentId: v.id('students'),
    classId:v.id('classes')
  }).index('by_sudentId', ['studentId']).index('by_classId', ['classId']),

  assessments: defineTable({
    type: v.string(), // ww, pp, qe
    gradeLevel: v.number(),
    quarter: v.string(), 
    semester: v.optional(v.string()), // for senior high
    assessmentNo: v.number(),
    subjectId: v.id('subjects'),
    highestScore: v.number(),
    teacherId: v.id("users"),
    classId: v.array(v.id('classes')),
    schoolYear: v.optional(v.string()),
    subComponent: v.optional(v.string())
  }).index("by_classId", ["classId"])
    .index("by_teacherId", ["teacherId"])
    .index("by_subject", ["subjectId"]),


  classRecords: defineTable({
    studentId: v.id('students'),
    classId: v.id('classes'),
    written: v.array(v.object({
      assessmentNo: v.number(),
      score: v.optional(v.number()),
      highestScore: v.number(),
    })),
    performance: v.array(v.object({
      assessmentNo: v.number(),
      score: v.optional(v.number()),
      highestScore: v.number(),
    })),
    quarterlyExam: v.array(v.object({
      assessmentNo: v.number(),
      score: v.optional(v.number()),
      highestScore: v.number(),
    })),
    subComponent: v.optional(v.string()), // Music, arts, PE, Health
    quarter: v.string(),
  }).index("by_studentId", ["studentId"])
    .index("by_classId", ["classId"]),

 
  })

  
