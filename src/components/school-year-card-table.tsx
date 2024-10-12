import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { schoolYearColumns, schoolYearData } from "../../data/school-year-data";

export const SchoolYearCardTable = () => {
    return (
        <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
        >
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>School Years</CardTitle>
                    <CardDescription>
                        View and manage school years
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
                    columns={schoolYearColumns}
                    data={schoolYearData}
                    filter="batchName"
                    placeholder="by batch name"
                />
            </CardContent>
        </Card>
    )
}