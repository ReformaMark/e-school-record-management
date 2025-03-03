"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

interface StudentPerformanceChartProps {
    studentId: Id<"students">
    subjectId: Id<"subjects">
    classId: Id<"classes">
}

export function StudentPerformanceChart({
    studentId,
    subjectId,
    classId
}: StudentPerformanceChartProps) {
    const students = useQuery(api.students.getStudentsWithGrades, {
        classId,
        subjectId
    });

    const subject = useQuery(api.subjects.getById, { id: subjectId });

    console.log('Students Data:', students);
    console.log('Selected Student:', studentId);
    console.log('Selected Class:', classId);
    console.log('Selected Subject:', subjectId);

    if (!students || !subject) {
        return (
            <Card className="lg:w-fit">
                <CardHeader>
                    <CardTitle className="text-text">Student Performance</CardTitle>
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
                    <CardTitle className="text-text">Student Performance</CardTitle>
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

    const chartData = studentData.grades
        .map(grade => ({
            quarter: `Q${grade.quarter}`,
            score: grade.quarterlyGrade
        }))
        .sort((a, b) => a.quarter.localeCompare(b.quarter));

    const chartConfig = {
        score: {
            label: "Score",
            color: "hsl(var(--pieChart-1))",
        },
    }

    return (
        <Card className="lg:w-fit">
            <CardHeader>
                <CardTitle className="text-text">Student Performance</CardTitle>
                <CardDescription className="text-muted-foreground">
                    Quarterly scores for {subject.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
                            <BarChart accessibilityLayer data={chartData}>
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
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="score"
                                    fill="var(--color-score)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}