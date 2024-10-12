import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { subjectsColumns, subjectsData } from "../../data/subjects-data";

export const SchoolSubjectsCardTable = () => {
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
                    columns={subjectsColumns}
                    data={subjectsData}
                    filter="subject"
                    placeholder="by subject"
                />
            </CardContent>
        </Card>
    )
}