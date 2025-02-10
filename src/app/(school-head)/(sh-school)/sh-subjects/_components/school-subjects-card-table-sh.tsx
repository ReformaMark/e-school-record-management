"use client"

import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";

type SubjectWithGradeLevel = Doc<"subjects"> & {
    gradeLevel?: Doc<"gradeLevels"> | null;
};

const SubjectsColumns: ColumnDef<SubjectWithGradeLevel>[] = [
    {
        accessorKey: "name",
        header: "Subject Name",
    },
    {
        accessorKey: "subjectCode",
        header: "Subject Code",
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
        cell: ({ row }) => {
            const gradeLevel = row.original.gradeLevel;
            return gradeLevel ? `${gradeLevel.level}` : "Not assigned";
        }
    },
    {
        accessorKey: "subjectCategory",
        header: "Category",
    },
]

export const SchoolSubjectsCardTableSH = () => {
    const subjects = useQuery(api.subjects.getSubjectWithGradeLevel);

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