'use client'
import { DataTable } from '@/components/data-table'
import React from 'react'
import { AssessmentColumn, assessments } from './AssessmentData'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
function WrittenWorks() {
  const writtenWorks = assessments.filter((assessment) => assessment.assessmentType === 'Written Work')
  return (
    <div className='bg-white p-10'>
      <div className="flex justify-between">
            <h1>Written Wroks</h1>
                <Dialog>
                    <DialogTrigger className='border shadow-md  text-xs flex justify-center items-center gap-x-3 disabled:bg-blue-200 bg-blue-600 text-white border-gray-100 rounded-md px-2 py-1'>
                        <Plus/> Assesment
                    </DialogTrigger>
                    <DialogContent className='max-w-6xl max-h-screen overflow-auto'>
                    <DialogHeader>
                        <DialogTitle>
                            
                        </DialogTitle>
                        
                    </DialogHeader>
               
                    </DialogContent>
                </Dialog>
            </div>
        <DataTable 
            columns={AssessmentColumn}
            data={writtenWorks}
            filter=''
            placeholder=''
        />
    </div>
  )
}

export default WrittenWorks