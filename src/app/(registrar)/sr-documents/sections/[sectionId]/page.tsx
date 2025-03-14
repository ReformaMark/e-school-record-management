"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../../../convex/_generated/api"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ChevronRight, DoorClosed, GraduationCap, Users } from "lucide-react"
import Link from "next/link"

const quarters = ["1st", "2nd", "3rd", "4th"]

const SectionDetailPage = ({ params }: {
    params: {
        sectionId: Id<"sections">
    }
}) => {
    const section = useQuery(api.registrar.getSection, {
        sectionId: params.sectionId
    })

    if (!section) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/sr-documents">Documents</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{section.gradeLevel?.level ?? "Unassigned"}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{section.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Section Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {section.advisor ?
                                    `${section.advisor.firstName} ${section.advisor.lastName}` :
                                    "No advisor assigned"
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{section.students?.length || 0} Students</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <DoorClosed className="h-4 w-4 text-muted-foreground" />
                            <span>{section.room?.name ?? "No Room"}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-medium">Quarterly Reports</CardTitle>
                            <CardContent>
                                <Tabs defaultValue={quarters[0]} className="w-full">
                                    <TabsList>
                                        {quarters.map((quarter) => (
                                            <TabsTrigger key={quarter} value={quarter}>
                                                {quarter} Quarter
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {quarters.map((quarter) => (
                                        <TabsContent key={quarter} value={quarter}>
                                            <Link
                                                href={`/sr-documents/sections/${section._id}/quarter/${quarter.toLowerCase()}`}
                                                className="block"
                                            >
                                                <Card className="hover:bg-accent transition-colors cursor-pointer">
                                                    <CardContent className="flex items-center justify-between p-4">
                                                        <div className="flex items-center gap-2">
                                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                                            <span>{quarter} Quarter Grades</span>
                                                        </div>
                                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SectionDetailPage;