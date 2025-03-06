'use client'
import React from 'react'
import { ClassesWithDetails, SectionWithGradeLevel } from '@/lib/types'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { getQuarterlyGrades, remarks } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

function QuarterlyGradesTemplate({ 
    section,
   
    cls
   }:{
    section: SectionWithGradeLevel

    cls: ClassesWithDetails
   }) {
    const studentQuarterlyGrades = useQuery(api.quarterlyGrades.get,{
        gradeLevel: Number(section.gradeLevel?.level.replace("Grade", "")),
        classId: cls._id,
        needsIntervention: true
    })

    console.log(studentQuarterlyGrades)
    const schoolYear =  cls.schoolYear?.sy
    const subjectName = cls.subject?.name
    const males = studentQuarterlyGrades
        ?.filter(student => student?.sex?.toLowerCase() === 'male')
        .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
  
    const females = studentQuarterlyGrades
        ?.filter(student => student?.sex?.toLowerCase() === 'female')
        .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
        const teacherName = `${cls.teacher?.firstName} ${cls.teacher?.middleName ? cls.teacher?.middleName : "" } ${cls.teacher?.lastName}`

        const gradeAndSection = `${section?.gradeLevel?.level} - ${section?.name}`

    const getAverage = (num1: number | string, num2: number | string, num3: number | string, num4: number | string): number | string => {
        if (typeof num1 === "string" || typeof num2 === "string" || typeof num3 === "string" || typeof num4 === "string") {
            return ""; // Return an empty string if either input is a string
        }
        return Math.round((num1 + num2 + num3 + num4) / 4);
        }

  return (
    <div className='w-[1000px] md:w-full overflow-y-auto'>
        <h1 className='text-center font-semibold'>Summary of Quarterly Grades</h1>
        <div className="">
            {/* First Row */}
            <div className="flex border-collapse font-semibold">
                <div className="w-[3%] border-collapse h-auto border border-black"></div>
             
                <h1 className="w-[32%] border-collapse h-auto flex justify-center items-center border border-black">LEARNERS&apos; NAMES</h1>
                
                <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                    <div className="w-full flex col-span-2">
                        <h1 className='w-[60%] p-2 uppercase text-xs  border-collapse border border-black'>GRADE & SECTION: {gradeAndSection}</h1>
                        <h1 className='w-[40%] p-2 uppercase text-xs  border-collapse border border-black'>SCHOOL YEAR: {schoolYear}</h1>
                    </div>
                    <div className="w-full flex col-span-2">
                        <h1 className='w-[60%] p-2 uppercase text-xs  border-collapse border border-black'>TEACHER: {teacherName}</h1>
                        <h1 className='w-[40%] p-2 uppercase text-xs  border-collapse border border-black'>SUBJECT: {subjectName}</h1>
                    </div>
                    <div className="w-full flex col-span-2">
                        <div className='text-xs  text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>{subjectName}</h1> 
                           <h1>1st Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>{subjectName}</h1> 
                           <h1>2nd Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>{subjectName}</h1> 
                           <h1>3rd Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>{subjectName}</h1> 
                           <h1>4th Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>FINAL</h1> 
                            <h1>GRADE</h1> 
                        </div>
                        <div className='text-xs text-center flex justify-center items-center w-2/12  border-collapse border border-black'>
                            REMARKS
                        </div>
              
                    </div>
                </div>
               
            </div>
            {/* Males Row */}
            <div className="flex border-collapse font-semibold bg-gray-400">
                <div className="w-[3%] border-collapse h-auto border border-black"></div>
             
                <h1 className="w-[32%] border-collapse h-auto flex justify-center items-center border border-black">MALE</h1>
                
                <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                   
                    <div className="w-full flex col-span-2">
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                       
                    </div>
                </div>
               
            </div>
            {/* map all males alphabeteically */}
            {males?.map((student, index)=>(
                <div key={student?._id} className="flex border-collapse font-semibold hover:bg-gray-200">
                   <div className="w-[3%] border-collapse text-center text-sm h-auto border border-black">{index + 1}</div>
                
                   <h1 className="w-[32%] border-collapse h-auto flex justify-start px-3 text-sm items-center border border-black">
                    {student?.lastName}, {student?.firstName} {student?.middleName}</h1>
                   
                   <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                      
                       <div className="w-full flex col-span-2">
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[0].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[0].interventionUsed?.map((intUsed, index)=>(
                                        <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                    ))}
                                    </div>
                                    <div className="mt-2">

                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{student.quarterlyGrades[0].interventionRemarks}</p>
                                    </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        ): (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        {student.quarterlyGrades.length >= 2 ? student.quarterlyGrades[1].interventionGrade ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[1].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[1].interventionUsed?.map((intUsed, index)=>(
                                        <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                    ))}
                                    </div>
                                    <div className="mt-2">

                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{student.quarterlyGrades[1].interventionRemarks}</p>
                                    </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        ): (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        {student.quarterlyGrades.length >= 3 ? student.quarterlyGrades[2].interventionGrade ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[2].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[2].interventionUsed?.map((intUsed, index)=>(
                                        <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                    ))}
                                    </div>
                                    <div className="mt-2">

                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{student.quarterlyGrades[2].interventionRemarks}</p>
                                    </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        ): (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "3rd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 4 ? student.quarterlyGrades[3].interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{student.quarterlyGrades[3].interventionGrade}</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades[3].interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{student.quarterlyGrades[3].interventionRemarks}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ): (getQuarterlyGrades(student?.quarterlyGrades, "4th")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "4th")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        { getAverage(
                            student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                            student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0),
                            student.quarterlyGrades.length >= 3 ? (student.quarterlyGrades[2].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0),
                            student.quarterlyGrades.length >= 4 ? (student.quarterlyGrades[3].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "4th")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "4th") ?? 0)   
                        )}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {remarks(
                                getAverage(
                                    student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                                    student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0),
                                    student.quarterlyGrades.length >= 3 ? (student.quarterlyGrades[2].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0),
                                    student.quarterlyGrades.length >= 4 ? (student.quarterlyGrades[3].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "4th")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "4th") ?? 0)   
                                )
                            )}
                        </h1>
                           
                       </div>
                   </div>
                  
               </div>
             ))}
            {/* Females Row */}
            <div className="flex border-collapse font-semibold bg-gray-400">
                <div className="w-[3%] border-collapse h-auto border border-black"></div>
             
                <h1 className="w-[32%] border-collapse h-auto flex justify-center items-center border border-black">FEMALE</h1>
                
                <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                   
                    <div className="w-full flex col-span-2">
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                        <h1 className='text-xs text-center w-2/12  border-collapse border border-black'>
                        
                        </h1>
                       
                    </div>
                </div>
               
            </div>
             {females?.map((student, index)=>(
                <div key={student?._id} className="flex border-collapse font-semibold  hover:bg-gray-200">
                   <div className="w-[3%] text-center text-sm border-collapse h-auto border border-black">{index + 1}</div>
                
                   <h1 className="w-[32%] border-collapse h-auto flex justify-start px-3 text-sm items-center border border-black">
                    {student?.lastName}, {student?.firstName} {student?.middleName}</h1>
                   
                     <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                      
                       <div className="w-full flex col-span-2">
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[0].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[0].interventionUsed?.map((intUsed, index)=>(
                                        <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                    ))}
                                    </div>
                                    <div className="mt-2">

                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{student.quarterlyGrades[0].interventionRemarks}</p>
                                    </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        ): (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        {student.quarterlyGrades.length >= 2 ? student.quarterlyGrades[1].interventionGrade ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[1].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[1].interventionUsed?.map((intUsed, index)=>(
                                        <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                    ))}
                                    </div>
                                    <div className="mt-2">

                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{student.quarterlyGrades[1].interventionRemarks}</p>
                                    </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        ): (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        {student.quarterlyGrades.length >= 3 ? student.quarterlyGrades[2].interventionGrade ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[2].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Intervention Method(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[2].interventionUsed?.map((intUsed, index)=>(
                                        <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                    ))}
                                    </div>
                                    <div className="mt-2">

                                        <Label className='font-semibold'>Remarks</Label>
                                        <p>{student.quarterlyGrades[2].interventionRemarks}</p>
                                    </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                        ): (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "3rd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {student.quarterlyGrades.length >= 4 ? student.quarterlyGrades[3].interventionGrade ? (
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                    <h1 className='text-red-500'>{student.quarterlyGrades[3].interventionGrade}</h1>
                                    </TooltipTrigger>
                                    <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                        <Label className='font-semibold'>Intervention Method(s)</Label>
                                        <div className="flex items-center justify-center flex-wrap gap-2">
                                        {student.quarterlyGrades[3].interventionUsed?.map((intUsed, index)=>(
                                            <Badge key={index + intUsed} className='text-white text-xs'>{intUsed}</Badge>
                                        ))}
                                        </div>
                                        <div className="mt-2">

                                            <Label className='font-semibold'>Remarks</Label>
                                            <p>{student.quarterlyGrades[3].interventionRemarks}</p>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                            ): (getQuarterlyGrades(student?.quarterlyGrades, "4th")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "4th")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        { getAverage(
                            student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                            student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0),
                            student.quarterlyGrades.length >= 3 ? (student.quarterlyGrades[2].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0),
                            student.quarterlyGrades.length >= 4 ? (student.quarterlyGrades[3].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "4th")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "4th") ?? 0)   
                        )}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {remarks(
                                getAverage(
                                    student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                                    student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0),
                                    student.quarterlyGrades.length >= 3 ? (student.quarterlyGrades[2].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "3rd")?? 0),
                                    student.quarterlyGrades.length >= 4 ? (student.quarterlyGrades[3].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "4th")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "4th") ?? 0)   
                                )
                            )}
                        </h1>
                           
                       </div>
                   </div>
                  
               </div>
             ))}
          
        </div>

    </div>
  )
}

export default QuarterlyGradesTemplate