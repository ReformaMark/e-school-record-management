import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { setDate } from "date-fns"
import { transmutationTable3, transmutationTableJRHigh2, transmutationTableSHS2, transmutationTableSHSCore2 } from "../../data/transmutation-data"
import { ClassWithSubject, QuarterlyGrades, QuarterlyGradesWithSubject, StudentsWithQuarterlyGrades, StudentWithDetails } from "./types"
import { Doc, Id } from "../../convex/_generated/dataModel"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getSchoolYear(){
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const nextYear = currentYear + 1


  // return 2024-2025
  return `${currentYear}-${nextYear}`
}

export const updateDatePart = (month: Date, newDay: Date): Date => {
  return setDate(month, newDay.getDate());
};

export const getAge = (birthDate: string) =>{
    const currentDate = new Date()
      //get age
    const bDate = new Date(birthDate);
    let age = 0
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    age = currentYear - bDate.getFullYear()
    const isBirthMoth = currentMonth ===( bDate.getMonth() + 1)
    const isBirthDay = currentDay >=  bDate.getDate()

    if(isBirthMoth && isBirthDay){
        age += 1
    }
  return age
}

export const normalize = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
};


export function calculatePercentageScore(totalScore: number, highestPossibleScore: number): number {
  if (highestPossibleScore === 0 || totalScore === 0) {
    return 0; // Returning 0 instead of throwing an error
  }
  return (totalScore / highestPossibleScore) * 100;
}

export function calculateWeightedScore(percentageScore: number, gradeWeightPercentage: number): number {
  if (gradeWeightPercentage < 0 || gradeWeightPercentage > 100) {
    return 0; // Returning 0 instead of throwing an error
  }

  const gradeWeightDecimal = gradeWeightPercentage / 100; // Convert to decimal
  return percentageScore * gradeWeightDecimal;
}

interface assessment {
  score?: number | undefined;
  assessmentNo: number;
  highestScore: number;
}

export function calculateTotalScore(classRecords: assessment[]): number {
  return classRecords?.reduce((total, record) => {
      const score = record?.score; // Accessing the score safely
      return total + (score || 0); // Add score if it exists, otherwise add 0
  }, 0) ?? 0;
}

export function calculateInitialGrade(wwWS: number, ptWS: number, qeWS: number): number {
  const initialGrade = wwWS  + ptWS + qeWS;
  return initialGrade;
}

export function convertToTransmutedGrade(
  initialGrade: number, 
  gradeLevel: number, 
  learningMode: string, 
  subjectCategory?: string
): number {
  let transmutationTable;

  if (learningMode === "Face to face") {
    transmutationTable = transmutationTable3;
  } else if (gradeLevel <= 10) {
    transmutationTable = transmutationTableJRHigh2;
  } else {
    if (subjectCategory === 'core') {
      transmutationTable = transmutationTableSHSCore2;
    } else {
      transmutationTable = transmutationTableSHS2;
    }
  }
  console.log(initialGrade)
  const foundEntry = transmutationTable.find(entry => initialGrade >= entry.min && initialGrade <= entry.max);

  return foundEntry ? foundEntry.transmutedGrade : initialGrade; // Return original grade if no match found
}

export function formatQuarter(quarter: string): string {
  const suffixes = ["st", "nd", "rd", "th"];

  // Convert quarter string to a number
  const quarterNumber = parseInt(quarter, 10);

  // Validate the quarter range (1 to 4)
  if (isNaN(quarterNumber) || quarterNumber < 1 || quarterNumber > 4) {
    throw new Error("Invalid quarter. Must be '1', '2', '3', or '4'.");
  }

  // Determine suffix
  const suffix = quarterNumber >= 1 && quarterNumber <= 3 ? suffixes[quarterNumber - 1] : "th";

  return `${quarterNumber}${suffix}`;
}

export const getQuarterlyGrades = (grades: QuarterlyGrades[] | undefined, quarter?: string): number | string => {
  if (!grades) {
    return "";
  }

  if (quarter) {
    // Find the grade for the given quarter
    const grade = grades.find(g => g.quarter === quarter);

    // Return interventionGrade if available, otherwise return quarterlyGrade
    return grade ? grade.interventionGrade ?? grade.quarterlyGrade ?? "" : "";
  }

  return ""; // Default return if no quarter is provided
};

export const getAverageForShs = (num1: number | string, num2: number | string): number | string => {
  if (typeof num1 === "string" || typeof num2 === "string") {
    return ""; // Return an empty string if either input is a string
  }
  return Math.round((num1 + num2) / 2);
}

export const getAverageForJrh = (
  num1: number | string | undefined, 
  num2: number | string | undefined, 
  num3: number | string | undefined, 
  num4: number | string | undefined
): number | string => {
  if (typeof num1 === "string" || typeof num2 === "string" || typeof num3 === "string" || typeof num4 === "string") {
    return ""; // Return an empty string if either input is a string
  }
  if (typeof num1 === "undefined" || typeof num2 === "undefined" || typeof num3 === "undefined" || typeof num4 === "undefined") {
    return ""; // Return an empty string if either input is a string
  }
  return Math.round((num1 + num2 + num3 + num4) / 4);
};

export const remarks = (average: number | string) =>{
  return typeof average === "string" ? "" : average <= 74 ? "Failed" : "Passed"
}

