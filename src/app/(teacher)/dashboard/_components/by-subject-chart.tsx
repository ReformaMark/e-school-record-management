"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BySubjectChartProps {
    subject: string
}

export function BySubjectChart({ subject }: BySubjectChartProps) {
    const data = [
        { yearLevel: "Year 1", preIntervention: 70, postIntervention: 80 },
        { yearLevel: "Year 2", preIntervention: 75, postIntervention: 85 },
        { yearLevel: "Year 3", preIntervention: 72, postIntervention: 82 },
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
                <CardTitle className="text-green-800">Performance by Subject: {subject}</CardTitle>
                <CardDescription className="text-green-600">Comparison of pre and post-intervention performance for {subject} across year levels</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
                            <BarChart accessibilityLayer data={data}>
                                <XAxis
                                    dataKey="yearLevel"
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