"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis } from "recharts"

interface BySubjectYearLevelChartProps {
    subject: string
    yearLevel: string
}

export function BySubjectYearLevelChart({ subject, yearLevel }: BySubjectYearLevelChartProps) {
    const data = [
        { week: 1, preIntervention: 70, postIntervention: 72 },
        { week: 2, preIntervention: 72, postIntervention: 75 },
        { week: 3, preIntervention: 75, postIntervention: 80 },
        { week: 4, preIntervention: 78, postIntervention: 85 },
        { week: 5, preIntervention: 80, postIntervention: 88 },
        { week: 6, preIntervention: 82, postIntervention: 90 },
    ]

    const chartConfig = {
        preIntervention: {
            label: "Pre-Intervention",
            color: "hsl(142, 76%, 36%)", // Dark Green
        },
        postIntervention: {
            label: "Post-Intervention",
            color: "hsl(24.6, 95%, 53.1%)", // Medium Green
        },
    }

    return (
        <Card className="bg-green-50">
            <CardHeader>
                <CardTitle className="text-green-800 text-lg sm:text-xl md:text-2xl">Performance by Subject and Year Level</CardTitle>
                <CardDescription className="text-green-600 text-sm sm:text-base">Comparison of pre and post-intervention performance for {subject} in {yearLevel}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
                            <LineChart accessibilityLayer data={data}>
                                <XAxis
                                    dataKey="week"
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
                                <Line type="monotone" dataKey="preIntervention" strokeWidth={2} stroke="hsl(142, 76%, 36%)" />
                                <Line type="monotone" dataKey="postIntervention" strokeWidth={2} stroke="hsl(24.6, 95%, 53.1%)" />
                            </LineChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}