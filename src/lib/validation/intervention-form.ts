import { z } from "zod"; 

export const InterventionFormSchema = z.object({
    remarks: z.string().min(1, { message: "Remarks are required." }), 
    interventionUsed: z.array(z.string()).min(1, { message: "Please select at least one intervention method." }),
    interventionGrade: z.coerce.number().min(0, { message: "Grade must be a positive number." }) 
  
})