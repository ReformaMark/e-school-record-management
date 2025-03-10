// Dummy data for students
// TO ADD: Year level (1st, 2nd, 3rd and Grade 10)

import { Badge } from "@/components/ui/badge";
import { StudentTypes } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";


export const studentsData = [
    {
        id: "1",
        lrn: "100123456789",
        firstName: "Juan",
        middleName: "Miguel",
        lastName: "Dela Cruz",
        birthDate: "2005-05-15",
        gender: "Male",
        address: "123 Rizal St, Quezon City, Philippines",
        yearLevel: "Grade 10",
        parentGuardianName: "Maria Dela Cruz",
        parentGuardianContact: "+639123456789"
    },
    {
        id: "2",
        lrn: "100223456789",
        firstName: "Maria",
        middleName: "Santos",
        lastName: "Reyes",
        birthDate: "2006-02-20",
        gender: "Female",
        address: "456 Mabini St, Makati City, Philippines",
        yearLevel: "Grade 11",
        strand: "STEM", // Added strand
        parentGuardianName: "Jose Reyes",
        parentGuardianContact: "+639198765432"
    },
    {
        id: "3",
        lrn: "100323456789",
        firstName: "Michael",
        middleName: "James",
        lastName: "Garcia",
        birthDate: "2005-11-10",
        gender: "Male",
        address: "789 Quezon Ave, Manila, Philippines",
        yearLevel: "Grade 9",
        strand: '',
        parentGuardianName: "Anna Garcia",
        parentGuardianContact: "+639112233445"
    },
    {
        id: "4",
        lrn: "100423456789",
        firstName: "Sofia",
        middleName: "Rose",
        lastName: "Domingo",
        birthDate: "2006-08-05",
        gender: "Female",
        address: "101 Bonifacio Rd, Marikina, Philippines",
        yearLevel: "Grade 10",
        strand: '',
        parentGuardianName: "David Domingo",
        parentGuardianContact: "+639155566677"
    },
    {
        id: "5",
        lrn: "100523456789",
        firstName: "Daniel",
        middleName: "",
        lastName: "Santos",
        birthDate: "2005-04-30",
        gender: "Male",
        address: "202 Aguinaldo Ln, Pasig City, Philippines",
        yearLevel: "Grade 7",
        strand: '',
        parentGuardianName: "Jennifer Santos",
        parentGuardianContact: "+639199988877"
    },
    {
        id: "6",
        lrn: "100623456789",
        firstName: "Olivia",
        middleName: "Kate",
        lastName: "Dela Rosa",
        birthDate: "2006-01-12",
        gender: "Female",
        address: "303 Mabuhay St, Quezon City, Philippines",
        yearLevel: "Grade 8",
        strand: '',
        parentGuardianName: "Kevin Dela Rosa",
        parentGuardianContact: "+639166666666"
    },
    {
        id: "7",
        lrn: "100723456789",
        firstName: "Benjamin",
        middleName: "",
        lastName: "Cruz",
        birthDate: "2005-09-25",
        gender: "Male",
        address: "404 P. Burgos St, San Juan, Philippines",
        yearLevel: "Grade 9",
        strand: '',
        parentGuardianName: "Lisa Cruz",
        parentGuardianContact: "+639177777777"
    },
    {
        id: "8",
        lrn: "100823456789",
        firstName: "Ava",
        middleName: "May",
        lastName: "Lazaro",
        birthDate: "2006-05-18",
        gender: "Female",
        address: "505 Panganiban Rd, Caloocan City, Philippines",
        yearLevel: "Grade 10",
        strand: '',
        parentGuardianName: "Brian Lazaro",
        parentGuardianContact: "+639188888888"
    },
    {
        id: "9",
        lrn: "100923456789",
        firstName: "Ethan",
        middleName: "Alexander",
        lastName: "Mendoza",
        birthDate: "2005-07-22",
        gender: "Male",
        address: "606 Nicanor St, Las Piñas, Philippines",
        yearLevel: "Grade 7",
        strand: '',
        parentGuardianName: "Karen Mendoza",
        parentGuardianContact: "+639199999999"
    },
    {
        id: "10",
        lrn: "101023456789",
        firstName: "Isabella",
        middleName: "Rose",
        lastName: "Gonzales",
        birthDate: "2006-03-15",
        gender: "Female",
        address: "707 Katipunan Ave, Quezon City, Philippines",
        yearLevel: "Grade 8",
        strand: '',
        parentGuardianName: "Richard Gonzales",
        parentGuardianContact: "+639122222222"
    },
    {
        id: "11",
        lrn: "101123456789",
        firstName: "Logan",
        middleName: "",
        lastName: "White",
        birthDate: "2005-06-17",
        gender: "Male",
        address: "808 Taft Ave, Pasay City, Philippines",
        yearLevel: "Grade 9",
        strand: '',
        parentGuardianName: "Carol White",
        parentGuardianContact: "+639133333333"
    },
    {
        id: "12",
        lrn: "101223456789",
        firstName: "Liam",
        middleName: "Christopher",
        lastName: "Martin",
        birthDate: "2006-04-02",
        gender: "Male",
        address: "909 Araneta Ave, Mandaluyong, Philippines",
        yearLevel: "Grade 10",
        strand: '',
        parentGuardianName: "Susan Martin",
        parentGuardianContact: "+639144444444"
    },
    {
        id: "13",
        lrn: "101323456789",
        firstName: "Gabriella",
        middleName: "Marie",
        lastName: "Harris",
        birthDate: "2005-10-28",
        gender: "Female",
        address: "1010 Ortigas Ave, Mandaluyong, Philippines",
        yearLevel: "Grade 7",
        strand: '',
        parentGuardianName: "James Harris",
        parentGuardianContact: "+639155555555"
    },
    {
        id: "14",
        lrn: "101423456789",
        firstName: "Alexander",
        middleName: "James",
        lastName: "Taylor",
        birthDate: "2006-01-05",
        gender: "Male",
        address: "1111 Ayala Ave, Makati City, Philippines",
        yearLevel: "Grade 8",
        strand: '',
        parentGuardianName: "Laura Taylor",
        parentGuardianContact: "+639166666666"
    },
    {
        id: "15",
        lrn: "101523456789",
        firstName: "Charlotte",
        middleName: "Elizabeth",
        lastName: "Lewis",
        birthDate: "2005-09-01",
        gender: "Female",
        address: "1212 Roxas Blvd, Manila, Philippines",
        yearLevel: "Grade 9",
        strand: '',
        parentGuardianName: "Michael Lewis",
        parentGuardianContact: "+639177777777"
    },
    {
        id: "16",
        lrn: "101623456789",
        firstName: "Julian",
        middleName: "Thomas",
        lastName: "Walker",
        birthDate: "2006-06-01",
        gender: "Male",
        address: "1313 Commonwealth Ave, Quezon City, Philippines",
        yearLevel: "Grade 10",
        strand: '',
        parentGuardianName: "Rebecca Walker",
        parentGuardianContact: "+639188888888"
    }
];



