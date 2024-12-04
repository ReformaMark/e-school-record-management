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
      v.literal("staff")  // for registrars
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
    yearsOfExperience: v.optional(v.number()), // for all roles
    startDate: v.optional(v.string()), // primarily for school-head
    endDate: v.optional(v.string()), // primarily for school-head
    imageStorageId: v.optional(v.string()),
  }).index("by_email", ["email"])
    .index("by_role", ["role"])
    .index("by_department", ["department"])
    .index("by_name", ["firstName", "lastName"]),

  students: defineTable({
    lrn: v.string(),
    firstName: v.string(),
    middleName: v.optional(v.string()),
    lastName: v.string(),
    extensionName: v.optional(v.string()),
    birthDate: v.string(),
    birthPlace: v.string(),
    age: v.number(),
    sex: v.union(v.literal("Male"), v.literal("Female"), v.literal("Other")),

    // Address
    province: v.string(),
    municipality: v.string(),
    barangay: v.string(),
    street: v.optional(v.string()),
    houseNum: v.optional(v.string()),

    // Parent/Guardian Info
    fatherName: v.string(),
    fatherContact: v.string(),
    motherName: v.string(),
    motherContact: v.string(),
    guardianName: v.optional(v.string()),
    guardianContact: v.optional(v.string()),

    // Academic Info
    gradeLevel: v.number(),
    strand: v.optional(v.string()),
    track: v.optional(v.string()),
    section: v.optional(v.id('sections')),

    // Additional Info
    indigenous: v.boolean(),
    indigenousCommunity: v.optional(v.string()),
    fourPsBeneficiary: v.boolean(),
    fourPsId: v.optional(v.string()),
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


