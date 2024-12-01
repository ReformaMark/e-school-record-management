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


export interface Section {
  section: string;          // Section name (e.g., "10-A")
  gradeLevel: string;       // Grade level (e.g., "Grade 10")
  subject: string;          // Subject being taught (e.g., "MAPEH")
  schedule: string;         // Schedule time (e.g., "10:00 AM - 11:30 AM")
  days: string[];             // Array of days (e.g., ["T", "Th"])
  totalStudents: number;    // Total number of students in the section (e.g., 37)
  roomNumber: string;       // Room number (e.g., "401")
  averageGrade: number;     // Average grade for the section (e.g., 90.2)
}

export const sections = [
  {
    section: "Bituin", // Star for Grade 7
    gradeLevel: "Grade 7",
    subject: "Mathematics",
    schedule: "7:00 AM - 8:30 AM",
    days: ["M", "W", "F"],
    totalStudents: 40,
    roomNumber: "101", // Example room number
    averageGrade: 85.6 // Average grade for the section
  },
  {
    section: "Liwanag", // Light for Grade 7
    gradeLevel: "Grade 7",
    subject: "Filipino",
    schedule: "8:30 AM - 10:00 AM",
    days: ["M", "W", "F"],
    totalStudents: 38,
    roomNumber: "102", // Example room number
    averageGrade: 88.2 // Average grade for the section
  },
  {
    section: "Katipunan", // League for Grade 8
    gradeLevel: "Grade 8",
    subject: "Science",
    schedule: "10:00 AM - 11:30 AM",
    days: ["M", "W", "F"],
    totalStudents: 42,
    roomNumber: "201", // Example room number
    averageGrade: 89.5 // Average grade for the section
  },
  {
    section: "Makabayan", // Nationalist for Grade 8
    gradeLevel: "Grade 8",
    subject: "Araling Panlipunan",
    schedule: "1:00 PM - 2:30 PM",
    days: ["M", "W", "F"],
    totalStudents: 39,
    roomNumber: "202", // Example room number
    averageGrade: 84.1 // Average grade for the section
  },
  {
    section: "Bayanihan", // Community Spirit for Grade 9
    gradeLevel: "Grade 9",
    subject: "English",
    schedule: "7:00 AM - 8:30 AM",
    days: ["T", "Th"],
    totalStudents: 36,
    roomNumber: "301", // Example room number
    averageGrade: 87.3 // Average grade for the section
  },
  {
    section: "Pag-asa", // Hope for Grade 9
    gradeLevel: "Grade 9",
    subject: "TLE (Technology & Livelihood Education)",
    schedule: "8:30 AM - 10:00 AM",
    days: ["T", "Th"],
    totalStudents: 40,
    roomNumber: "302", // Example room number
    averageGrade: 86.9 // Average grade for the section
  },
  {
    section: "11-A", // Keeping original for Grade 11
    gradeLevel: "Grade 11",
    subject: "Pre Calculus",
    schedule: "10:00 AM - 11:30 AM",
    days: ["T", "Th"],
    totalStudents: 37,
    roomNumber: "401", // Example room number
    averageGrade: 90.2 // Average grade for the section
  },
];


export const sectionColumns: ColumnDef<Section>[] = [
  {
    id: "section",
    header: "Section",
    cell: ({ row }) => {
      const section = row.original
 
      return (
        <a href={`/section/${section.section}`}>
          {section.section}
        </a>
      )
    },
  },
  { accessorKey: "gradeLevel", header: "Grade Level" },
  { accessorKey: "roomNumber", header: "Room No." },
  { accessorKey: "days", header: "Schedule Days" },
  { accessorKey: "schedule", header: "Time" },
  { accessorKey: "subject", header: "Subject" },
  { accessorKey: "totalStudents", header: "No. of Students" },
  { accessorKey: "averageGrade", header: "Average Grade" }, 
  {
    id: "actions",
    cell: ({ row }) => {
      const section = row.original
 
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(section.section)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
