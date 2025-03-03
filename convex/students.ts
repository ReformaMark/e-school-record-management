
import { StudentsWithEnrollMentTypes, StudentWithSem } from "@/lib/types";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
  },
  handler: async (ctx, args) => {
    const student = await ctx.db.insert('students',
      {
        ...args,
        semesterToEnroll: args.semester

      })
    return student
  }
})

export const updateStudentGradeLevel = mutation({
  args: {
    studentId: v.id('students')
  },
  handler: async (ctx, args) => {

    const student = await ctx.db.get(args.studentId)

    await ctx.db.patch(args.studentId, {
      gradeLevel: student?.gradeLevelToEnroll,
      enrollmentStatus: "Enrolled"
    })
  }
})


export const getStudentByTeacher = query({
  args: {
    sy: v.optional(v.id('schoolYears')),
    sem: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const teacherId = await getAuthUserId(ctx)

    if (!teacherId) {
      throw new ConvexError("No teacher Id.")
    }

    if (!args.sy) return []

    const section = await ctx.db.query('sections')
      .filter(q => q.eq(q.field('advisorId'), teacherId))
      .filter(q => q.eq(q.field('schoolYearId'), args.sy))
      .first()

    if (!section || section === null) {
      return undefined
    }

    const gradelevel = await ctx.db.get(section.gradeLevelId)
    const level = Number(gradelevel?.level ?? 0)
    const isSHS = level > 10


    if (isSHS) {
      if (args.sem === "1st") {
        const students = await asyncMap(section.firstSemStudents, async (studentId) => {
          const student = await ctx.db.get(studentId)
          return {
            ...student,
            isSHS: isSHS,
            sem: args.sem
          }
        })

        return students as StudentWithSem[]
      }

      if (args.sem === "2nd") {
        const students = await asyncMap(section.secondSemStudents, async (studentId) => {
          const student = await ctx.db.get(studentId)
          return {
            ...student,
            isSHS: isSHS,
            sem: args.sem
          }
        })

        return students as StudentWithSem[]
      }

      const students = await asyncMap(section.students, async (studentId) => {
        const student = await ctx.db.get(studentId)
        return {
          ...student,
          isSHS: isSHS,
          sem: args.sem
        }
      })

      return students as StudentWithSem[]

    } else {
      const students = await asyncMap(section.students, async (studentId) => {
        const student = await ctx.db.get(studentId)
        return {
          ...student,
          isSHS: isSHS,
          sem: args.sem
        }
      })

      return students as StudentWithSem[]
    }

  }
})

export const studentsInMasterList = query({
  args: {
    classId: v.optional(v.id('classes'))
  },
  handler: async (ctx, args) => {
    const teacherId = await getAuthUserId(ctx)
    if (!teacherId) {
      throw new ConvexError("No teacher Id.")
    }
    if (!args.classId) {
      throw new ConvexError("Np section Id")
    }
    const cls = await ctx.db.get(args.classId)
    const semester = cls?.semester

    if (!cls) {
      throw new ConvexError("No class Found.")
    }
    const section = await ctx.db.get(cls.sectionId)
    if (!section) {
      throw new ConvexError("No section Found.")
    }

    if (!semester) {
      const students = await asyncMap(section.students, async (studentId) => {
        const student = await ctx.db.get(studentId)
        const enrollment = await ctx.db.query('enrollments')
          .filter((q) => q.eq(q.field("studentId"), studentId))
          .filter((q) => q.eq(q.field("sectionId"), section._id))
          .order('desc')
          .first()

        return { ...student, enrollment: enrollment }
      })
      return students as StudentsWithEnrollMentTypes[]
    } else {
      if (semester === "1st") {
        const students = await asyncMap(section.firstSemStudents, async (studentId) => {
          const student = await ctx.db.get(studentId)
          const enrollment = await ctx.db.query('enrollments')
            .filter((q) => q.eq(q.field("studentId"), studentId))
            .filter((q) => q.eq(q.field("sectionId"), section._id))
            .filter((q) => q.eq(q.field("semester"), semester))
            .order('desc')
            .first()

          return { ...student, enrollment: enrollment }
        })
        return students as StudentsWithEnrollMentTypes[]
      }

      if (semester === "2nd") {
        const students = await asyncMap(section.secondSemStudents, async (studentId) => {
          const student = await ctx.db.get(studentId)
          const enrollment = await ctx.db.query('enrollments')
            .filter((q) => q.eq(q.field("studentId"), studentId))
            .filter((q) => q.eq(q.field("sectionId"), section._id))
            .filter((q) => q.eq(q.field("semester"), semester))
            .order('desc')
            .first()

          return { ...student, enrollment: enrollment }
        })
        return students as StudentsWithEnrollMentTypes[]
      }
    }

  }
})

