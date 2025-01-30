'use client'
import { DataTable } from '@/components/data-table'
import React from 'react'
import { AssessmentColumn } from './AssessmentData'
import { AssessmentTypes } from '@/lib/types'
import Loading from '@/app/components/Loading'
import { AssessmentForm } from './AssessmentForm'

interface QuarterExamPropsTypes {
    assessments: AssessmentTypes[] | undefined
}

function QuarterExam({assessments}: QuarterExamPropsTypes) {
    const quarterlyAssessments = assessments?.filter((assessment) => assessment.type === 'Quarterly Assessment')
  return (
    <div className='bg-white p-10'>
        <div className="">
            <div className="flex justify-between">
            <h1>Quarter Exam</h1>
            <AssessmentForm assessmment='Quarterly Assessment'/>
            </div>
          {quarterlyAssessments ? (
            <DataTable 
             columns={AssessmentColumn}
             data={quarterlyAssessments}
             filter='assessmentNo'
             placeholder='Seach for Quarterly Assessment Number'
            />
          ): (
            <Loading/>
          )}
           
        </div>
      
    </div>
  )
}

export default QuarterExam