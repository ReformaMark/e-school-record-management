'use client'
import { DataTable } from '@/components/data-table'
import Loading from '@/app/components/Loading'
import { ColumnDef } from '@tanstack/react-table'

import GradeWeightsForm from './GradeWeightsForm'
import { SubjectsWithAppliedGradeWeights } from '@/lib/types'


interface QuarterExamPropsTypes {
    subjects: SubjectsWithAppliedGradeWeights[] | undefined
}

export default function AssignSubjects({subjects}: QuarterExamPropsTypes) {
  return (
    <div className='bg-white p-10'>
      <div className="flex justify-between">
        <h1>Assigned Subjects</h1>
        
      </div>
      {subjects ? (
        <DataTable 
          columns={AssignedSubjectsColumn}
          data={subjects}
          filter='subjectCode'
          placeholder='by Subject Code'
        />
      ): (
        <Loading/>
      )}
       
    </div>
  )
};

const AssignedSubjectsColumn: ColumnDef<SubjectsWithAppliedGradeWeights>[] = [
    {  id: "subject",
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => { 
          const subject = row.original
          return (
            <div className="text-sm font-medium">
              <h3>{subject.name}</h3>
            </div>
          )
        }
    },
    {  id: "subjectCode",
        accessorKey: "subjectCode",
        header: "Subject Code",
        cell: ({ row }) => { 
          const subject = row.original
          return (
            <div className="text-sm font-semibold">
              <h3>{subject.subjectCode}</h3>
            </div>
          )
        }
    },
    {  id: "defaultGradeWeights",
        accessorKey: "defaultGradeWeights",
        header: "Recommended Grade Weights %",
        cell: ({ row }) => { 
          const subject = row.original
          return (
            <div className="text-sm font-medium">
              <h3><span className='w-1/3 inline-block '>Written Works</span> {subject.gradeWeights ? `- ${subject.gradeWeights.written}%` : "-"}</h3>
              <h3><span className='w-1/3 inline-block '>Performance Tasks</span> {subject.gradeWeights ? `- ${subject.gradeWeights.performance}%` : "-"}</h3>
              <h3><span className='w-1/3 inline-block '>Major Examination</span> {subject.gradeWeights ? `- ${subject.gradeWeights.exam}%` : "-"}</h3>
            </div>
          )
        }
    },
    {  id: "assignedGradeWeights",
        accessorKey: "assignedGradeWeights",
        header: "Applied Grade Weights %",
        cell: ({ row }) => { 
          const subject = row.original
          return (
            <>
                { subject.appliedGradeWeights !== null ? (
                    <div className="text-sm font-medium">
                        <h3><span className='w-1/2 inline-block '>Written Works</span> {subject.appliedGradeWeights !== null ? `- ${subject.appliedGradeWeights.written}%` : "-"}</h3>
                        <h3><span className='w-1/2 inline-block '>Performance Tasks</span> {subject.appliedGradeWeights ? `- ${subject.appliedGradeWeights.performance}%` : "-"}</h3>
                        <h3><span className='w-1/2 inline-block '>Major Examination</span> {subject.appliedGradeWeights  !== null && subject.appliedGradeWeights.exam ? `- ${subject.appliedGradeWeights.exam}%` : "-"}</h3>
                    </div>
                ):(
                    <h1>Not Set</h1>
                )}
            </>
          )
        }
    },
    {  id: "learningMode",
        accessorKey: "learningMode",
        header: "Learning Mode",
        cell: ({ row }) => { 
          const subject = row.original
          return (
            <div className="text-sm font-medium">
              <h3>{subject.appliedGradeWeights ? subject.appliedGradeWeights.learningMode : "Not Set"}</h3>
            </div>
          )
        }
    },
    {  id: "actions",
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => { 
          const subject = row.original

          return (
            <div className="">
                <GradeWeightsForm subject={subject} />
                
            </div>
          )
        }
    },

]