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
import { useConvexMutation } from "@convex-dev/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { roomSchema, roomTypes } from "./add-class-room-card";
import { RoomWithTeacher } from "./classroom-columns";

interface EditRoomDialogProps {
    open: boolean;
    onClose: () => void;
    room: RoomWithTeacher;
}

export const EditRoomDialog = ({ open, onClose, room }: EditRoomDialogProps) => {
    const teachers = useQuery(api.classroom.getTeachers);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(roomSchema),
        defaultValues: {
            name: room.name,
            capacity: room.capacity,
            type: room.type,
            teacherId: room.teacherId,
            description: room.description
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

    const handleTeacherSelect = (teacherId: Id<"users">) => {
        const selectedTeacher = teachers?.find(t => t._id === teacherId);
        if (selectedTeacher) {
            setValue("teacherId", teacherId);
            setValue("name", `Room ${selectedTeacher.lastName}`);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Room</DialogTitle>
                </DialogHeader>
                <form onSubmit={
                    // @ts-expect-error slight type mismatch, teacherId in zod is string but expects Id users no errors will happen here
                    handleSubmit(data => updateRoom({ id: room._id, ...data }))}>
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