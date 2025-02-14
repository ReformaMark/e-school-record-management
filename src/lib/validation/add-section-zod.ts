import { z } from "zod";

const classScheduleSchema = z.object({
    subjectId: z.string().min(1, "Subject is required"),
    teacherId: z.string().min(1, "Teacher is required"),
    semester: z.string().optional(),
    track: z.string().optional(),
    schedules: z.array(z.object({
        days: z.array(z.string()),
        schoolPeriodId: z.string().min(1, "Period is required"),
        roomId: z.string().min(1, "Room is required")
    })).optional(),
});

// export const sectionSchema = z.object({
//     name: z.string().min(1, "Section name is required"),
//     gradeLevelId: z.string().min(1, "Grade level is required"),
//     advisorId: z.string().min(1, "Advisor is required"),
//     schoolYearId: z.string().min(1, "School year is required"),
//     classes: z.array(classScheduleSchema).min(1, "At least one class is required")
// });

export const sectionSchema = z.object({
    name: z.string().min(1, "Section name is required"),
    gradeLevelId: z.string().min(1, "Grade level is required"),
    advisorId: z.string().min(1, "Advisor is required"),
    schoolYearId: z.string().min(1, "School year is required"),
    roomId: z.string().min(1, "Room is required"),
    classes: z.array(classScheduleSchema).min(1, "At least one class is required"),
});

export type SectionFormData = z.infer<typeof sectionSchema>;