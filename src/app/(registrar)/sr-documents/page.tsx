"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, DoorClosed, Folder, GraduationCap, Users } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";

const SchoolRegistrarDocumentsPage = () => {
    const sections = useQuery(api.registrar.getSections)

    const sectionsByGrade = sections?.reduce((acc, section) => {
        const gradeLevel = section.gradeLevel?.level ?? "Unassigned";
        if (!acc[gradeLevel]) {
            acc[gradeLevel] = [];
        }
        acc[gradeLevel].push(section);
        return acc;
    }, {} as Record<string, typeof sections>);

    const gradeLevels = sectionsByGrade ? Object.keys(sectionsByGrade).sort() : [];

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
                <Folder className="h-5 w-5" />
                <h1>Academic Records</h1>
            </div>

            <Tabs defaultValue={gradeLevels[0]} className="w-full">
                <ScrollArea className="w-full">
                    <TabsList className="w-full justify-start">
                        {gradeLevels.map((grade) => (
                            <TabsTrigger key={grade} value={grade}>
                                {grade}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </ScrollArea>

                {gradeLevels.map((grade) => (
                    <TabsContent key={grade} value={grade} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sectionsByGrade?.[grade]?.map((section) => (
                                <Link
                                    key={section._id}
                                    href={`/sr-documents/sections/${section._id}`}
                                >
                                    <Card className="hover:bg-accent transition-colors cursor-pointer">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-base font-semibold">
                                                    {section.name}
                                                </CardTitle>
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <CardDescription className="mt-2">
                                                {section.advisor ? (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <GraduationCap className="h-3.5 w-3.5" />
                                                        <span>
                                                            {section.advisor.firstName} {section.advisor.lastName}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <GraduationCap className="h-3.5 w-3.5" />
                                                        <span>No advisor assigned</span>
                                                    </div>
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className="text-muted-foreground">
                                                            {section.students?.length || 0} Students
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <DoorClosed className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span className="text-muted-foreground">
                                                            {section.room?.name || 'No Room'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default SchoolRegistrarDocumentsPage;