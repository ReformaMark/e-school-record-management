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
import { api } from "../../convex/_generated/api";
import { sectionColumns } from "../../data/section-data";

export const SchoolSectionCardTable = () => {
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
                        data={sections}
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