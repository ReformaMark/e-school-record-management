"use client"
import { ColumnDef } from "@tanstack/react-table"
import { PencilIcon, PlusCircle } from "lucide-react"
import Link from "next/link"
import { Doc, Id } from "../convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "../convex/_generated/api"

interface ClassessWithTeacherSubSched extends Doc<'classes'> {
    teacher: Doc<'users'> | null,
    subject: Doc<'subjects'> | null,
    schedule: {
        _id: Id<"schedules">,
        _creationTime: number,
        day: string[],
        classId: string,
        roomId: string,
        schoolPeriodId: Id<"schoolPeriods">,
        teacherId: string,
        period: {
            _id: Id<"schoolPeriods">,
            _creationTime: number,
            period: string,
            timeRange: string
        } | null
    } | null
}

export interface SectionWithDetails extends Doc<'sections'> {
    advisor: Doc<'users'> | null,
    classes: ClassessWithTeacherSubSched[],
    schoolYear: {
        _id: Id<"schoolYears">,
        _creationTime: number,
        batchName: string,
        endDate: string,
        startDate: string,
        sy?: string
    } | null,
    gradeLevel: {
        _id: Id<"gradeLevels">,
        _creationTime: number,
        level: string
    } | null,
    students: Id<"students">[]
}

export const sectionData = [
    {
        id: "1",
        sectionNumber: 1,
        sectionName: "Bituin", // Star
        schoolYear: "2023-2024",
        gradeLevel: "Grade 7",
        roomNumber: "101",
        adviser: {
            id: "1",
            name: "Juan dela Cruz",
            subject: "English",
        },
        subjectsTeachers: [
            {
                teacher: "Maria Santos",
                subject: "Mathematics"
            },
            {
                teacher: "Josefa Estrada",
                subject: "Physical Education"
            },
            {
                teacher: "Andres Reyes",
                subject: "Science",
            },
            {
                teacher: "Lourdes Cruz",
                subject: "History"
            },
        ]
    },
    {
        id: "2",
        sectionNumber: 2,
        sectionName: "Liwanag", // Light
        schoolYear: "2023-2024",
        gradeLevel: "Grade 7",
        roomNumber: "102",
        adviser: {
            id: "2",
            name: "Maria Clara",
            subject: "Mathematics",
        },
        subjectsTeachers: [
            {
                teacher: "Maria Santos",
                subject: "English"
            },
            {
                teacher: "Josefa Estrada",
                subject: "Physical Education"
            },
            {
                teacher: "Andres Reyes",
                subject: "Science",
            },
            {
                teacher: "Lourdes Cruz",
                subject: "History"
            },
        ]
    },
    {
        id: "3",
        sectionNumber: 1,
        sectionName: "Katipunan", // League
        schoolYear: "2023-2024",
        gradeLevel: "Grade 8",
        roomNumber: "201",
        adviser: {
            id: "3",
            name: "Pedro Santos",
            subject: "Science",
        },
        subjectsTeachers: [
            {
                teacher: "Maria Santos",
                subject: "Mathematics"
            },
            {
                teacher: "Josefa Estrada",
                subject: "Physical Education"
            },
            {
                teacher: "Andres Reyes",
                subject: "Science",
            },
            {
                teacher: "Lourdes Cruz",
                subject: "History"
            },
        ]
    },
    {
        id: "4",
        sectionNumber: 1,
        sectionName: "Makabayan", // Nationalist
        schoolYear: "2023-2024",
        gradeLevel: "Grade 9",
        roomNumber: "301",
        adviser: {
            id: "4",
            name: "Ana Rodriguez",
            subject: "History",
        },
        subjectsTeachers: [
            {
                teacher: "Maria Santos",
                subject: "Mathematics"
            },
            {
                teacher: "Josefa Estrada",
                subject: "Physical Education"
            },
            {
                teacher: "Andres Reyes",
                subject: "Science",
            },
            {
                teacher: "Lourdes Cruz",
                subject: "History"
            },
        ]
    },
    {
        id: "5",
        sectionNumber: 3,
        sectionName: "Bayanihan", // Community Spirit
        schoolYear: "2023-2024",
        gradeLevel: "Grade 9",
        roomNumber: "302",
        adviser: {
            id: "5",
            name: "Ricardo Ramirez",
            subject: "Science",
        },
        subjectsTeachers: [
            {
                teacher: "Maria Santos",
                subject: "Mathematics"
            },
            {
                teacher: "Josefa Estrada",
                subject: "Physical Education"
            },
            {
                teacher: "Andres Reyes",
                subject: "Science",
            },
            {
                teacher: "Lourdes Cruz",
                subject: "History"
            },
        ]
    },
    {
        id: "6",
        sectionNumber: 1,
        sectionName: "Pag-asa", // Hope
        schoolYear: "2023-2024",
        gradeLevel: "Grade 10",
        roomNumber: "401",
        adviser: {
            id: "6",
            name: "Elena Cruz",
            subject: "History",
        },
        subjectsTeachers: [
            {
                teacher: "Maria Santos",
                subject: "Mathematics"
            },
            {
                teacher: "Josefa Estrada",
                subject: "Physical Education"
            },
            {
                teacher: "Andres Reyes",
                subject: "Science",
            },
            {
                teacher: "Lourdes Cruz",
                subject: "History"
            },
        ]
    },
]

export const sectionColumns: ColumnDef<SectionWithDetails>[] = [
    {
        accessorKey: "name",
        header: "Section Name",
        cell: ({ row }) => {
            const sectionName = row.original.name
            return (
                <div>
                    {sectionName}
                </div>
            )
        }
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
        cell: ({ row }) => {
            const gradeLevel = row.original.gradeLevel?.level
            return (
                <div>
                    {gradeLevel}
                </div>
            )
        }
    },
    {
        accessorKey: "classes",
        header: "Classes Count",
        cell: ({ row }) => {
            return <div>{row.original.classes.length}</div>;
        }
    },
    {
        accessorKey: "roomNumber",
        header: "Room Name",
        cell: function Cell({ row }) {
            if (!row.original.roomId) {
                return <div>No room assigned</div>;
            }

            const roomId = row.original.roomId as Id<"rooms">

            const room = useQuery(api.classroom.getRoomById, {
                roomId: roomId
            })

            if (!room) return <div>No room assigned</div>
            return (
                <div>
                    {room.name}
                </div>
            )
        }
    },
    {
        id: "schoolYear",
        accessorKey: "schoolYear",
        header: "School Year",
        cell: ({ row }) => {
            const schoolYear = row.original.schoolYear?.sy ?? 'Not set';
            return <div>{schoolYear}</div>;
        }
    },
    {
        accessorKey: "advisor",
        header: "Adviser",
        cell: ({ row }) => {
            const advisor = row.original.advisor;
            const fullName = advisor
                ? `${advisor.firstName} ${advisor.middleName || ''} ${advisor.lastName}`.trim()
                : 'No advisor assigned';

            return <div>{fullName}</div>;
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row gap-2">
                    <Link
                        href={`/sysadmin-sections/sysadmin-edit-section/${row.original._id}`}
                        className="flex flex-row gap-1 items-center"
                    >
                        <PencilIcon className="w-4 h-4" /> Edit
                    </Link>
                    <Link
                        href={`/sysadmin-sections/sysadmin-add-class/${row.original._id}`}
                        className="flex flex-row gap-1 items-center"
                    >
                        <PlusCircle className="w-4 h-4" /> Add Class
                    </Link>
                </div>
            );
        }
    },
]