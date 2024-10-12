"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { CombinedPerformanceChart } from "./combined-performance-chart"
import { ComparativePerformanceChart } from "./comparative-performance-chart"
import { StudentPerformanceChart } from "./student-performance-chart"

export const EraSparCard = () => {
    const [selectedStudent, setSelectedStudent] = useState("1")
    const [selectedSubject, setSelectedSubject] = useState("math")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Performance Analytics and Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 mb-6">
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Student" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">John Doe</SelectItem>
                            <SelectItem value="2">Jane Smith</SelectItem>
                            <SelectItem value="3">Bob Johnson</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Tabs defaultValue="actual" className="space-y-4">
                    <TabsList className="flex flex-wrap justify-start gap-2 mb-[96px] md:mb-3">
                        <TabsTrigger value="actual" className="flex-grow sm:flex-grow-0">Actual Performance</TabsTrigger>
                        <TabsTrigger value="comparative" className="flex-grow sm:flex-grow-0">Comparative Performance</TabsTrigger>
                        <TabsTrigger value="combined" className="flex-grow sm:flex-grow-0">Combined Performance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="actual">
                        <StudentPerformanceChart studentId={selectedStudent} subject={selectedSubject} />
                    </TabsContent>
                    <TabsContent value="comparative">
                        <ComparativePerformanceChart studentId={selectedStudent} subject={selectedSubject} />
                    </TabsContent>
                    <TabsContent value="combined">
                        <CombinedPerformanceChart studentId={selectedStudent} subject={selectedSubject} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}