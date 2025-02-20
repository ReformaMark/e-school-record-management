'use client'
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
import { ColumnDef } from "@tanstack/react-table";
import { SectionWithDetails } from "../../../../../../data/section-data";
import { Id } from "../../../../../../convex/_generated/dataModel";

const sectionColumns: ColumnDef<SectionWithDetails>[] = [
    {
        accessorKey: "name",
        header: "Section Name",
        cell: ({ row }) => {
            const sectionName = row.original.name
            return (
                <div>
                    {sectionName}
                </div>
            )
        }
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
        cell: ({ row }) => {
            const gradeLevel = row.original.gradeLevel?.level
            return (
                <div>
                    {gradeLevel}
                </div>
            )
        }
    },
    {
        accessorKey: "classes",
        header: "Classes Count",
        cell: ({ row }) => {
            return <div>{row.original.classes.length}</div>;
        }
    },
    {
        accessorKey: "roomNumber",
        header: "Room Name",
        cell: function Cell({ row }) {
            const roomId = row.original.roomId as Id<"rooms">

            const room = useQuery(api.classroom.getRoomById, {
                roomId: roomId
            })

            if (!room) return <div>No room assigned</div>
            return (
                <div>
                    {room.name}
                </div>
            )
        }
    },
    {
        id: "schoolYear",
        accessorKey: "schoolYear",
        header: "School Year",
        cell: ({ row }) => {
            const schoolYear = row.original.schoolYear?.sy ?? 'Not set';
            return <div>{schoolYear}</div>;
        }
    },
    {
        accessorKey: "advisor",
        header: "Adviser",
        cell: ({ row }) => {
            const advisor = row.original.advisor;
            const fullName = advisor
                ? `${advisor.firstName} ${advisor.middleName || ''} ${advisor.lastName}`.trim()
                : 'No advisor assigned';

            return <div>{fullName}</div>;
        }
    },
]

export const SchoolSectionCardTableSH = () => {
    const sections = useQuery(api.sections.getSections)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>Manage the list of sections.</CardDescription>
            </CardHeader>
            <CardContent>
                {sections && (
                    <DataTable
                        columns={sectionColumns}
                        // @ts-expect-error slight type issue
                        data={sections ?? []}
                        filter="name"
                        placeholder="by section name"
                    />
                )}
                {/* <DataTable
                    columns={sectionColumns}
                    data={sections as SectionWithDetails[]}
                    filter="sectionName"
                    placeholder="by section name"
                /> */}
            </CardContent>
        </Card>
    )
}