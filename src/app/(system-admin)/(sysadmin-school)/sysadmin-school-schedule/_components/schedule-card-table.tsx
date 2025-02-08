"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { ScheduleColumns } from "./schedule-columns";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const ScheduleCardTable = () => {
    const [selectedDay, setSelectedDay] = useState<string>("all");
    const schedules = useQuery(api.schedules.get);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Update the filtering logic
    const filteredSchedules = selectedDay !== "all"
        ? schedules?.filter(schedule => schedule.day === selectedDay)
        : schedules;

    return (
        <Card className="xl:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Class Schedules</CardTitle>
                        <CardDescription>
                            Manage your class schedules here
                        </CardDescription>
                    </div>
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
                </div>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={ScheduleColumns}
                    data={filteredSchedules ?? []}
                    filter="teacher"
                    placeholder="Filter by teacher..."
                />
            </CardContent>
        </Card>
    );
};