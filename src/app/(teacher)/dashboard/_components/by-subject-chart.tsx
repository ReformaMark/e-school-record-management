"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BySubjectChartProps {
    subject: string
}

export function BySubjectChart({ subject }: BySubjectChartProps) {
    const data = [
        { subject: "Math", preIntervention: 75, postIntervention: 93 },
        { subject: "Science", preIntervention: 75, postIntervention: 90 },
        { subject: "English", preIntervention: 80, postIntervention: 89 },
        { subject: "History", preIntervention: 79, postIntervention: 92 },
        { subject: "MAPEH", preIntervention: 78, postIntervention: 98 },
    ]

    const chartConfig = {
        preIntervention: {
            label: "Pre-Intervention",
            color: "hsl(var(--pieChart-1))",
        },
        postIntervention: {
            label: "Post-Intervention",
            color: "hsl(var(--pieChart-3))",
        },
    }

    return (
        <Card className=" lg:w-fit">
            <CardHeader>
                <CardTitle className="text-text">Performance by Subject: {subject}</CardTitle>
                <CardDescription className="text-muted-foreground">Comparison of pre and post-intervention performance for {subject} across year levels</CardDescription>
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
                                <Bar dataKey="preIntervention" fill="var(--color-preIntervention)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="postIntervention" fill="var(--color-postIntervention)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}