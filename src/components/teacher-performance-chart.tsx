"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

const teacherPerformanceData = [
    { name: 'Student Achievement', score: 85 },
    { name: 'Lesson Planning', score: 90 },
    { name: 'Classroom Management', score: 78 },
    { name: 'Professional Development', score: 92 },
    { name: 'Parent Communication', score: 88 },
];

const chartConfig: ChartConfig = {
    score: {
        label: 'Score',
        color: 'hsl(var(--chart-1))',
    },
    name: {
        label: 'Category',
        color: 'hsl(var(--chart-2))',
    },
}

export function TeacherPerformanceChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Teacher Performance Overview</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={teacherPerformanceData} width={600} height={300}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 10)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="score" fill="#099443" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total performance for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
