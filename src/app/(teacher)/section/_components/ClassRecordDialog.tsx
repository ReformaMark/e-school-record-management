'use client'

import { FaEdit} from 'react-icons/fa'
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


function ClassRecordDialog({
  subject,
  gradeLevel,
}:{
  subject: string,
  gradeLevel: string,
}) {
  
  return (
    <div className="">
        <Dialog>
            <DialogTrigger className='border shadow-md flex justify-center items-center gap-x-3 bg-gray-400 text-white border-gray-100 rounded-md px-2 py-1'>
              <FaEdit className='size-5 text-gray-300'/>
            </DialogTrigger>
            <DialogContent className='max-w-full'>
            <DialogHeader>
                <DialogTitle>Edit Class Record</DialogTitle>
                <DialogDescription>
                  <ClassRecordTemplate subject={subject } gradeLevel={gradeLevel}/>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'ghost'}>Cancel</Button>
                <Button  variant={'default'} className='text-white'>Save</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
   
  )
}

export default ClassRecordDialog