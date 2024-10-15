"use client"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const interventionEffectivenessData = [
    { name: 'Jan', withIntervention: 85, withoutIntervention: 20 },
    { name: 'Feb', withIntervention: 88, withoutIntervention: 43 },
    { name: 'Mar', withIntervention: 90, withoutIntervention: 33 },
    { name: 'Apr', withIntervention: 92, withoutIntervention: 19 },
];

const chartConfig = {
    withIntervention: {
        label: "With Intervention",
        color: "hsl(var(--chart-primary))",
    },
    withoutIntervention: {
        label: "Without Intervention",
        color: "hsl(var(--chart-destruction))",
    },
} satisfies ChartConfig

export const InterventionEffectiveness = () => {
    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-primary">Intervention Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart
                        accessibilityLayer
                        data={interventionEffectivenessData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="withIntervention"
                            type="monotone"
                            stroke="var(--color-withIntervention)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="withoutIntervention"
                            type="monotone"
                            stroke="var(--color-withoutIntervention"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
        // <Card>
        //     <CardHeader>Intervention Effectiveness</CardHeader>
        //     <CardContent>
        //         <ResponsiveContainer width="100%" height={300}>
        //             <LineChart data={interventionEffectivenessData}>
        //                 <CartesianGrid strokeDasharray="3 3" />
        //                 <XAxis dataKey="name" />
        //                 <YAxis />
        //                 <Tooltip />
        //                 <Legend />
        //                 <Line type="monotone" dataKey="withIntervention" stroke="#8884d8" />
        //                 <Line type="monotone" dataKey="withoutIntervention" stroke="#82ca9d" />
        //             </LineChart>
        //         </ResponsiveContainer>
        //     </CardContent>
        // </Card>
    )
}