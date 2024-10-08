import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AddSchoolPeriodCard } from "./_components/add-school-period-card";
import { schoolPeriodColumns, schoolPeriodData } from "../../../../../data/school-period-data";

const SystemAdminSchoolPeriodPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>School Periods</CardTitle>
                                <CardDescription>
                                    View and manage school periods
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
                                columns={schoolPeriodColumns}
                                data={schoolPeriodData}
                                filter="period"
                                placeholder="by period"
                            />
                        </CardContent>
                    </Card>

                    <AddSchoolPeriodCard />
                </div>
            </main>
        </div>
    )
}

export default SystemAdminSchoolPeriodPage;