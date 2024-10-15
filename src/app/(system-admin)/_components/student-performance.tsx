"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const studentPerformanceData = [
  { name: 'Grade 7', passing: 150, failing: 20 },
  { name: 'Grade 8', passing: 140, failing: 25 },
  { name: 'Grade 9', passing: 160, failing: 15 },
  { name: 'Grade 10', passing: 130, failing: 30 },
];

const chartConfig = {
  passing: {
    label: "Passing",
    color: "hsl(var(--chart-primary))",
  },
  failing: {
    label: "Failing",
    color: "hsl(var(--chart-destruction))",
  }
} satisfies ChartConfig

export const StudentPerformance = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-primary">Student Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={studentPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="passing" fill="var(--color-passing)" radius={4} />
            <Bar dataKey="failing" fill="var(--color-failing)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}