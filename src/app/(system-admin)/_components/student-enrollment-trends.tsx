"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const StudentEnrollmentTrends = () => {
    const enrollmentData = [
        { year: 2018, students: 800 },
        { year: 2019, students: 900 },
        { year: 2020, students: 500 },
        { year: 2021, students: 700 },
        { year: 2022, students: 1200 },
    ]

    const chartConfig = {
        students: {
            label: "Students",
            color: "hsl(var(--pieChart-3))",
        }
    } satisfies ChartConfig

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-text">Student Enrollment Trends</CardTitle>
                <CardDescription>Number of students enrolled from 2018 to 2022</CardDescription>
            </CardHeader>
            <CardContent>
                {/* <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]"> */}
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
                {/* </div>
                </div> */}
            </CardContent>
        </Card>
    )
}