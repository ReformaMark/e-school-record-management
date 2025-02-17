'use client'
import React, { useState } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { AssessmentTypes } from '@/lib/types'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FilePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'

interface ApplyAssessmentProps {
    id: Id<'assessments'>
    assessment: AssessmentTypes
}
function ApplyAssessment({id, assessment}: ApplyAssessmentProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const createClassRecords = useMutation(api.classRecords.create)
    const handleApply = async () => {
        setIsLoading(true)
        toast.promise(createClassRecords({
            gradeLevel:assessment.gradeLevel, 
            subjectId: assessment.subjectId,
            quarter: assessment.quarter,
            assessmentNo: assessment.assessmentNo,
            type: assessment.type,
            score: assessment.highestScore,
            schoolYearId: assessment.schoolYear,
            subComponent: assessment.subComponent,
            assessmentId: id,
            semester: assessment.semester
        }),{
            loading: 'Applying Assessment...',
            success: 'Assessment applied successfully',
            error: 'Failed to apply Assessment :('
        }) 
        setIsLoading(false)
        setDialogOpen(false)
    }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className=''>
            <FilePlus/>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle className='text-primary'>Add Assessment to Students Class Records</DialogTitle>
            <DialogDescription>
                Are you sure you want to add this assessment? Once applied, it will be recorded in the students class records and cannot be undone.
            </DialogDescription>
            <DialogFooter>
                <Button className='text-primary' variant={'ghost'} onClick={()=> {
                     setDialogOpen(false)
                }}>Cancel</Button>
                <Button className='text-white' disabled={isLoading} onClick={handleApply}> Add Assessment</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
 
  )
}

export default ApplyAssessment