export const teachersData = [
    {
        id: "1",
        firstName: "Emily",
        middleName: "Rose",
        lastName: "Johnson",
        email: "emily.johnson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/emily.jpg",
        role: "teacher",
        specialization: "Mathematics",
        yearsOfExperience: 8
    },
    {
        id: "2",
        firstName: "Michael",
        middleName: "",
        lastName: "Smith",
        email: "michael.smith@school.edu",
        emailVerified: true,
        image: "https://example.com/images/michael.jpg",
        role: "teacher",
        specialization: "Science",
        yearsOfExperience: 12
    },
    {
        id: "3",
        firstName: "Sarah",
        middleName: "Elizabeth",
        lastName: "Brown",
        email: "sarah.brown@school.edu",
        emailVerified: true,
        image: "https://example.com/images/sarah.jpg",
        role: "teacher",
        specialization: "English",
        yearsOfExperience: 5
    },
    {
        id: "4",
        firstName: "David",
        middleName: "Alan",
        lastName: "Wilson",
        email: "david.wilson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/david.jpg",
        role: "teacher",
        specialization: "History",
        yearsOfExperience: 15
    },
    {
        id: "5",
        firstName: "Lisa",
        middleName: "",
        lastName: "Taylor",
        email: "lisa.taylor@school.edu",
        emailVerified: true,
        image: "https://example.com/images/lisa.jpg",
        role: "teacher",
        specialization: "Physical Education",
        yearsOfExperience: 7
    }
];

export const teacherColumns = [
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "specialization", header: "Specialization" },
    { accessorKey: "yearsOfExperience", header: "Years of Experience" },
    { accessorKey: "email", header: "Email" }
]

export type SchoolSubjects = Record<"value" | "label", string>;

export const schoolSubjects = [
    {
        value: "math",
        label: "Mathematics",
    },
    {
        value: "science",
        label: "Science",
    },
    {
        value: "english",
        label: "English",
    },
    {
        value: "history",
        label: "History",
    },
    {
        value: "physical-education",
        label: "Physical Education",
    },
] satisfies SchoolSubjects[];