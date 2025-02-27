import { FinalGradesWithDetails, StudentWithDetails } from '@/lib/types'
import Image from 'next/image'
import React, { useRef } from 'react'
import KagawaranNgEdukasyon from '@/../public/images/kagawaran-ng-edukasyon-logo.png'
import DepedLogo from '@/../public/images/Logo-DepEd.png'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useReactToPrint } from 'react-to-print'
import { IoMdPrint } from 'react-icons/io'
import { Label } from '@/components/ui/label'
import SHSSubjectsTemplate from './SHSSubjectsTemplate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'

interface SF10TemplateProps {
    student: StudentWithDetails,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
}
function SF10Template({student,isOpen,setIsOpen}: SF10TemplateProps) {
    const componentRef = useRef(null);
    const studentFinalGrades = useQuery(api.finalGrades.getFinalGradesForSF10, {
        studentId: student._id
    })


    // const gradeLevel = student.sectionDoc?.gradeLevel?.level
    // const isSHS = gradeLevel ?? 0 > 10 
  const reactToPrintContent = () => {
    return componentRef.current;
  };

   const handlePrint = useReactToPrint({
      documentTitle: `School form 10`,
  
    });

    
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
     

    <DialogContent className='max-w-screen-xl  max-h-screen overflow-auto text-black bg-white p-5'>
    <DialogHeader>
        <DialogTitle className='flex gap-x-3 items-center text-xs font-normal'>School form 10</DialogTitle>
    </DialogHeader> 
    <Tabs>
            <TabsList>
              <TabsTrigger value='front'>Front</TabsTrigger>
              <TabsTrigger value='back'>Back</TabsTrigger>
            </TabsList>
            <TabsContent value='front'>
            <div ref={componentRef} className='p-5 text-black text-sm'>
                <div className="grid grid-cols-12 h-fit text-sm ">
                    <div className="col-span-2 flex justify-center">
                        <Image src={KagawaranNgEdukasyon} alt='' className='object-contain size-14 '/>
                    </div>
                    <div className="col-span-8 text-sm">
                        <h1 className='uppercase text-center'>Republic of the Philippines</h1>
                        <h1 className='uppercase text-center'>Department of Education</h1>
                        <h1 className='uppercase text-center font-semibold text-sm'>Senior High School Student Permanent Record</h1>
                    </div>
                    <div className="col-span-2 flex  justify-center">
                        <Image src={DepedLogo} alt=''  className='object-contain w-20 h-14 '/>
                    </div>
                </div>
                
                <div className="pb-1">
                    <h1 className='uppercase text-center font-semibold bg-gray-300 text-[0.7rem]'>Learner&apos;s Information</h1>
                    <div className="grid grid-cols-3 gap-x-2 uppercase text-[0.55rem] ">
                        <h1 className=' flex'>Last Name: <span className='border-b-black border-b flex-1 px-1'>{student.lastName} {student.extensionName}</span></h1>
                        <h1 className=' flex'>First Name: <span className='border-b-black border-b flex-1 px-1'>{student.firstName}</span></h1>
                        <h1 className=' flex'>MIddle Name: <span className='border-b-black border-b flex-1 px-1'>{student.middleName}</span></h1>
                    </div>
                    <div className="grid grid-cols-12 gap-x-2 text-[0.55rem] mt-[-2px]">
                        <h1 className='flex col-span-2'>LRN: <span className='border-b-black border-b flex-1 px-1'>{student.lrn}</span></h1>
                        <h1 className='flex col-span-4'>Date of Birth (MM/DD/YYYY): <span className='border-b-black border-b flex-1 px-1'>{student.birthDate}</span></h1>
                        <h1 className='flex col-span-1'>Sex: <span className='border-b-black border-b flex-1 px-1'>{student.sex}</span></h1>
                        <h1 className='flex col-span-5'>Date of SHS Admission (MM/DD/YYYY): <span className='border-b-black border-b flex-1 px-1'>{student.birthDate}</span></h1>
                    </div>
                </div>
                <div className="">
                    <h1 className='uppercase text-center bg-gray-300 text-[0.7rem] font-semibold'>Eligibility for SHS Enrollment</h1>
                    <div className="grid grid-cols-12 mt-1">
                        <div className="col-span-4 flex gap-x-5 text-[0.55rem]">

                            <Checkbox 
                                id="highSchoolCompleter" 
                                className='rounded-none border-black border size-4 ml-0 ' 
                                                               />
                            <Label htmlFor="highSchoolCompleter" className='ml-[-15px] text-[0.6rem]'>High School Completer*</Label>

                            <h1 className='flex w-1/3 items-baseline'>Gen. Ave: <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3 h-3' /></h1>
                        </div>
                        <div className="col-span-5 flex gap-x-5 text-[0.55rem]">

                            <Checkbox 
                                id="juniorHighSchoolCompleter" 
                                className='rounded-none checked:bg-transparent bg-transparent' 
                                />
                            <Label htmlFor="juniorHighSchoolCompleter" className='ml-[-15px] text-[0.6rem]'>Junior High School Completer*</Label>

                            <h1 className='flex w-1/3 items-baseline'>Gen. Ave: <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3 h-3' /></h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 text-[0.55rem]  mt-[-4px]">
                        <h1 className='flex gap-x-1 items-baseline col-span-5'>Date of Gradeuation/Completion (MM/DD/YYYY): <input type="text" className='border-b border-b-black flex-1  h-3 w-1/3 px-3' /></h1>
                        <h1 className='flex gap-x-1 items-baseline col-span-3'>Name of School: <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3 h-3' /></h1>
                        <h1 className='flex gap-x-1 items-baseline col-span-4'>School Address: <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3  h-3' /></h1>
                    </div>
                    <div className="grid grid-cols-12 pt-1 mt-[-2px]">
                        <div className="col-span-3 flex gap-x-5 text-[0.6rem]">
                            <Checkbox 
                                id="peptPasser" 
                                className='rounded-none ml-0 ' 
                                />
                            <Label htmlFor="peptPasser" className='ml-[-15px] text-[0.6rem]'>PEPT Passer*</Label>

                            <h1 className='flex w-1/3 items-baseline'>Rating: <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3 h-3' /></h1>
                        </div>
                        <div className="col-span-3 flex gap-x-5 text-[0.6rem]">
                            <Checkbox 
                                id="alsAEPasser" 
                                className='rounded-none ml-0 ' 
                                />
                            <Label htmlFor="alsAEPasser" className='ml-[-15px] text-[0.6rem]'>ALS A&E Passer*</Label>

                            <h1 className='flex w-1/3 items-baseline'>Rating: <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3 h-3' /></h1>
                        </div>
                        <div className="col-span-6 flex text-[0.6rem]">
                            <div className='flex gap-x-5 col-span-2'>
                            <Checkbox
                                    id="others" 
                                    className='rounded-none ml-0' 
                                />
                                <Label htmlFor="others" className='ml-[-15px] text-[0.6rem]'>Others*</Label>
                            </div>

                            <h1 className='flex w-full items-baseline'>(Pls. specify): <input type="text" className='border-b border-b-black flex-1 w-1/3 px-3 h-3' /></h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-x-5 text-[0.6rem] mt-[-4px]">
                        <h1 className='flex col-span-6 items-baseline'>Date of Examination/Assessment (MM/DD/YYYY): <input type="text" className='border-b border-b-black flex-1 px-3 h-3' /></h1>
                        <h1 className='flex col-span-6 items-baseline'>Name and Address of Community Learning Center: <input type="text" className='border-b border-b-black flex-1 px-3 h-3' /></h1>
                    </div>
                    <div className="grid grid-cols-12 italic text-[0.5rem] mt-[-1px]">
                        <h4 className='col-span-6 italic'>*High School Completers are students who graduated from secondary school under the old curriculum</h4>
                        <h4 className='col-span-6 italic '>***ALS A&E - Alternative Learning System Accreditation and equivalency Test for JHS</h4>
                    </div>
                    <h4 className=' italic text-[0.5rem] mt-[-6px]'>**PEPT - Philippine educational Placement Test for JHS</h4>
                </div>
            
                <div className="">
                    <h1 className='uppercase text-center bg-gray-300 text-[0.7rem] font-semibold'>Scholastic Record</h1>
                    <div className="mb-5">

                        <SHSSubjectsTemplate student={student} finalGrades={studentFinalGrades as FinalGradesWithDetails[]} level={"11"} sem='1st'/>
                    </div>
                    <SHSSubjectsTemplate student={student} finalGrades={studentFinalGrades as FinalGradesWithDetails[]} level={"11"} sem={'2nd'}/>
                </div>
            </div>
            </TabsContent>
            <TabsContent value='back'>
            <div ref={componentRef} className='p-5 text-black text-sm'>
                <div className="mb-5">

                    <SHSSubjectsTemplate student={student} level='12' sem='1st'/>
                </div>
                <SHSSubjectsTemplate student={student} level='12' sem='2nd'/>
                <div className='my-2 w-full h-2 bg-gray-300'></div>
                <div className="grid grid-cols-12 gap-x-5 text-[0.6rem] font-semibold">
                    <h1 className='col-span-10 flex items-baseline'>Track/Strand Accomplished: <input type="text" className='border-b-black border-b flex-1 px-3 uppercase h-5' /></h1> 
                    <h1 className='col-span-2 flex items-baseline'>SHS Gen Average: <input type="number" className='border-b-black border-b flex-1 px-3 w-2 h-5 uppercase' /></h1> 
                </div>
                <div className="grid grid-cols-12 gap-x-5 text-[0.6rem]  font-semibold">
                    <h1 className='col-span-8 flex items-baseline'>Awards/Honors Received: <input type="text" className='border-b-black border-b flex-1 px-3 uppercase h-5' /></h1> 
                    <h1 className='col-span-4 flex items-baseline'>Date of SHS Graduation (MM/DD/YYYY): <input type="text" className='border-b-black border-b flex-1 w-1 h-5 uppercase' /></h1> 
                </div>
                <div className="grid grid-cols-12 gap-x-5 text-[0.6rem]  font-semibold">
                    <h1 className='col-span-6 flex items-baseline'>Certified By:</h1> 
                    <h1 className='col-span-6 flex items-baseline'>Place School Seal Here:</h1> 
                </div>
                <div className="grid grid-cols-2">
                    <div className="pr-5">
                        <div className="grid grid-cols-12 text-[0.6rem] gap-x-10">
                            <input type="text" className='border-b-black border-b col-span-6 text-center uppercase'/>
                            <input type="text" className='border-b-black border-b col-span-4 text-center uppercase' />
                            <h1 className='text-center col-span-6'>Signature of School Head Over Printed Name</h1>
                            <h1 className='text-center col-span-4'>Date</h1>
                        </div>
                        <div className="p-2 border border-black text-[0.5rem]">
                            <h1 className='text-xs font-semibold'>Note:</h1>
                            <p className='leading-3'>This permanent record or a photocopy of this permanent record that bears the seal of the school and the original signature in ink of the school head shall be considered valid for all legal purposes. Any erasure or alteration made on this copy should be validated by the School head.</p>
                            <p className='leading-3'>If the student transfers to another school, the originating school should produce one (1) certified true copy of this permanent record for safekeeping. The receiving school shall continue filling up the original form.</p>
                            <p className='leading-3'>Upon graduation, the school from which the student graduated should keep the original form and produce one (1) certified true copy for the Division office.</p>
                        </div>
                    </div>
                    <div className="border-l-black border-l">

                    </div>
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

export default SF10Template