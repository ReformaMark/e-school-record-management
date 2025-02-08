"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Id } from "../../../../../../convex/_generated/dataModel";

const scheduleSchema = z.object({
    day: z.string().min(1, "Day is required"),
    schoolPeriodId: z.string().min(1, "Period is required"),
    roomId: z.string().min(1, "Room is required"),
    teacherId: z.string().min(1, "Teacher is required")
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

export const AddScheduleCard = () => {
    const teachers = useQuery(api.users.getTeachers);
    const rooms = useQuery(api.classroom.get);
    const periods = useQuery(api.schoolPeriod.get);

    const { handleSubmit, setValue, reset, formState: { errors } } = useForm<ScheduleFormData>({
        resolver: zodResolver(scheduleSchema)
    });

    const { mutate: createSchedule, isPending } = useMutation({
        mutationFn: useConvexMutation(api.schedules.create),
        onSuccess: () => {
            toast.success("Schedule created successfully");
            reset();
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Schedule</CardTitle>
                <CardDescription>Create a new class schedule</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit((data) => createSchedule({
                ...data,
                roomId: data.roomId as Id<"rooms">,
                schoolPeriodId: data.schoolPeriodId as Id<"schoolPeriods">,
                teacherId: data.teacherId as Id<"users">,
            }))}>
                <CardContent className="space-y-4">
                    {/* Existing Day Selection */}
                    <div className="space-y-2">
                        <Label>Day</Label>
                        <Select onValueChange={(value) => setValue("day", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                                {days.map((day) => (
                                    <SelectItem key={day} value={day}>
                                        {day}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.day && (
                            <p className="text-sm text-red-500">{errors.day.message}</p>
                        )}
                    </div>

                    {/* School Period Selection */}
                    <div className="space-y-2">
                        <Label>Time Period</Label>
                        <Select onValueChange={(value) => setValue("schoolPeriodId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                {periods?.map((period) => (
                                    <SelectItem key={period._id} value={period._id}>
                                        {period.timeRange}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.schoolPeriodId && (
                            <p className="text-sm text-red-500">{errors.schoolPeriodId.message}</p>
                        )}
                    </div>

                    {/* Room Selection */}
                    <div className="space-y-2">
                        <Label>Room</Label>
                        <Select onValueChange={(value) => setValue("roomId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                                {rooms?.map((room) => (
                                    <SelectItem key={room._id} value={room._id}>
                                        {room.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.roomId && (
                            <p className="text-sm text-red-500">{errors.roomId.message}</p>
                        )}
                    </div>

                    {/* Teacher Selection */}
                    <div className="space-y-2">
                        <Label>Teacher</Label>
                        <Select onValueChange={(value) => setValue("teacherId", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                {teachers?.map((teacher) => (
                                    <SelectItem key={teacher.id} value={teacher.id}>
                                        {teacher.lastName}, {teacher.firstName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.teacherId && (
                            <p className="text-sm text-red-500">{errors.teacherId.message}</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={isPending} className="text-white">
                        {isPending ? "Creating..." : "Create Schedule"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}