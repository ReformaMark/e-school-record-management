"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ByYearLevelChartProps {
  yearLevel: string
}

export function ByYearLevelChart({ yearLevel }: ByYearLevelChartProps) {
  const data = [
    { yearLevel: "Grade 7", preIntervention: 70, postIntervention: 80 },
    { yearLevel: "Grade 8", preIntervention: 75, postIntervention: 85 },
    { yearLevel: "Grade 9", preIntervention: 72, postIntervention: 82 },
    { yearLevel: "Grade 10", preIntervention: 72, postIntervention: 82 },
    { yearLevel: "Grade 11", preIntervention: 72, postIntervention: 82 },
    { yearLevel: "Grade 12", preIntervention: 72, postIntervention: 82 },
  ]

  const chartConfig = {
    preIntervention: {
      label: "Pre-Intervention",
      color: "hsl(var(--pieChart-1))",
    },
    postIntervention: {
      label: "Post-Intervention",
      color: "hsl(var(--pieChart-3))",
    },
  }

  return (
    <Card className="lg:w-fit">
      <CardHeader>
        <CardTitle className="text-text">Performance by Year Level: {yearLevel}</CardTitle>
        <CardDescription className="text-muted-foreground">Comparison of pre and post-intervention performance for {yearLevel} across subjects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[300px]">
            <ChartContainer config={chartConfig} className="h-[300px] sm:h-[400px]">
              <BarChart accessibilityLayer data={data}>
                <XAxis
                  dataKey="yearLevel"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
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
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="preIntervention" fill="var(--color-preIntervention)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="postIntervention" fill="var(--color-postIntervention)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}