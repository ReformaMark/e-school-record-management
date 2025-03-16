"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddScheduleModalProps {
    onScheduleAdd: (schedule: {
        days: string[];
        schoolPeriodId: string;
        roomId: string;
    }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schoolPeriods: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rooms: any[];
}

export const AddScheduleModal = ({ onScheduleAdd, schoolPeriods, rooms }: AddScheduleModalProps) => {
    const [open, setOpen] = useState(false);
    const [openRoom, setOpenRoom] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [days, setDays] = useState<string[]>([]);
    const [schoolPeriodId, setSchoolPeriodId] = useState("");
    const [roomId, setRoomId] = useState("");

    const handleSubmit = () => {
        onScheduleAdd({
            days,
            schoolPeriodId,
            roomId,
        });
        setOpen(false);
        // Reset form
        setDays([]);
        setSchoolPeriodId("");
        setRoomId("");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Schedule
                </Button>
            </DialogTrigger>
            <DialogContent className="text-black bg-white">
                <DialogHeader>
                    <DialogTitle>Add Schedule</DialogTitle>
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={openRoom}
                                    className="w-full justify-between"
                                >
                                    {roomId ? (
                                        rooms?.find((room) => room._id === roomId)?.name
                                    ) : (
                                        "Select room..."
                                    )}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0">
                                <Command className="room-command">
                                    <CommandInput
                                        placeholder="Search room by name or teacher..."
                                        value={searchValue}
                                        onValueChange={setSearchValue}
                                    />
                                    <CommandList>
                                        <CommandEmpty>No room found.</CommandEmpty>
                                        <CommandGroup>
                                            {!rooms ? (
                                                <CommandItem disabled>Loading rooms...</CommandItem>
                                            ) : rooms.length === 0 ? (
                                                <CommandItem disabled>No rooms available</CommandItem>
                                            ) : (
                                                rooms
                                                    .filter((room) => {
                                                        const teacherFullName = room.teacher
                                                            ? `${room.teacher.lastName}, ${room.teacher.firstName}`
                                                            : '';
                                                        const searchLower = searchValue.toLowerCase();

                                                        return room.name.toLowerCase().includes(searchLower) ||
                                                            teacherFullName.includes(searchLower);
                                                    })
                                                    .map((room) => (
                                                        <CommandItem
                                                            key={room._id}
                                                            value={`${room.name}-${room.teacher?._id || 'no-teacher'}`}
                                                            onSelect={() => {
                                                                setRoomId(room._id);
                                                                setOpenRoom(false);
                                                                setSearchValue("");
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between w-full">
                                                                <span>{room.name}</span>
                                                                <span className="text-muted-foreground">
                                                                    {room.teacher
                                                                        ? `${room.teacher.lastName}, ${room.teacher.firstName}`
                                                                        : 'No teacher'
                                                                    }
                                                                </span>
                                                            </div>
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    room._id === roomId
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))
                                            )}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Button
                        type="button"
                        className="w-full text-white"
                        onClick={handleSubmit}
                        disabled={!days.length || !schoolPeriodId || !roomId}
                    >
                        Add Schedule
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};