export const getStudentWithDetails = query({
  args: {
    id: v.optional(v.id('students')),
    isSHS: v.optional(v.string()),
    sem: v.optional(v.string())

  }, handler: async (ctx, args) => {
    if (!args.id) throw new ConvexError('No student Id.')
    const teacherId = await getAuthUserId(ctx)
    if (!teacherId) throw new ConvexError('No teacher Id.')
    const teacher = await ctx.db.get(teacherId)
    const student = await ctx.db.get(args.id)
    if (!student) throw new ConvexError('No student found.')
    const schoolYear = await ctx.db.query('schoolYears').order('desc').collect()
    const latestSY = schoolYear[0]._id

    const teacherSections = await ctx.db.query('sections')
      .filter(q => q.eq(q.field('advisorId'), teacherId))
      .filter(q => q.eq(q.field('schoolYearId'), latestSY))
      .collect();

    const studentSection = teacherSections.find(c => {
      const students = args.isSHS === "true" ? args.sem === "1st" ? c.firstSemStudents : c.secondSemStudents : c.students
      const a = students.find(s => s === student._id)
      return a
    })

    if (!studentSection) throw new ConvexError('No section found for the student')

    const gradeLevel = await ctx.db.get(studentSection?.gradeLevelId)
    if (!gradeLevel) throw new ConvexError('No gradeLevel found.')

    const teacherClasses = await ctx.db.query('classes')
      .filter(q => q.eq(q.field('sectionId'), studentSection._id))
      .filter(q => q.eq(q.field('teacherId'), teacherId))
      .first()

    if (teacherClasses === null) throw new ConvexError('No class found.')

    const sy = await ctx.db.get(teacherClasses.schoolYearId)
    if (sy === null) throw new ConvexError('No school Year found.')

    const classes = await ctx.db.query('classes').filter(q => q.eq(q.field('sectionId'), studentSection._id)).collect()

    const classIds = classes.map((cls) => cls._id);

    const subjectsWithDetail = await asyncMap(classes, async (s) => {
      const subject = await ctx.db.get(s.subjectId)
      if (!subject) return null

      return {
        ...s,
        subject: subject
      }
    })

    const filterSubject = subjectsWithDetail.filter(s => s !== null)

    const quarterlyGrades = await ctx.db.query('quarterlyGrades')
      .filter(q => q.eq(q.field('studentId'), student._id))
      .collect()

    const filtererdQG = quarterlyGrades.filter(qg => classIds.find(c => c === qg.classId))

    const qgWithSubject = await asyncMap(filtererdQG, async (qg) => {
      const cLAss = await ctx.db.get(qg.classId)
      if (!cLAss) return null
      const subject = await ctx.db.get(cLAss.subjectId)
      if (!subject) return null

      return {
        ...qg,
        subject: subject
      }
    })

    const notNull = qgWithSubject.filter(item => item !== null)

    return {
      ...student,
      quarterlyGrades: notNull,
      sectionDoc: { ...studentSection, gradeLevel: gradeLevel },
      cLass: {
        ...teacherClasses,
        schoolYear: sy
      },
      advisor: teacher,
      subjects: filterSubject
    }
  }
})

