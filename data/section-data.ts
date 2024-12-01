"use client"

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

export const sectionColumns = [
    {
        accessorKey: "sectionName",
        header: "Section Name",
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
    },
    {
        accessorKey: "roomNumber",
        header: "Room No.",
    },
    {
        accessorKey: "schoolYear",
        header: "School Year",
    },
    {
        accessorKey: "adviser",
        header: "Adviser",
        // @ts-ignore
        cell: ({ row }) => row.original.adviser.name,
    },
]