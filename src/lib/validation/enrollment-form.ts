import { z } from "zod"

export const EnrollmentFormSchema = z.object({
    schoolYear: z.string().min(2, { message: "School Year should be valid." }).max(255, { message: "School Year is too long." }),
    gradeLevelToEnroll: z.string({
        required_error: "Please select grade level.",
      }).min(1,{
        message: "Please select grade level.",
    }),
    withLrn: z.string().min(2,{
        message: "Please select at Yes or No.",
      }),

    returning: z.string().min(2,{
        message: "Please select at Yes or No.",
    }),

    als: z.string().min(2,{
        message: "Please select at Yes or No.",
    }),

    indigenous: z.string().min(2,{
        message: "Please select at Yes or No.",
    }),

    fourPS: z.string().min(2,{
        message: "Please select at Yes or No.",
    }),

    birthCertificateNo: z.string().optional(),

    lrn: z.string().optional(),
    lastName: z.string().min(2, { message: "Last name is too short." }),
    firstName: z.string().min(2, { message: "First name is too short." }),
    middleName: z.string().optional(),
    extensionName: z.string().optional(),
    birthDate: z.date(),
    birthPlace: z.string().min(2, { message: "Birth place is too short." }),
    age: z.coerce.number({
        message: "Required.",
    }).positive().min(1, { message: "Invalid age." }),
    sex: z.string({required_error: "Sex is required."}).min(2, { message: "Sex is required" }),
    motherTounge: z.string().optional(),
    indigenousCommunity: z.string().optional(),
    fourPSIdNumber: z.string().optional(),

    // Address
    currentAddress: z.object({
        province: z.string({required_error: "Province is required."}).min(2, { message: "Province is too short." }),
        municipality: z.string({required_error: "Municipaity/City is required."}).min(2, { message: "Municipality is too short." }),
        barangay: z.string({required_error: "Barangay is required."}).min(2, { message: "Barangay is too short." }),
        street: z.string({required_error: "Street is required."}),
        houseNum: z.string().optional(),
        completeAddress: z.string({required_error: "Complete address is required."}).min(2, { message: "Complete address is too short." }),
    }),
    sameAsCurrentAddress: z.string({required_error: "Required."}),
    permanentAddress: z.object({
        province: z.string().optional(),
        municipality: z.string().optional(),
        barangay: z.string().optional(),
        street: z.string().optional(),
        houseNum: z.string().optional(),
        completeAddress: z.string().optional(),
    }),

    // Parent/Guardian Info
    fatherFirstName: z.string().optional(),
    fatherMiddleName: z.string().optional(),
    fatherLastName: z.string().optional(),
    fatherContact: z.string().optional(),
    motherFirstName: z.string().optional(),
    motherMiddleName: z.string().optional(),
    motherLastName: z.string().optional(),
    motherContact: z.string().optional(),
    guardianFirstName: z.string().optional(),
    guardianMiddleName: z.string().optional(),
    guardianLastName: z.string().optional(),
    guardianContact: z.string().optional(),

    // Academic Info
    lastGradeLevelCompleted: z.string().optional(),
    lastSYCompleted: z.string().optional(),
    lastSchoolAttended: z.string().optional(),
    schoolId: z.string().optional(),

    semester: z.string().optional(),
    strand: z.string().optional(),
    track: z.string().optional(),

}).superRefine((data, ctx) => {
    if (data.withLrn !== 'No' && data.lrn && data.lrn.length !== 11) {
        ctx.addIssue({
            path: ['lrn'],
            code: "custom",
            message: 'Learning Reference Number must be 11 characters long.',
        });
    }
    if (data.withLrn === 'Yes' && !data.lrn) {
        ctx.addIssue({
            path: ['lrn'],
            code: "custom",
            message: 'Learning Reference Number is required.',
        });
    }

    if (data.withLrn === 'No' && data.lrn !== '') {
        ctx.addIssue({
            path: ['lrn'],
            code: "custom",
            message: 'LRN should be empty if withLrn is "No".',
        });
    }
    
    if (data.birthCertificateNo !== '' && data.birthCertificateNo && data.birthCertificateNo.length !== 11){
        ctx.addIssue({
            path: ['birthCertificateNo'],
            code: "custom",
            message: 'Birth Certificate Number must be 11 characters long',
        });
    }
    if(data.sameAsCurrentAddress === '') {
        ctx.addIssue({
            path: ['sameAsCurrentAddress'],
            code: "custom",
            message: 'Select Yes or No.',
        })
    }
    if (data.sameAsCurrentAddress === 'No') {
        if (data.permanentAddress.province === ""){
            ctx.addIssue({
                path: ['permanentAddress.province'],
                code: "custom",
                message: 'Province is required.',
            })
        }
        if (data.permanentAddress.municipality === ""){
            ctx.addIssue({
                path: ['permanentAddress.municipality'],
                code: "custom",
                message: 'Municipality is required.',
            })
        }
        if (data.permanentAddress.barangay === ""){
            ctx.addIssue({
                path: ['permanentAddress.barangay'],
                code: "custom",
                message: 'Baranagay is required.',
            })
        }
        if (data.permanentAddress.street === ""){
            ctx.addIssue({
                path: ['permanentAddress.street'],
                code: "custom",
                message: 'Street is required.',
            })
        }
        if (data.permanentAddress.completeAddress === ""){
            ctx.addIssue({
                path: ['permanentAddress.completeAddress'],
                code: "custom",
                message: 'Complete address is required.',
            })
        }
    }
})