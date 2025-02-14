"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useState } from "react";

interface EditScheduleModalProps {
    initialSchedule: {
        days: string[];
        schoolPeriodId: string;
        roomId: string;
    };
    onScheduleEdit: (schedule: {
        days: string[];
        schoolPeriodId: string;
        roomId: string;
    }) => void;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    schoolPeriods: any[];
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    rooms: any[];
}

export const EditScheduleModal = ({
    initialSchedule,
    onScheduleEdit,
    schoolPeriods,
    rooms
}: EditScheduleModalProps) => {
    const [open, setOpen] = useState(false);
    const [days, setDays] = useState<string[]>(initialSchedule.days);
    const [schoolPeriodId, setSchoolPeriodId] = useState(initialSchedule.schoolPeriodId);
    const [roomId, setRoomId] = useState(initialSchedule.roomId);

    const handleSubmit = () => {
        onScheduleEdit({
            days,
            schoolPeriodId,
            roomId,
        });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Schedule
                </Button>
            </DialogTrigger>
            <DialogContent className="text-black bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Schedule</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Days</Label>
                        <MultiSelect
                            options={[
                                { label: "Monday", value: "Mon" },
                                { label: "Tuesday", value: "Tue" },
                                { label: "Wednesday", value: "Wed" },
                                { label: "Thursday", value: "Thu" },
                                { label: "Friday", value: "Fri" },
                                { label: "Saturday", value: "Sat" }
                            ]}
                            value={days}
                            onValueChange={setDays}
                            placeholder="Select days"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Period</Label>
                        <Select onValueChange={setSchoolPeriodId} value={schoolPeriodId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                {schoolPeriods?.map((period) => (
                                    <SelectItem key={period._id} value={period._id}>
                                        {period.timeRange}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Room</Label>
                        <Select onValueChange={setRoomId} value={roomId}>
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

                    <Button
                        type="button"
                        className="w-full text-white"
                        onClick={handleSubmit}
                        disabled={!days.length || !schoolPeriodId || !roomId}
                    >
                        Update Schedule
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};