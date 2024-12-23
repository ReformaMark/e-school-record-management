"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ActualPerformanceChartProps {
  studentId: string
  subject: string
}

export function ActualPerformanceChart({ studentId, subject }: ActualPerformanceChartProps) {
  const data = [
    { quarter: "1st", score: 75 },
    { quarter: "2nd", score: 78 },
    { quarter: "3rd", score: 80 },
    { quarter: "4th", score: 82 },
  ]

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-primary))",
    },
  }

  console.log(studentId)

  return (
    <Card className="lg:w-fit">
      <CardHeader>
        <CardTitle className="text-text">Actual Performance (Without Intervention)</CardTitle>
        <CardDescription className="text-muted-foreground">Quarterly scores for {subject}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            <ChartContainer config={chartConfig} className="h-[200px] sm:h-[300px]">
              <BarChart accessibilityLayer data={data}>
                <XAxis
                  dataKey="quarter"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}