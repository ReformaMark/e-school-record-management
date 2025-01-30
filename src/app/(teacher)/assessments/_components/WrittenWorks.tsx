'use client'
import { DataTable } from '@/components/data-table'
import { AssessmentColumn } from './AssessmentData'
import { AssessmentTypes } from '@/lib/types'
import Loading from '@/app/components/Loading'
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
        <Loading/>
      )}
       
    </div>
  )
}

export default WrittenWorks