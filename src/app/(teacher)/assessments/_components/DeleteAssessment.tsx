'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from 'lucide-react'
import {  Id } from '../../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { AssessmentTypes } from '@/lib/types'
interface DeleteAssessmentProps {
    id: Id<'assessments'>
    assessment: AssessmentTypes
}

function DeleteAssessment({id, assessment}: DeleteAssessmentProps) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const deleteAssesment = useMutation(api.assessments.deleteAssessment)
    const handleDelete = async () => {
        setIsLoading(true)
        toast.promise(deleteAssesment({id}),{
            loading: 'Deleting Assessment...',
            success: 'Assessment Deleted',
            error: 'Failed to delete Assessment :('
        }) 
        setIsLoading(false)
        setDialogOpen(false)
    }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger className='text-red-500'>
           <Trash2/>
        </DialogTrigger>
    
        <DialogContent>
            <DialogTitle className='text-primary'>Are you sure you want to delete this assessment?</DialogTitle>
                <div className="grid grid-cols-2 gap-2 text-primary">
                    <p><span className="font-semibold">Grade level:</span> {assessment.gradeLevel}</p>
                    <p><span className="font-semibold">Subject:</span> {assessment.subject?.name}</p>
                    <p><span className="font-semibold">Quarter:</span> {assessment.quarter}</p>
                    <p><span className="font-semibold">Assessment No:</span> {assessment.assessmentNo}</p>
                    <p><span className="font-semibold">Highest Possible Score:</span> {assessment.highestScore}</p>
                </div>
            <DialogFooter>
                <div className='flex justify-end gap-x-3'>
                    <Button variant={'outline'} onClick={()=>{setDialogOpen(!dialogOpen)}}>Cancel</Button>
                    <Button variant={'destructive'} disabled={isLoading} onClick={handleDelete} className="">Delete</Button>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteAssessment