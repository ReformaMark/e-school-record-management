"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const interventionEffectivenessData = [
    { name: 'Jan', "With Intervention": 85, "Without Intervention": 20 },
    { name: 'Feb', "With Intervention": 88, "Without Intervention": 43 },
    { name: 'Mar', "With Intervention": 90, "Without Intervention": 33 },
    { name: 'Apr', "With Intervention": 92, "Without Intervention": 19 },
];

const COLORS = ['#099443', '#0ac756', '#0bf268', '#39f589']
export const InterventionEffectiveness = () => {
    return (
        <Card className="bg-white">
            <CardHeader>
                <CardTitle className="text-[#099443]">Intervention Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{
                    students: {
                        label: "Students",
                        color: "#099443",
                    },
                }} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={interventionEffectivenessData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="With Intervention"
                                stroke={COLORS[0]}
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Without Intervention"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        // <Card>
        //     <CardHeader>Intervention Effectiveness</CardHeader>
        //     <CardContent>
        //         <ResponsiveContainer width="100%" height={300}>
        //             <LineChart data={interventionEffectivenessData}>
        //                 <CartesianGrid strokeDasharray="3 3" />
        //                 <XAxis dataKey="name" />
        //                 <YAxis />
        //                 <Tooltip />
        //                 <Legend />
        //                 <Line type="monotone" dataKey="withIntervention" stroke="#8884d8" />
        //                 <Line type="monotone" dataKey="withoutIntervention" stroke="#82ca9d" />
        //             </LineChart>
        //         </ResponsiveContainer>
        //     </CardContent>
        // </Card>
    )
}