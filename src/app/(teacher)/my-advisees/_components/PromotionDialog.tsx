import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { StudentWithDetails } from '@/lib/types'
import { Button } from '@/components/ui/button'

interface PromotionDialogProp {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
    student: StudentWithDetails
}
function PromotionDialog({isOpen, setIsOpen, student}:PromotionDialogProp) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className=' max-h-screen overflow-auto text-primary'>
            <DialogHeader>
                <DialogTitle className='text-lg'>
                    Promote to the next grade level? 
                </DialogTitle>
                
            </DialogHeader>
            <div className="space-y-3">
                <p>{student?.lastName} has <strong>failed (1)</strong> of his subjects.</p>
                <h1>Failed Subject(s):</h1>
                <h1 className='pl-5'>- <strong>Pre-Calculus - (74)</strong></h1>
                <p className='text-sm text-justify'>* Must pass remedial classes for failed competencies in the subjects or learning areas to be allowed to enroll in the next semester. Otherwise the learner must retake the subjects failed.</p>
            </div>
            <DialogFooter>
                <Button variant={'default'} onClick={()=> setIsOpen(!isOpen)} className=" text-white">Conditionally Promote</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
  )
}

export default PromotionDialog