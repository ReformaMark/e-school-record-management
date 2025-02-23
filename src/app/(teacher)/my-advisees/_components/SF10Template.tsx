import { StudentWithDetails } from '@/lib/types'
import Image from 'next/image'
import React, { useRef } from 'react'
import KagawaranNgEdukasyon from '@/../public/images/kagawaran-ng-edukasyon-logo.png'
import DepedLogo from '@/../public/images/Logo-DepEd.png'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useReactToPrint } from 'react-to-print'
import { IoMdPrint } from 'react-icons/io'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import SHSSubjectsTemplate from './SHSSubjectsTemplate'
interface SF10TemplateProps {
    student: StudentWithDetails,
    isOpen: boolean,
    setIsOpen: (value: boolean) => void,
}
function SF10Template({student,isOpen,setIsOpen}: SF10TemplateProps) {
    const componentRef = useRef(null);

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

                    <RadioGroup 
                        defaultValue="Yes" 
                        disabled
                        className='flex gap-x-5 col-span-2 '>
                        <RadioGroupItem 
                            value="High School Completer" 
                            id="yes" 
                            className='rounded-none border-black border size-4 ml-0 ' 
                            />
                        <Label htmlFor="Yes" className='ml-[-15px] text-[0.6rem]'>High School Completer*</Label>
                    </RadioGroup>

                    <h1 className='flex w-1/3'>Gen. Ave: <span className='border-b border-b-black flex-1 '></span></h1>
                </div>
                <div className="col-span-5 flex gap-x-5 text-[0.55rem]">

                    <RadioGroup 
                        defaultValue="Yes" 
                        disabled
                        className='flex gap-x-5 col-span-2 text-[0.6rem]'>
                        <RadioGroupItem 
                            value="Junior High School Completer" 
                            id="yes" 
                            className='rounded-none' 
                            />
                        <Label htmlFor="Yes" className='ml-[-15px] text-[0.6rem]'>Junior High School Completer*</Label>
                    </RadioGroup>

                    <h1 className='flex w-1/3'>Gen. Ave: <span className='border-b border-b-black flex-1'></span></h1>
                </div>
            </div>
            <div className="grid grid-cols-12 text-[0.55rem]  mt-[-4px]">
                <h1 className='flex gap-x-1 col-span-5'>Date of Gradeuation/Completion (MM/DD/YYYY): <span className='border-b-black border-b flex-1 '></span></h1>
                <h1 className='flex gap-x-1 col-span-3'>Name of School: <span className='border-b-black border-b flex-1 '></span></h1>
                <h1 className='flex gap-x-1 col-span-4'>School Address: <span className='border-b-black border-b flex-1 '>{student.birthDate}</span></h1>
            </div>
            <div className="grid grid-cols-12 pt-1 mt-[-2px]">
                <div className="col-span-3 flex gap-x-5 text-[0.6rem]">
                    <RadioGroup 
                        defaultValue="Yes" 
                        disabled
                        className='flex gap-x-5 col-span-2 '>
                        <RadioGroupItem 
                            value="High School Completer" 
                            id="yes" 
                            className='rounded-none ml-0 ' 
                            />
                        <Label htmlFor="Yes" className='ml-[-15px] text-[0.6rem]'>PEPT Passer*</Label>
                    </RadioGroup>

                    <h1 className='flex w-1/3'>Rating: <span className='border-b border-b-black flex-1 '></span></h1>
                </div>
                <div className="col-span-3 flex gap-x-5 text-[0.6rem]">
                    <RadioGroup 
                        defaultValue="Yes" 
                        disabled
                        className='flex gap-x-5 col-span-2 '>
                        <RadioGroupItem 
                            value="High School Completer" 
                            id="yes" 
                            className='rounded-none ml-0 ' 
                            />
                        <Label htmlFor="Yes" className='ml-[-15px] text-[0.6rem]'>ALS A&E Passer*</Label>
                    </RadioGroup>

                    <h1 className='flex w-1/3'>Rating: <span className='border-b border-b-black flex-1 '></span></h1>
                </div>
                <div className="col-span-6 flex text-[0.6rem]">
                    <RadioGroup 
                        defaultValue="Yes" 
                        disabled
                        className='flex gap-x-5 col-span-2 '>
                        <RadioGroupItem 
                            value="High School Completer" 
                            id="yes" 
                            className='rounded-none ml-0 ' 
                            />
                        <Label htmlFor="Yes" className='ml-[-15px] text-[0.6rem]'>Others*</Label>
                    </RadioGroup>

                    <h1 className='flex w-full'>(Pls. specify): <span className='border-b border-b-black flex-1 '></span></h1>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-x-5 text-[0.6rem] mt-[-4px]">
                <h1 className='flex col-span-6'>Date of Examination/Assessment (MM/DD/YYYY): <span className='border-b border-b-black flex-1 '></span></h1>
                <h1 className='flex col-span-6'>Name and Address of Community Learning Center: <span className='border-b border-b-black flex-1 '></span></h1>
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

                <SHSSubjectsTemplate/>
            </div>
            <SHSSubjectsTemplate/>
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

export default SF10Template