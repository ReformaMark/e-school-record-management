"use client"

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { api } from "../../../../../../convex/_generated/api";


// const componentSchema = z.object({
//     written: z.number().min(0).max(100),
//     performance: z.number().min(0).max(100),
//     exam: z.number().min(0).max(100).optional()
// }).refine(data => {
//     const total = data.written + data.performance + (data.exam || 0);
//     return total === 100;
// }, "Component weights must total 100%");

const gradeWeightSchema = z.object({
    written: z.number().min(0).max(100),
    performance: z.number().min(0).max(100),
    exam: z.number().min(0).max(100).optional(),
}).refine(data => {
    const total = data.written + data.performance + (data.exam || 0);
    return total === 100;
}, "Component weights must total 100%");

export const subjectSchema = z.object({
    name: z.string().min(1, "Subject name is required"),
    gradeLevel: z.coerce.number().min(1, "Grade level is required"),
    subjectCode: z.string().min(2).max(10),
    subjectCategory: z.enum(["core", "applied", "specialized"]),
    gradeWeights: gradeWeightSchema,
    // isMapeh: z.boolean().default(false),
    // mapehWeights: z.object({
    //     music: componentSchema,
    //     arts: componentSchema,
    //     pe: componentSchema,
    //     health: componentSchema
    // }).optional()
})
// .superRefine((data, ctx) => {
//     if (data.isMapeh && !data.mapehWeights) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "MAPEH weights are required for MAPEH subjects",
//             path: ["mapehWeights"]
//         });
//     }
//     if (!data.isMapeh && !data.gradeWeights) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Grade weights are required for non-MAPEH subjects",
//             path: ["gradeWeights"]
//         });
//     }
// });

export type SubjectFormData = z.infer<typeof subjectSchema>;

export const AddSubjectsCard = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SubjectFormData>({
        resolver: zodResolver(subjectSchema),
        // defaultValues: {
        //     isMapeh: false
        // }
    });

    const { mutate: createSubject, isPending } = useMutation({
        mutationFn: useConvexMutation(api.subjects.create),
        onSuccess: () => {
            toast.success("Subject created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    // const isMapeh = watch("isMapeh");

    // const handleMapehChange = (checked: boolean) => {
    //     setValue("isMapeh", checked);
    //     if (checked) {
    //         setValue("gradeWeights", undefined);
    //     } else {
    //         setValue("mapehWeights", undefined);
    //     }
    // };

    const onSubmit = async (data: SubjectFormData) => {
        // If it's a MAPEH subject, exclude gradeWeights from submission
        // const submitData = isMapeh
        //     ? { ...data, gradeWeights: undefined }
        //     : { ...data, mapehWeights: undefined };


        createSubject(data);
    };

    // const components = ["music", "arts", "pe", "health"] as const;

    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add New Subject</CardTitle>
                <CardDescription>Create a new subject with grade weights</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="grid gap-8 mt-7">
                    <div className="space-y-2">
                        <Label>Subject Name</Label>
                        <Input {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Subject Code</Label>
                        <Input {...register("subjectCode")} />
                        {errors.subjectCode && (
                            <p className="text-sm text-red-500">{errors.subjectCode.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Grade Level</Label>
                        <Select onValueChange={
                            (value) => setValue("gradeLevel", parseInt(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">Grade 7</SelectItem>
                                <SelectItem value="8">Grade 8</SelectItem>
                                <SelectItem value="9">Grade 9</SelectItem>
                                <SelectItem value="10">Grade 10</SelectItem>
                                <SelectItem value="11">Grade 11</SelectItem>
                                <SelectItem value="12">Grade 12</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.gradeLevel && (
                            <p className="text-sm text-red-500">{errors.gradeLevel.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Select onValueChange={
                            (value) => setValue("subjectCategory", value as "core" | "applied" | "specialized")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="core">Core</SelectItem>
                                <SelectItem value="applied">Applied</SelectItem>
                                <SelectItem value="specialized">Specialized</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.subjectCategory && (
                            <p className="text-sm text-red-500">{errors.subjectCategory.message}</p>
                        )}
                    </div>

                    {/* <div className="flex items-center space-x-2">
                        <Switch
                            checked={isMapeh}
                            onCheckedChange={handleMapehChange}
                        />
                        <Label>Is MAPEH Subject</Label>
                    </div> */}

                    {/* {isMapeh ? (
                        <div className="space-y-6">
                            {components.map((component) => (
                                <div key={component} className="space-y-4">
                                    <Label className="font-medium capitalize">{component}</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label>Written</Label>
                                            <Input
                                                type="number"
                                                placeholder="20%"
                                                {...register(`mapehWeights.${component}.written` as const, {
                                                    valueAsNumber: true
                                                })}
                                            />
                                            {errors?.mapehWeights?.[component]?.written && (
                                                <p className="text-sm text-red-500">
                                                    {errors.mapehWeights[component].written?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Performance</Label>
                                            <Input
                                                type="number"
                                                placeholder="50%"
                                                {...register(`mapehWeights.${component}.performance` as const, {
                                                    valueAsNumber: true
                                                })}
                                            />
                                            {errors?.mapehWeights?.[component]?.performance && (
                                                <p className="text-sm text-red-500">
                                                    {errors.mapehWeights[component].performance?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <Label>Exam</Label>
                                            <Input
                                                type="number"
                                                placeholder="30%"
                                                {...register(`mapehWeights.${component}.exam` as const, {
                                                    valueAsNumber: true
                                                })}
                                            />
                                            {errors?.mapehWeights?.[component]?.exam && (
                                                <p className="text-sm text-red-500">
                                                    {errors.mapehWeights[component].exam?.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : ( */}
                    <div className="space-y-4">
                        <Label>Grade Weights (Total must be 100%)</Label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Written</Label>
                                <Input
                                    type="number"
                                    placeholder="20%"
                                    {...register("gradeWeights.written", { valueAsNumber: true })}
                                />
                                {errors?.gradeWeights?.written && (
                                    <p className="text-sm text-red-500">{errors.gradeWeights.written.message}</p>
                                )}
                            </div>
                            <div>
                                <Label>Performance</Label>
                                <Input
                                    type="number"
                                    placeholder="50%"
                                    {...register("gradeWeights.performance", { valueAsNumber: true })}
                                />
                                {errors?.gradeWeights?.performance && (
                                    <p className="text-sm text-red-500">{errors.gradeWeights.performance.message}</p>
                                )}
                            </div>
                            <div>
                                <Label>Exam</Label>
                                <Input
                                    type="number"
                                    placeholder="30%"
                                    {...register("gradeWeights.exam", { valueAsNumber: true })}
                                />
                                {errors?.gradeWeights?.exam && (
                                    <p className="text-sm text-red-500">{errors.gradeWeights.exam.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* )} */}
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending} className="text-white">
                        {isPending ? "Creating..." : "Create Subject"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}