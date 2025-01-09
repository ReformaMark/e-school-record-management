'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { PlusCircleIcon } from 'lucide-react'
import EnrollmentForm from './Form'


function EnrollmentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={()=>setIsOpen(true)} className='border shadow-md flex justify-center items-center gap-x-3 disabled:bg-blue-200 bg-blue-600 text-white border-gray-100 rounded-md px-2 py-1'>
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Enroll student
                </span>
            </DialogTrigger>
            <DialogContent className='max-w-6xl max-h-screen overflow-auto'>
              <DialogHeader>
                <DialogTitle>Enroll new student</DialogTitle>
                
              </DialogHeader>
              <EnrollmentForm onClose={()=>setIsOpen(false)}/>
            </DialogContent>
          </Dialog>
    </div>
  )
}

export default EnrollmentDialog