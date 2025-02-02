import { z } from "zod"; 

export const GradeWeightsFormSchema = z.object({
    learningMode: z.string().nonempty({
        message: "Learning mode must be selected.",
    }),
    written: z.coerce.number().nonnegative({
        message: "Written grade weight must be a positive number.",
    }),
    performance: z.coerce.number().nonnegative({
        message: "Performance grade weight must be a positive number.",
    }),
    exam: z.coerce.number().nonnegative({
        message: "Exam grade weight must be a positive number.",
    }).optional(),
});
