import { z } from "zod";

export const AssessmentFormSchema = z.object({
    type: z.string().optional(),
    gradeLevel: z.string({ required_error: "Grade level is required." }).min(1, { message: "Grade level cannot be empty." }),
    quarter: z.string({ required_error: "Quarter is required." }).min(1, { message: "Quarter cannot be empty." }),
    semester: z.string().optional(),
    assessmentNo: z.coerce.number().nonnegative({ message: "Assessment number must not be negative." }),
    highestScore: z.coerce.number().min(5, { message: "Highest possible score must be at least 5." }).nonnegative({ message: "Highest possible score must not be negative." }),
    classId: z.array(z.string()).optional(),
    schoolYear: z.string().optional(),
    subject: z.string({ required_error: "Subject is required." }).min(1, { message: "Subject cannot be empty." })
})