"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { trackOptions } from "@/lib/constants"
import { useConvexMutation } from "@convex-dev/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { api } from "../../../../../../convex/_generated/api"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { useState } from "react"

export const roomTypes = ["REGULAR", "LABORATORY", "COMPUTER_LABORATORY"] as const;

export const roomSchema = z.object({
    name: z.string().min(1, "Room name is required"),
    capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
    type: z.enum(["REGULAR", "LABORATORY", "COMPUTER_LABORATORY"]),
    teacherId: z.string().min(1, "Teacher is required"),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    gradeLevel: z.string().min(1, "Grade level is required").optional(),
    track: z.enum(["core", "academic", "immersion", "tvl", "sports", "arts"]).optional(),
});

export type RoomFormData = z.infer<typeof roomSchema>;

export const AddClassRoomCard = () => {
    const [selectedGradeLevelId, setSelectedGradeLevelId] = useState<Id<"gradeLevels"> | null>(null);
    const teachers = useQuery(api.classroom.getTeachers);
    const gradeLevels = useQuery(api.gradeLevel.get);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RoomFormData>({
        resolver: zodResolver(roomSchema)
    });

    const { mutate: createRoom, isPending } = useMutation({
        mutationFn: useConvexMutation(api.classroom.create),
        onSuccess: () => {
            toast.success("Classroom created successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleTeacherSelect = (teacherId: string) => {
        const selectedTeacher = teachers?.find(t => t._id === teacherId);
        const gradeLevel = watch("gradeLevel")

        if (selectedTeacher) {
            setValue("teacherId", teacherId);
            setValue("name", `${gradeLevel}-${selectedTeacher.lastName}`);
        }
    };

    const handleGradeLevelSelect = (level: string) => {
        const teacher = teachers?.find(t => t._id === watch("teacherId"));
        const gradeLevel = gradeLevels?.find(g => g.level === level)

        if (teacher && gradeLevel) {
            setValue("gradeLevel", level);
            setValue("name", `${level}-${teacher.lastName}`);
            setSelectedGradeLevelId(gradeLevel._id as Id<"gradeLevels">)
        }
    };

    const handleTrackSelect = (track: "core" | "academic" | "immersion" | "tvl" | "sports" | "arts") => {
        const teacher = teachers?.find(t => t._id === watch("teacherId"));
        const gradeLevel = watch("gradeLevel");

        if (teacher && (gradeLevel?.startsWith("Grade 11") || gradeLevel?.startsWith("Grade 12"))) {
            setValue("name", `${gradeLevel}-${track}-${teacher.lastName}`);
        }
    };

    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add Class Room</CardTitle>
                <CardDescription>
                    Fill out the form to add a room
                </CardDescription>
            </CardHeader>
            <form onSubmit={
                handleSubmit(data => {
                    // Remove gradeLevel from data since it's just for display
                    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                    const { gradeLevel, ...submitData } = data;
                    createRoom({
                        ...submitData,
                        gradeLevelId: selectedGradeLevelId ?? undefined,
                        teacherId: data.teacherId as Id<"users">
                    });
                })
            }>
                <CardContent className="grid gap-8 mt-7">
                    <div className="grid gap-2">
                        <Label>Assign Teacher</Label>
                        <Select onValueChange={handleTeacherSelect}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers?.map(teacher => (
                                    <SelectItem key={teacher._id} value={teacher._id}>
                                        {teacher.lastName}, {teacher.firstName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.teacherId && (
                            <p className="text-sm text-red-500">{errors.teacherId.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Grade Level</Label>
                        <Select onValueChange={handleGradeLevelSelect}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                            <SelectContent>
                                {gradeLevels?.map((grade) => (
                                    <SelectItem key={grade._id} value={grade.level}>
                                        {grade.level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.gradeLevel && (
                            <p className="text-sm text-red-500">{errors.gradeLevel.message}</p>
                        )}
                    </div>

                    {(watch("gradeLevel")?.startsWith("Grade 11") || watch("gradeLevel")?.startsWith("Grade 12")) && (
                        <div className="grid gap-2">
                            <Label>Track</Label>
                            <Select onValueChange={handleTrackSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select track" />
                                </SelectTrigger>
                                <SelectContent>
                                    {trackOptions.map((track) => (
                                        <SelectItem key={track.value} value={track.value}>
                                            {track.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label>Room Name</Label>
                        <Input {...register("name")} disabled />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Room Type</Label>
                        <Select onValueChange={(value) => setValue("type", value as typeof roomTypes[number])}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
                                {roomTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type.replace("_", " ")}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-sm text-red-500">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Capacity</Label>
                        <Input type="number" {...register("capacity")} />
                        {errors.capacity && (
                            <p className="text-sm text-red-500">{errors.capacity.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Description (Optional)</Label>
                        <Textarea {...register("description")} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending} className="text-white">
                        {isPending ? "Creating..." : "Create Classroom"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}