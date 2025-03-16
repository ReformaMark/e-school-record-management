"use client"

import SF10Template from "@/app/(teacher)/my-advisees/_components/SF10Template"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StudentWithDetails } from "@/lib/types"
import { useQuery } from "convex/react"
import { DoorClosed, File, GraduationCap, Search, Users } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "../../../../../../convex/_generated/api"
import { Id } from "../../../../../../convex/_generated/dataModel"

const SectionDetailPage = ({ params }: {
    params: {
        sectionId: Id<"sections">
    }
}) => {
    const section = useQuery(api.registrar.getSection, {
        sectionId: params.sectionId
    })
    const [search, setSearch] = useState("")
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
    const [isSF10Open, setIsSF10Open] = useState(false)

    const filteredStudents = section?.students?.filter(student => {
        if (!student) return false
        const fullName = `${student.lastName} ${student.firstName} ${student.middleName || ''}`.toLowerCase()
        return fullName.includes(search.toLowerCase())
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleGenerateSF10 = (student: any) => {
        const hasFinalGrades = student.finalGrades && student.finalGrades.length > 0
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const isGradesSubmitted = hasFinalGrades && student.finalGrades.every((grade: any) =>
            grade.isPassed !== false && grade.dateSubmitted
        )

        if (!isGradesSubmitted) {
            toast.error("Error: Final grades have not been submitted yet")
            return
        }

        setSelectedStudent(student._id)
        setIsSF10Open(true)
    }

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

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Section Info Card */}
                <Card className="md:col-span-1">
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

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle className="text-base font-medium">Student Records</CardTitle>
                        <div className="relative mt-4">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search students by name..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredStudents?.map((student) => {
                                if (!student) return null

                                const hasFinalGrades = student.finalGrades && student.finalGrades.length > 0

                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const isGradesSubmitted = hasFinalGrades && student.finalGrades.every((grade: any) =>
                                    grade.isPassed !== false && grade.dateSubmitted
                                )

                                return (
                                    <div
                                        key={student._id}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <div>
                                            <h3 className="font-medium">
                                                {student.lastName}, {student.firstName}
                                            </h3>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-muted-foreground">
                                                    LRN: {student.lrn}
                                                </p>
                                                <p className={`text-xs ${isGradesSubmitted ? 'text-green-600' : 'text-red-600'}`}>
                                                    {isGradesSubmitted ? 'Grades Submitted' : 'Pending Grade Submission'}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 gap-1"
                                            onClick={() => handleGenerateSF10(student)}
                                            disabled={!isGradesSubmitted}
                                        >
                                            <File className="h-4 w-4" />
                                            <span>Generate SF10</span>
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {selectedStudent && (
                <SF10Template
                    student={section.students?.find(s => s?._id === selectedStudent) as StudentWithDetails}
                    isOpen={isSF10Open}
                    setIsOpen={setIsSF10Open}
                />
            )}
        </div>
    )
}

export default SectionDetailPage