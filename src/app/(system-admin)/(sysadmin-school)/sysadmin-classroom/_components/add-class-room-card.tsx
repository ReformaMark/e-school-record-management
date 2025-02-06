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
import { useConvexMutation } from "@convex-dev/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { api } from "../../../../../../convex/_generated/api"

export const roomTypes = ["REGULAR", "LABORATORY", "COMPUTER_LAB"] as const;

export const roomSchema = z.object({
    name: z.string().min(1, "Room name is required"),
    capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
    type: z.enum(["REGULAR", "LABORATORY", "COMPUTER_LAB"]),
    teacherId: z.string().min(1, "Teacher is required"),
    description: z.string().optional(),
    features: z.array(z.string()).optional()
});

export type RoomFormData = z.infer<typeof roomSchema>;

export const AddClassRoomCard = () => {
    const teachers = useQuery(api.classroom.getTeachers);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<RoomFormData>({
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
        if (selectedTeacher) {
            setValue("teacherId", teacherId);
            setValue("name", `Room ${selectedTeacher.lastName}`);
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
                // @ts-expect-error slight type mismatch, teacherId in zod is string but expects Id users no errors will happen here
                handleSubmit(data => createRoom(data))}>
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