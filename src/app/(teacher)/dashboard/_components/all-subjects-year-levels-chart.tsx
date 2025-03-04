"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export function AllSubjectsYearLevelsChart() {
    const stats = useQuery(api.quarterlyGrades.getInterventionStats, {});

    if (!stats) return <div>Loading...</div>;

    const processedData = stats.reduce((acc, curr) => {
        const subjectData = acc.find(d => d.subject === curr.subjectName);
        if (!subjectData) {
            acc.push({
                subject: curr.subjectName,
                preIntervention: curr.grades.reduce((sum, g) => sum + g.originalGrade, 0) / curr.grades.length,
                postIntervention: curr.grades.reduce((sum, g) => sum + (g.interventionGrade || g.originalGrade), 0) / curr.grades.length
            });
        }
        return acc;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, [] as any[]);

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
                <CardTitle className="text-text">All Subjects and Year Levels</CardTitle>
                <CardDescription className="text-muted-foreground">Comparison of pre and post-intervention performance across all subjects and year levels</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
                            <BarChart accessibilityLayer data={processedData}>
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