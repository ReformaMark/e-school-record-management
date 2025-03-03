"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useQuery } from "convex/react"
import { useState } from "react"
import { ActualPerformanceChart } from "./actual-performance-chart"
import { ActualInterventionPerformanceChart } from "./actual-intervention-performance-chart"
import { CombinedInterventionChart } from "./combined-intervention-chart"
import { Id } from "../../../../../convex/_generated/dataModel"
import { api } from "../../../../../convex/_generated/api"

export default function EraInterventionCard() {
    const [selectedClass, setSelectedClass] = useState<Id<"classes"> | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Id<"students"> | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<Id<"subjects"> | null>(null);

    // Get teacher's classes with section details
    const classes = useQuery(api.classes.getTeacherClasses);

    // Get students for selected class 
    const studentsWithGrades = useQuery(api.students.getStudentsWithGrades, {
        classId: selectedClass ?? undefined,
        subjectId: selectedSubject ?? undefined
    });

    if (!classes) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Intervention Analytics and Reports</CardTitle>
                </CardHeader>
                <CardContent>Loading...</CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Intervention Analytics and Reports</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 mb-6">
                    <Select
                        value={selectedClass?.toString() ?? ""}
                        onValueChange={(value) => {
                            setSelectedClass(value as Id<"classes">);
                            setSelectedStudent(null); // Reset student when class changes
                            setSelectedSubject(null); // Reset subject when class changes
                        }}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select Section" />
                        </SelectTrigger>
                        <SelectContent>
                            {classes.map((cls) => (
                                <SelectItem
                                    key={cls?._id}
                                    value={cls?._id as string}
                                >
                                    {cls?.section?.name} - {cls?.subject?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedClass && (
                        <Select
                            value={selectedStudent?.toString() ?? ""}
                            onValueChange={(value) => {
                                setSelectedStudent(value as Id<"students">);
                                // Automatically set subject to the class subject
                                const selectedClassData = classes.find(c => c?._id === selectedClass);
                                if (selectedClassData) {
                                    setSelectedSubject(selectedClassData.subjectId);
                                }
                            }}
                        >
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="Select Student" />
                            </SelectTrigger>
                            <SelectContent>
                                {studentsWithGrades?.map((student) => (
                                    <SelectItem
                                        key={student.id}
                                        value={student.id}
                                    >
                                        {student.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                </div>

                {selectedStudent && selectedSubject && selectedClass && (
                    <Tabs defaultValue="actual" className="space-y-4">
                        <TabsList className="flex flex-wrap justify-start gap-2 mb-[96px] md:mb-3">
                            <TabsTrigger value="actual" className="flex-grow sm:flex-grow-0">
                                Actual
                            </TabsTrigger>
                            <TabsTrigger value="actual-intervention" className="flex-grow sm:flex-grow-0">
                                Actual Intervention
                            </TabsTrigger>
                            <TabsTrigger value="combined" className="flex-grow sm:flex-grow-0">
                                Combined
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="actual">
                            <ActualPerformanceChart
                                studentId={selectedStudent}
                                subjectId={selectedSubject}
                                classId={selectedClass}
                            />
                        </TabsContent>
                        <TabsContent value="actual-intervention">
                            <ActualInterventionPerformanceChart
                                studentId={selectedStudent}
                                subjectId={selectedSubject}
                                classId={selectedClass}
                            />
                        </TabsContent>
                        <TabsContent value="combined">
                            <CombinedInterventionChart
                                studentId={selectedStudent}
                                subjectId={selectedSubject}
                                classId={selectedClass}
                            />
                        </TabsContent>
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
}