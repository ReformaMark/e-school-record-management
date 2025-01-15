"use client"

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { schoolPeriodColumns } from "../../data/school-period-data";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";


export const SchoolPeriodCardTable = () => {
    const schoolPeriodData = useQuery(api.schoolPeriod.get)

    return (
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
                    data={schoolPeriodData || []}
                    filter="period"
                    placeholder="by period"
                />
            </CardContent>
        </Card>
    )
}