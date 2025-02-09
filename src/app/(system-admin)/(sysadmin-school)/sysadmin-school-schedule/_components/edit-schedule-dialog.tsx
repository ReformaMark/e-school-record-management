"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

interface EditScheduleDialogProps {
    open: boolean;
    onClose: () => void;
    schedule: Doc<"schedules">;
}

export const EditScheduleDialog = ({ open, onClose, schedule }: EditScheduleDialogProps) => {
    const teachers = useQuery(api.users.getTeachers);
    const rooms = useQuery(api.classroom.get);
    const periods = useQuery(api.schoolPeriod.get);
    const updateSchedule = useMutation(api.schedules.update);
    const classes = useQuery(api.classes.getTeacherClasses)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        day: schedule.day,
        schoolPeriodId: schedule.schoolPeriodId,
        roomId: schedule.roomId,
        teacherId: schedule.teacherId,
        classId: schedule.classId
    });

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const selectDays = days.map((d) =>{
        return {
            label: d,
            value: d
        }
    })
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateSchedule({
                id: schedule._id,
                day: formData.day,
                schoolPeriodId: formData.schoolPeriodId as Id<"schoolPeriods">,
                roomId: formData.roomId as Id<"rooms">,
                teacherId: formData.teacherId as Id<"users">
            });
            toast.success("Schedule updated successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to update schedule");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Schedule</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                        <Label>Class</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, classId: value as Id<'classes'> }))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                                {classes?.map((c) => (
                                    <SelectItem key={c?._id} value={c?._id as Id<'classes'>}>
                                        {c?.section.name} - {c?.subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Day</Label>
                        {/* <Select
                            name="day"
                            defaultValue={schedule.day}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, day: value }))}
                        >
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
                        </Select> */}
                        <MultiSelect
                            options={selectDays}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, day: value }))}
                            placeholder="Select Day(s)"
                            variant="default"
                            className='bg-white'
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Time Period</Label>
                        <Select
                            name="periodId"
                            defaultValue={schedule.schoolPeriodId}
                            onValueChange={(value: Id<"schoolPeriods">) => setFormData(prev => ({ ...prev, schoolPeriodId: value }))}
                        >
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
                    </div>

                    <div className="space-y-2">
                        <Label>Room</Label>
                        <Select
                            name="roomId"
                            defaultValue={schedule.roomId}
                            onValueChange={(value: Id<"rooms">) => setFormData(prev => ({ ...prev, roomId: value }))}
                        >
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
                    </div>

                    <div className="space-y-2">
                        <Label>Teacher</Label>
                        <Select
                            name="teacherId"
                            defaultValue={schedule.teacherId}
                            onValueChange={(value: Id<"users">) => setFormData(prev => ({ ...prev, teacherId: value }))}
                        >
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
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};