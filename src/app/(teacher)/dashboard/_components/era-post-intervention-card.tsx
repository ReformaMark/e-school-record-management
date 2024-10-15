"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { AllSubjectsYearLevelsChart } from "./all-subjects-year-levels-chart"
import { ByYearLevelChart } from "./by-lear-level-chart"
import { BySubjectChart } from "./by-subject-chart"
import { BySubjectYearLevelChart } from "./by-subject-year-level-chart"
// import { AllSubjectsYearLevelsChart } from "@/components/era/all-subjects-year-levels-chart"
// import { BySubjectChart } from "@/components/era/by-subject-chart"
// import { ByYearLevelChart } from "@/components/era/by-year-level-chart"
// import { BySubjectYearLevelChart } from "@/components/era/by-subject-year-level-chart"

export default function EraPostInterventionCard() {
    const [selectedSubject, setSelectedSubject] = useState("all")
    const [selectedYearLevel, setSelectedYearLevel] = useState("all")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Post-Intervention Analytics and Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 mb-6">
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={selectedYearLevel} onValueChange={setSelectedYearLevel}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Year Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Year Levels</SelectItem>
                            <SelectItem value="grade7">Grade 7</SelectItem>
                            <SelectItem value="grade8">Grade 8</SelectItem>
                            <SelectItem value="grade9">Grade 9</SelectItem>
                            <SelectItem value="grade10">Grade 10</SelectItem>
                            <SelectItem value="grade11">Grade 11</SelectItem>
                            <SelectItem value="grade12">Grade 12</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList className="flex flex-wrap justify-start gap-2 mb-[96px] md:mb-3">
                        <TabsTrigger value="all" className="flex-grow sm:flex-grow-0">All</TabsTrigger>
                        <TabsTrigger value="by-subject" className="flex-grow sm:flex-grow-0">By Subject</TabsTrigger>
                        <TabsTrigger value="by-year" className="flex-grow sm:flex-grow-0">By Year Level</TabsTrigger>
                        <TabsTrigger value="by-subject-year" className="flex-grow sm:flex-grow-0">By Subject & Year</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <AllSubjectsYearLevelsChart />
                    </TabsContent>
                    <TabsContent value="by-subject">
                        <BySubjectChart subject={selectedSubject} />
                    </TabsContent>
                    <TabsContent value="by-year">
                        <ByYearLevelChart yearLevel={selectedYearLevel} />
                    </TabsContent>
                    <TabsContent value="by-subject-year">
                        <BySubjectYearLevelChart subject={selectedSubject} yearLevel={selectedYearLevel} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card >
    )
}