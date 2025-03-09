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
import SrGradesTemplate from './SrGradesTemplate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SF9FrontTemplate from './SF9FrontTemplate'

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

    const gradeLevel = student.sectionDoc?.gradeLevel?.level
    const isSHS = gradeLevel === "Grade 11" || gradeLevel === "Grade 12" 

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
          <Tabs>
            <TabsList>
              <TabsList>
                <TabsTrigger value='front'>Front</TabsTrigger>
                <TabsTrigger value='back'>Back</TabsTrigger>
              </TabsList>
            </TabsList>
            <TabsContent value='front'>
              <div ref={componentRef} className=''>
                  <SF9FrontTemplate student={student}  />
              </div>
            </TabsContent>
            <TabsContent value='back'>
              <div ref={componentRef} className='grid grid-cols-2 gap-x-10 p-10  text-black bg-white w-fit'>
                  <div className="">
                      {isSHS ? (
                      
                        <>
                        <div className="mb-3">
                          <h1 className='text-center text-xs'>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</h1>
                          <SrGradesTemplate student={student} sem='1st' sf9={true}/>
                        </div>
                        <div className="">
                          <h1 className='text-center text-xs'>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</h1>
                          <SrGradesTemplate student={student} sem='2nd' sf9={true}/>
                        </div>
                        </>
                      ): (
                        <JrGradesTemplate student={student} sf9={true}/>
                      )}
                    
                  </div>
                  <div className='text-xs'>
                      <Values sf9={true} studentId={student?._id as Id<'students'>} classId={student?.cLass?._id as Id<'classes'>} isSHS={isSHS}/>
                  </div>

              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
              <Button onClick={()=> setIsOpen(false)} variant={'ghost'}>Cancel</Button>
              <Button variant={'default'} onClick={()=> {handlePrint(reactToPrintContent)}} className='text-white flex gap-x-3'><IoMdPrint />Print</Button>
          </DialogFooter>
          </DialogContent>
    
    </Dialog>
 
  )
}

export default SchoolForm9