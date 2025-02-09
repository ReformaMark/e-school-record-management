"use client"
import { SectionWithDetails } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

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
        accessorKey: "sectionName",
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
        accessorKey: "roomNumber",
        header: "Room No.",
        cell: ({ row }) => {
            const schoolYear = row.original.schoolYear?.sy
              return (
                <div>
                 {schoolYear}
                </div>
              )
            }
    },
    {
        id: "schoolYear",
        accessorKey: "schoolYear",
        header: "School Year",
        cell: ({ row }) => {
          const schoolYear = row.original.schoolYear?.sy
            return (
              <div>
               {schoolYear}
              </div>
            )
          }
    },
    {
        accessorKey: "adviser",
        header: "Adviser",
        // @ts-ignore
        cell: ({ row }) => {
         const fullName = `${row.original.advisor?.firstName} ${row.original.advisor?.middleName} ${row.original.advisor?.lastName}`
        
            return (
            <div className="">
                {fullName}
            </div>
            )
        }
    },
    {
        accessorKey: "adviser",
        header: "Adviser",
        // @ts-ignore
        cell: ({ row }) => {
            
        
            return (
            <div className="">
                <Link href={"/sysadmin-sections/sysadmin-add-class"}> <PlusCircle/> Add Class</Link>
            </div>
            )
        }
    },
]