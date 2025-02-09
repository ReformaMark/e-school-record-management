'use client'
import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { sectionColumns, sectionData } from "../../data/section-data";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SectionWithDetails } from "@/lib/types";

export const SchoolSectionCardTable = () => {
    const sections = useQuery(api.sections.getSections)
    console.log(sections)
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
                    filter="sectionName"
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