'use client'
import { ColumnDef } from "@tanstack/react-table";
import { AssessmentTypes } from "@/lib/types";
import { EditAssessmentForm } from "./EditAssessmentForm";
import DeleteAssessment from "./DeleteAssessment";
import ApplyAssessment from "./ApplyAssessment";

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
      { id: "quarter", accessorKey: "quarter", header: "Quarter",
        cell: ({ row }) => { 
          const assessment = row.original
          const isShs = row.original.gradeLevel > 10
          return (
            <div className="">
              <h3>{isShs ? `${assessment.quarter} - ${assessment.semester} semester ` : assessment.quarter}</h3>
            </div>
          )
        }
       },
      { id: "assessmentNo", accessorKey: "assessmentNo", header: "Assessment No." },
      { id: "highestScore", accessorKey: "highestScore", header: "Highest Score" },
      {
        id: "actions",
        header: () => <div className="flex items-center justify-center">Actions</div>,
        cell: ({ row }) => {
          const assessment = row.original
          return (
            <div className="flex items-center justify-center gap-x-2">
              <ApplyAssessment  assessment={assessment} id={assessment._id}/>
              <EditAssessmentForm assessment={assessment} type={assessment.type} id={assessment._id}/>
              <DeleteAssessment assessment={assessment} id={assessment._id}/>
             
            </div>
          )
        },
      },
]