export const sections = [
    {
      section: "7-A",
      gradeLevel: "Grade 7",
      subject: "Mathematics",
      schedule: "7:00 AM - 8:30 AM",
      days: ["M", "W", "F"],
      totalStudents: 40,
      roomNumber: "101" // Example room number
    },
    {
      section: "7-B",
      gradeLevel: "Grade 7",
      subject: "Filipino",
      schedule: "8:30 AM - 10:00 AM",
      days: ["M", "W", "F"],
      totalStudents: 38,
      roomNumber: "102" // Example room number
    },
    {
      section: "8-A",
      gradeLevel: "Grade 8",
      subject: "Science",
      schedule: "10:00 AM - 11:30 AM",
      days: ["M", "W", "F"],
      totalStudents: 42,
      roomNumber: "201" // Example room number
    },
    {
      section: "8-B",
      gradeLevel: "Grade 8",
      subject: "Araling Panlipunan",
      schedule: "1:00 PM - 2:30 PM",
      days: ["M", "W", "F"],
      totalStudents: 39,
      roomNumber: "202" // Example room number
    },
    {
      section: "9-A",
      gradeLevel: "Grade 9",
      subject: "English",
      schedule: "7:00 AM - 8:30 AM",
      days: ["T", "Th"],
      totalStudents: 36,
      roomNumber: "301" // Example room number
    },
    {
      section: "9-B",
      gradeLevel: "Grade 9",
      subject: "TLE (Technology & Livelihood Education)",
      schedule: "8:30 AM - 10:00 AM",
      days: ["T", "Th"],
      totalStudents: 40,
      roomNumber: "302" // Example room number
    },
    {
      section: "10-A",
      gradeLevel: "Grade 10",
      subject: "MAPEH",
      schedule: "10:00 AM - 11:30 AM",
      days: ["T", "Th"],
      totalStudents: 37,
      roomNumber: "401" // Example room number
    },
];


  export const sectionColumns = [
    { accessorKey: "section", header: "Section Name" },
    { accessorKey: "gradeLevel", header: "Grade Level" },
    { accessorKey: "roomNumber", header: "Room No." },
   
    { accessorKey: "days", header: "Schedule Days" },
    { accessorKey: "schedule", header: "Time" },
    { accessorKey: "subject", header: "Subject" },
    { accessorKey: "totalStudents", header: "No. of Students" },
   
]