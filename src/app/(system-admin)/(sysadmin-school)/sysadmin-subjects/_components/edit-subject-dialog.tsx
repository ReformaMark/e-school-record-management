import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import { SubjectFormData, subjectSchema } from "./add-subjects-card";

interface EditSubjectDialogProps {
    open: boolean;
    onClose: () => void;
    subject: Doc<"subjects">;
}

export const EditSubjectDialog = ({ open, onClose, subject }: EditSubjectDialogProps) => {
    const gradeLevels = useQuery(api.gradeLevel.get)
    const selectedGradeLevel = useQuery(api.gradeLevel.getGradeLevelById, {
        gradeLevelId: subject.gradeLevelId as Id<"gradeLevels">
    });

    const { register, handleSubmit, setValue, formState: { errors }, control } = useForm<SubjectFormData>({
        resolver: zodResolver(subjectSchema),
        defaultValues: {
            name: subject.name,
            gradeLevelId: subject.gradeLevelId,
            subjectCode: subject.subjectCode,
            subjectCategory: subject.subjectCategory as "core" | "applied" | "specialized" | undefined,
            gradeWeights: subject.gradeWeights
            // isMapeh: subject.isMapeh,
            // gradeWeights: subject.isMapeh ? undefined : subject.gradeWeights,
            // mapehWeights: subject.isMapeh ? subject.mapehWeights : undefined
        }
    });

    const { mutate: updateSubject, isPending } = useMutation({
        mutationFn: useConvexMutation(api.subjects.update)
    });

    const currentGradeLevelId = useWatch({
        control,
        name: "gradeLevelId",
        defaultValue: subject.gradeLevelId // Set initial value
    });

    const currentGradeLevel = useQuery(api.gradeLevel.getGradeLevelById, {
        gradeLevelId: currentGradeLevelId as Id<"gradeLevels">
    });

    const isSeniorHigh = (currentGradeLevel?.level || selectedGradeLevel?.level)?.startsWith("Grade 11") ||
        (currentGradeLevel?.level || selectedGradeLevel?.level)?.startsWith("Grade 12");

    // const isMapeh = watch("isMapeh");

    // Handle MAPEH toggle
    // const handleMapehChange = (checked: boolean) => {
    //     setValue("isMapeh", checked);
    //     if (checked) {
    //         setValue("gradeWeights", undefined);
    //         // If switching to MAPEH, initialize mapehWeights if not present
    //         if (!watch("mapehWeights")) {
    //             setValue("mapehWeights", {
    //                 music: { written: 0, performance: 0, exam: 0 },
    //                 arts: { written: 0, performance: 0, exam: 0 },
    //                 pe: { written: 0, performance: 0, exam: 0 },
    //                 health: { written: 0, performance: 0, exam: 0 }
    //             });
    //         }
    //     } else {
    //         setValue("mapehWeights", undefined);
    //         // If switching to regular subject, initialize gradeWeights if not present
    //         if (!watch("gradeWeights")) {
    //             setValue("gradeWeights", {
    //                 written: 0,
    //                 performance: 0,
    //                 exam: 0
    //             });
    //         }
    //     }
    // };

    const onSubmit = async (data: SubjectFormData) => {
        try {
            const submitData = {
                id: subject._id,
                name: data.name,
                gradeLevelId: data.gradeLevelId as Id<"gradeLevels">,
                subjectCode: data.subjectCode,
                subjectCategory: data.subjectCategory,
                gradeWeights: data.gradeWeights,
                // isMapeh: data.isMapeh,
                // ...(data.isMapeh
                //     ? { mapehWeights: data.mapehWeights, gradeWeights: undefined }
                //     : { gradeWeights: data.gradeWeights, mapehWeights: undefined }
                // )
            };

            await updateSubject(submitData);
            toast.success("Subject updated successfully");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update subject");
        }
    };

    // const components = ["music", "arts", "pe", "health"] as const;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl text-black bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Subject</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
                        <Select
                            defaultValue={subject.gradeLevelId}
                            onValueChange={(value) => setValue("gradeLevelId", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Grade Level" />
                            </SelectTrigger>
                            <SelectContent>
                                {gradeLevels?.map((grade) => (
                                    <SelectItem
                                        key={grade._id}
                                        value={grade._id}
                                    >
                                        {grade.level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.gradeLevelId && (
                            <p className="text-sm text-red-500">{errors.gradeLevelId.message}</p>
                        )}
                    </div>

                    {isSeniorHigh && (
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                defaultValue={subject.subjectCategory}
                                onValueChange={(value) => setValue("subjectCategory", value as "core" | "applied" | "specialized")}
                            >
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
                    )}

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
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="text-white">
                            {isPending ? "Updating..." : "Update Subject"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};