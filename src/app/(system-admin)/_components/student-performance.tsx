"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

const studentPerformanceData = [
  { name: 'Grade 7', passing: 150, failing: 20 },
  { name: 'Grade 8', passing: 140, failing: 25 },
  { name: 'Grade 9', passing: 160, failing: 15 },
  { name: 'Grade 10', passing: 130, failing: 30 },
];

const COLORS = ['#099443', '#0ac756', '#0bf268', '#39f589']
export const StudentPerformance = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-[#099443]">Student Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
          avgScore: {
            label: "Average Score",
            color: "#099443",
          },
        }} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="passing" fill={COLORS[3]} />
              <Bar dataKey="failing" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}