export const getAllStudents = query({
  args: {
    enrollmentStatus: v.optional(v.string()),
    studentType: v.optional(v.string()),
    gradeLevel: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let students = await ctx.db
      .query("students")
      .collect();

    if (args.enrollmentStatus) {
      students = students.filter(student =>
        student.enrollmentStatus === args.enrollmentStatus
      );
    }

    // Filter by student type if specified
    if (args.studentType && args.studentType !== "all") {
      if (args.studentType === "normal") {
        students = students.filter(student => student.returning === "No" && student.als === "No");
      } else if (args.studentType === "returning") {
        students = students.filter(student => student.returning === "Yes");
      } else if (args.studentType === "als") {
        students = students.filter(student => student.als === "Yes");
      }
    }

    // Filter by grade level if specified
    if (args.gradeLevel && args.gradeLevel !== "all") {
      students = students.filter(student => {
        if (student.enrollmentStatus === "Enrolled") {
          return student.gradeLevel === `${args.gradeLevel}`;
        } else {
          return student.gradeLevelToEnroll === `${args.gradeLevel}`;
        }
      });
    }

    return students;
  },
});

export const getStudentDistribution = query({
  handler: async (ctx) => {
    const students = await ctx.db
      .query("students")
      .filter(q => q.eq(q.field("enrollmentStatus"), "Enrolled"))
      .collect();

    const distribution = {
      grade7: students.filter(s => s.gradeLevel === "7").length,
      grade8: students.filter(s => s.gradeLevel === "8").length,
      grade9: students.filter(s => s.gradeLevel === "9").length,
      grade10: students.filter(s => s.gradeLevel === "10").length,
      grade11: students.filter(s => s.gradeLevel === "11").length,
      grade12: students.filter(s => s.gradeLevel === "12").length,
    };

    return distribution;
  },
});

export const getStudentPerformanceOverview = query({
  handler: async (ctx) => {
    const students = await ctx.db.query("students")
      .filter(q => q.eq(q.field("enrollmentStatus"), "Enrolled"))
      .collect();

    const grades = await ctx.db.query("quarterlyGrades")
      .withIndex("by_studentId")
      .collect();

    type GradeLevel = "7" | "8" | "9" | "10" | "11" | "12";
    type PerformanceData = {
      [key in GradeLevel]: {
        passing: number;
        failing: number;
      };
    };

    // Initialize performance object with type safety
    const performance: PerformanceData = {
      "7": { passing: 0, failing: 0 },
      "8": { passing: 0, failing: 0 },
      "9": { passing: 0, failing: 0 },
      "10": { passing: 0, failing: 0 },
      "11": { passing: 0, failing: 0 },
      "12": { passing: 0, failing: 0 }
    };

    // Process grades with proper type checking
    grades.forEach(grade => {
      const student = students.find(s => s._id === grade.studentId);
      if (!student || !student.gradeLevel) return;

      const gradeLevel = student.gradeLevel as GradeLevel;
      if (gradeLevel in performance) {
        if (grade.quarterlyGrade >= 75) {
          performance[gradeLevel].passing++;
        } else {
          performance[gradeLevel].failing++;
        }
      }
    });

    return Object.entries(performance).map(([grade, stats]) => ({
      name: `Grade ${grade}`,
      passing: stats.passing,
      failing: stats.failing
    }));
  }
});

export const getEnrollmentTrends = query({
  handler: async (ctx) => {
    const schoolYears = await ctx.db.query('schoolYears')
      .order('asc')
      .collect();

    const trends = await Promise.all(
      schoolYears.map(async (sy) => {
        const enrollments = await ctx.db.query('enrollments')
          .filter(q => q.eq(q.field('schoolYearId'), sy._id))
          .collect();

        return {
          year: sy.sy || sy.batchName,
          students: enrollments.length
        };
      })
    );

    return trends;
  }
});

