import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { sectionColumns, sectionData } from "../../data/section-data";

export const SchoolSectionCardTable = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>Manage the list of sections.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={sectionColumns}
                    data={sectionData}
                    filter="sectionName"
                    placeholder="by section name"
                />
            </CardContent>
        </Card>
    )
}