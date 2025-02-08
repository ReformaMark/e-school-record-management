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


import {
    ChevronLeft,
    MinusIcon,
    PlusIcon
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

const classScheduleSchema = z.object({
    subjectId: z.string().min(1, "Subject is required"),
    teacherId: z.string().min(1, "Teacher is required"),
    scheduleId: z.string().min(1, "Schedule is required"),
    semester: z.string().optional(),
    track: z.string().optional()
});

export const sectionSchema = z.object({
    name: z.string().min(1, "Section name is required"),
    gradeLevelId: z.string().min(1, "Grade level is required"),
    advisorId: z.string().min(1, "Advisor is required"),
    schoolYearId: z.string().min(1, "School year is required"),
    classes: z.array(classScheduleSchema).min(1, "At least one class is required")
});

export type SectionFormData = z.infer<typeof sectionSchema>;

const SystemAdminAddSectionPage = () => {
    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<SectionFormData>({
        resolver: zodResolver(sectionSchema),
        defaultValues: {
            name: "",
            gradeLevelId: "",
            advisorId: "",
            schoolYearId: "",
            classes: [{
                subjectId: "",
                teacherId: "",
                scheduleId: "",
                semester: "",
                track: ""
            }]
        }
    });

    const formValues = watch()

    const { fields, append, remove } = useFieldArray({
        control,
        name: "classes"
    });

    const teachers = useQuery(api.users.getTeachers);
    const subjects = useQuery(api.subjects.getSubjects);
    const schoolYears = useQuery(api.schoolYear.get);
    const gradeLevels = useQuery(api.gradeLevel.get);
    const schedules = useQuery(api.schedules.get);

    const { mutate: createSection, isPending } = useMutation({
        mutationFn: useConvexMutation(api.sections.create),
        onSuccess: () => {
            toast.success("Section created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

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
        append({
            subjectId: "",
            teacherId: fields.length === 0 ? formValues.advisorId : "", // Set advisor for first class
            scheduleId: "",
            semester: "",
            track: ""
        });
    };

    const onSubmit = (data: SectionFormData) => {
        console.log("Form Data:", data);

        createSection({
            ...data,
            advisorId: data.advisorId as Id<"users">,
            gradeLevelId: data.gradeLevelId as Id<"gradeLevels">,
            schoolYearId: data.schoolYearId as Id<"schoolYears">,
            classes: data.classes.map(cls => ({
                ...cls,
                subjectId: cls.subjectId as Id<"subjects">,
                teacherId: cls.teacherId as Id<"users">,
                scheduleId: cls.scheduleId as Id<"schedules">
            }))
        });
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
                                Add a Section
                            </h1>

                            {/* Button for desktop/laptop users */}
                            <div className="hidden items-center gap-2 md:flex md:ml-auto">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="text-white"
                                    disabled={isPending}
                                >
                                    {isPending ? "Creating..." : "Save Section"}
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
                                                <Select onValueChange={(value) => setValue("schoolYearId", value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select School Year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {schoolYears?.map((sy) => (
                                                            <SelectItem key={sy._id} value={sy._id}>
                                                                {sy.startDate} - {sy.endDate}
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
                                                    <Select onValueChange={(value) => setValue("gradeLevelId", value)}>
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

                                                <div className="grid gap-2">
                                                    <Label>Adviser</Label>
                                                    <Select onValueChange={(value) => setValue("advisorId", value)}>
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
                                                <div key={field.id} className="grid gap-4 lg:grid-cols-4">
                                                    <div className="grid gap-2">
                                                        <Label>Subject</Label>
                                                        <Select
                                                            onValueChange={(value) => setValue(`classes.${index}.subjectId`, value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={index === 0 ? "Adviser's subject" : "Select subject"} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {subjects?.map((subject) => (
                                                                    <SelectItem key={subject._id} value={subject._id}>
                                                                        {subject.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.classes?.[index]?.subjectId && (
                                                            <p className="text-sm text-red-500">{errors.classes[index].subjectId.message}</p>
                                                        )}
                                                    </div>

                                                    <div className="grid gap-2">
                                                        <Label>{index === 0 ? "Adviser" : "Teacher"}</Label>
                                                        <Select
                                                            onValueChange={(value) => setValue(`classes.${index}.teacherId`, value)}
                                                            defaultValue={index === 0 ? formValues.advisorId : undefined}
                                                            disabled={index === 0} // Disable for advisor's class
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

                                                    <div className="grid gap-2">
                                                        <Label>{index === 0 ? "Adviser's Schedule" : "Schedule"}</Label>
                                                        <Select
                                                            onValueChange={(value) => setValue(`classes.${index}.scheduleId`, value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select schedule" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {schedules?.map((schedule) => (
                                                                    <SelectItem key={schedule._id} value={schedule._id}>
                                                                        {schedule.day} - {schedule.period?.timeRange}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.classes?.[index]?.scheduleId && (
                                                            <p className="text-sm text-red-500">
                                                                {errors.classes[index].scheduleId.message}
                                                            </p>
                                                        )}
                                                    </div>

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

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleAddClass}
                                            >
                                                <PlusIcon className="h-4 w-4 mr-2" />
                                                Add Class
                                            </Button>
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
            <DevTool control={control} />
        </div>
    )
}

export default SystemAdminAddSectionPage;