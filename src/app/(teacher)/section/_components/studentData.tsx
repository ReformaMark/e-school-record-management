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
import React from 'react';

type Student = {
  id: number;
  lrn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateEnrolled: string; // Use Date type if you prefer working with actual Date objects
  attendancePercentage: number;
  quarterAverage: number;
  recommendedInterventions: string;
  interventionRemarks: string;
  gender: "Male" | "Female" | "Non-binary"; // Add other gender options if necessary
};

export const studentsData = [
    // Below 80% attendance and quarter average
    { id: 1, lrn: "123456789012", firstName: "John", middleName: "Michael", lastName: "Doe", dateEnrolled: "2024-08-15", attendancePercentage: 75, quarterAverage: 70, recommendedInterventions: "Attendance Monitoring", interventionRemarks: "Consistent tardiness.", gender: "Male" },
    { id: 2, lrn: "234567890123", firstName: "Jane", middleName: "Alice", lastName: "Smith", dateEnrolled: "2024-08-12", attendancePercentage: 78, quarterAverage: 65, recommendedInterventions: "Counseling", interventionRemarks: "Struggles with personal issues.", gender: "Female" },
    { id: 3, lrn: "345678901234", firstName: "Bob", middleName: "Alan", lastName: "Brown", dateEnrolled: "2024-08-20", attendancePercentage: 70, quarterAverage: 72, recommendedInterventions: "Extra Homework", interventionRemarks: "Needs to catch up on assignments.", gender: "Male" },
    { id: 4, lrn: "456789012345", firstName: "Chris", middleName: "Lee", lastName: "Nguyen", dateEnrolled: "2024-08-18", attendancePercentage: 79, quarterAverage: 68, recommendedInterventions: "Parental Guidance", interventionRemarks: "Low motivation observed.", gender: "Non-binary" },
    { id: 5, lrn: "567890123456", firstName: "Alice", middleName: "Grace", lastName: "Johnson", dateEnrolled: "2024-08-10", attendancePercentage: 74, quarterAverage: 60, recommendedInterventions: "Tutoring", interventionRemarks: "Needs help with math concepts.", gender: "Female" },
  
    // 80% and above attendance and quarter average with no recommended interventions
    { id: 6, lrn: "678901234567", firstName: "Emily", middleName: "Rose", lastName: "Davis", dateEnrolled: "2024-08-14", attendancePercentage: 85, quarterAverage: 90, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Female" },
    { id: 7, lrn: "789012345678", firstName: "David", middleName: "Joseph", lastName: "Garcia", dateEnrolled: "2024-08-13", attendancePercentage: 88, quarterAverage: 82, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Male" },
    { id: 8, lrn: "890123456789", firstName: "Olivia", middleName: "Marie", lastName: "Martinez", dateEnrolled: "2024-08-19", attendancePercentage: 90, quarterAverage: 85, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Female" },
    { id: 9, lrn: "901234567890", firstName: "Sophia", middleName: "Ann", lastName: "Rodriguez", dateEnrolled: "2024-08-17", attendancePercentage: 92, quarterAverage: 88, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Female" },
    { id: 10, lrn: "012345678901", firstName: "Jacob", middleName: "Alexander", lastName: "Torres", dateEnrolled: "2024-09-25", attendancePercentage: 89, quarterAverage: 81, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Male" },
  
    // More students below 80%
    { id: 11, lrn: "123450987654", firstName: "Michael", middleName: "Thomas", lastName: "Green", dateEnrolled: "2024-09-01", attendancePercentage: 76, quarterAverage: 73, recommendedInterventions: "After School Support", interventionRemarks: "Needs assistance with reading.", gender: "Male" },
    { id: 12, lrn: "234560987654", firstName: "Emma", middleName: "Louise", lastName: "Hall", dateEnrolled: "2024-09-03", attendancePercentage: 77, quarterAverage: 67, recommendedInterventions: "Study Sessions", interventionRemarks: "Struggles with math concepts.", gender: "Female" },
    { id: 13, lrn: "345670987654", firstName: "Daniel", middleName: "Ray", lastName: "Lee", dateEnrolled: "2024-09-05", attendancePercentage: 70, quarterAverage: 78, recommendedInterventions: "Parental Meeting", interventionRemarks: "Parent involvement needed.", gender: "Male" },
    { id: 14, lrn: "456780987654", firstName: "Mia", middleName: "Isabel", lastName: "Hernandez", dateEnrolled: "2024-09-07", attendancePercentage: 79, quarterAverage: 75, recommendedInterventions: "Individual Tutoring", interventionRemarks: "Needs extra help.", gender: "Female" },
    { id: 15, lrn: "567890987654", firstName: "Ethan", middleName: "James", lastName: "Taylor", dateEnrolled: "2024-09-09", attendancePercentage: 68, quarterAverage: 70, recommendedInterventions: "Behavioral Support", interventionRemarks: "Inconsistent participation.", gender: "Male" },
  
    // More students above 80%
    { id: 16, lrn: "678901234567", firstName: "Isabella", middleName: "Claire", lastName: "Adams", dateEnrolled: "2024-09-11", attendancePercentage: 88, quarterAverage: 89, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Female" },
    { id: 17, lrn: "789012345678", firstName: "Liam", middleName: "John", lastName: "Wilson", dateEnrolled: "2024-09-13", attendancePercentage: 90, quarterAverage: 85, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Male" },
    { id: 18, lrn: "890123456789", firstName: "Ava", middleName: "Marie", lastName: "Anderson", dateEnrolled: "2024-09-15", attendancePercentage: 93, quarterAverage: 91, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Female" },
    { id: 19, lrn: "901234567890", firstName: "Noah", middleName: "Michael", lastName: "Thompson", dateEnrolled: "2024-09-17", attendancePercentage: 94, quarterAverage: 88, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Male" },
    { id: 20, lrn: "012345678901", firstName: "Charlotte", middleName: "Elena", lastName: "White", dateEnrolled: "2024-09-19", attendancePercentage: 92, quarterAverage: 87, recommendedInterventions: "None", interventionRemarks: "No interventions needed.", gender: "Female" },
  
    // More students below 80%
    { id: 26, lrn: "654321987654", firstName: "Ella", middleName: "Sophia", lastName: "Murphy", dateEnrolled: "2024-09-30", attendancePercentage: 79, quarterAverage: 72, recommendedInterventions: "Behavioral Support", interventionRemarks: "Low engagement in class.", gender: "Female" },
    { id: 27, lrn: "543210987654", firstName: "Aiden", middleName: "Scott", lastName: "Ward", dateEnrolled: "2024-10-02", attendancePercentage: 76, quarterAverage: 74, recommendedInterventions: "After School Study", interventionRemarks: "Struggling with assignments.", gender: "Male" },
    { id: 28, lrn: "432109876543", firstName: "Mason", middleName: "Liam", lastName: "Bell", dateEnrolled: "2024-10-04", attendancePercentage: 70, quarterAverage: 67, recommendedInterventions: "Counseling", interventionRemarks: "Emotional support needed.", gender: "Male" },
    { id: 29, lrn: "321098765432", firstName: "Chloe", middleName: "Anne", lastName: "Young", dateEnrolled: "2024-10-06", attendancePercentage: 78, quarterAverage: 69, recommendedInterventions: "Tutoring", interventionRemarks: "Needs improvement in science.", gender: "Female" },
    { id: 30, lrn: "210987654321", firstName: "Lucas", middleName: "Ryan", lastName: "Carter", dateEnrolled: "2024-10-08", attendancePercentage: 77, quarterAverage: 74, recommendedInterventions: "Extra Help", interventionRemarks: "Struggles with math and reading.", gender: "Male" },
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
