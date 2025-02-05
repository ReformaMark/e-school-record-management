"use client"

import { SubjectsColumns } from "@/app/(system-admin)/(sysadmin-school)/sysadmin-subjects/_components/subjects-column";
import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const SchoolSubjectsCardTable = () => {
    const subjects = useQuery(api.subjects.getSubjects);

    return (
        <Card
            className="xl:col-span-2"
        >
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Subjects</CardTitle>
                    <CardDescription>
                        View and manage subjects
                    </CardDescription>
                </div>
                {/* <Button asChild size="sm" className="ml-auto gap-1">
                                <Link href="#">
                                    View All
                                    <ArrowUpRightIcon className="h-4 w-4" />
                                </Link>
                            </Button> */}
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={SubjectsColumns}
                    data={subjects ?? []}
                    filter="name"
                    placeholder="by subject name"
                />
            </CardContent>
        </Card>
    )
}