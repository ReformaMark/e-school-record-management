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
        { quarter: "1st", actual: 78, intervention: 90, postIntervention: 91 },
        { quarter: "2nd", actual: 80, intervention: 85, postIntervention: 88 },
        { quarter: "3rd", actual: 82, intervention: 88, postIntervention: 92 },
        { quarter: "4th", actual: 84, intervention: 90, postIntervention: 95 },
    ]

    const chartConfig = {
        actual: {
            label: "Actual",
            color: "hsl(var(--pieChart-2))",
        },
        intervention: {
            label: "Intervention",
            color: "hsl(var(--pieChart-1))",
        },
        postIntervention: {
            label: "Post-Intervention",
            color: "hsl(var(--pieChart-3))",
        },
    }

    console.log(studentId)

    return (
        <Card className="lg:w-fit">
            <CardHeader>
                <CardTitle className="text-text">Combined Intervention Performance</CardTitle>
                <CardDescription className="text-muted-foreground">Comparison of actual, intervention, and post-intervention performance for {subject}</CardDescription>
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
                                <Bar dataKey="actual" fill="var(--color-actual)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="intervention" fill="var(--color-intervention)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="postIntervention" fill="var(--color-postIntervention)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
