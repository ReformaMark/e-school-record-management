'use client'

import { FaEye} from 'react-icons/fa'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import ClassRecordTemplate from './ClassRecordTemplate'
import { useState } from 'react'
import { CgDanger } from "react-icons/cg";
import { IoMdPrint } from 'react-icons/io'
import { StudentsWithClassRecord } from '@/lib/types'
import { Doc } from '../../../../../convex/_generated/dataModel'

interface ClassRecordDialogProp {
  teacher: Doc<'users'>,
  subject: Doc<'subjects'>,
  section:  Doc<'sections'>,
  appliedGW: Doc<'appliedGradeWeigths'>,
  assessments: Doc<'assessments'>[],
  data: StudentsWithClassRecord[]

}

function ClassRecordDialog({
  teacher,
  subject,
  section,
  appliedGW,
  assessments,
  data
}: ClassRecordDialogProp) {
  const [isDialogOpen, setDialogOpen ] = useState<boolean>(false)
  const [isOpen, setIsOpen ] = useState<boolean>(false)

  const sortedrecords = data.map(s => ({
    ...s,
    classRecords: s.classRecords.map(c => ({
        ...c,
        written: [...c.written].sort((a, b) => a.assessmentNo - b.assessmentNo),
        performance: [...c.performance].sort((a, b) => a.assessmentNo - b.assessmentNo),
        quarterlyExam: [...c.quarterlyExam].sort((a, b) => a.assessmentNo - b.assessmentNo),
    }))
  }));
  
  return (
    <div className="text-primary">
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger onClick={()=> setDialogOpen(!isDialogOpen)} className='border shadow-md flex justify-center items-center gap-x-3 bg-gray-400 text-white border-gray-100 rounded-md px-2 py-1'>
              <FaEye  className='size-5 text-gray-300'/> Class Record
            </DialogTrigger>
            <DialogContent className='max-w-full'>
            <DialogHeader className='max-w-full overflow-auto'>
                <DialogTitle className='text-left text-primary'>Class Record</DialogTitle>
                <div className=''>
                  <ClassRecordTemplate assessments={assessments} appliedGW={appliedGW} teacher={teacher} sortedRecords={sortedrecords} subject={subject } section={section}/>
                </div>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'ghost'}>Cancel</Button>
                <Button variant={'default'} onClick={()=> {
                  setDialogOpen(false)
                  setIsOpen(true)
                  }} className='text-white flex gap-x-3'><IoMdPrint />Print</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
        <Dialog open={isOpen}>
            <DialogContent className=''>
            <DialogHeader>
                <DialogTitle className='flex gap-x-3 items-center'><CgDanger className='size-10 text-orange-500' />  Some students have failed/at-risk grades</DialogTitle>
                <DialogDescription>
                  There are a total of <span className="i italic font-semibold">(10) students</span>  who have failed/at-risk grades for <span className='font-semibold'>1st quarter</span>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button  variant={'ghost'} onClick={()=> setIsOpen(false)} className=''>Okay</Button>
                <Button  variant={'default'} onClick={()=> setIsOpen(false)} className='text-white'>Show me</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
   
  )
}

export default ClassRecordDialog