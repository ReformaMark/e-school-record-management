"use client"

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { RoomWithTeacher } from "@/app/(system-admin)/(sysadmin-school)/sysadmin-classroom/_components/classroom-columns";
import { api } from "../../../../../../convex/_generated/api";
import { ColumnDef } from "@tanstack/react-table";

const roomTypes = {
    REGULAR: "Regular Classroom",
    LABORATORY: "Science Laboratory",
    COMPUTER_LABORATORY: "Computer Laboratory"
} as const;

const ClassroomColumns: ColumnDef<RoomWithTeacher>[] = [
    {
        accessorKey: "name",
        header: "Room Name"
    },
    {
        accessorKey: "type",
        header: "Room Type",
        cell: ({ row }) => roomTypes[row.original.type as keyof typeof roomTypes]
    },
    {
        accessorKey: "capacity",
        header: "Capacity"
    },
    {
        accessorKey: "teacher",
        header: "Assigned Teacher",
        cell: ({ row }) => {
            const teacher = row.original.teacher;
            return teacher ? `${teacher.lastName}, ${teacher.firstName}` : "Unassigned";
        }
    },
];

export const SchoolClassroomCardTableSH = () => {
    const classroom = useQuery(api.classroom.get)

    return (
        <Card
            className="xl:col-span-2"
        >
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Classrooms</CardTitle>
                    <CardDescription>
                        View and manage rooms
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    {/* <Link href="#">
                                    View All
                                    <ArrowUpRightIcon className="h-4 w-4" />
                                </Link> */}
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={ClassroomColumns}
                    data={(classroom ?? []) as RoomWithTeacher[]}
                    filter="name"
                    placeholder="by room name"
                />
            </CardContent>
        </Card>
    )
}