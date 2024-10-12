"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CombinedInterventionChartProps {
    studentId: string
    subject: string
}

export function CombinedInterventionChart({ studentId, subject }: CombinedInterventionChartProps) {
    const data = [
        { quarter: "Pre", actual: 75, intervention: null, postIntervention: null },
        { quarter: "1st", actual: 78, intervention: 80, postIntervention: 82 },
        { quarter: "2nd", actual: 80, intervention: 85, postIntervention: 88 },
        { quarter: "3rd", actual: 82, intervention: 88, postIntervention: 92 },
        { quarter: "4th", actual: 84, intervention: 90, postIntervention: 95 },
    ]

    const chartConfig = {
        actual: {
            label: "Actual",
            color: "hsl(142, 76%, 36%)", // Dark Green
        },
        intervention: {
            label: "Intervention",
            color: "hsl(142, 76%, 56%)", // Medium Green
        },
        postIntervention: {
            label: "Post-Intervention",
            color: "hsl(142, 76%, 76%)", // Light Green
        },
    }

    console.log(studentId)

    return (
        <Card className="bg-green-50 lg:w-fit">
            <CardHeader>
                <CardTitle className="text-green-800">Combined Intervention Performance</CardTitle>
                <CardDescription className="text-green-600">Comparison of actual, intervention, and post-intervention performance for {subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer
                            config={chartConfig}
                            className="h-[400px]"
                        >
                            <BarChart
                                accessibilityLayer
                                data={data}
                            >
                                <XAxis
                                    dataKey="quarter"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                    stroke="hsl(142, 76%, 36%)"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke="hsl(142, 76%, 36%)"
                                    domain={[0, 100]}
                                    ticks={[0, 20, 40, 60, 80, 100]}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="actual" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="intervention" fill="hsl(142, 76%, 56%)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="postIntervention" fill="hsl(142, 76%, 76%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
