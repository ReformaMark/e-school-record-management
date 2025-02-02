import { z } from "zod"; 

export const InputGradesFormSchema = z.object({
    classRecordId: z.string(),
    scores: z.array(
        z.object({
            
            assessmentNo: z.number(),
            score: z
                .union([z.string(), z.number()]) // Accepts both strings and numbers
                .transform(value => (value === "" ? undefined : Number(value))) // Convert empty input to undefined
                .optional()
        })
    )
});
