import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ClassesWithDetails, SectionWithGradeLevel } from '@/lib/types';
import { getAverageForShs, getQuarterlyGrades, remarks } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
function FinalGradeSHSTemplate({
    section,
    subject,
    cls
}:{
    section: SectionWithGradeLevel
    subject: Doc<'subjects'> | null
    cls: ClassesWithDetails
}) {
    const semester = cls.semester

    const studentQuarterlyGrades = useQuery(api.quarterlyGrades.get,{
        gradeLevel: Number(section.gradeLevel?.level.replace("Grade", "")),
        classId: cls._id,
        semester: semester
    })
    
    const males = studentQuarterlyGrades
    ?.filter(student => student?.sex?.toLowerCase() === 'male')
    .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
    
    console.log(males)
  const females = studentQuarterlyGrades
    ?.filter(student => student?.sex?.toLowerCase() === 'female')
    .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
    const teacherName = `${cls.teacher?.firstName} ${cls.teacher?.middleName} ${cls.teacher?.lastName}`

   

  return (
    <div className="overflow-y-auto max-w-full">
        <div className='flex text-sm font-semibold max-w-full min-w-[100vh]'>
            <div className='w-[25%]'>
                <h1 className='uppercase w-full h-full  flex justify-center items-center border border-collapse border-black'>Learners&apos; Names</h1>
            </div>

            <div className='w-[75%]'>
                <div className="border border-collapse border-black flex items-center">
                    <h1 className='uppercase w-[60%] h-full px-2 text-sm font-semibold '>Grade & Section: {section.gradeLevel?.level} - {section.name}</h1>
                    <div className="w-[40%]">
                        <h1 className='uppercase border border-collapse py-1 px-2 border-black h-full text-sm font-semibold'>Semester: {cls.semester}</h1>
                        <h1 className='uppercase border border-collapse border-b-0 py-1 pl-2 border-black h-full text-sm font-semibold'>Subject: {subject?.name}</h1>
                    </div>
                </div>
                <div className="flex">
                    <h1 className='w-[60%] uppercase border border-collapse pl-2  py-1 border-black'>Teacher: {teacherName}</h1>
                    <h1 className='w-[40%] uppercase border border-collapse pl-2 py-1 border-black'>Track: {cls.track}</h1>
                </div>
                <div className="flex w-full">
                
                        <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">{semester === "1st" ? "First" : "Third"} Quarter</h1>
            
            
                        <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">{semester === "2nd" ? "Fourth" : "Second"} Quarter</h1>
            
                
                        <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">
                            {semester === "1st" ? "First" : semester === "2nd" ? "Second" : semester === "3rd" ? "Third" : "Fourth"} Semester Final Grades
                        </h1>
                
            
                        <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">Remarks</h1>
            
                </div>
            </div>
        </div>
        <div className='flex text-sm font-semibold max-w-full min-w-[100vh] bg-gray-400'>
            <div className='w-[25%]'>
                <h1 className='uppercase w-full h-full  flex justify-center items-center border border-collapse border-black'>Males</h1>
            </div>

            <div className='w-[75%] '>
                <div className="flex w-full h-full">
                    <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        
                    </h1>
                    <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">

                    </h1>
                    <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">

                    </h1>
                    <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">
                        
                    </h1>
                </div>
            </div>
        </div>
        { males && males.map((student, index)=>(
             <div key={student?._id} className='flex text-sm font-semibold max-w-full min-w-[100vh]'>
             <div className='w-[25%] flex items-center'>
                <h1 className='w-[10%] flex justify-center items-center border border-collapse h-full border-black'>{index + 1}</h1>
                 <h1 className='uppercase w-full h-full text-xs  flex justify-start items-center border border-collapse border-black'>{student?.lastName}, {student?.firstName} {student?.middleName}</h1>
             </div>
 
             <div className='w-[75%] '>
                 <div className="flex w-full h-full">
                 <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {student.quarterlyGrades.length >= 1 ? student.quarterlyGrades[0].interventionGrade ? (
                              <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[0].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Used intervention(s)</Label>
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
                        ) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                     </h1>
                     <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
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
                        ) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                     </h1>
                     <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getAverageForShs(
                           student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                           student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0)
                        )}
                     </h1>
                     <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">
                         {remarks(
                            getAverageForShs(
                                student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) :(getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                                student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) :(getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0)
                            ),
                         )}
                     </h1>
                 </div>
             </div>
         </div>
        ))

        }
        <div className='flex text-sm font-semibold max-w-full min-w-[100vh] bg-gray-400'>
            <div className='w-[25%]'>
                <h1 className='uppercase w-full h-full  flex justify-center items-center border border-collapse border-black'>Females</h1>
            </div>

            <div className='w-[75%] '>
                <div className="flex w-full h-full">
                    <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        
                    </h1>
                    <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">

                    </h1>
                    <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">

                    </h1>
                    <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">
                        
                    </h1>
                </div>
            </div>
        </div>
        { females && females.map((student, index)=>(
             <div key={student?._id} className='flex text-sm font-semibold max-w-full min-w-[100vh]'>
             <div className='w-[25%] flex items-center'>
                <h1 className='w-[10%] flex justify-center items-center border border-collapse h-full border-black'>{index + 1}</h1>
                 <h1 className='uppercase w-full h-full text-xs  flex justify-start items-center border border-collapse px-2 border-black'>{student?.lastName}, {student?.firstName} {student?.middleName}</h1>
             </div>
 
             <div className='w-[75%] '>
                 <div className="flex w-full h-full">
                 <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
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
                        ) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                     </h1>
                     <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {student.quarterlyGrades.length >= 2 ? student.quarterlyGrades[1].interventionGrade ? (
                              <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <h1 className='text-red-500'>{student.quarterlyGrades[1].interventionGrade}</h1>
                                </TooltipTrigger>
                                <TooltipContent className='max-w-2xl bg-white p-5 space-y-2 shadow-md'>
                                    <Label className='font-semibold'>Used intervention(s)</Label>
                                    <div className="flex items-center justify-center flex-wrap gap-2">
                                    {student.quarterlyGrades[1].interventionUsed?.map((intUsed, index)=>(
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
                        ) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0) : getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                     </h1>
                     <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getAverageForShs(
                           student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                           student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) : (getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0)
                        )}
                     </h1>
                     <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">
                         {remarks(
                            getAverageForShs(
                                student.quarterlyGrades.length >= 1 ? (student.quarterlyGrades[0].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0)) :(getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),
                                student.quarterlyGrades.length >= 2 ? (student.quarterlyGrades[1].interventionGrade ?? (getQuarterlyGrades(student?.quarterlyGrades, "2nd")?? 0)) :(getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0)
                            ),
                         )}
                     </h1>
                 </div>
             </div>
         </div>
        ))

        }
    </div>
  )
}

export default FinalGradeSHSTemplate