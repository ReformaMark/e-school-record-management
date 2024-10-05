"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

const formGenerationData = [
    { name: 'Form 9', "Generated": 250 },
    { name: 'Form 10', "Generated": 200 },
];

const COLORS = ['#099443', '#0ac756', '#0bf268', '#39f589']
export const FormGenerationCard = () => {
    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-[#099443]">Form Generation Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    avgScore: {
                        label: "Average Score",
                        color: "#099443",
                    },
                }} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={formGenerationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend iconType="circle" />
                            <Bar dataKey="Generated" fill={COLORS[3]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}


