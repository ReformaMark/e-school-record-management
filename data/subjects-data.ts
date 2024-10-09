export const subjectsData = [
    {
        id: "1",
        subject: "Mathematics",
        applicableTo: ["Grade 7", "Grade 8", "Grade 9", "Grade 10"],
    },
    {
        id: "2",
        subject: "Science",
        applicableTo: ["Grade 8", "Grade 9", "Grade 10"],
    },
    {
        id: "3",
        subject: "English",
        applicableTo: ["Grade 8", "Grade 10"],
    },
    {
        id: "4",
        subject: "History",
        applicableTo: ["Grade 9"],
    }
]

export const subjectsColumns = [
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "applicableTo",
        header: "Applicable To",
    }
]

export type SchoolGradeLevels = Record<"value" | "label", string>;

export const schoolGradeLevels = [
    {
        value: "grade-7",
        label: "Grade 7",
    },
    {
        value: "grade-8",
        label: "Grade 8",
    },
    {
        value: "grade-9",
        label: "Grade 9",
    },
    {
        value: "grade-10",
        label: "Grade 10",
    },
] satisfies SchoolGradeLevels[];