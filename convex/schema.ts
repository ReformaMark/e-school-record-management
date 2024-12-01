import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    lastName: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.union(v.literal("teacher"), v.literal("admin")),
  }),

  teachers: defineTable({
    id: v.string(),
    firstName: v.string(),
    middleName: v.optional(v.string()),
    lastName: v.string(),
    email: v.string(),
    emailVerified: v.boolean(),
    image: v.string(),
    role: v.string(),
    specialization: v.string(),
    yearsOfExperience: v.number()
  }),

  //class or section
  sections: defineTable({
    name: v.string(),
    gradeLevel: v.number(),
    studentIds: v.array(v.id('students')),
    advisorId: v.id('teachers'),
    classIds: v.array(v.id('classes')),
    schoolYearId: v.id('schoolYears'),
    room: v.id('rooms'),

  }),
  
  classes: defineTable ({
    className: v.string(), // Name of the subject or class (e.g., "English 9"
    gradeLevel: v.number(),
    subjectCode: v.string(), // Code for the subject (e.g., "ENG9")
    teacherId: v.id('teachers') ,
    sectionId: v.id('sections'),
    scheduleId: v.id('schedules')
  }),

  schedules: defineTable ({
    classId: v.id('classes'), // Links to the class
    sectionId: v.id('sections'), // Links to the section
   // school period must have days of week e.g., "Monday", "Tuesday" and time range Start time (e.g., "08:00") End time (e.g., "09:00")
    schoolPeriodId: v.id('schoolPeriods'), 
    room: v.string() // Room number or code

  }),

  schoolYears: defineTable({
      startDate: v.string(),
      endDate: v.string(),
      batchName: v.string(),
      isActive: v.boolean(),
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
    roomName: v.string(),
    estimatedCapacity: v.string(),
    roomType: v.string(),
    roomFeatures: v.string()
  }),

  subjects: defineTable({
    subject: v.string(),
    applicableTo: v.array(v.id('gradeLevels'))
  }),

 



});


