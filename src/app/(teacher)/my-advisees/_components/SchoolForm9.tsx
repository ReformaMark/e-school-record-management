'use client'
import React, { useRef } from 'react'
import JrGradesTemplate from './JrGradesTemplate'
import { StudentWithDetails } from '@/lib/types'
import Values from './Values'
import { Id } from '../../../../../convex/_generated/dataModel'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useReactToPrint } from 'react-to-print'
import { IoMdPrint } from 'react-icons/io'

interface SchoolForm9Props {
    student: StudentWithDetails,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void
}
function SchoolForm9({
    student,
    isOpen,
    setIsOpen
}: SchoolForm9Props) {
    const componentRef = useRef(null);

    
  const reactToPrintContent = () => {
    return componentRef.current;
  };

   const handlePrint = useReactToPrint({
      documentTitle: `School form 9`,
  
    });
    

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='max-w-screen-xl  max-h-screen overflow-auto text-black bg-white p-5'>
        <DialogHeader>
            <DialogTitle className='flex gap-x-3 items-center text-xs font-normal'>Schoo form 9</DialogTitle>
        </DialogHeader>
        <div ref={componentRef} className='grid grid-cols-2 gap-x-10 p-10  text-black bg-white w-fit'>
            <div className="">
                {/* <div className="text-center">
                    <Image src={KNGLogo} alt='Kagawaran ng Edukaston' height={100} width={100} className=' mx-auto object-contain size-12'/>
                    <h1  className='text-xs font-serif font-semibold'>Republic of the Philippines</h1>
                    <h1  className='text-xs'>Department of Education</h1>
                    <h1 className='text-xs'>Central Visayas</h1>
                    <h1 className='text-xs'>Division of Tanjay City</h1>
                    <h1 className='font-semibold text-sm font-serif'>TANJAY NATIONAL HIGH SCHOOL (OPAO)</h1>
                    <h1 className='text-xs'>Barangay IX, OPAO, Tanjay City</h1>
                </div> */}
                <JrGradesTemplate student={student} sf9={true}/>
            </div>
            <div className='text-xs'>
                <Values sf9={true} studentId={student?._id as Id<'students'>} classId={student?.cLass?._id as Id<'classes'>}/>
            </div>

        </div>
        <DialogFooter>
            <Button onClick={()=> setIsOpen(false)} variant={'ghost'}>Cancel</Button>
            <Button variant={'default'} onClick={()=> {handlePrint(reactToPrintContent)}} className='text-white flex gap-x-3'><IoMdPrint />Print</Button>
        </DialogFooter>
        </DialogContent>
    </Dialog>
 
  )
}

export default SchoolForm9