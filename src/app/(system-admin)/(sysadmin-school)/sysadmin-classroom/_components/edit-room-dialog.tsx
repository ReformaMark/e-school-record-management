"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackOptions } from "@/lib/constants";
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { RoomFormData, roomSchema, roomTypes } from "./add-class-room-card";
import { RoomWithTeacher } from "./classroom-columns";

interface EditRoomDialogProps {
    open: boolean;
    onClose: () => void;
    room: RoomWithTeacher;
}

export const EditRoomDialog = ({ open, onClose, room }: EditRoomDialogProps) => {
    const [selectedGradeLevelId, setSelectedGradeLevelId] = useState<Id<"gradeLevels"> | null>(null);
    const teachers = useQuery(api.classroom.getTeachers);
    const gradeLevels = useQuery(api.gradeLevel.get);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RoomFormData>({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            name: room.name,
            capacity: room.capacity,
            type: room.type as "REGULAR" | "LABORATORY" | "COMPUTER_LABORATORY" | undefined,
            teacherId: room.teacherId,
            description: room.description,
            // gradeLevel: room.name.split("-")[0]
        }
    });

    const { mutate: updateRoom, isPending } = useMutation({
        mutationFn: useConvexMutation(api.classroom.update),
        onSuccess: () => {
            toast.success("Room updated successfully");
            onClose();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleGradeLevelSelect = (level: string) => {
        const teacher = teachers?.find(t => t._id === watch("teacherId"));
        const gradeLevel = gradeLevels?.find(g => g.level === level);

        if (teacher && gradeLevel) {
            setValue("gradeLevel", level);
            setValue("name", `${level}-${teacher.lastName}`);
            setSelectedGradeLevelId(gradeLevel._id);
        }
    };

    const handleTeacherSelect = (teacherId: Id<"users">) => {
        const selectedTeacher = teachers?.find(t => t._id === teacherId);
        const gradeLevel = watch("gradeLevel")

        if (selectedTeacher) {
            setValue("teacherId", teacherId);
            setValue("name", `${gradeLevel}-${selectedTeacher.lastName}`);
        }
    };

    const handleTrackSelect = (track: "ACADEMIC" | "IMMERSION" | "TVL" | "SPORTS" | "ARTS") => {
        const teacher = teachers?.find(t => t._id === watch("teacherId"));
        const gradeLevel = watch("gradeLevel");

        if (teacher && (gradeLevel?.startsWith("Grade 11") || gradeLevel?.startsWith("Grade 12"))) {
            setValue("name", `${gradeLevel}-${track}-${teacher.lastName}`);
            setValue("track", track)
        }
    };

    const onSubmit = (data: RoomFormData) => {
        const { ...submitData } = data;
        updateRoom({
            id: room._id,
            ...submitData,
            gradeLevelId: selectedGradeLevelId ?? undefined,
            teacherId: data.teacherId as Id<"users">
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="text-black bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Room</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 mt-7">
                    <div className="grid gap-8 mt-7">
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
                            <>
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

                                <div className="grid gap-2">
                                    <Label>Strand</Label>
                                    <Input
                                        {...register("strand")}
                                        placeholder="Enter strand"
                                    />
                                </div>
                            </>
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
                    </div>
                    <Button type="submit" disabled={isPending} className="text-white mt-3">
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};