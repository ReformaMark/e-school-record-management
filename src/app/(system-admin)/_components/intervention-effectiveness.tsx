"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useQuery } from "convex/react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { api } from "../../../../convex/_generated/api";

const chartConfig = {
    withIntervention: {
        label: "With Intervention",
        color: "hsl(var(--chart-primary))",
    },
    withoutIntervention: {
        label: "Without Intervention",
        color: "hsl(var(--chart-destruction))",
    },
} satisfies ChartConfig;

export const InterventionEffectiveness = () => {
    const interventionData = useQuery(api.quarterlyGrades.getInterventionEffectiveness);

    if (!interventionData) {
        return (
            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="text-primary">Intervention Effectiveness</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                        Loading...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-primary">Intervention Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={interventionData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => `Q${value}`}
                        />
                        <YAxis
                            domain={[0, 100]}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                        Q{payload[0].payload.name}
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {/* @ts-expect-error slight type issue */}
                                                        Original: {payload[0]?.value.toFixed(1)}%
                                                    </span>
                                                    <span className="font-bold text-muted-foreground">
                                                        {/* @ts-expect-error slight type issue */}
                                                        After Intervention: {payload[1]?.value.toFixed(1)}%
                                                    </span>
                                                    <span className="text-[0.70rem] text-muted-foreground">
                                                        {/* @ts-expect-error slight type issue */}
                                                        Improvement: {(payload[1]?.value - payload[0]?.value).toFixed(1)}%
                                                    </span>
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
                            dataKey="withoutIntervention"
                            fill="var(--color-withoutIntervention)"
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey="withIntervention"
                            fill="var(--color-withIntervention)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};