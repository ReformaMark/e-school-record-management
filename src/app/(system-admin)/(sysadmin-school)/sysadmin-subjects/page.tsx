import { DataTable } from "@/components/data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { subjectsColumns, subjectsData } from "../../../../../data/subjects-data";
import { AddSubjectsCard } from "./_components/add-subjects-card";

const SystemAdminSubjectsPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
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

                    <AddSubjectsCard />
                </div>
            </main>
        </div>
    )
}

export default SystemAdminSubjectsPage;