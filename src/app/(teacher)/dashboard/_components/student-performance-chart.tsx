"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface StudentPerformanceChartProps {
    studentId: string
    subject: string
}

export function StudentPerformanceChart({ studentId, subject }: StudentPerformanceChartProps) {

    const data = [
        { quarter: "1st Quarter", score: 85 },
        { quarter: "2nd Quarter", score: 88 },
        { quarter: "3rd Quarter", score: 92 },
        { quarter: "4th Quarter", score: 90 },
    ]

    const chartConfig = {
        score: {
            label: "Score",
            color: "hsl(142, 76%, 36%)", // Dark Green
        },
    }

    console.log(studentId);

    return (
        <Card className="bg-green-50 lg:w-fit">
            <CardHeader>
                <CardTitle className="text-green-800">Student Performance</CardTitle>
                <CardDescription className="text-green-600">Quarterly scores for {subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
                            <BarChart accessibilityLayer data={data}>
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
                                <Bar dataKey="score" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}