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

export const ScheduleCardTable = () => {
    const schedules = useQuery(api.schedules.get);

    return (
        <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>Class Schedules</CardTitle>
                <CardDescription>
                    Manage your class schedules here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={ScheduleColumns}
                    data={schedules ?? []}
                    filter="teacher"
                    placeholder="Filter by teacher..."
                />
            </CardContent>
        </Card>
    );
};