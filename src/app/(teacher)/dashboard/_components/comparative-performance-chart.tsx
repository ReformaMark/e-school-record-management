"use client"

import { Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ComparativePerformanceChartProps {
    studentId: string
    subject: string
}

export function ComparativePerformanceChart({ studentId, subject }: ComparativePerformanceChartProps) {

    const data = [
        { quarter: "1st Quarter", currentYear: 92, previousYear: 80 },
        { quarter: "2nd Quarter", currentYear: 93, previousYear: 82 },
        { quarter: "3rd Quarter", currentYear: 92, previousYear: 81 },
        { quarter: "4th Quarter", currentYear: 94, previousYear: 88 },
    ]

    const chartConfig = {
        currentYear: {
            label: "Current Year",
            color: "hsl(24.6, 95%, 53.1%)",
        },
        previousYear: {
            label: "Previous Year",
            color: "hsl(142, 76%, 36%)",
        },
    }

    console.log(studentId);

    return (
        <Card className="bg-green-50 lg:w-fit">
            <CardHeader>
                <CardTitle className="text-green-800">Comparative Performance</CardTitle>
                <CardDescription className="text-green-600">Current year vs Previous year for {subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[300px]">
                            <LineChart accessibilityLayer data={data}>
                                <XAxis
                                    dataKey="quarter"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="currentYear" strokeWidth={2} stroke="hsl(24.6, 95%, 53.1%)" />
                                <Line type="monotone" dataKey="previousYear" strokeWidth={2} stroke="hsl(142, 76%, 36%)" />
                            </LineChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}