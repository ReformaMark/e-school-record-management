"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { useQuery } from "convex/react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

interface ActualInterventionPerformanceChartProps {
  studentId: Id<"students">
  subjectId: Id<"subjects">
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

  if (!grades) {
    return (
      <Card className="lg:w-fit">
        <CardHeader>
          <CardTitle className="text-text">Intervention Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Loading data...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (grades.length === 0) {
    return (
      <Card className="lg:w-fit">
        <CardHeader>
          <CardTitle className="text-text">Intervention Performance</CardTitle>
          <CardDescription className="text-muted-foreground">
            No intervention grades recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[200px]">
            This student has not participated in any interventions yet
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = grades.map(grade => ({
    quarter: `Q${grade.quarter}`,
    score: grade.interventionGrade,
    interventions: grade.interventionUsed.join(", ")
  }));

  const chartConfig = {
    score: {
      label: "Intervention Score",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card className="lg:w-fit">
      <CardHeader>
        <CardTitle className="text-text">Intervention Performance</CardTitle>
        <CardDescription className="text-muted-foreground">
          Grades after intervention for {grades[0].subjectName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
              <BarChart accessibilityLayer data={chartData}>
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
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].payload.quarter}
                              </span>
                              <span className="font-bold text-muted-foreground">
                                Score: {payload[0].value}
                              </span>
                              <span className="text-[0.70rem] text-muted-foreground">
                                Interventions: {payload[0].payload.interventions}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="score"
                  fill="var(--color-score)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}