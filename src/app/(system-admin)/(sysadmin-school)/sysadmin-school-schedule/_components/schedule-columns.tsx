"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Doc } from "../../../../../../convex/_generated/dataModel";

type ScheduleWithDetails = Doc<"schedules"> & {
    teacher: Doc<"users"> | null;
    room: Doc<"rooms"> | null;
    period: Doc<"schoolPeriods"> | null;
};

export const ScheduleColumns: ColumnDef<ScheduleWithDetails>[] = [
    {
        accessorKey: "day",
        header: "Day"
    },
    {
        accessorKey: "period",
        header: "Time",
        cell: ({ row }) => {
            const period = row.original.period;
            return period ? `${period.timeRange}` : "Not set";
        }
    },
    {
        accessorKey: "teacher",
        header: "Teacher",
        cell: ({ row }) => {
            const teacher = row.original.teacher;
            return teacher ? `${teacher.lastName}, ${teacher.firstName}` : "Unassigned";
        }
    },
    {
        accessorKey: "room",
        header: "Room",
        cell: ({ row }) => {
            const room = row.original.room;
            return room ? room.name : "Not assigned";
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                        <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                        <Trash2Icon className="h-4 w-4" />
                    </Button>
                </div>
            );
        }
    }
];