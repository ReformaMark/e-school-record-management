import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ClassesWithDetails, QuarterlyGrades } from '@/lib/types';
import { getAverageForShs, getQuarterlyGrades, remarks } from '@/lib/utils';

function FinalGradeSHSTemplate({
    section,
    subject,
    cls
}:{
    section: Doc<'sections'>
    subject: Doc<'subjects'> | null
    cls: ClassesWithDetails
}) {

    const studentQuarterlyGrades = useQuery(api.quarterlyGrades.get,{
        gradeLevel: section.gradeLevel,
        classId: cls._id
    })
    
    const males = studentQuarterlyGrades
    ?.filter(student => student?.sex?.toLowerCase() === 'male')
    .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
  
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
                    <h1 className='uppercase w-[60%] h-full px-2 text-sm font-semibold '>Grade & Section: {section.gradeLevel} - {section.name}</h1>
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
                
                        <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">First Quarter</h1>
            
            
                        <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">Second Quarter</h1>
            
                
                        <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">First Semister Final Grades</h1>
                
            
                        <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">Remarks</h1>
            
                </div>
            </div>
        </div>
        <div className='flex text-sm font-semibold max-w-full bg-gray-400'>
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
             <div key={student?._id} className='flex text-sm font-semibold max-w-full'>
             <div className='w-[25%] flex items-center'>
                <h1 className='w-[10%] flex justify-center items-center border border-collapse border-black'>{index + 1}</h1>
                 <h1 className='uppercase w-full h-full text-xs  flex justify-start items-center border border-collapse border-black'>{student?.lastName}, {student?.firstName} {student?.middleName}</h1>
             </div>
 
             <div className='w-[75%] '>
                 <div className="flex w-full h-full">
                 <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                     </h1>
                     <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                     </h1>
                     <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getAverageForShs((getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),(getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0))}
                     </h1>
                     <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">
                         {remarks(
                            getAverageForShs((getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),(getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0)),
                         )}
                     </h1>
                 </div>
             </div>
         </div>
        ))

        }
        <div className='flex text-sm font-semibold max-w-full bg-gray-400'>
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
             <div key={student?._id} className='flex text-sm font-semibold max-w-full'>
             <div className='w-[25%] flex items-center'>
                <h1 className='w-[10%] flex justify-center items-center border border-collapse border-black'>{index + 1}</h1>
                 <h1 className='uppercase w-full h-full text-xs  flex justify-start items-center border border-collapse border-black'>{student?.lastName}, {student?.firstName} {student?.middleName}</h1>
             </div>
 
             <div className='w-[75%] '>
                 <div className="flex w-full h-full">
                     <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                     </h1>
                     <h1 className="w-[34%] flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                     </h1>
                     <h1 className="w-[18%] font-semibold text-xs py-2 flex justify-center items-center text-center uppercase border border-collapse border-black">
                        {getAverageForShs((getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),(getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0))}
                     </h1>
                     <h1 className="w-[14%] flex justify-center items-center uppercase border border-collapse text-center border-black">
                         {remarks(
                            getAverageForShs((getQuarterlyGrades(student?.quarterlyGrades, "1st")?? 0),(getQuarterlyGrades(student?.quarterlyGrades, "2nd") ?? 0)),
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