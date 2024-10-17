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
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

const formGenerationData = [
    { name: 'form9', generated: 250, fill: "var(--color-form9)" },
    { name: 'form10', generated: 200, fill: "var(--color-form10)" },
];

const chartConfig = {
    form9: {
        label: "Form 9",
        color: "hsl(var(--chart-primary))",
    },
    form10: {
        label: "Form 10",
        color: "hsl(var(--pieChart-3))",
    },
    generated: {
        label: "Generated",
    }
} satisfies ChartConfig

export const FormGenerationCard = () => {
    const totalVisitors = useMemo(() => {
        return formGenerationData.reduce((acc, curr) => acc + curr.generated, 0);
    }, [])

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-primary">Form Generation Statistics</CardTitle>
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
                            data={formGenerationData}
                            dataKey="generated"
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
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Forms Generated
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {/* <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUpIcon className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    Showing total of forms generated for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}