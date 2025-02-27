'use client'
import React, { useEffect, useState } from 'react'
import { StudentWithDetails } from '@/lib/types'
import Attendance from './Attendance'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Doc, Id } from '../../../../../convex/_generated/dataModel'
import Image from 'next/image'
import KagawaranngEdukasyon from '@/../public/images/kagawaran-ng-edukasyon-logo.png'

interface SF9FrontTemplateProps{
    student: StudentWithDetails
    
}
function SF9FrontTemplate({student}: SF9FrontTemplateProps) {
  
    const attendance = useQuery(api.attendance.get, {
        studentId: student?._id,
        classId: student?.cLass?._id
    })
    const [isSHS, setIsSHS] = useState<boolean>(false)
    const [principalN, setPrincipalN] = useState<string>("")
    const principal = useQuery(api.admin.principal, {
        type: isSHS ? "senior-high" : "junior-high"
    });


    useEffect(()=>{
        if(student.sectionDoc?.gradeLevel?.level === "11" || student.sectionDoc?.gradeLevel?.level === "12") {
            setIsSHS(true)
        }

        console.log(student.sectionDoc?.gradeLevel?.level)
        if(principal) {
            const principalName = principal?.firstName + " " + principal?.middleName + " " + principal?.lastName
            setPrincipalN(principalName);
        }
    },[student, principal])

    function getStudentAge(birthday: string): number {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
  return (
    <div className='grid grid-cols-2 gap-x-10 p-10  text-black  w-full '>
        <div className="">
            
            <Attendance attendance={attendance as Doc<'attendance'>} studentId={student?._id as Id<'students'>} classId={student?.cLass?._id as Id<'classes'>} sf9={true}/>

            <div className="my-5 space-y-2">
                <h1 className='uppercase font-semibold font-serif tracking-wide text-center'>Parent / Guardian Signature</h1>
                <div className="grid grid-cols-3 gap-x-3 px-10 items-baseline">
                    <h1 className=''>1st Quarter</h1>
                    <h1 className='border-b border-b-black col-span-2'></h1>
                </div>
                <div className="grid grid-cols-3 gap-x-3 px-10 items-baseline">
                    <h1 className=''>2nd Quarter</h1>
                    <h1 className='border-b border-b-black col-span-2'></h1>
                </div>
                <div className="grid grid-cols-3 gap-x-3 px-10 items-baseline">
                    <h1 className=''>3rd Quarter</h1>
                    <h1 className='border-b border-b-black col-span-2'></h1>
                </div>
                <div className="grid grid-cols-3 gap-x-3 px-10 items-baseline">
                    <h1 className=''>4th Quarter</h1>
                    <h1 className='border-b border-b-black col-span-2'></h1>
                </div>
            </div>
            <div className="font-serif">
                <h1 className='text-center font-semibold font-serif'>Certificate of Transfer</h1>
                <div className="grid grid-cols-2">
                       <h1 className='col-span-1 h-fit '>Admitted to Grade: __________</h1>
                       <h1 className='col-span-1 h-fit '>Section:_____________________</h1> 
                       <h1 className='col-span-2 h-fit '>Eligibility for Admission to Grade: ______________________________</h1> 
                </div>
                <div className="">
                    <h1 className='my-7'>Approved:</h1>
                    <div className="grid grid-cols-2 gap-x-16 items-baseline">
                        <h1 className='border-b-black border-b'>{}</h1>
                        <h1 className='border-b-black border-b'>{}</h1>
                        <h1  className='text-center'>Principal</h1>
                        <h1  className='text-center'>Teacher</h1>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className='text-center font-semibold font-serif'>Certificate of Transfer</h1>
                    <div className="grid grid-cols-2 gap-x-16 items-baseline">
                        <div className='flex items-baseline gap-x-2'>Admitted in: <h1 className='flex-1 border-b border-b-black'></h1></div>
                        <div className=""></div>
                        <div className='flex items-baseline gap-x-2'>Date: <h1 className='flex-1 border-b border-b-black'></h1></div>
                        <div className='flex items-baseline gap-x-2'><h1 className='flex-1 border-b border-b-black'></h1></div>
                        <div className=""></div>
                        <div className="text-center">Principal</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="font-serif">
            <div className='grid grid-cols-3 mb-3'>
                <h1 className='col-span-2'></h1>
                {isSHS && (
                <h1 className='col-span-1'>LRN: {student.lrn}</h1>
                )}
            </div>
            <div className="grid grid-cols-3">
                <div className="flex justify-end items-start col-span-1">
                    <Image src={KagawaranngEdukasyon} alt='Kagawaran ng Edukasyon' width={100} height={100} className='size-20 object-contain'/>
                </div>
                <div className="col-span-2 text-center flex flex-col items-center px-10 text-xs ">
                    <h1 className='text-lg'>Republic of the Philippines</h1>
                    <h1 className='mb-2 text-[1rem]'>DEPARTMENT OF EDUCATION</h1>
                    <h1 className='border-b-black border-b w-full'>Central Visayas</h1>
                    <h1 className='text-center mb-2  mt-1'>Region</h1>
                    <h1 className='border-b-black border-b w-full'>Division of Tanjay City</h1>
                    <h1 className='text-center mb-2  mt-1'>Division</h1>
                    <h1 className='border-b-black border-b w-full'>TANJAY NATIONAL HIGH SCHOOL (OPAO)</h1>
                    <h1 className='text-center mb-2 mt-1'>School</h1>
                </div>
                <div className="col-span-3 pl-20">
                    <h1 className='text-center font-semibold text-lg font-serif my-5'>LEARNER&apos;S PROGRESS REPORT CARD</h1>
                    <div className="grid grid-cols-12 gap-x-2 items-baseline gap-y-2 font-semibold">
                        <h1 className='col-span-12 flex gap-x-2'>Name:  <span className='font-normal border-b-black border-b flex-1 px-2 inline-block capitalize'>{student.firstName} {student.middleName} {student.lastName} {student.extensionName}</span></h1>
                        {!isSHS && (
                            <h1 className='col-span-12 flex gap-x-2'>Learner&apos;s Reference Number:  <span className='font-normal border-b-black border-b flex-1 px-2 inline-block capitalize'>{student.lrn}</span></h1>
                        )}
                        
                        <h1 className='col-span-8 flex gap-x-2'>Age:  <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>{getStudentAge(student.birthDate)}</span></h1>
                        <h1 className='col-span-4 flex gap-x-2'>Sex:  <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>{student.sex}</span></h1>
                        <h1 className='col-span-5 flex gap-x-2'>Grade:  <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>{student.sectionDoc?.gradeLevel?.level}</span></h1>
                        <h1 className='col-span-7 flex gap-x-2'>Section:  <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>{student.sectionDoc?.name}</span></h1>
                        {isSHS && (
                        <h1 className='col-span-12 flex gap-x-2'>Curriculum: <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>K to 12 Basic Education Curriculum</span></h1>
                        )}
                        <h1 className='col-span-12 flex gap-x-2'>School Year: <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>{student.cLass.schoolYear.sy}</span></h1>
                        {isSHS && (
                            <h1 className='col-span-12 flex gap-x-2'>Track/ Strand: <span className='font-normal border-b-black border-b flex-1 px-2 inline-block'>{student.cLass?.track}/{student.strand}</span></h1>
                        )}
                    </div>
                </div>
                <div className="col-span-3 pl-20 font-semibold mt-10">
                    <h1>Dear Parent,</h1>
                    <p className="text-sm text-justify"><span className='mr-4'></span>This report card shows the ability and progress your child has made in different learning areas as well as his/her core values.  </p>
                    <p className="text-sm"><span className='mr-4'></span>The school welcomes you should you desire to know more about your child&apos;s progress.</p>
                    <div className="grid grid-cols-2 gap-x-10 mt-10">
                        <h1 className='border-b-black border-b text-center capitalize font-medium'>{principalN}</h1>
                        <h1 className='border-b-black border-b text-center capitalize font-medium'>{student.advisor?.firstName} {student.advisor?.middleName} {student.advisor?.lastName}</h1>
                        <h1 className='text-center'>Principal</h1>
                        <h1 className='text-center'>Teacher</h1>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default SF9FrontTemplate