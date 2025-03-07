"use client"

import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../../convex/_generated/api";
import { ScheduleColumns } from "./schedule-columns";

interface ScheduleCardTableProps {
    isSH?: boolean;
}

export const ScheduleCardTable = ({
    isSH
}: ScheduleCardTableProps) => {
    const [selectedDay, setSelectedDay] = useState<string>("all");
    const [filterType, setFilterType] = useState<"teacher" | "room">("teacher");
    const schedules = useQuery(api.schedules.get) as { day: string }[] | undefined;

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Update the filtering logic
    const filteredSchedules = selectedDay !== "all"
        ? schedules?.filter((schedule) => schedule.day.includes(selectedDay))
        : schedules;

    return (
        <Card className={cn(!isSH ? "xl:col-span-2" : "xl:col-span-3")}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Class Schedules</CardTitle>
                        <CardDescription>
                            Manage your class schedules here
                        </CardDescription>
                    </div>

                    <div className="flex gap-3">
                        <Select
                            value={selectedDay}
                            onValueChange={setSelectedDay}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by day" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Days</SelectItem>
                                {days.map((day) => (
                                    <SelectItem key={day} value={day}>
                                        {day}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filterType}
                            onValueChange={(value: "teacher" | "room") => setFilterType(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="teacher">Teacher Name</SelectItem>
                                <SelectItem value="room">Room</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={ScheduleColumns}
                    // @ts-expect-error slight type issue
                    data={filteredSchedules ?? []}
                    filter={filterType}
                    placeholder={filterType === "teacher" ? "Filter by teacher..." : "Filter by room..."}
                />
            </CardContent>
        </Card>
    );
};