"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip
} from "@/components/ui/chart";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

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
  const performanceData = useQuery(api.students.getStudentPerformanceOverview);

  if (!performanceData) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-primary">Student Performance Overview</CardTitle>
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
        <CardTitle className="text-primary">Student Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip />
            <ChartLegend />
            <Bar dataKey="passing" fill="var(--color-passing)" radius={4} />
            <Bar dataKey="failing" fill="var(--color-failing)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}