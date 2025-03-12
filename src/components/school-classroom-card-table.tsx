"use client"

import { ClassroomColumns, RoomWithTeacher } from "@/app/(system-admin)/(sysadmin-school)/sysadmin-classroom/_components/classroom-columns";
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
import { api } from "../../convex/_generated/api";

export const SchoolClassroomCardTable = () => {
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