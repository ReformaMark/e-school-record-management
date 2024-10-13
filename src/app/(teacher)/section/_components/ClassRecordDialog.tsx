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

function ClassRecordDialog({
  subject,
  gradeLevel,
}:{
  subject: string,
  gradeLevel: string,
}) {
  const [isDialogOpen, setIsDialogOpen ] = useState<boolean>(false)
  const [isOpen, setIsOpen ] = useState<boolean>(false)
  console.log(isDialogOpen)
  return (
    <div className="">
        <Dialog open={isDialogOpen}>
            <DialogTrigger onClick={()=> setIsDialogOpen(!isDialogOpen)} className='border shadow-md flex justify-center items-center gap-x-3 bg-gray-400 text-white border-gray-100 rounded-md px-2 py-1'>
              <FaEye  className='size-5 text-gray-300'/> Class Record
            </DialogTrigger>
            <DialogContent className='max-w-full'>
            <DialogHeader>
                <DialogTitle>Class Record</DialogTitle>
                <DialogDescription>
                  <ClassRecordTemplate subject={subject } gradeLevel={gradeLevel}/>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'ghost'}>Cancel</Button>
                <Button  variant={'default'} onClick={()=> {
                  setIsDialogOpen(false)
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