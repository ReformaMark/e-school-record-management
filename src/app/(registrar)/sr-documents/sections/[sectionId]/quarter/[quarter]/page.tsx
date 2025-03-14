"use client"

import SF10Template from "@/app/(teacher)/my-advisees/_components/SF10Template"
import SchoolForm9 from "@/app/(teacher)/my-advisees/_components/SchoolForm9"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useQuery } from "convex/react"
import { File, Search } from "lucide-react"
import { useState } from "react"
import { api } from "../../../../../../../../convex/_generated/api"
import { Id } from "../../../../../../../../convex/_generated/dataModel"
import { StudentWithDetails } from "@/lib/types"

const QuarterDetailPage = ({ params }: {
    params: {
        sectionId: Id<"sections">,
        quarter: string
    }
}) => {
    const section = useQuery(api.registrar.getSection, { sectionId: params.sectionId })
    const [search, setSearch] = useState("")
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
    const [isSF9Open, setIsSF9Open] = useState(false)
    const [isSF10Open, setIsSF10Open] = useState(false)

    const selectedStudentData = selectedStudent
        ? section?.students?.find(s => s?._id === selectedStudent) as StudentWithDetails | undefined
        : undefined

    const filteredStudents = section?.students?.filter(student => {
        if (!student) return false
        const fullName = `${student.lastName} ${student.firstName} ${student.middleName || ''}`.toLowerCase()
        return fullName.includes(search.toLowerCase())
    })

    if (!section) return <div>Loading...</div>

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/sr-documents">Documents</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{section.gradeLevel?.level}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/sr-documents/sections/${section._id}`}>{section.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>{params.quarter} Quarter</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search students..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <Card className="p-4">
                <div className="space-y-4">
                    {filteredStudents?.map((student) => {
                        if (!student) return null

                        return (
                            <div
                                key={student._id}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                            >
                                <div>
                                    <h3 className="font-medium">
                                        {student.lastName}, {student.firstName}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        LRN: {student.lrn}
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button variant="outline" size="sm" className="h-8 gap-1">
                                            <File className="h-4 w-4" />
                                            <span>Generate Forms</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>School Forms</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => {
                                            setSelectedStudent(student._id)
                                            setIsSF9Open(true)
                                        }}>
                                            School Form 9 (SF9)
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            setSelectedStudent(student._id)
                                            setIsSF10Open(true)
                                        }}>
                                            School Form 10 (SF10)
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )
                    })}
                </div>
            </Card>

            {selectedStudentData && (
                <>
                    <SchoolForm9
                        student={selectedStudentData}
                        isOpen={isSF9Open}
                        setIsOpen={setIsSF9Open}
                    />
                    <SF10Template
                        student={selectedStudentData}
                        isOpen={isSF10Open}
                        setIsOpen={setIsSF10Open}
                    />
                </>
            )}
        </div>
    )
}

export default QuarterDetailPage;