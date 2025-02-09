/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, User } from "lucide-react";
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  FaInfoCircle, FaRegSave, FaUserEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { CgDanger } from "react-icons/cg";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { StudentsWithClassRecord, StudentsWithEnrollMentTypes, StudentsWithQuarterlyGrade } from "@/lib/types";
import PerformanceTaskDialog from "./PerformanceTaskDialog";
import WrittenWorksDialog from "./WrittenWorksDialog";
import QuarterlyAssessmentDialog from "./QuarterlyExamDialog";
import SubmitGradesDialog from "./SubmitGradesDialog";
import InterventionDialog from "./InterventionDialog";
import { Badge } from "@/components/ui/badge";


type Student = {
  id: number;
  lrn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateEnrolled: string;
  attendancePercentage: number;
  quarterAverage: number;
  recommendedInterventions: string;
  interventionRemarks: string;
  gender: string;
  writtenWorks: string;       // Now a string e.g., "3 out of 10"
  performanceTask: string;    // Now a string e.g., "2 out of 10"
  quarterlyAssessment: string; // Now a string e.g., "1 out of 1"
};
export const studentsData = [
  {
    id: 1,
    lrn: "123456789012",
    firstName: "Juan",
    middleName: "Santos",
    lastName: "Cruz",
    dateEnrolled: "2024-08-15",
    attendancePercentage: 75,
    quarterAverage: 70,
    recommendedInterventions: "Attendance Monitoring",
    interventionRemarks: "Frequent absences due to illness.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 2,
    lrn: "234567890123",
    firstName: "Maria",
    middleName: "Reyes",
    lastName: "Dela Cruz",
    dateEnrolled: "2024-08-12",
    attendancePercentage: 78,
    quarterAverage: 65,
    recommendedInterventions: "Counseling",
    interventionRemarks: "Struggles with family issues.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 3,
    lrn: "345678901234",
    firstName: "Roberto",
    middleName: "Garcia",
    lastName: "Flores",
    dateEnrolled: "2024-08-20",
    attendancePercentage: 70,
    quarterAverage: 72,
    recommendedInterventions: "Extra Homework",
    interventionRemarks: "Needs to improve on assignment submissions.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 4,
    lrn: "456789012345",
    firstName: "Kris",
    middleName: "Lee",
    lastName: "Nguyen",
    dateEnrolled: "2024-08-18",
    attendancePercentage: 79,
    quarterAverage: 68,
    recommendedInterventions: "Parental Guidance",
    interventionRemarks: "Shows low motivation in class.",
    gender: "Non-binary",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 5,
    lrn: "567890123456",
    firstName: "Alicia",
    middleName: "Grace",
    lastName: "Torres",
    dateEnrolled: "2024-08-10",
    attendancePercentage: 74,
    quarterAverage: 60,
    recommendedInterventions: "Tutoring",
    interventionRemarks: "Needs additional help with math topics.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 6,
    lrn: "678901234567",
    firstName: "Emilia",
    middleName: "Rosalinda",
    lastName: "De Leon",
    dateEnrolled: "2024-08-14",
    attendancePercentage: 85,
    quarterAverage: 90,
    recommendedInterventions: "None",
    interventionRemarks: "Performs well academically.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 7,
    lrn: "789012345678",
    firstName: "David",
    middleName: "Jose",
    lastName: "Garcia",
    dateEnrolled: "2024-08-13",
    attendancePercentage: 88,
    quarterAverage: 82,
    recommendedInterventions: "None",
    interventionRemarks: "No academic concerns.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 8,
    lrn: "890123456789",
    firstName: "Olivia",
    middleName: "Marie",
    lastName: "Martinez",
    dateEnrolled: "2024-08-19",
    attendancePercentage: 90,
    quarterAverage: 85,
    recommendedInterventions: "None",
    interventionRemarks: "Excellent academic performance.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 9,
    lrn: "901234567890",
    firstName: "Sofia",
    middleName: "Ann",
    lastName: "Rodriguez",
    dateEnrolled: "2024-08-17",
    attendancePercentage: 92,
    quarterAverage: 88,
    recommendedInterventions: "None",
    interventionRemarks: "Shows consistent excellence.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 10,
    lrn: "012345678901",
    firstName: "Jacob",
    middleName: "Alejandro",
    lastName: "Torres",
    dateEnrolled: "2024-09-25",
    attendancePercentage: 89,
    quarterAverage: 81,
    recommendedInterventions: "None",
    interventionRemarks: "No major concerns.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 11,
    lrn: "123450987654",
    firstName: "Miguel",
    middleName: "Tomas",
    lastName: "Verde",
    dateEnrolled: "2024-09-01",
    attendancePercentage: 76,
    quarterAverage: 73,
    recommendedInterventions: "After School Support",
    interventionRemarks: "Needs help with reading comprehension.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 12,
    lrn: "234560987654",
    firstName: "Emma",
    middleName: "Louise",
    lastName: "Javier",
    dateEnrolled: "2024-09-03",
    attendancePercentage: 77,
    quarterAverage: 67,
    recommendedInterventions: "Study Sessions",
    interventionRemarks: "Needs improvement in math.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 13,
    lrn: "345670987654",
    firstName: "Daniel",
    middleName: "Reyes",
    lastName: "Lee",
    dateEnrolled: "2024-09-05",
    attendancePercentage: 70,
    quarterAverage: 78,
    recommendedInterventions: "Parental Meeting",
    interventionRemarks: "Needs more parental involvement.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 14,
    lrn: "456780987654",
    firstName: "Mia",
    middleName: "Isabel",
    lastName: "Hernandez",
    dateEnrolled: "2024-09-07",
    attendancePercentage: 79,
    quarterAverage: 69,
    recommendedInterventions: "Tutoring",
    interventionRemarks: "Struggles with science topics.",
    gender: "Female",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
  {
    id: 15,
    lrn: "567890987654",
    firstName: "James",
    middleName: "William",
    lastName: "Perez",
    dateEnrolled: "2024-09-10",
    attendancePercentage: 82,
    quarterAverage: 76,
    recommendedInterventions: "None",
    interventionRemarks: "No academic concerns.",
    gender: "Male",
    writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 10`,
    quarterlyAssessment: `1 out of 1`,
  },
];


type SummerClassStatus = {
  fullName: string;              // Student's full name
  status: "Required to Enroll" | "Recommended for Summer Class" | "Enrolled" | "Not Enrolled"; // Status regarding summer class
  subject: string;               // Subject for which summer class is being considered
  remarks: string;               // Any additional notes about the student's performance or situation
  originalFinalGrade: number;    // Student's original final grade before summer class
};
export const summerClassStatus = [
  {
    fullName: "Maria Santos",
    status: "Required to Enroll", // Needs to take summer class
    subject: "Mathematics",
    remarks: "Failed in the 2nd and 3rd quarters.",
    originalFinalGrade: 65 // Original grade before summer class
  },
  {
    fullName: "Luis Garcia",
    status: "Required to Enroll", // Suggested to attend for improvement
    subject: "Mathematics",
    remarks: "Passed but needs reinforcement.",
    originalFinalGrade: 70 // Original grade before summer class
  },
  {
    fullName: "Alyssa Reyes",
    status: "Enrolled", // Currently attending summer class
    subject: "Mathematics",
    remarks: "Improving her grades through summer attendance.",
    originalFinalGrade: 73 // Original grade before summer class
  },
  {
    fullName: "Kevin Lim",
    status: "Not Enrolled", // Did not enroll in summer class
    subject: "Mathematics",
    remarks: "Needs to retake the subject in the next school year.",
    originalFinalGrade: 69 // Original grade before summer class
  }
];

export const forRemedial: ColumnDef<SummerClassStatus>[] = [
  
  { accessorKey: 'fullName', header: "Full Name"},
  { accessorKey: 'originalFinalGrade', header: "Final Grade"},
  { accessorKey: "status", header: "Status" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const status = row.original.status
        const [isOpen, setIsOpen] = useState<boolean>(false)
      
        const handleOpen = () =>{
          setIsOpen(!isOpen)
        }
      return (
        <div className="flex items-center gap-x-2 ">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Input</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOpen}>
                Update Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        <Dialog open={isOpen}>
          <DialogContent className=' max-h-screen overflow-auto text-primary'>
          <DialogHeader>
              <DialogTitle>
                <h1>Student Name: {row.original.fullName}</h1>
              </DialogTitle>
              
          </DialogHeader>
          {status === 'Enrolled' ? (
            <div className="">
             
              <h1>Subject: {row.original.subject}</h1>
              <h1>Status: {row.original.status}</h1>
              <div className="grid grid-cols-2 gap-x-5">
                <div className="">
                  <Label htmlFor="initialGrade">Final Grade</Label>
                  <Input 
                    type='number' 
                    name="initialGrade"
                    value={row.original.originalFinalGrade}
                    readOnly
                  />
                </div>
                <div className="">
                  <Label htmlFor="summerClassGrade">Summer Class Final Grade</Label>
                  <Input 
                    type='number' 
                    name="summerClassGrade"
                    
                  />
                </div>
              </div>
            </div>
          ) :(
            <div className="">
              {row.original.status === 'Not Enrolled' ? (
                <div className="">
                  <h1>Subject: {row.original.subject}</h1>
                  <h1>Status: {row.original.status}</h1>
                  <h1>Final Grade: {row.original.originalFinalGrade}</h1>
                </div>
              ): (
                <div className="">
                  <h1>Subject: {row.original.subject}</h1>
                  <h1>Final Grade: {row.original.originalFinalGrade}</h1>
                  <div className="flex items-center gap-x-3">
                    <h1>Status: </h1>
                    <Select defaultValue={status}>
                      <SelectTrigger className="outline outline-primary">
                        <SelectValue defaultValue={status} placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="Not Enrolled">Not Enrolled</SelectItem>
                          <SelectItem value="Enrolled">Enrolled</SelectItem>
                    
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
               
            </div>
          )}
         
          <DialogFooter>
            {status === 'Enrolled' &&(
              <Button variant={'default'} onClick={()=> setIsOpen(!isOpen)} className="text-white">Submit Grade</Button>

            )}
            {status === 'Not Enrolled' &&(
              <Button variant={'default'} onClick={()=> setIsOpen(!isOpen)} className="text-white">Close</Button>

            )}
            {status !== 'Not Enrolled' && status !== 'Enrolled' && (
              <Button variant={'default'} onClick={()=> setIsOpen(!isOpen)} className="text-white">Save</Button>

            )}
          </DialogFooter>
          </DialogContent>
        
        </Dialog>

        </div>
      )
    },
  },
]


type Gender = "male" | "female" | "non-binary" | "other";

interface StudentType {
    id: string; // Unique identifier for the student
    lrn: string; // Learner Reference Number
    firstName: string; // Student's first name
    middleName: string; // Student's middle name
    lastName: string; // Student's last name
    birthDate: string; // Date of birth in YYYY-MM-DD format
    gender: Gender; // Gender of the student
    address: string; // Residential address of the student
    yearLevel: string; // Year level the student is in (e.g., "1st Year")
    parentGuardianName: string; // Name of the parent or guardian
    parentGuardianContact: string; // Contact number of the parent or guardian
}

export const studentDatas = [
  {
    id: "1",
    lrn: "LRN10001",
    firstName: "Juan",
    middleName: "Carlos",
    lastName: "Dela Cruz",
    birthDate: "2005-05-15",
    gender: "male",
    address: "123 Main St, Manila, Philippines",
    yearLevel: "1st Year",
    parentGuardianName: "Maria Dela Cruz",
    parentGuardianContact: "+639123456789"
  },
  {
    id: "2",
    lrn: "LRN10002",
    firstName: "Ana",
    middleName: "Sofia",
    lastName: "Reyes",
    birthDate: "2006-02-20",
    gender: "female",
    address: "456 Elm St, Quezon City, Philippines",
    yearLevel: "2nd Year",
    parentGuardianName: "Roberto Reyes",
    parentGuardianContact: "+639198765432"
  },
  {
    id: "3",
    lrn: "LRN10003",
    firstName: "Michael",
    middleName: "Jose",
    lastName: "Santos",
    birthDate: "2005-11-10",
    gender: "male",
    address: "789 Oak Ave, Cebu, Philippines",
    yearLevel: "3rd Year",
    parentGuardianName: "Sarah Santos",
    parentGuardianContact: "+639112233445"
  },
  {
    id: "4",
    lrn: "LRN10004",
    firstName: "Sophia",
    middleName: "Marie",
    lastName: "Garcia",
    birthDate: "2006-08-05",
    gender: "female",
    address: "101 Pine Rd, Davao, Philippines",
    yearLevel: "4th Year",
    parentGuardianName: "David Garcia",
    parentGuardianContact: "+639155566677"
  },
  {
    id: "5",
    lrn: "LRN10005",
    firstName: "Daniel",
    middleName: "Angelo",
    lastName: "Cruz",
    birthDate: "2005-04-30",
    gender: "male",
    address: "202 Cedar Ln, Batangas, Philippines",
    yearLevel: "1st Year",
    parentGuardianName: "Jennifer Cruz",
    parentGuardianContact: "+639199988877"
  },
  {
    id: "6",
    lrn: "LRN10006",
    firstName: "Olivia",
    middleName: "May",
    lastName: "Lopez",
    birthDate: "2006-01-12",
    gender: "female",
    address: "303 Maple St, Iloilo, Philippines",
    yearLevel: "2nd Year",
    parentGuardianName: "Kevin Lopez",
    parentGuardianContact: "+639166666666"
  },
  {
    id: "7",
    lrn: "LRN10007",
    firstName: "Benjamin",
    middleName: "Luis",
    lastName: "Miller",
    birthDate: "2005-09-25",
    gender: "male",
    address: "404 Walnut St, Pampanga, Philippines",
    yearLevel: "3rd Year",
    parentGuardianName: "Lisa Miller",
    parentGuardianContact: "+639177777777"
  },
  {
    id: "8",
    lrn: "LRN10008",
    firstName: "Ava",
    middleName: "Rose",
    lastName: "De Leon",
    birthDate: "2006-05-18",
    gender: "female",
    address: "505 River Rd, Bacolod, Philippines",
    yearLevel: "4th Year",
    parentGuardianName: "Brian De Leon",
    parentGuardianContact: "+639188888888"
  },
  {
    id: "9",
    lrn: "LRN10009",
    firstName: "Ethan",
    middleName: "Alonzo",
    lastName: "Ramos",
    birthDate: "2005-07-22",
    gender: "male",
    address: "606 Park Ave, Laguna, Philippines",
    yearLevel: "1st Year",
    parentGuardianName: "Karen Ramos",
    parentGuardianContact: "+639199999999"
  },
  {
    id: "10",
    lrn: "LRN10010",
    firstName: "Isabella",
    middleName: "Grace",
    lastName: "Cortez",
    birthDate: "2006-03-15",
    gender: "female",
    address: "707 Lake Dr, Zambales, Philippines",
    yearLevel: "2nd Year",
    parentGuardianName: "Richard Cortez",
    parentGuardianContact: "+639122222222"
  },
  {
    id: "11",
    lrn: "LRN10011",
    firstName: "Logan",
    middleName: "Miguel",
    lastName: "Fernandez",
    birthDate: "2005-06-17",
    gender: "male",
    address: "808 Hillside Dr, Cagayan de Oro, Philippines",
    yearLevel: "3rd Year",
    parentGuardianName: "Carol Fernandez",
    parentGuardianContact: "+639133333333"
  },
  {
    id: "12",
    lrn: "LRN10012",
    firstName: "Liam",
    middleName: "Antonio",
    lastName: "Santos",
    birthDate: "2006-04-02",
    gender: "male",
    address: "909 Valley Rd, Baguio, Philippines",
    yearLevel: "4th Year",
    parentGuardianName: "Susan Santos",
    parentGuardianContact: "+639144444444"
  },
  {
    id: "13",
    lrn: "LRN10013",
    firstName: "Gabriella",
    middleName: "Jade",
    lastName: "Sarmiento",
    birthDate: "2005-10-28",
    gender: "female",
    address: "1010 Oak St, San Fernando, Philippines",
    yearLevel: "1st Year",
    parentGuardianName: "James Sarmiento",
    parentGuardianContact: "+639155555555"
  },
  {
    id: "14",
    lrn: "LRN10014",
    firstName: "Alexander",
    middleName: "Julius",
    lastName: "Diaz",
    birthDate: "2006-01-05",
    gender: "male",
    address: "1111 Park Pl, General Santos, Philippines",
    yearLevel: "2nd Year",
    parentGuardianName: "Laura Diaz",
    parentGuardianContact: "+639166666666"
  },
  {
    id: "15",
    lrn: "LRN10015",
    firstName: "Charlotte",
    middleName: "Elaine",
    lastName: "Navarro",
    birthDate: "2005-09-01",
    gender: "female",
    address: "1212 Maple Ave, Tacloban, Philippines",
    yearLevel: "3rd Year",
    parentGuardianName: "Michael Navarro",
    parentGuardianContact: "+639177777777"
  },
  {
    id: "16",
    lrn: "LRN10016",
    firstName: "Julian",
    middleName: "Mateo",
    lastName: "Bautista",
    birthDate: "2006-06-01",
    gender: "male",
    address: "1313 River Rd, Angeles, Philippines",
    yearLevel: "4th Year",
    parentGuardianName: "Rebecca Bautista",
    parentGuardianContact: "+639188888888"
  },
];



export const studentDatasColumn: ColumnDef<StudentType>[] = [
  {
    id: "fullName",
    header: "Info",
    cell: ({  }) => {
    
 
      return (
        <></>
      )
    },
  },
]
 
export const students: ColumnDef<Student>[] = [
  {
    id: "lastName",
    header: "Info",
    cell: ({ row }) => {

      const firstName = row.original.firstName
      const lastName = row.original.lastName
      const middleNameInitial = row.original.middleName ? row.original.middleName.charAt(0) : '';
 
      return (
        <div className="flex items-start gap-x-2 ">
            <User className="size-10 bg-gray-200 p-1 rounded-full"/>
            <div className="">
              <h1 className="text-xs">{lastName}, {firstName} {middleNameInitial}.</h1>
              <h1 className="text-xs">{}</h1>

            </div>
        </div>
      )
    },
  },

{
    accessorKey: "yearLevel",
    header: "Year Level"
},
{
    accessorKey: "parentGuardianName",
    header: "Parent/Guardian"
},
{
    accessorKey: "parentGuardianContact",
    header: "Contact"
},
{
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
        const student = row.original
      return (
        <div className="flex items-center gap-x-2 ">
          <Link href={`/my-advisees/${student.id}`} className="">
              <FaUserEdit className="size-6 text-gray-400 hover:text-orange-500"/>
          </Link>
          <Link href={`/my-advisees/${student.id}`} className="">
              <FaInfoCircle className="size-6 text-gray-400 hover:text-blue-500"/>
          </Link>
        </div>
      )
    },
  },
];

export const studentMasterList: ColumnDef<StudentsWithEnrollMentTypes>[] = [
   {
    id: "number",
    header: "",
    cell: ({ row }) => {
      const student = row.index

      return (
        <>{student + 1}</>
      )
    },
  },
  { 
    id: "number",
    header: "LRN",
    accessorKey: "lrn",
    cell: ({ row }) => {
      const student = row.original

      return (
        <h1>{student.lrn === "" ? "-": student.lrn}</h1>
      )
    },
  },
  {  
    id: "lastName",
    header: "Last Name",
    accessorFn: (row) => {
      const { lastName, firstName, middleName, extensionName } = row;
    
      // Construct the full name including optional middle and extension names
      return [
        firstName, 
        middleName, 
        lastName, 
        extensionName
      ].filter(Boolean).join(" ");
    },
    cell: ({ row }) => {
      const lastName = row.original.lastName

      return (
        <h1 className="capitalize">{lastName ? lastName : '-'}</h1>
      )
    },
   },
  { 
    id: "firstName",
    header: "First Name",
    accessorKey: "firstName",
    cell: ({ row }) => {
      const firstName = row.original.firstName

      return (
        <h1 className="capitalize">{firstName ? firstName : '-'}</h1>
      )
    },
  },
  { id: "middleName",
    header: "Middle name",
    accessorKey: "middleName",
    cell: ({ row }) => {
      const middleName = row.original.middleName

      return (
        <h1 className="capitalize">{middleName ? middleName : '-'}</h1>
      )
    },
  },
  { id: "dateEnrolled",
    header: "Enrollment Date",
    accessorKey: "dateEnrolled",
    cell: ({ row }) => {
      const enrollmentDate = row.original.enrollment.dateEnrolled

      return (
        <h1>{enrollmentDate ? enrollmentDate : ""}</h1>
      )
    },
   },

]



export const InputGradesCol: ColumnDef<StudentsWithClassRecord>[] = [
  {
    id: "number",
    header: "",
    cell: ({ row }) => {
      const student = row.index
 
      return (
        <div className="">
          {student + 1}
        </div>
      )
    },
  },
  {
    id: "fullName",
    accessorFn: (row) => {
      const { lastName, firstName, middleName, extensionName } = row;
    
      // Construct the full name including optional middle and extension names
      return [
        firstName, 
        middleName, 
        lastName, 
        extensionName
      ].filter(Boolean).join(" ");
    },
    header: "Name",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="">
          {student.lastName}, {student.firstName} {student.middleName}
        </div>
      )
    },
  },
  {
    id: "written",
    accessorKey: "writtenWorks", 
    header: "Written Works",
    cell: ({ row }) => {
      const student = row.original
      const classRecord = student.classRecords.flatMap(c => {
        return c.written.map(ww => {
          return {
            ...c,
            written: ww
          };
        });
      });
      const recordWithScore = classRecord.filter(c => c.written.score !== undefined)
      
      return (
 
        <div className="">
          {classRecord.length < 1 ? (
            <h1>Not set</h1>
          ) : (

            <p>{recordWithScore.length.toString()} out of {classRecord.length.toString()}</p>
          )}
        </div>
      )
    },
  },
  {
    id: "performance",
    accessorKey: "performance", 
    header: "Performance Tasks",
    cell: ({ row }) => {
      const student = row.original
      const classRecord = student.classRecords.flatMap(c => {
        return c.performance.map(pt => {
          return {
            ...c,
            performance: pt
          };
        });
      });
      const recordWithScore = classRecord.filter(c => c.performance.score !== undefined)
      
      return (
 
        <div className="">
          {classRecord.length < 1 ? (
            <h1>Not set</h1>
          ) : (

            <p>{recordWithScore.length.toString()} out of {classRecord.length.toString()}</p>
          )}
        </div>
      )
    },
  },
  {
    id: "quarterlyAssessment",
    accessorKey: "quarterlyExam", 
    header: "Quarterly Assessment",
    cell: ({ row }) => {
      const student = row.original
      const classRecord = student.classRecords.flatMap(c => {
        return c.quarterlyExam.map(qe => {
          return {
            ...c,
            quarterlyExam: qe
          };
        });
      });
      const recordWithScore = classRecord.filter(c => c.quarterlyExam.score !== undefined)
      
      return (
 
        <div className="">
          {classRecord.length < 1 ? (
            <h1>Not set</h1>
          ) : (

            <p>{recordWithScore.length.toString()} out of {classRecord.length.toString()}</p>
          )}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isWWOpen, setIsWWOpen] = useState<boolean>(false)
      const [isPTOpen, setIsPTOpen] = useState<boolean>(false)
      const [isQAOpen, setIsQAOpen] = useState<boolean>(false)
      const [isSGOpen, setIsSGOpen] = useState<boolean>(false)
      const [isOpen, setIsOpen ] = useState<boolean>(false)
     
      const student = row.original
      const studentName = `${student.lastName}, ${student.firstName}`

      const quarterExams = student.classRecords.flatMap(c => {
        return c.quarterlyExam.map(qe => {
          return {
            _id: c._id,
            quarterlyExam: qe
          };
        });
      });
      const writtenWorks = student.classRecords.flatMap(c => {
        return c.written.map(ww => {
          return {
            _id: c._id,
            written: ww
          };
        });
      });
      const performanceTasks = student.classRecords.flatMap(c => {
        return c.performance.map(pt => {
          return {
            _id: c._id,
            performance: pt
          };
        });
      });

      const sortedPerformanceTasks = performanceTasks.sort((a, b) => a.performance.assessmentNo - b.performance.assessmentNo)
      const sortedWrittenWorks = writtenWorks.sort((a, b) => a.written.assessmentNo - b.written.assessmentNo)
      
      const openWW = ()=> {
        setIsWWOpen(!isWWOpen)
      }
      const openPT = ()=> {
        setIsPTOpen(!isPTOpen)
      }
      const openQA = ()=> {
        setIsQAOpen(!isQAOpen)
      }

      const allScoresDefined = (student: StudentsWithClassRecord): boolean => {
        return (
          Array.isArray(student.classRecords) && // Ensure classRecords is an array
          student.classRecords.length > 0 && // Ensure it's not empty
          Array.isArray(student.classRecords[0].quarterlyExam) && // Ensure quarterlyExam is an array
          student.classRecords[0].quarterlyExam.every(exam => exam.score !== undefined) // Check scores
        );
      };
      const hasExamScore = allScoresDefined(student)

      const subjectId = student.classRecords.length > 0 ? student.classRecords[0].cLass.subjectId : undefined

      const isSubmitted = student.classRecords.length > 0 ? student.classRecords[0].isSubmitted ? true : false : true

      const isDisabled = isSubmitted || !hasExamScore;
      return (
        <div className="text-primary">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Input</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={writtenWorks.length < 1 ? true : false || isSubmitted} onClick={openWW}>
                Written Works
              </DropdownMenuItem>
              <DropdownMenuItem disabled={performanceTasks.length < 1 ? true : false || isSubmitted} onClick={openPT}>
                Performance Tasks
              </DropdownMenuItem>
              <DropdownMenuItem disabled={quarterExams.length < 1 ? true : false || isSubmitted} onClick={openQA}>
                Quarterly Assessment
              </DropdownMenuItem>
             
                <DropdownMenuItem disabled={isDisabled} onClick={()=> setIsSGOpen(true)}>
                  <Button
                    disabled={isDisabled}
                    className="border shadow-md flex justify-center items-center gap-x-3 disabled:bg-blue-200 bg-blue-600 disabled:text-gray-500 text-white border-gray-100 rounded-md px-2 py-1"
                  >
                    <FaRegSave />
                    Submit Grades
                  </Button>
                  
                </DropdownMenuItem>
           
           
             
            </DropdownMenuContent>
          </DropdownMenu>

        <WrittenWorksDialog 
          sortedWrittenWorks={sortedWrittenWorks}
          isWWOpen={isWWOpen}
          setIsWWOpen={setIsWWOpen}
          name={studentName}
        />
       <PerformanceTaskDialog 
          sortedPerformanceTasks={sortedPerformanceTasks}
          isPTOpen={isPTOpen}
          setIsPTOpen={setIsPTOpen}
          name={studentName}
       />
       <QuarterlyAssessmentDialog 
          quarterExams={quarterExams}
          isQAOpen={isQAOpen}
          setIsQAOpen={setIsQAOpen}
          name={studentName}

       />
      <SubmitGradesDialog
        isSGOpen={isSGOpen}
        setIsSGOpen={setIsSGOpen}
        studentsWithDetails={student}
        subjectId={subjectId}
      />

        <Dialog open={isOpen}>
            <DialogContent className=''>
            <DialogHeader>
                <DialogTitle className='flex text-lg text-primary gap-x-3 items-center'><CgDanger className='size-10 text-blue-500' /> {student.lastName}, {student.firstName} {student.middleName} grades is good.</DialogTitle>
                <DialogDescription className="grid grid-cols-2 gap-x-5">
                  <div className=" text-sm font- font-semibold mb-5">
                    <h1>Subject: Mathematics</h1>
                    <h1>Grade: 87</h1>
                  </div>
                  <div className="">
                    <h1 className="font-semibold">Recommendation:</h1>
                    <div className="">
                      - 
                    </div>
                  </div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button  variant={'ghost'} onClick={()=> setIsOpen(false)} className=''>Okay</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        </div>
      )
    },
  },
];




export type StudentIntervention = {
  fullName: string;
  attendancePercentage: number;
  quarterlyGrade: number;
  suggestedInterventions: string[];
  remarks: string;
  status: "Under Intervention" | "Not Cooperating" | "Passed";
};

export const forImprovements = [
  {
    fullName: "Juan Dela Cruz",
    attendancePercentage: 85,
    quarterlyGrade: 75,
    suggestedInterventions: ["Extra tutoring", "Parent-teacher meeting"],
    remarks: "Needs improvement in math and science.",
    status: "Passed"
  },
  {
    fullName: "Maria Santos",
    attendancePercentage: 90,
    quarterlyGrade: 78,
    suggestedInterventions: ["Weekly progress report", "Peer mentoring"],
    remarks: "Struggles with time management.",
    status: "Not Cooperating"
  },
  {
    fullName: "Jose Ramos",
    attendancePercentage: 70,
    quarterlyGrade: 68,
    suggestedInterventions: ["Attendance monitoring", "Individualized learning plan"],
    remarks: "Attendance issues affecting performance.",
    status: "Not Cooperating"
  },
  {
    fullName: "Ana Bautista",
    attendancePercentage: 92,
    quarterlyGrade: 79,
    suggestedInterventions: ["Additional assignments", "Study group participation"],
    remarks: "",
    status: "Under Intervention"
  },
  {
    fullName: "Elena Garcia",
    attendancePercentage: 88,
    quarterlyGrade: 74,
    suggestedInterventions: ["Parental involvement", "One-on-one tutoring"],
    remarks: "",
    status: "Under Intervention"
  }
];




export const forImprovementsColumns: ColumnDef<StudentsWithQuarterlyGrade>[] = [
  { id: "fullName",
    accessorFn: (row) => {
      const { lastName, firstName, middleName, extensionName } = row;
    
      // Construct the full name including optional middle and extension names
      return [
        firstName, 
        middleName, 
        lastName, 
        extensionName
      ].filter(Boolean).join(" ");
    },
    header: "Full Name",
    cell: ({ row }) => {
      const  { firstName, middleName, lastName } = row.original
     const fullName = `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`
     
      return (
        <div className="flex items-center gap-x-3">
          <h1>{fullName}</h1>
        </div>
      )
    }
   },
  { accessorKey: "quarterlyGrade", header: "Quarterly Grade ",
    cell: ({ row }) => {
      const student = row.original
      const quarterlyGrade = student.quarterlyGrade
     
      return (
        <div className="flex items-center gap-x-3 ">
         {quarterlyGrade?.quarterlyGrade}
        </div>
      )
    }
  },
  {
    id: "interventions",
    header: "Intervention details",
    cell: ({ row }) => {
      const interventionUsed = row.original.quarterlyGrade?.interventionUsed
      const modifiedGrade = row.original.quarterlyGrade?.interventionGrade
      const modGrade = modifiedGrade ?? "No modified grade"
      const remarks = row.original.quarterlyGrade?.interventionRemarks
      const remarksValue = remarks ?? "No remarks"


      return (
        <div className="flex flex-col items-start text-sm gap-y-3">
          <div className="text-left space-y-2 space-x-2">
            {interventionUsed ? interventionUsed.map((i, index)=> (
              <Badge key={i + index} className="capitalize text-xs text-white">{i}</Badge>
            )): (
             <p>No interventions used</p> 
            )}
            
          </div>
        
          <h1 className="font-semibold">Modified Grade : <span className="font-normal">{modGrade} {modifiedGrade ? modifiedGrade <= 74 ? (<span className="text-red-500 ml-2">Failed</span>) : ( <span className="ml-2 text-green-500">Passed</span>) : ""}</span> </h1>
          <div className="">
          <p className="">
            <span className="font-semibold">{interventionUsed ? interventionUsed.length > 1 ? "General Remarks -" : interventionUsed && interventionUsed.length === 1 && `${interventionUsed[0]} - ` : ""}</span>
            <span className="">{remarksValue} </span>
          </p>

          </div>
        </div>
      )
    }
  },

  {
    id: "action",
    header: "",
    cell: ({ row }) => {  
      const [open, setOpen ] = useState<boolean>(false)
    
      const student = row.original
      const quarterlyGrade = student.quarterlyGrade
      const usedIntervention = quarterlyGrade?.interventionUsed
      return (
        <div className="">
          <InterventionDialog 
            quarterlyGrade={quarterlyGrade} 
            open={open} 
            setOpen={setOpen}
            usedIntervention={usedIntervention ?? []}
          />

      </div>
      )
    }
  },
]