import { forRemedial } from "@/app/(teacher)/section/_components/studentData";
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
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
    schoolHeadType: v.optional(v.union(
      v.literal("junior-high"),
      v.literal("senior-high")
    )),

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
    motherMiddleName: v.optional(v.string()),
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
    gradeLevelId: v.id("gradeLevels"),
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
    schoolYearId: v.id('schoolYears'),
    semester: v.optional(v.string()), // 1st or 2nd
    track: v.optional(v.string()), // core subject (All Track),Academic Track (except Immersion)  ,Work Immersion/ Culminating Activity (for Academic Track) , TVL/ Sports/ Arts and Design Track
  }).index('by_teacherId', ['teacherId']),

  subjects: defineTable({
    name: v.string(),
    gradeLevelId: v.id("gradeLevels"),
    subjectCode: v.string(),
    subjectCategory: v.optional(v.string()), // core, applied and, specialized

    gradeWeights: v.optional(v.object({
      written: v.number(),
      performance: v.number(),
      exam: v.optional(v.number())
    }))
    // isMapeh: v.boolean(), // New field
    // mapehWeights: v.optional(v.object({
    //   music: v.object({
    //     written: v.number(),
    //     performance: v.number(),
    //     exam: v.optional(v.number())
    //   }),
    //   arts: v.object({
    //     written: v.number(),
    //     performance: v.number(),
    //     exam: v.optional(v.number())
    //   }),
    //   pe: v.object({
    //     written: v.number(),
    //     performance: v.number(),
    //     exam: v.optional(v.number())
    //   }),
    //   health: v.object({
    //     written: v.number(),
    //     performance: v.number(),
    //     exam: v.optional(v.number())
    //   })
    // })),
    // applicableGradeLevels: v.array(v.number()),
  }),

  appliedGradeWeigths: defineTable({
    subjectId: v.id('subjects'),
    teacherId: v.id('users'),
    learningMode: v.string(),
    written: v.number(),
    performance: v.number(),
    exam: v.optional(v.number())
  }).index('by_teacherId', ['teacherId']).index('by_subjectId', ['subjectId']),

  quarterlyGrades: defineTable({
    studentId: v.id('students'),
    gradeLevel: v.number(),
    classId: v.id('classes'),
    teacherId: v.id('users'),
    quarter: v.string(),
    quarterlyGrade: v.number(), // score
    needsIntervention: v.boolean(),
    subComponent: v.optional(v.string()), // components of mapeh
    // if the student participate in an intervention
    interventionGrade: v.optional(v.number()),
    interventionUsed: v.optional(v.array(v.string())), // ex. Big book, General remarks
    interventionRemarks: v.optional(v.string()) // ex. “Math 9 2nd competency big book with sample activities. Will check the progress of the student through checking the answers of the big book activities.”
  }),

  interventions: defineTable({
    name: v.string(),
    description: v.optional(v.string())
  }),

  // possible schema for handling student interventions
  //   studentInterventions: defineTable({
  //     studentId: v.id('students'),
  //     classId: v.id('classes'),
  //     quarter: v.string(),
  //     interventionsUsed: v.array(v.string()), // List of interventions used
  //     generalRemark: v.optional(v.string()), // General remark for all interventions
  //     detailedRemarks: v.optional(v.array(v.object({
  //       intervention: v.string(),
  //       remark: v.string()
  //     }))) // Detailed remarks for each intervention
  //   }).index('by_studentId', ['studentId'])
  //     .index('by_classId', ['classId'])
  //     .index('by_quarter', ['quarter'])
  // });

  // gradeSummary: defineTable({
  //   section: v.id('sections'),
  //   teacherId: v.id('users'),
  //   subject: v.id('subjetcs'),
  //   track: v.string(),
  //   remarks: v.string()
  // }),
  schedules: defineTable({
    day: v.array(v.string()), // Mon,Tue,Wed,THu,Fri,Sat, 
    schoolPeriodId: v.id('schoolPeriods'), // range ng time
    roomId: v.id('rooms'),
    teacherId: v.id('users'),
    classId: v.id("classes")
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
    features: v.optional(v.array(v.string())),
    teacherId: v.optional(v.id("users")), // Reference to assigned teacher
    isActive: v.optional(v.boolean()),
    description: v.optional(v.string())
  }).index("by_teacherId", ["teacherId"]),

  schoolYears: defineTable({
    startDate: v.string(),
    endDate: v.string(),
    batchName: v.string(),
    // example: 2025-2026... need ilagay sa form kapag magaadd ng school year or pwedeng automatic
    sy: v.optional(v.string())
  }),

  studentClasses: defineTable({
    studentId: v.id('students'),
    classId: v.id('classes')
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
    schoolYear: v.optional(v.id('schoolYears')),
    subComponent: v.optional(v.string())
  }).index("by_classId", ["classId"])
    .index("by_teacherId", ["teacherId"])
    .index("by_subject", ["subjectId"]),


  classRecords: defineTable({
    studentId: v.id('students'),
    classId: v.id('classes'),
    teacherId: v.id('users'),
    written: v.array(v.object({
      assessmentNo: v.number(),
      assessmentId: v.id('assessments'),
      score: v.optional(v.number()),
      highestScore: v.number(),
    })),
    performance: v.array(v.object({
      assessmentNo: v.number(),
      assessmentId: v.id('assessments'),
      score: v.optional(v.number()),
      highestScore: v.number(),
    })),
    quarterlyExam: v.array(v.object({
      assessmentNo: v.number(),
      assessmentId: v.id('assessments'),
      score: v.optional(v.number()),
      highestScore: v.number(),
    })),
    subComponent: v.optional(v.string()), // Music, arts, PE, Health
    quarter: v.string(),
    schoolYear: v.id('schoolYears'),
    isSubmitted: v.optional(v.boolean()) // determine if the quarterly grades has been recorded on the quarterLyGrades table
  }).index("by_studentId", ["studentId"])
    .index("by_classId", ["classId"]),

  finalGrades: defineTable({
    advisorId: v.id('users'),
    studentId: v.id('students'),
    sectionId: v.id('sections'),
    subjects: v.array(v.object({
      classId: v.id('classes'),
      subjectName: v.string(),
      finalGrade: v.number(),
      forRemedial: v.boolean(),
      remedialGrade: v.optional(v.number()),
      status: v.optional(v.string())
    })),
    generalAverage: v.number(),
  }),
  

  promotion:defineTable({
    from: v.number(),
    to: v.number(),
    studentId: v.id('students'),
    type: v.union(v.literal("regular"),v.literal("conditional"),)
  }),
    
  values: defineTable({
    studentId: v.id('students'),
    classId: v.id('classes'),
    makaDyos: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      }),
      second: v.object({
        first:v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    makaTao: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      }),
      second: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    makakalikasan: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),
    makaBansa: v.object({
      first: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      }),
      second: v.object({
        first: v.optional(v.string()),
        second: v.optional(v.string()),
        third: v.optional(v.string()),
        fourth: v.optional(v.string())
      })
    }),


  }),

  attendance: defineTable({
    studentId: v.id('students'),
    classId: v.id('classes'),
    june: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    july: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    august: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    september: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    october: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    november: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    december: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    january: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    february: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    march: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    april: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
    may: v.object({
      totalSchooldays: v.optional(v.number()),
      daysAbsent: v.optional(v.number()),
      daysPresent: v.optional(v.number()),
    }),
  }),

 
})


