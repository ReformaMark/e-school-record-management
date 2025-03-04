"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { api } from "../../../../../convex/_generated/api"

interface BySubjectYearLevelChartProps {
    subject: string
    yearLevel: string
}

export function BySubjectYearLevelChart({ subject, yearLevel }: BySubjectYearLevelChartProps) {
    const stats = useQuery(api.quarterlyGrades.getInterventionStats, {
        subjectFilter: subject,
        yearLevelFilter: yearLevel
    });

    if (!stats) return <div>Loading...</div>;

    // Process weekly data
    const processedData = stats.flatMap(stat =>
        stat.grades.map((g, idx) => ({
            week: idx + 1,
            preIntervention: g.originalGrade,
            postIntervention: g.interventionGrade || g.originalGrade
        }))
    );

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
        <Card className="lg:w-fit">
            <CardHeader>
                <CardTitle className="text-text">Performance by Subject and Year Level</CardTitle>
                <CardDescription className="text-muted-foreground">Comparison of pre and post-intervention performance for {subject} in {yearLevel}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
                            <LineChart accessibilityLayer data={processedData}>
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
                                <Line type="monotone" dataKey="preIntervention" strokeWidth={2} stroke="var(--color-preIntervention)" />
                                <Line type="monotone" dataKey="postIntervention" strokeWidth={2} stroke="var(--color-postIntervention)" />
                            </LineChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}