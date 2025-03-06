'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { calculateInitialGrade, calculatePercentageScore, calculateTotalScore, calculateWeightedScore, convertToTransmutedGrade } from '@/lib/utils';
import { StudentsWithClassRecord } from '@/lib/types';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { Id } from '../../../../../convex/_generated/dataModel';

interface SubmitGradesDialogProps {
  isSGOpen: boolean,
  setIsSGOpen: (value:boolean) => void;
  studentsWithDetails: StudentsWithClassRecord
  subjectId: Id<"subjects"> | undefined
}

function SubmitGradesDialog({isSGOpen, setIsSGOpen ,studentsWithDetails, subjectId}: SubmitGradesDialogProps) {

  const submitQuarterlyGrade =  useMutation(api.quarterlyGrades.create)
  const appliedGW = useQuery(api.appliedGradeWeigths.get, {subjectId})

  if (studentsWithDetails.classRecords.length === 0) {
    return <></>;
  }
  const classRecord = studentsWithDetails.classRecords[0]
  const subject = studentsWithDetails.classRecords[0].cLass.subject

  const section = studentsWithDetails.sectionDoc
  const writtenWeight = appliedGW?.written ?? 0
  const performanceWeight = appliedGW?.performance ?? 0
  const examWeight = appliedGW?.exam ?? 0
  const subComponent = classRecord.subComponent
  const studentName = `${studentsWithDetails.lastName}, ${studentsWithDetails.firstName} ${studentsWithDetails.middleName}`

  const learningMode = appliedGW?.learningMode ?? "Face to face"

  const written = studentsWithDetails.classRecords[0].written
  const performance = studentsWithDetails.classRecords[0].performance
  const quarterlyExam = studentsWithDetails.classRecords[0].quarterlyExam

  const totalWritten = written.reduce((sum, assessment) => sum + assessment.highestScore, 0);
  const totalPerformance = performance.reduce((sum, assessment) => sum + assessment.highestScore, 0);
  const totalQE = quarterlyExam.reduce((sum, assessment) => sum + assessment.highestScore, 0);

  const transmutedGrade = convertToTransmutedGrade(
    calculateInitialGrade(
        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(written), totalWritten ?? 0), writtenWeight?? 0),
        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(performance), totalPerformance ?? 0), performanceWeight?? 0),
        calculateWeightedScore(calculatePercentageScore(calculateTotalScore(quarterlyExam), totalQE ?? 0), examWeight?? 0)
    ),
    Number(section?.gradeLevel?.level),
    learningMode,
    subject?.subjectCategory?.toLowerCase()
  )

  const needsIntervention = transmutedGrade <= 74

  function handleSubmit (){
    toast.promise(submitQuarterlyGrade({
      studentId: studentsWithDetails._id,
      gradeLevel: Number(section?.gradeLevel?.level.replace("Grade", "")),
      classId: classRecord.classId,
      quarter: classRecord.quarter,
      quarterlyGrade: transmutedGrade, // score
      needsIntervention: needsIntervention,
      classRecordId: classRecord._id,
      subComponent: subComponent
    }),{
    loading: 'Submitting grades...',
    success: 'Grades submitted successfully',
    error: 'Failed to submit grades :('
  })

  setIsSGOpen(false)
  }


  return (
    <Dialog open={isSGOpen}>
        <DialogContent>
        <DialogHeader>
            <DialogTitle className='text-primary'>Submit Grades?</DialogTitle>
            <DialogDescription className='space-y-2'>
              <div className="">
                <h1 className='text-sm font-semibold'>{studentName}</h1>
              </div>
              <div className="">

                Quarterly Grade: <span className={'text-primary'}>{transmutedGrade}</span> 
                {transmutedGrade <= 74 ? (<span className='font-semibold uppercase ml-5 text-red-500'>Needs Intervention</span>) : (<span className='font-semibold uppercase ml-5 text-green-500'>Passed</span>)}
              </div>
              
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button onClick={()=> {
              setIsSGOpen(false)
            }} variant={'ghost'} className='text-primary'>No</Button>
            <Button  variant={'default'} onClick={handleSubmit} className='text-white'>Yes</Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default SubmitGradesDialog