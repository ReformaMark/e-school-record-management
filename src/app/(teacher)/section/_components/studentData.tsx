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
import { MoreHorizontal } from "lucide-react";
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FaCheck } from "react-icons/fa";
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
  writtenWorks: string;       // Now a string e.g., "3 out of 4"
  performanceTask: string;    // Now a string e.g., "2 out of 4"
  quarterlyAssessment: string; // Now a string e.g., "1 out of 1"
};
export const studentsData = [
  { 
      id: 1, lrn: "123456789012", firstName: "John", middleName: "Michael", lastName: "Doe", dateEnrolled: "2024-08-15", 
      attendancePercentage: 75, quarterAverage: 70, recommendedInterventions: "Attendance Monitoring", 
      interventionRemarks: "Consistent tardiness.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 2, lrn: "234567890123", firstName: "Jane", middleName: "Alice", lastName: "Smith", dateEnrolled: "2024-08-12", 
      attendancePercentage: 78, quarterAverage: 65, recommendedInterventions: "Counseling", 
      interventionRemarks: "Struggles with personal issues.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 3, lrn: "345678901234", firstName: "Bob", middleName: "Alan", lastName: "Brown", dateEnrolled: "2024-08-20", 
      attendancePercentage: 70, quarterAverage: 72, recommendedInterventions: "Extra Homework", 
      interventionRemarks: "Needs to catch up on assignments.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 4, lrn: "456789012345", firstName: "Chris", middleName: "Lee", lastName: "Nguyen", dateEnrolled: "2024-08-18", 
      attendancePercentage: 79, quarterAverage: 68, recommendedInterventions: "Parental Guidance", 
      interventionRemarks: "Low motivation observed.", gender: "Non-binary", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 5, lrn: "567890123456", firstName: "Alice", middleName: "Grace", lastName: "Johnson", dateEnrolled: "2024-08-10", 
      attendancePercentage: 74, quarterAverage: 60, recommendedInterventions: "Tutoring", 
      interventionRemarks: "Needs help with math concepts.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 6, lrn: "678901234567", firstName: "Emily", middleName: "Rose", lastName: "Davis", dateEnrolled: "2024-08-14", 
      attendancePercentage: 85, quarterAverage: 90, recommendedInterventions: "None", 
      interventionRemarks: "No interventions needed.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 7, lrn: "789012345678", firstName: "David", middleName: "Joseph", lastName: "Garcia", dateEnrolled: "2024-08-13", 
      attendancePercentage: 88, quarterAverage: 82, recommendedInterventions: "None", 
      interventionRemarks: "No interventions needed.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 8, lrn: "890123456789", firstName: "Olivia", middleName: "Marie", lastName: "Martinez", dateEnrolled: "2024-08-19", 
      attendancePercentage: 90, quarterAverage: 85, recommendedInterventions: "None", 
      interventionRemarks: "No interventions needed.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 9, lrn: "901234567890", firstName: "Sophia", middleName: "Ann", lastName: "Rodriguez", dateEnrolled: "2024-08-17", 
      attendancePercentage: 92, quarterAverage: 88, recommendedInterventions: "None", 
      interventionRemarks: "No interventions needed.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 10, lrn: "012345678901", firstName: "Jacob", middleName: "Alexander", lastName: "Torres", dateEnrolled: "2024-09-25", 
      attendancePercentage: 89, quarterAverage: 81, recommendedInterventions: "None", 
      interventionRemarks: "No interventions needed.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 11, lrn: "123450987654", firstName: "Michael", middleName: "Thomas", lastName: "Green", dateEnrolled: "2024-09-01", 
      attendancePercentage: 76, quarterAverage: 73, recommendedInterventions: "After School Support", 
      interventionRemarks: "Needs assistance with reading.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 12, lrn: "234560987654", firstName: "Emma", middleName: "Louise", lastName: "Hall", dateEnrolled: "2024-09-03", 
      attendancePercentage: 77, quarterAverage: 67, recommendedInterventions: "Study Sessions", 
      interventionRemarks: "Struggles with math concepts.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 13, lrn: "345670987654", firstName: "Daniel", middleName: "Ray", lastName: "Lee", dateEnrolled: "2024-09-05", 
      attendancePercentage: 70, quarterAverage: 78, recommendedInterventions: "Parental Meeting", 
      interventionRemarks: "Parent involvement needed.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 14, lrn: "456780987654", firstName: "Mia", middleName: "Isabel", lastName: "Hernandez", dateEnrolled: "2024-09-07", 
      attendancePercentage: 79, quarterAverage: 69, recommendedInterventions: "Tutoring", 
      interventionRemarks: "Needs help with science topics.", gender: "Female", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  },
  { 
      id: 15, lrn: "567890987654", firstName: "James", middleName: "William", lastName: "Perez", dateEnrolled: "2024-09-10", 
      attendancePercentage: 82, quarterAverage: 76, recommendedInterventions: "None", 
      interventionRemarks: "No interventions needed.", gender: "Male", 
      writtenWorks: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      performanceTask: `${Math.floor(Math.random() * 4) + 1} out of 4`, 
      quarterlyAssessment: `1 out of 1`
  }
];



  
export const students: ColumnDef<Student>[] = [
  {
    id: "number",
    header: "",
    cell: ({  }) => {
    
 
      return (
        <></>
      )
    },
  },
  { accessorKey: "lrn", header: "LRN" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "middleName", header: "Middle name" },
  { accessorKey: "dateEnrolled", header: "Enrollment Date" },
  {
    id: "actions",
    cell: ({  }) => {
      
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View reports</DropdownMenuItem>
            <DropdownMenuItem>View Interventions</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
export const InputGradesCol: ColumnDef<Student>[] = [
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
  { accessorKey: "writtenWorks", header: "Written Works" },
  { accessorKey: "performanceTask", header: "Performance Task" },
  { accessorKey: "quarterlyAssessment", header: "Quarterly Assessment" },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isWWOpen, setIsWWOpen] = useState<boolean>(false)
      const [isPTOpen, setIsPTOpen] = useState<boolean>(false)
      const [isQAOpen, setIsQAOpen] = useState<boolean>(false)
      const [isOpen, setIsOpen ] = useState<boolean>(false)


      const student = row.original
      const openWW = ()=> {
        setIsWWOpen(!isWWOpen)
      }
      const openPT = ()=> {
        setIsPTOpen(!isPTOpen)
      }
      const openQA = ()=> {
        setIsQAOpen(!isQAOpen)
      }
      return (
        <div className="">
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
              <DropdownMenuItem onClick={openWW}>
                Written Works
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openPT}>
                Performance Tasks</DropdownMenuItem>
                <DropdownMenuItem onClick={openQA}>
                  Quarterly Assessment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        <Dialog open={isWWOpen}>
          <DialogContent className=' max-h-screen overflow-auto'>
          <DialogHeader>
              <DialogTitle>
                 {student.lastName}, {student.firstName} Written Works
              </DialogTitle>
              
          </DialogHeader>
         <div className="">
          <div className="flex gap-x-3 items-center">
            <h1>Writen Work 1 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={30}
             />

             <h1>/ 50</h1>
          </div>
          <div  className="flex gap-x-3 items-center">
          <h1>Writen Work 2 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={40}
             />

             <h1>/ 50</h1>
          </div>
          <div  className="flex gap-x-3 items-center">
          <h1>Writen Work 3 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={45}
             />

             <h1>/ 50</h1>
          </div>
          <div  className="flex gap-x-3 items-center">
            <h1>Writen Work 4 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
             
             />

             <h1>/ 50</h1>
          </div>
         </div>
          <DialogFooter>
            <Button variant={'default'} onClick={()=> setIsWWOpen(!isWWOpen)} className="text-white">Save</Button>
          </DialogFooter>
          </DialogContent>
        
        </Dialog>

        <Dialog open={isPTOpen}>
          <DialogContent className='max-h-screen overflow-auto'>
          <DialogHeader>
              <DialogTitle>
                  Performance Tasks
              </DialogTitle>
              
          </DialogHeader>
          <div className="">
          <div className="flex gap-x-3 items-center">
            <h1>Performance Task 1 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={30}
             />

             <h1>/ 50</h1>
          </div>
          <div  className="flex gap-x-3 items-center">
          <h1>Performance Task 2 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={40}
             />

             <h1>/ 50</h1>
          </div>
          <div  className="flex gap-x-3 items-center">
          <h1>Performance Task 3 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={45}
             />

             <h1>/ 50</h1>
          </div>
          <div  className="flex gap-x-3 items-center">
            <h1>Performance Task 4 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
             
             />

             <h1>/ 50</h1>
          </div>
         </div>
          <DialogFooter>
            <Button variant={'default'} onClick={()=> setIsPTOpen(!isPTOpen)} className="text-white">Save</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isQAOpen}>
          <DialogContent className=' max-h-screen overflow-auto'>
          <DialogHeader>
              <DialogTitle>
                 Quarterly Assessment
              </DialogTitle>
              
          </DialogHeader>
          <div className="">
          <div className="flex gap-x-3 items-center">
            <h1>Quarterly Assessment 1 :</h1>
            <Input 
              id="roomNumber"
              type="number" 
              placeholder="Ex: 50"
              className="w-32"
              value={30}
             />

             <h1>/ 50</h1>
          </div>
          
         </div>
          <DialogFooter>
            <Button variant={'default'} onClick={()=> {
              setIsQAOpen(!isQAOpen)
              setIsOpen(true)  
            }} className="text-white">Save</Button>
          </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isOpen}>
            <DialogContent className=''>
            <DialogHeader>
                <DialogTitle className='flex gap-x-3 items-center'><CgDanger className='size-10 text-orange-500' /> {student.lastName}, {student.firstName} {student.middleName} grades is at-risk.</DialogTitle>
                <DialogDescription>
                  <h1>Recommendation:</h1>
                  <div className="">
                    - {student.recommendedInterventions}
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




type forImprovementsTypes = {
  fullName: string;
  attendancePercentage: number;
  quarterlyGrade: number;
  suggestedInterventions: string[];
  remarks: string;
};

export const forImprovements = [
  {
    fullName: "John Doe",
    attendancePercentage: 85,
    quarterlyGrade: 75,
    suggestedInterventions: ["Extra tutoring", "Parent-teacher meeting"],
    remarks: "Needs improvement in math and science."
  },
  {
    fullName: "Jane Smith",
    attendancePercentage: 90,
    quarterlyGrade: 78,
    suggestedInterventions: ["Weekly progress report", "Peer mentoring"],
    remarks: "Struggles with time management."
  },
  {
    fullName: "Michael Johnson",
    attendancePercentage: 70,
    quarterlyGrade: 68,
    suggestedInterventions: ["Attendance monitoring", "Individualized learning plan"],
    remarks: "Attendance issues affecting performance."
  },
  {
    fullName: "Emily Davis",
    attendancePercentage: 92,
    quarterlyGrade: 79,
    suggestedInterventions: ["Additional assignments", "Study group participation"],
    remarks: ""
  },
  {
    fullName: "Sarah Wilson",
    attendancePercentage: 88,
    quarterlyGrade: 74,
    suggestedInterventions: ["Parental involvement", "One-on-one tutoring"],
    remarks: ""
  }
];


export const forImprovementsColumns: ColumnDef<forImprovementsTypes>[] = [
  { accessorKey: "fullName", header: "Full Name" },
  { accessorKey: "attendancePercentage", header: "Attendance %" },
  { accessorKey: "quarterlyGrade", header: "Quarterly Grade " },
  {
    id: "suggestedInterventions",
    header: "Suggested invterventions",
    cell: ({ row }) => {
      const interventions = row.original.suggestedInterventions
 
      return (
        <div className="flex items-center gap-x-3">
            <Select>
              <SelectTrigger defaultValue={interventions[0]} className="">
                <SelectValue defaultValue={interventions[0]}  placeholder="Select Interventions" />
              </SelectTrigger>
              <SelectContent>
                {interventions.map((intervention) => (
                  <SelectItem key={intervention} value={intervention}>{intervention}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FaCheck className="cursor-pointer"/>
        </div>
      )
    }
  },
]