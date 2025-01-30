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

function PerformanceTask({assessments}: QuarterExamPropsTypes) {
    const performanceTask = assessments?.filter((assessment) => assessment.type === 'Performance Tasks')
    return (
      <div className='bg-white p-10'>
         <div className="flex justify-between">
            <h1>Performance Task</h1>
            <AssessmentForm assessmment='Performance Tasks'/>
            </div>
            {performanceTask ? (
                <DataTable 
                    columns={AssessmentColumn}
                    data={performanceTask}
                    filter='assessmentNo'
                    placeholder='by Assessment No'
                />
            ): (
                <Loading/>
            )}
          
      </div>
    )
}

export default PerformanceTask