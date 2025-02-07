import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { setDate } from "date-fns"
import { transmutationTable3, transmutationTableJRHigh2, transmutationTableSHS2, transmutationTableSHSCore2 } from "../../data/transmutation-data"
import { QuarterlyGrades, StudentsWithQuarterlyGrades } from "./types"

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

export const getQuarterlyGrades = (grades: QuarterlyGrades[] | undefined, quarter?: string) => {
  if(!grades){
    return ""
  }
  if (quarter) {
    // If a specific quarter is provided, return only that quarter's grade
    return grades?.find(g => g.quarter === quarter)?.quarterlyGrade ?? "";
  }
}

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
  return Math.round((num1 + num2 + num3 + num4) / 2);
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

  return grade ? grade.quarterlyGrade : ""; // Return score if found, otherwise null
};

