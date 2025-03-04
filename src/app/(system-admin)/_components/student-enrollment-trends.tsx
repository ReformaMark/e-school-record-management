"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                            type="monotone"
                            dataKey="students"
                            strokeWidth={2}
                            stroke="var(--color-students)"
                            dot={{ fill: "var(--color-students)", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};