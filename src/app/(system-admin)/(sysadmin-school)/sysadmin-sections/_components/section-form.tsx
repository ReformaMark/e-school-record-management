"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { SectionWithDetails } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SectionFormData, sectionSchema } from "@/lib/validation/add-section-zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import {
    ChevronLeft,
    MinusIcon,
    PlusIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

interface SectionFormProps {
    isEditing?: boolean;
    section?: SectionWithDetails;
}

export const SectionForm = ({ isEditing = false, section }: SectionFormProps) => {
    const [isSeniorHigh, setIsSeniorHigh] = useState<boolean | undefined>(false);
    const router = useRouter()
    const { register, control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<SectionFormData>({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            name: "",
            gradeLevelId: "",
            advisorId: "",
            schoolYearId: "",
            classes: [{
                subjectId: "",
                teacherId: "",
                semester: "",
                track: ""
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "classes"
    });

    const { mutate: createSection, isPending } = useMutation({
        mutationFn: useConvexMutation(api.sections.create),
        onSuccess: () => {
            toast.success("Section created successfully");
            reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const { mutate: updateSection, isPending: isUpdating } = useMutation({
        mutationFn: useConvexMutation(api.sections.update),
        onSuccess: () => {
            toast.success("Section updated successfully");
            router.push("/sysadmin-sections");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const selectedGradeLevelId = watch("gradeLevelId");
    const teachers = useQuery(api.users.getTeachers);
    const subjects = useQuery(api.subjects.getSubjects);
    const schoolYears = useQuery(api.schoolYear.get);
    const gradeLevels = useQuery(api.gradeLevel.get);

    const filteredSubjects = subjects?.filter(
        subject => subject.gradeLevelId === selectedGradeLevelId
    );

    const trackOptions = [
        { label: "Core Subject (All Track)", value: "core" },
        { label: "Academic Track", value: "academic" },
        { label: "Work Immersion/Culminating Activity", value: "immersion" },
        { label: "TVL Track", value: "tvl" },
        { label: "Sports Track", value: "sports" },
        { label: "Arts and Design Track", value: "arts" }
    ];

    useEffect(() => {
        if (isEditing && section) {

            reset({
                name: section.name,
                gradeLevelId: section.gradeLevelId,
                advisorId: section.advisorId,
                schoolYearId: section.schoolYearId,
                classes: section.classes.map(cls => ({
                    subjectId: cls.subjectId,
                    teacherId: cls.teacherId,
                    semester: cls.semester || "",
                    track: cls.track || ""
                }))
            });

            // Set senior high state
            const gradeLevel = gradeLevels?.find(g => g._id === section.gradeLevelId);
            const isSHS = gradeLevel?.level.includes("11") || gradeLevel?.level.includes("12");
            setIsSeniorHigh(isSHS);
        }
    }, [isEditing, section, reset, gradeLevels]);

    useEffect(() => {
        const advisorId = watch('advisorId');
        if (advisorId && fields.length > 0) {
            setValue(`classes.0.teacherId`, advisorId);

            const firstTeacherSelect = document.querySelector(`[name="classes.0.teacherId"]`);
            if (firstTeacherSelect) {
                firstTeacherSelect.setAttribute('disabled', 'true');
            }
        }
    }, [watch('advisorId'), fields.length, setValue]);

    const handleAddClass = () => {
        const formValues = watch();
        append({
            subjectId: "",
            teacherId: fields.length === 0 ? formValues.advisorId : "",
            semester: "",
            track: ""
        });
    };

    const handleGradeLevelChange = (value: string) => {
        setValue("gradeLevelId", value)

        const selectedGradeLevel = gradeLevels?.find(g => g._id === value);
        const isSHS = selectedGradeLevel?.level.includes("11") || selectedGradeLevel?.level.includes("12");
        setIsSeniorHigh(isSHS);

        if (!isSHS) {
            // Clear semester and track for all classes
            fields.forEach((_, index) => {
                setValue(`classes.${index}.semester`, "");
                setValue(`classes.${index}.track`, "");
            });
        }
    };

    const handleSemesterChange = (value: string, index: number) => {
        setValue(`classes.${index}.semester`, value);
    };

    const handleTrackChange = (value: string, index: number) => {
        setValue(`classes.${index}.track`, value);
    };

    const onSubmit = (data: SectionFormData) => {
        if (isEditing && section) {
            updateSection({
                id: section._id,
                ...data,
                advisorId: data.advisorId as Id<"users">,
                gradeLevelId: data.gradeLevelId as Id<"gradeLevels">,
                schoolYearId: data.schoolYearId as Id<"schoolYears">,
                classes: data.classes.map(cls => ({
                    ...cls,
                    subjectId: cls.subjectId as Id<"subjects">,
                    teacherId: cls.teacherId as Id<"users">,
                }))
            });
        } else {
            createSection({
                ...data,
                advisorId: data.advisorId as Id<"users">,
                gradeLevelId: data.gradeLevelId as Id<"gradeLevels">,
                schoolYearId: data.schoolYearId as Id<"schoolYears">,
                classes: data.classes.map(cls => ({
                    ...cls,
                    subjectId: cls.subjectId as Id<"subjects">,
                    teacherId: cls.teacherId as Id<"users">,
                }))
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <main className="space-y-4 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-auto grid max-w-full flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/sysadmin-sections"
                                className={cn("h-7 w-7", buttonVariants({
                                    variant: "outline",
                                    size: "icon",
                                }))}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                {isEditing ? "Edit Section" : "Add a Section"}
                            </h1>

                            {/* Button for desktop/laptop users */}
                            <div className="hidden items-center gap-2 md:flex md:ml-auto">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="text-white"
                                    disabled={isEditing ? isUpdating : isPending}
                                >
                                    {isEditing
                                        ? (isUpdating ? "Updating..." : "Update Section")
                                        : (isPending ? "Creating..." : "Save Section")
                                    }
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                                {/* Fname, Lname, Mname, Desc */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Section Details</CardTitle>
                                        <CardDescription>
                                            Add section details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Section Name</Label>
                                                <Input
                                                    {...register("name")}
                                                    placeholder="Section name"
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                                )}
                                            </div>

                                            <div className="grid gap-2">
                                                <Label>School Year</Label>
                                                <Select
                                                    onValueChange={(value) => setValue("schoolYearId", value)}
                                                    value={watch("schoolYearId")}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select School Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {schoolYears?.map((sy) => (
                                                            <SelectItem key={sy._id} value={sy._id}>
                                                                {sy.sy || `${sy.startDate.split('-')[0]}-${sy.endDate.split('-')[0]}`}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.schoolYearId && (
                                                    <p className="text-sm text-red-500">{errors.schoolYearId.message}</p>
                                                )}
                                            </div>

                                            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label>Grade Level</Label>
                                                    <Select
                                                        onValueChange={handleGradeLevelChange}
                                                        value={watch("gradeLevelId")}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Grade Level" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {gradeLevels?.map((grade) => (
                                                                <SelectItem key={grade._id} value={grade._id}>
                                                                    {grade.level}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.gradeLevelId && (
                                                        <p className="text-sm text-red-500">{errors.gradeLevelId.message}</p>
                                                    )}
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label>Adviser</Label>
                                                    <Select
                                                        onValueChange={(value) => setValue("advisorId", value)}
                                                        value={watch("advisorId")}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Adviser" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {teachers?.map((teacher) => (
                                                                <SelectItem key={teacher.id} value={teacher.id}>
                                                                    {teacher.lastName}, {teacher.firstName}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.advisorId && (
                                                        <p className="text-sm text-red-500">{errors.advisorId.message}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Classes Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Class Schedule</CardTitle>
                                        <CardDescription>Add subjects and their schedules</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-6">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="grid gap-4 lg:grid-cols-5">
                                                    <div className="grid gap-2">
                                                        <Label>Subject</Label>
                                                        <Select
                                                            onValueChange={(value) => setValue(`classes.${index}.subjectId`, value)}
                                                            disabled={!selectedGradeLevelId}
                                                            value={watch(`classes.${index}.subjectId`)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    placeholder={
                                                                        !selectedGradeLevelId
                                                                            ? "Select grade level first"
                                                                            : index === 0
                                                                                ? "Adviser's subject"
                                                                                : "Select subject"
                                                                    }
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {filteredSubjects?.map((subject) => (
                                                                    <SelectItem key={subject._id} value={subject._id}>
                                                                        {subject.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.classes?.[index]?.subjectId && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.classes[index].subjectId.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label>{index === 0 ? "Adviser" : "Teacher"}</Label>
                                                        <Select
                                                            onValueChange={(value) => setValue(`classes.${index}.teacherId`, value)}
                                                            disabled={index === 0}
                                                            value={watch(`classes.${index}.teacherId`)} // Add this line
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    placeholder={index === 0 ? "Adviser will teach this subject" : "Select teacher"}
                                                                />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {teachers?.map((teacher) => (
                                                                    <SelectItem key={teacher.id} value={teacher.id}>
                                                                        {teacher.lastName}, {teacher.firstName}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.classes?.[index]?.teacherId && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.classes[index].teacherId.message}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {isSeniorHigh && (
                                                        <>
                                                            <div className="grid gap-2">
                                                                <Label>Semester</Label>
                                                                <Select
                                                                    onValueChange={(value) => handleSemesterChange(value, index)}
                                                                    value={watch(`classes.${index}.semester`)}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Semester" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="1st">1st Semester</SelectItem>
                                                                        <SelectItem value="2nd">2nd Semester</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                {errors.classes?.[index]?.semester && (
                                                                    <p className="text-sm text-red-500">{errors.classes[index].semester.message}</p>
                                                                )}
                                                            </div>

                                                            <div className="grid gap-2">
                                                                <Label>Track</Label>
                                                                <Select
                                                                    onValueChange={(value) => handleTrackChange(value, index)}
                                                                    value={watch(`classes.${index}.track`)}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select Track" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {trackOptions.map((track) => (
                                                                            <SelectItem key={track.value} value={track.value}>
                                                                                {track.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                {errors.classes?.[index]?.track && (
                                                                    <p className="text-sm text-red-500">{errors.classes[index].track.message}</p>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}

                                                    {index > 0 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            className="mt-8"
                                                            onClick={() => remove(index)}
                                                        >
                                                            <MinusIcon className="h-4 w-4 mr-2" />
                                                            Remove
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}

                                            {!isEditing && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={handleAddClass}
                                                >
                                                    <PlusIcon className="h-4 w-4 mr-2" />
                                                    Add Class
                                                </Button>
                                            )}

                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Button for mobile users */}
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button
                                size="sm"
                                className="text-white"
                            >
                                Save Product
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    )
}