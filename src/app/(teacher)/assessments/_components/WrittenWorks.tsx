'use client'
import { DataTable } from '@/components/data-table'
import { AssessmentColumn } from './AssessmentData'
import { AssessmentTypes } from '@/lib/types'
import { AssessmentForm } from './AssessmentForm'


interface QuarterExamPropsTypes {
    assessments: AssessmentTypes[] | undefined
}

function WrittenWorks({assessments}: QuarterExamPropsTypes) {
  const writtenWorks = assessments?.filter((assessment) => assessment.type === 'Written Works')

  return (
    <div className='bg-white p-10'>
      <div className="flex justify-between">
        <h1>Written Works</h1>
        <AssessmentForm assessmment='Written Works'/>
      </div>
      {writtenWorks ? (
        <DataTable 
          columns={AssessmentColumn}
          data={writtenWorks}
          filter='assessmentNo'
          placeholder='by Assessment No'
        />
      ): (
        <div className="text-gray-500 text-sm text-center py-4">No assigned subject yet.</div>
      )}
       
    </div>
  )
}

export default WrittenWorks