"use client"

import { Bar, BarChart, Legend, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

interface CombinedInterventionChartProps {
    studentId: Id<"students">
    subjectId: Id<"subjects">
    classId: Id<"classes">
}

export function CombinedInterventionChart({
    studentId,
    subjectId,
    classId
}: CombinedInterventionChartProps) {
    // Get both regular and intervention grades
    const students = useQuery(api.students.getStudentsWithGrades, {
        classId,
        subjectId
    });

    const subject = useQuery(api.subjects.getById, { id: subjectId });

    if (!students || !subject) {
        return (
            <Card className="lg:w-fit">
                <CardHeader>
                    <CardTitle className="text-text">Combined Performance</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Loading data...
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                        Loading...
                    </div>
                </CardContent>
            </Card>
        );
    }

    const studentData = students.find(s => s.id === studentId);
    if (!studentData || !studentData.grades || studentData.grades.length === 0) {
        return (
            <Card className="lg:w-fit">
                <CardHeader>
                    <CardTitle className="text-text">Combined Performance</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {subject.name}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                        No grades recorded for this student yet
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Combine and format data for comparison
    const chartData = studentData.grades.map(grade => ({
        quarter: `Q${grade.quarter}`,
        actual: grade.quarterlyGrade,
        intervention: grade.needsIntervention ? grade.interventionGrade : null,
    })).sort((a, b) => a.quarter.localeCompare(b.quarter));

    const chartConfig = {
        actual: {
            label: "Actual Grade",
            color: "hsl(var(--pieChart-1))",
        },
        intervention: {
            label: "After Intervention",
            color: "hsl(var(--chart-2))",
        }
    }

    return (
        <Card className="lg:w-fit">
            <CardHeader>
                <CardTitle className="text-text">Combined Performance</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Comparison of actual vs intervention grades for {subject.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px]">
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                                <ChartTooltip
                                    cursor={false}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                    <div className="grid grid-cols-1 gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                {payload[0].payload.quarter}
                                                            </span>
                                                            <span className="font-bold text-muted-foreground">
                                                                Actual: {payload[0].payload.actual}
                                                            </span>
                                                            {payload[0].payload.intervention && (
                                                                <span className="font-bold text-muted-foreground">
                                                                    After Intervention: {payload[0].payload.intervention}
                                                                </span>
                                                            )}
                                                            {payload[0].payload.intervention && (
                                                                <span className="text-[0.70rem] text-muted-foreground">
                                                                    Improvement: {(payload[0].payload.intervention - payload[0].payload.actual).toFixed(1)}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Legend
                                    verticalAlign="top"
                                    height={36}
                                />
                                <Bar
                                    dataKey="actual"
                                    fill="var(--color-actual)"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="intervention"
                                    fill="var(--color-intervention)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}