"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DataTable } from "@/components/data-table";
import { exportToExcelStudents } from "@/lib/export-to-excel";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { studentColumns } from "../../../../data/students-data";

const SchoolHeadStudentsPage = () => {
    const [selectedTab, setSelectedTab] = useState("Enrolled");
    const [studentType, setStudentType] = useState("all");
    const [gradeLevel, setGradeLevel] = useState("all");

    const students = useQuery(api.students.getAllStudents, {
        enrollmentStatus: selectedTab,
        studentType: studentType,
        gradeLevel: gradeLevel === "all" ? undefined : gradeLevel
    });

    if (!students) {
        return (
            <div className="container mx-auto p-4 text-black">
                <div>Loading students...</div>
            </div>
        );
    }

    const handleExport = () => {
        if (!students) return;
        exportToExcelStudents(students, "students_list");
    };


    return (
        <div className="container mx-auto p-4">
            <main className="space-y-4">
                <div className="flex items-center justify-between">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                        <TabsList>
                            <TabsTrigger value="Enrolled">Enrolled</TabsTrigger>
                            <TabsTrigger value="Can Enroll">Can Enroll</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    {studentType === "all" ? "All Types" :
                                        studentType === "normal" ? "Regular" :
                                            studentType === "returning" ? "Returning" : "ALS"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setStudentType("all")}>
                                    All Types
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStudentType("normal")}>
                                    Regular
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStudentType("returning")}>
                                    Returning
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStudentType("als")}>
                                    ALS
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    {gradeLevel === "all" ? "All Grades" : `Grade ${gradeLevel}`}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setGradeLevel("all")}>
                                    All Grades
                                </DropdownMenuItem>
                                {["7", "8", "9", "10", "11", "12"].map(level => (
                                    <DropdownMenuItem
                                        key={level}
                                        onClick={() => setGradeLevel(level)}
                                    >
                                        Grade {level}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1"
                            onClick={handleExport}
                            disabled={!students}
                        >
                            <FileIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Students ({students.length})</CardTitle>
                        <CardDescription>
                            {selectedTab === "enrolled" ? "Currently enrolled students" : "Students eligible for enrollment"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={studentColumns}
                            data={students}
                            filter="firstName"
                            placeholder="Filter students by first name..."
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default SchoolHeadStudentsPage;