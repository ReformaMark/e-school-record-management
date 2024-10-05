"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts"

const studentDistributionData = [
    { name: "1st Year", value: 300 },
    { name: "2nd Year", value: 250 },
    { name: "3rd Year", value: 230 },
    { name: "4th Year", value: 220 },
]

const COLORS = ['#099443', '#0ac756', '#0bf268', '#39f589']
export const StudentDistribution = () => {
    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-[#099443]">Student Distribution (Current S.Y.)</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    value: {
                        label: "Students",
                        color: "#099443",
                    },
                }} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={studentDistributionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {studentDistributionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}