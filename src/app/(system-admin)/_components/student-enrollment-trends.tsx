"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { api } from "../../../../convex/_generated/api"

export const StudentEnrollmentTrends = () => {
    const enrollmentData = useQuery(api.students.getEnrollmentTrends);

    if (!enrollmentData) {
        return (
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="text-text">Student Enrollment Trends</CardTitle>
                    <CardDescription>Historical enrollment data</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                        Loading...
                    </div>
                </CardContent>
            </Card>
        );
    }

    const chartConfig = {
        students: {
            label: "Students",
            color: "hsl(var(--pieChart-3))",
        }
    } satisfies ChartConfig;

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-text">Student Enrollment Trends</CardTitle>
                <CardDescription>Historical enrollment data</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
                            <BarChart accessibilityLayer data={enrollmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="year"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    stroke="hsl(142, 76%, 36%)"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke="hsl(142, 76%, 36%)"
                                    tickFormatter={(value) => `${value}`}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="students"
                                    fill="var(--color-students)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};