export const filterStudentsBySubComponent = (
  students: StudentsWithQuarterlyGrades[], 
  sex: "male" | "female", 
  subComponent: string
) => {
  return students
    ?.filter(student => 
      student?.sex?.toLowerCase() === sex && 
      student?.quarterlyGrades.some(qg => qg.subComponent?.toLowerCase() === subComponent.toLowerCase())
    )
    .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
};

export const getQuarterlyGradeScore = (
  quarterlyGrades: QuarterlyGrades[],
  quarter: string,
  subComponent: string
): number | string => {
  const grade = quarterlyGrades.find(
    (qg) => qg.quarter === quarter && qg.subComponent === subComponent
  );

  return grade ? grade.interventionGrade ? grade.interventionGrade: grade.quarterlyGrade : ""; // Return score if found, otherwise null
};
export const getInterventionRemakrs = (
  quarterlyGrades: QuarterlyGrades[],
  quarter: string,
  subComponent: string
): number | string => {
  const grade = quarterlyGrades.find(
    (qg) => qg.quarter === quarter && qg.subComponent === subComponent
  );

  return grade ? grade.interventionRemarks ? grade.interventionRemarks : "" : ""; // Return score if found, otherwise null
};
export const getQuarterlyGrade = (
  quarterlyGrades: QuarterlyGrades[],
  quarter: string,
  subComponent: string
) => {
  const grade = quarterlyGrades.find(
    (qg) => qg.quarter === quarter && qg.subComponent === subComponent
  );

  return grade?.interventionGrade; // Return score if found, otherwise null
};

export const getStudentGrade = (quarterlyGrades: Doc<'quarterlyGrades'>[] | null, classId: Id<'classes'>, quarter: string): number | string => {
  const grade = quarterlyGrades?.find(qg => qg.classId === classId && qg.quarter === quarter);

  if (!grade) return ""; // ✅ Return empty string if classId is not found
  return grade.interventionGrade !== undefined ? grade.interventionGrade : grade.quarterlyGrade;
};

export const getStudentGradeJRH = (quarterlyGrades: QuarterlyGradesWithSubject[] | null, classId: Id<'classes'>, quarter: string): number | string => {
  const grade = quarterlyGrades?.find(qg => qg.classId === classId && qg.quarter === quarter);

  if (!grade) return ""; // ✅ Return empty string if classId is not found
  return grade.interventionGrade !== undefined ? grade.interventionGrade : grade.quarterlyGrade;
};


export const getStudentGeneralAverage = (
  coreSubjects: ClassWithSubject[],
  appliedAndSpecializedSubjects: ClassWithSubject[],
  student: StudentWithDetails,
  sem: string,
): number | string => {
  // Get the subject averages
  const subjectAverages = [...coreSubjects, ...appliedAndSpecializedSubjects].map((clss) => {
    const firstSemGrade = getStudentGrade(student.quarterlyGrades, clss._id, sem === "1st" ? "1st" : "3rd");
    const secondSemGrade = getStudentGrade(student.quarterlyGrades, clss._id, sem === "1st" ? "2nd" : "4th");
    return getAverageForShs(firstSemGrade, secondSemGrade);
  });

   // Ensure all values are numbers; if any value is not a number, return ""
   if (subjectAverages.some(avg => typeof avg !== "number" || isNaN(avg))) {
    return ""; // 🚨 Stop calculation if there’s an invalid value
  }

  // Filter out null/undefined values & enforce type safety
  const validAverages = subjectAverages.filter(
    (avg): avg is number => avg !== null && avg !== undefined
  );

  // Compute the general average
  const total = validAverages.reduce((sum, avg) => sum + avg, 0);
  return validAverages.length > 0 ? total / validAverages.length : "";
};


export const getPassFailStatusMAPEH = (average?: number | string): string => {
    if (typeof average === "string" || average === undefined) return ""; // If no valid grades, return an empty string
    return average <= 74 ? "Failed" : "Passed";
};

export const getFinalQuarterlyGrade = (
    quarterlyGrades: QuarterlyGradesWithSubject[] | undefined,
    quarter: string
): number | null => {
    // Find the quarterly grade for the given quarter
    const grade = quarterlyGrades?.find(qg => qg.quarter === quarter);
  
    // Return interventionGrade if available, otherwise quarterlyGrade
    return grade ? grade.interventionGrade ?? grade.quarterlyGrade : null;
};

export const hasInterventionGrade = (
  quarterlyGrades: QuarterlyGradesWithSubject[] | undefined,
  quarter: string
): boolean => {
  // Find the quarterly grade for the given quarter
  const grade = quarterlyGrades?.find(qg => qg.quarter === quarter);

  // Return interventionGrade if available, otherwise quarterlyGrade
  return grade ? grade.interventionGrade ? true : false : false;
};

export const getInterventionMethods = (
  quarterlyGrades: QuarterlyGradesWithSubject[] | undefined,
  quarter: string
): string[] => {
  // Find the quarterly grade for the given quarter
  const grade = quarterlyGrades?.find(qg => qg.quarter === quarter);

  // Return intervention methods if available, otherwise return an empty array
  return grade && grade.interventionUsed ? grade.interventionUsed : [];
};

export const getInterventionRemarks = (
  quarterlyGrades: QuarterlyGradesWithSubject[] | undefined,
  quarter: string,

): string => {
  // Find the quarterly grade for the given quarter and subject
  const grade = quarterlyGrades?.find(qg => qg.quarter === quarter);

  // Return intervention remarks if available, otherwise return an empty string
  return grade && grade.interventionRemarks ? grade.interventionRemarks : "";
};