export const getStudentsWithGrades = query({
  args: {
    classId: v.optional(v.id("classes")),
    subjectId: v.optional(v.id("subjects"))
  },
  handler: async (ctx, args) => {
    const teacherId = await getAuthUserId(ctx);
    if (!teacherId) throw new ConvexError("No teacher ID");

    if (args.classId) {
      // Get section for selected class
      const selectedClass = await ctx.db.get(args.classId);
      if (!selectedClass) return [];

      const section = await ctx.db.get(selectedClass.sectionId);
      if (!section) return [];

      // Get students based on semester
      const studentIds = selectedClass.semester === "1st" ?
        section.firstSemStudents :
        selectedClass.semester === "2nd" ?
          section.secondSemStudents :
          section.students;

      // Get the class ID for this subject if subjectId is provided
      let classId = args.classId;
      if (args.subjectId) {
        const classForSubject = await ctx.db
          .query("classes")
          .filter(q => q.and(
            q.eq(q.field("subjectId"), args.subjectId),
            q.eq(q.field("sectionId"), section._id)
          ))
          .first();
        if (classForSubject) {
          classId = classForSubject._id;
        }
      }

      const studentsWithGrades = await asyncMap(studentIds, async (studentId) => {
        const student = await ctx.db.get(studentId);
        if (!student) return null;

        // Get quarterly grades using the correct classId
        const quarterlyGrades = await ctx.db
          .query("quarterlyGrades")
          .filter(q => q.and(
            q.eq(q.field("studentId"), studentId),
            q.eq(q.field("classId"), classId)
          ))
          .collect();

        return {
          id: student._id,
          name: `${student.lastName}, ${student.firstName}`,
          grades: quarterlyGrades
        };
      });

      return studentsWithGrades.filter(s => s !== null);
    }

    return [];
  }
});

export const getTeacherStudentsCount = query({
  handler: async (ctx) => {
    const teacherId = await getAuthUserId(ctx);
    if (!teacherId) throw new ConvexError("No teacher ID");

    const teacherClasses = await ctx.db
      .query("classes")
      .filter(q => q.eq(q.field("teacherId"), teacherId))
      .collect();

    const counts = {
      totalStudents: 0,
      atRiskStudents: 0,
      pendingInterventions: 0
    };

    const uniqueStudents = new Set();
    const atRiskStudents = new Set();
    const needsIntervention = new Set();

    await Promise.all(teacherClasses.map(async (cls) => {
      const grades = await ctx.db
        .query("quarterlyGrades")
        .filter(q => q.eq(q.field("classId"), cls._id))
        .collect();

      // Group grades by student
      const studentGrades = new Map();
      grades.forEach(grade => {
        if (!studentGrades.has(grade.studentId)) {
          studentGrades.set(grade.studentId, []);
        }
        studentGrades.get(grade.studentId).push(grade);
      });

      // Process each student's grades
      studentGrades.forEach((grades, studentId) => {
        uniqueStudents.add(studentId);

        let totalGrade = 0;
        let gradeCount = 0;

        // @ts-expect-error slight type issue
        grades.forEach(grade => {
          // Check for pending interventions
          if (grade.needsIntervention === true &&
            !grade.interventionGrade &&
            (!grade.interventionUsed || grade.interventionUsed.length === 0) &&
            !grade.interventionRemarks) {
            needsIntervention.add(studentId);
          }

          // Calculate average using intervention grades when available
          const finalGrade = grade.interventionGrade || grade.quarterlyGrade;
          totalGrade += finalGrade;
          gradeCount++;
        });

        // Calculate average and check if at risk
        const average = totalGrade / gradeCount;
        if (average < 75) {
          atRiskStudents.add(studentId);
        }
      });
    }));

    return {
      totalStudents: uniqueStudents.size,
      atRiskStudents: atRiskStudents.size,
      pendingInterventions: needsIntervention.size
    };
  }
});