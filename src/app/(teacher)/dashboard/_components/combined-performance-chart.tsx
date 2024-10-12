"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CombinedPerformanceChartProps {
    studentId: string
    subject: string
}

export function CombinedPerformanceChart({ studentId, subject }: CombinedPerformanceChartProps) {
    
    const data = [
        { quarter: "1st Quarter", currentYear: 85, previousYear: 80, classAverage: 82 },
        { quarter: "2nd Quarter", currentYear: 88, previousYear: 82, classAverage: 84 },
        { quarter: "3rd Quarter", currentYear: 92, previousYear: 85, classAverage: 86 },
        { quarter: "4th Quarter", currentYear: 90, previousYear: 88, classAverage: 88 },
    ]

    const chartConfig = {
        currentYear: {
            label: "Current Year",
            color: "hsl(142, 76%, 36%)", // Dark Green
        },
        previousYear: {
            label: "Previous Year",
            color: "hsl(142, 76%, 56%)", // Medium Green
        },
        classAverage: {
            label: "Class Average",
            color: "hsl(142, 76%, 76%)", // Light Green
        },
    }

    console.log(studentId);

    return (
        <Card className="bg-green-50 lg:w-fit">
            <CardHeader>
                <CardTitle className="text-green-800">Combined Performance</CardTitle>
                <CardDescription className="text-green-600">Current year, Previous year, and Class Average for {subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[400px]">
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
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="currentYear" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="previousYear" fill="hsl(142, 76%, 56%)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="classAverage" fill="hsl(142, 76%, 76%)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}