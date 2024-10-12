"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { ActualInterventionPerformanceChart } from "./actual-intervention-performance-chart"
import { ActualPerformanceChart } from "./actual-performance-chart"
import { CombinedInterventionChart } from "./combined-intervention-chart"

export default function EraInterventionCard() {
    const [selectedStudent, setSelectedStudent] = useState("1")
    const [selectedSubject, setSelectedSubject] = useState("math")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Intervention Analytics and Reports</CardTitle>
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
                        <TabsTrigger value="actual" className="flex-grow sm:flex-grow-0">Actual</TabsTrigger>
                        <TabsTrigger value="actual-intervention" className="flex-grow sm:flex-grow-0">Actual Intervention</TabsTrigger>
                        <TabsTrigger value="combined" className="flex-grow sm:flex-grow-0">Combined</TabsTrigger>
                    </TabsList>
                    <TabsContent value="actual">
                        <ActualPerformanceChart studentId={selectedStudent} subject={selectedSubject} />
                    </TabsContent>
                    <TabsContent value="actual-intervention">
                        <ActualInterventionPerformanceChart studentId={selectedStudent} subject={selectedSubject} />
                    </TabsContent>
                    <TabsContent value="combined">
                        <CombinedInterventionChart studentId={selectedStudent} subject={selectedSubject} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card >
    )
}