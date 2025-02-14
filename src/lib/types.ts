import { Doc, Id } from "../../convex/_generated/dataModel";

export type SchoolHeadType = "junior-high" | "senior-high";

export interface AdminFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    contactNumber: string;
    department?: string;
    specialization?: string;
    yearsOfExperience?: number;
    role?: "admin" | "teacher" | "school-head" | "staff";
    isActive?: boolean;
    emailVerified?: boolean;
    birthDate?: string;
    region: string;
    province: string;
    city: string;
    barangay: string;
    street: string;
    houseNumber: string;
    postalCode: string;
}

export interface PrincipalFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    contactNumber: string;
    birthDate: string | Date;
    gender: string;
    description?: string;
    // Address fields
    region?: string;
    province?: string;
    city?: string;
    barangay?: string;
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    imageStorageId?: string;
    schoolHeadType: SchoolHeadType;
}

export type StudentTypes = Doc<"students">

export interface StudentsWithEnrollMentTypes extends Doc<"students"> {
    enrollment: Doc<"enrollments">
}

export interface ScheduleWithRoom extends Doc<'schedules'> {
    schoolPeriod: Doc<'schoolPeriods'> | null,
    room: Doc<'rooms'> | null
}
export interface ClassesWithDetails extends Doc<'classes'> {
    subject: SubjectWithGradeLevel | null,
    teacher: Doc<'users'> | null,
    section: SectionWithGradeLevel | null,
    schedules: ScheduleWithRoom[],
    schoolYear: Doc<'schoolYears'> | null,
}

export interface SectionWithDetails extends Doc<'sections'> {
    advisor: Doc<'users'> | null,
    classes: ClassessWithTeacherSubSched[],
    schoolYear: Doc<'schoolYears'> | null,
    gradeLevel: Doc<'gradeLevels'> | null,
    roomId: Id<"rooms">,
}

interface ClassessWithTeacherSubSched extends Doc<'classes'> {
    teacher: Doc<'users'> | null,
    subject: Doc<'subjects'> | null
    schedule: Doc<'schedules'>[]
}
export interface SectionWithGradeLevel extends Doc<'sections'> {
    gradeLevel: Doc<'gradeLevels'> | null
}
export interface SubjectWithGradeLevel extends Doc<'subjects'> {
    gradeLevel: Doc<'gradeLevels'> | null
}

export interface AssessmentTypes extends Doc<"assessments"> {
    subject: Doc<'subjects'> | null
}

interface ClassessWithSubjects extends Doc<'classes'> {
    subject: Doc<'subjects'> | null
}
interface CLassRecordsWithClassTypes extends Doc<'classRecords'> {
    cLass: ClassessWithSubjects
}
export interface StudentsWithClassRecord extends Doc<"students"> {
    classRecords: CLassRecordsWithClassTypes[],
    sectionDoc: SectionWithGradeLevel | null
}

export interface SubjectsWithAppliedGradeWeights extends Doc<'subjects'> {
    appliedGradeWeights: Doc<'appliedGradeWeigths'> | null
}

export type QuarterlyGrades = Doc<"quarterlyGrades">

export interface StudentsWithQuarterlyGrades extends Doc<'students'> {
    quarterlyGrades: QuarterlyGrades[]
}
export interface StudentsWithQuarterlyGrade extends Doc<'students'> {
    quarterlyGrade: QuarterlyGrades | undefined
}

export interface StudentWithDetails extends Doc<'students'> {
    quarterlyGrades: QuarterlyGradesWithSubject[],
    sectionDoc: SectionWithGradeLevel | null,
    cLass: Doc<'classes'> | null;
    advisor: Doc<'users'> | null;
    subjects: ClassWithSubject[];
}

export interface QuarterlyGradesWithSubject extends Doc<'quarterlyGrades'> {
    subject: Doc<'subjects'>
}

export interface ClassWithSubject extends Doc<'classes'> {
    subject: Doc<'subjects'>
}

export interface FinalGradesWithSubject extends Doc<'finalGrades'>{
    student: Doc<'students'>
    subjectForRemedial: SubjectForRemedial
}

interface SubjectForRemedial {
    remedialGrade?: number | undefined;
    classId: Id<"classes">;
    subjectName: string;
    finalGrade: number;
    forRemedial: boolean;
    status: string | undefined
}