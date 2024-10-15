"use client"

import { Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ActualInterventionPerformanceChartProps {
    studentId: string
    subject: string
}

export function ActualInterventionPerformanceChart({ studentId, subject }: ActualInterventionPerformanceChartProps) {
    const data = [
        { quarter: "Pre", score: 75 },
        { quarter: "1st", score: 80 },
        { quarter: "2nd", score: 85 },
        { quarter: "3rd", score: 88 },
        { quarter: "4th", score: 92 },
    ]

    const chartConfig = {
        score: {
            label: "Score",
            color: "hsl(var(--chart-primary))",
        },
    }

    console.log(studentId);

    return (
        <Card className="lg:w-fit">
            <CardHeader>
                <CardTitle className="text-text">Actual Intervention Performance</CardTitle>
                <CardDescription className="text-muted-foreground">Quarterly scores after intervention for {subject}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full overflow-x-auto">
                    <div className="min-w-[300px]">
                        <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
                            <LineChart accessibilityLayer data={data}>
                                <XAxis
                                    dataKey="quarter"
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
                                <Line type="monotone" dataKey="score" strokeWidth={2} stroke="var(--color-score)" />
                            </LineChart>
                        </ChartContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}