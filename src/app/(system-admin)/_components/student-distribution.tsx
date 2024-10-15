"use client"
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

const studentDistributionData = [
    { name: "grade7", value: 300, fill: "var(--color-grade7)" },
    { name: "grade8", value: 250, fill: "var(--color-grade8)" },
    { name: "grade9", value: 230, fill: "var(--color-grade9)" },
    { name: "grade10", value: 220, fill: "var(--color-grade10)" },
    { name: "grade11", value: 200, fill: "var(--color-grade11)" },
    { name: "grade12", value: 180, fill: "var(--color-grade12)" }
]

const chartConfig = {
    grade7: {
        label: "Grade 7",
        color: "hsl(var(--pieChart-1))",
    },
    grade8: {
        label: "Grade 8",
        color: "hsl(var(--pieChart-2))",
    },
    grade9: {
        label: "Grade 9",
        color: "hsl(var(--pieChart-3))",
    },
    grade10: {
        label: "Grade 10",
        color: "hsl(var(--pieChart-4))",
    },
    grade11: {
        label: "Grade 11",
        color: "hsl(var(--chart-2))",
    },
    grade12: {
        label: "Grade 12",
        color: "hsl(var(--chart-destruction))",
    },
    value: {
        label: "Students",
    }
} satisfies ChartConfig
export const StudentDistribution = () => {
    const totalStudents = useMemo(() => {
        return studentDistributionData.reduce((acc, curr) => acc + curr.value, 0);
    }, [])

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-primary">Student Distribution (Current S.Y.)</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={studentDistributionData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={65}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalStudents.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total Students
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUpIcon className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing total of students in each grade
                </div>
            </CardFooter>
        </Card>
    )
}