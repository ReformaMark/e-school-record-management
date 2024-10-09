export const sectionData = [
    {
        id: "1",
        sectionNumber: 1,
        sectionName: "Mahusay",
        schoolYear: "2023-2024",
        gradeLevel: "Grade 7",
        roomNumber: "101",
        adviser: {
            id: "1",
            name: "John Doe",
            subject: "English",
        },
        subjectsTeachers: [
            {
                teacher: "Kennedy Jones",
                subject: "Mathematics"
            },
            {
                teacher: "Brock Lesnar",
                subject: "Physical Education"
            },
            {
                teacher: "Lincoln Henderson",
                subject: "Science",
            },
            {
                teacher: "Carmen Rivera",
                subject: "History"
            },
        ]
    },
    {
        id: "2",
        sectionNumber: 2,
        sectionName: "Malinis",
        schoolYear: "2023-2024",
        gradeLevel: "Grade 7",
        roomNumber: "102",
        adviser: {
            id: "2",
            name: "Jane Doe",
            subject: "Mathematics",
        },
        subjectsTeachers: [
            {
                teacher: "Kennedy Jones",
                subject: "English"
            },
            {
                teacher: "Brock Lesnar",
                subject: "Physical Education"
            },
            {
                teacher: "Lincoln Henderson",
                subject: "Science",
            },
            {
                teacher: "Carmen Rivera",
                subject: "History"
            },
        ]
    },
    {
        id: "3",
        sectionNumber: 1,
        sectionName: "Patience",
        schoolYear: "2023-2024",
        gradeLevel: "Grade 8",
        roomNumber: "201",
        adviser: {
            id: "3",
            name: "Albert Limestein",
            subject: "Science",
        },
        subjectsTeachers: [
            {
                teacher: "Kennedy Jones",
                subject: "Mathematics"
            },
            {
                teacher: "Brock Lesnar",
                subject: "Physical Education"
            },
            {
                teacher: "Lincoln Henderson",
                subject: "Science",
            },
            {
                teacher: "Carmen Rivera",
                subject: "History"
            },
        ]
    },
    {
        id: "4",
        sectionNumber: 1,
        sectionName: "Iron",
        schoolYear: "2023-2024",
        gradeLevel: "Grade 9",
        roomNumber: "301",
        adviser: {
            id: "4",
            name: "Mac Arthur Returnson",
            subject: "History",
        },
        subjectsTeachers: [
            {
                teacher: "Kennedy Jones",
                subject: "Mathematics"
            },
            {
                teacher: "Brock Lesnar",
                subject: "Physical Education"
            },
            {
                teacher: "Lincoln Henderson",
                subject: "Science",
            },
            {
                teacher: "Carmen Rivera",
                subject: "History"
            },
        ]
    },
    {
        id: "5",
        sectionNumber: 3,
        sectionName: "Matapang",
        schoolYear: "2023-2024",
        gradeLevel: "Grade 9",
        roomNumber: "302",
        adviser: {
            id: "5",
            name: "Robert Oppenheimer",
            subject: "Science",
        },
        subjectsTeachers: [
            {
                teacher: "Kennedy Jones",
                subject: "Mathematics"
            },
            {
                teacher: "Brock Lesnar",
                subject: "Physical Education"
            },
            {
                teacher: "Lincoln Henderson",
                subject: "Science",
            },
            {
                teacher: "Carmen Rivera",
                subject: "History"
            },
        ]
    },
    {
        id: "6",
        sectionNumber: 1,
        sectionName: "Amethyst",
        schoolYear: "2023-2024",
        gradeLevel: "Grade 10",
        roomNumber: "401",
        adviser: {
            id: "6",
            name: "Eddard Stark",
            subject: "History",
        },
        subjectsTeachers: [
            {
                teacher: "Kennedy Jones",
                subject: "Mathematics"
            },
            {
                teacher: "Brock Lesnar",
                subject: "Physical Education"
            },
            {
                teacher: "Lincoln Henderson",
                subject: "Science",
            },
            {
                teacher: "Carmen Rivera",
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
        // cell: ({ row }) => row.original.adviser.name,
    },
]