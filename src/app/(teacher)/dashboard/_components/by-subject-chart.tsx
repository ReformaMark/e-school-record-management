"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

interface BySubjectChartProps {
    subject: string
}

export function BySubjectChart({ subject }: BySubjectChartProps) {
    const stats = useQuery(api.quarterlyGrades.getInterventionStats, {
        subjectFilter: subject
    });

    if (!stats) return <div>Loading...</div>;

    // Group and aggregate data by subject
    const processedData = stats.reduce((acc, curr) => {
        // Find or create subject entry
        let subjectData = acc.find(d => d.subject === curr.subjectName);

        if (!subjectData) {
            subjectData = {
                subject: curr.subjectName,
                totalPreIntervention: 0,
                totalPostIntervention: 0,
                validGradesCount: 0
            };
            acc.push(subjectData);
        }

        // Only include valid grades in calculations
        const validGrades = curr.grades.filter(g =>
            g.originalGrade != null && !isNaN(g.originalGrade)
        );

        if (validGrades.length > 0) {
            subjectData.totalPreIntervention += validGrades.reduce(
                (sum, g) => sum + g.originalGrade, 0
            );
            subjectData.totalPostIntervention += validGrades.reduce(
                (sum, g) => sum + (g.interventionGrade || g.originalGrade), 0
            );
            subjectData.validGradesCount += validGrades.length;
        }

        return acc;
    }, [] as Array<{
        subject: string;
        totalPreIntervention: number;
        totalPostIntervention: number;
        validGradesCount: number;
    }>);

    // Calculate averages for final display
    const finalData = processedData.map(d => ({
        subject: d.subject,
        preIntervention: d.validGradesCount > 0
            ? d.totalPreIntervention / d.validGradesCount
            : 0,
        postIntervention: d.validGradesCount > 0
            ? d.totalPostIntervention / d.validGradesCount
            : 0
    }));

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
                <CardTitle className="text-text">Performance by Subject: {subject}</CardTitle>
                <CardDescription className="text-muted-foreground">Comparison of pre and post-intervention performance for {subject} across year levels</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
                            <BarChart accessibilityLayer data={finalData}>
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