'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, MoreHorizontal } from "lucide-react";

// Type for individual assessment
interface Assessment {
    gradeLevel: number;          // Grade level (e.g., 7, 8, 9, 10, 11, 12)
    quarter: number;            // Quarter number (1 to 4 for grades 7-10, 1 or 2 for grades 11-12)
    assessmentNo: number;       // Assessment number (e.g., 1, 2, 3)
    highestPossibleScore: number; // Highest possible score for the assessment
    subject: string;            // Subject name (e.g., "Mathematics")
    assessmentType: 'Written Work' | 'Performance Task' | 'Quarterly Assessment'; // Type of assessment
}

// Example assessments array
export const assessments: Assessment[] = [
    // Grade 7 - Mathematics
    { gradeLevel: 7, quarter: 1, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 7, quarter: 1, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 7, quarter: 1, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 7, quarter: 2, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 7, quarter: 2, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 7, quarter: 2, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 7, quarter: 3, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 7, quarter: 3, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 7, quarter: 3, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 7, quarter: 4, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 7, quarter: 4, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 7, quarter: 4, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },

    // Grade 8 - Mathematics
    { gradeLevel: 8, quarter: 1, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 8, quarter: 1, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 8, quarter: 1, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 8, quarter: 2, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 8, quarter: 2, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 8, quarter: 2, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 8, quarter: 3, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 8, quarter: 3, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 8, quarter: 3, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 8, quarter: 4, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 8, quarter: 4, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 8, quarter: 4, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },

    // Grade 9 - Mathematics
    { gradeLevel: 9, quarter: 1, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 9, quarter: 1, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 9, quarter: 1, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 9, quarter: 2, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 9, quarter: 2, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 9, quarter: 2, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 9, quarter: 3, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 9, quarter: 3, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 9, quarter: 3, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 9, quarter: 4, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 9, quarter: 4, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 9, quarter: 4, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },

    // Grade 10 - Mathematics
    { gradeLevel: 10, quarter: 1, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 10, quarter: 1, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 10, quarter: 1, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 10, quarter: 2, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 10, quarter: 2, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 10, quarter: 2, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 10, quarter: 3, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 10, quarter: 3, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 10, quarter: 3, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },
    { gradeLevel: 10, quarter: 4, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 10, quarter: 4, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 10, quarter: 4, assessmentNo: 3, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Quarterly Assessment' },

    // Grade 11 - Mathematics
    { gradeLevel: 11, quarter: 1, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 11, quarter: 1, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 11, quarter: 2, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 11, quarter: 2, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },

    // Grade 12 - Mathematics
    { gradeLevel: 12, quarter: 1, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 12, quarter: 1, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' },
    { gradeLevel: 12, quarter: 2, assessmentNo: 1, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Written Work' },
    { gradeLevel: 12, quarter: 2, assessmentNo: 2, highestPossibleScore: 50, subject: "Mathematics", assessmentType: 'Performance Task' }
];


export const AssessmentColumn: ColumnDef<Assessment>[] = [
 
      { accessorKey: "gradeLevel", header: "Grade Level" },
      { accessorKey: "quarter", header: "Quarter" },
      { accessorKey: "assessmentNo", header: "Assessment No." },
      { accessorKey: "highestPossibleScore", header: "Highest possible Score" },
      { accessorKey: "subject", header: "Subject" },
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
                <DropdownMenuItem><Edit/> Edit</DropdownMenuItem>
                <DropdownMenuItem><Delete/> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]