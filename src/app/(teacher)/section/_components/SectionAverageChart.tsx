"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { sections } from '../section-data';



const COLORS = ['#099443', '#0ac756', '#0bf268', '#39f589']
export const SectionAverageChart = () => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-[#099443]">Section Average Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{
          avgScore: {
            label: "Average Score",
            color: "#099443",
          },
        }} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis dataKey='averageGrade'/>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="averageGrade" fill={COLORS[Math.floor(Math.random() * COLORS.length)]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}