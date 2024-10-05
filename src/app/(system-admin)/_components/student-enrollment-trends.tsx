"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const enrollmentData = [
    { year: 2018, students: 800 },
    { year: 2019, students: 900 },
    { year: 2020, students: 500 },
    { year: 2021, students: 700 },
    { year: 2022, students: 1200 },
]

export const StudentEnrollmentTrends = () => {
    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-[#099443]">Student Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    students: {
                        label: "Students",
                        color: "#099443",
                    },
                }} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={enrollmentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line type="monotone" dataKey="students" stroke="#099443" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}