export const studentColumns: ColumnDef<StudentTypes>[] = [
    {
        accessorKey: "lrn",
        header: "LRN"
    },
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "birthDate",
        header: "Birth Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("birthDate"));
            return format(date, "MMM dd, yyyy");
        }
    },
    {
        accessorKey: "sex",
        header: "Gender"
    },
    {
        accessorKey: "gradeLevel",
        header: "Year Level",
        cell: ({ row }) => {
            const student = row.original;
            const isEnrolled = student.enrollmentStatus === "Enrolled"

            return (
                <div>
                    {isEnrolled ? (
                        student.gradeLevel || "N/A"
                    ) : (
                        <div className="flex items-center gap-1">
                            {student.gradeLevelToEnroll || "N/A"}
                            <Badge variant="outline" className="ml-2 text-white font-normal bg-blue-500">
                                For Enrollment
                            </Badge>
                        </div>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "parent",
        header: "Parent/Guardian",
        cell: ({ row }) => {

            const gradeLevel = row.original

            return (
                <div className="flex flex-col space-y-1">
                    {
                        gradeLevel.fatherFirstName && gradeLevel.fatherLastName ? (
                            <p className="text-sm">{gradeLevel.fatherFirstName} {gradeLevel.fatherLastName}</p>
                        ) : <p className="text-sm text-muted-foreground">Father: not assigned</p>
                    }
                    {
                        gradeLevel.motherFirstName && gradeLevel.motherLastName ? (
                            <p className="text-sm">{gradeLevel.motherFirstName} {gradeLevel.motherLastName}</p>
                        ) : <p className="text-sm text-muted-foreground">Mother: not assigned</p>
                    }
                    {
                        gradeLevel.guardianFirstName && gradeLevel.guardianLastName ? (
                            <p className="text-sm">{gradeLevel.guardianFirstName} {gradeLevel.guardianLastName}</p>
                        ) : <p className="text-sm text-muted-foreground">Guardian: not assigned</p>
                    }
                </div>
            )
        },
    }
];