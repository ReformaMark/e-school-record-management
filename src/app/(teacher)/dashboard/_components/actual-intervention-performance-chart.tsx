"use client"

import { Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

interface ActualInterventionPerformanceChartProps {
  studentId: Id<"students">
  classId: Id<"classes">
}

export function ActualInterventionPerformanceChart({ 
  studentId, 
  classId 
}: ActualInterventionPerformanceChartProps) {
  const grades = useQuery(api.quarterlyGrades.getStudentInterventionGrades, {
    studentId,
    classId
  });

  const subject = useQuery(api.classes.getClassDetails, { 
    classId 
  });

  if (!grades || !subject) return <div>Loading...</div>;

  const chartData = grades
    .filter(grade => grade.interventionGrade !== undefined)
    .map(grade => ({
      quarter: grade.quarter,
      grade: grade.interventionGrade
    }));

  const chartConfig = {
    grade: {
      label: "Intervention Grade",
      color: "hsl(var(--chart-success))",
    },
  }

  return (
    <Card className="lg:w-fit">
      <CardHeader>
        <CardTitle className="text-text">Intervention Performance</CardTitle>
        <CardDescription className="text-muted-foreground">
          Grades after intervention for {subject.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
              <LineChart accessibilityLayer data={chartData}>
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
                <Line
                  type="monotone"
                  dataKey="grade"
                  strokeWidth={2}
                  stroke="var(--color-intervention)"
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}