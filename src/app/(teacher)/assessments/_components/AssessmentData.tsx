'use client'
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { AssessmentTypes } from "@/lib/types";
import { EditAssessmentForm } from "./EditAssessmentForm";
import DeleteAssessment from "./DeleteAssessment";


export const useAssessments = () =>{
    const data = useQuery(api.assessments.getAssessments)
     const isLoading = data === undefined
     return {
         data,
         isLoading,
     }
}


export const AssessmentColumn: ColumnDef<AssessmentTypes>[] = [
 
      {  id: "gradeLevel", accessorKey: "gradeLevel", header: "Grade Level" },
      {  id: "subject",
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => { 
          const assessment = row.original
          return (
            <div className="">
              <h3>{assessment.subject?.name} {assessment.subComponent ? `- ${assessment.subComponent}` : ""}</h3>
            </div>
          )
        }
      },
      { id: "quarter", accessorKey: "quarter", header: "Quarter" },
      { id: "assessmentNo", accessorKey: "assessmentNo", header: "Assessment No." },
      { id: "highestScore", accessorKey: "highestScore", header: "Highest Score" },
      {
        id: "actions",
        header: () => <div className="flex items-center justify-center">Actions</div>,
        cell: ({ row }) => {
          const assessment = row.original
          return (
            <div className="flex items-center justify-center gap-x-2">
              <EditAssessmentForm data={assessment} assessment={assessment.type} id={assessment._id}/>
              <DeleteAssessment assessment={assessment} id={assessment._id}/>
            </div>
          )
        },
      },
]