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
    subjects: v.optional(v.array(v.string())),
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

    // For Returning Student
    lastGradeLevelCompleted: v.optional(v.string()),
    lastSYCompleted: v.optional(v.string()),
    lastSchoolAttended: v.optional(v.string()),
    schoolId: v.optional(v.string()),

    // For SeniorHigh
    semester: v.optional(v.string()),
    strand: v.optional(v.string()),
    track: v.optional(v.string())

  }),

  sections: defineTable({
    name: v.string(),
    gradeLevel: v.number(),
    advisorId: v.id('users'), // references teacher in users table
    roomId: v.id('rooms'),
    schoolYearId: v.id('schoolYears'),
    isActive: v.boolean(),
  }),

  classes: defineTable({
    subjectId: v.id('subjects'),
    teacherId: v.id('users'), // references teacher in users table
    sectionId: v.id('sections'),
    scheduleId: v.id('schedules'),
    schoolYearId: v.id('schoolYears'),
  }),

  subjects: defineTable({
    name: v.string(),
    code: v.string(),
    applicableGradeLevels: v.array(v.number()),
  }),

  schedules: defineTable({
    day: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    roomId: v.id('rooms'),
  }),

  schoolPeriods: defineTable({
    day: v.string(), // e.g., "Monday", "Tuesday"
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
    isActive: v.boolean(),
  }),
});


