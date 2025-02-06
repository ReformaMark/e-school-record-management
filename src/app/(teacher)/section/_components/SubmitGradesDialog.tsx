'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

function SubmitGradesDialog() {
  return (
    <Dialog>
       
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Submit Grades?</DialogTitle>
            <DialogDescription>
            Once you submit the grades to students adviser you can no longer edit the grades.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant={'ghost'}>No</Button>
            <Button  variant={'default'}>Yes</Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default SubmitGradesDialog