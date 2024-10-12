"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function AllSubjectsYearLevelsChart() {
    const data = [
        { subject: "Math", preIntervention: 75, postIntervention: 85 },
        { subject: "Science", preIntervention: 70, postIntervention: 82 },
        { subject: "English", preIntervention: 80, postIntervention: 88 },
        { subject: "History", preIntervention: 72, postIntervention: 80 },
    ]

    const chartConfig = {
        preIntervention: {
            label: "Pre-Intervention",
            color: "hsl(142, 76%, 36%)", // Dark Green
        },
        postIntervention: {
            label: "Post-Intervention",
            color: "hsl(142, 76%, 56%)", // Medium Green
        },
    }

    return (
        <Card className="bg-green-50 lg:w-fit">
            <CardHeader>
                <CardTitle className="text-green-800">All Subjects and Year Levels</CardTitle>
                <CardDescription className="text-green-600">Comparison of pre and post-intervention performance across all subjects and year levels</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
                            <BarChart accessibilityLayer data={data}>
                                <XAxis
                                    dataKey="subject"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    stroke="hsl(142, 76%, 36%)"
                                    fontSize={12}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke="hsl(142, 76%, 36%)"
                                    domain={[0, 100]}
                                    ticks={[0, 25, 50, 75, 100]}
                                    fontSize={12}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="preIntervention" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="postIntervention" fill="hsl(142, 76%, 56%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}