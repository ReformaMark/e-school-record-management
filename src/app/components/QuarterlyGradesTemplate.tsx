'use client'
import React from 'react'
import { Doc } from '../../../convex/_generated/dataModel'
import { ClassesWithDetails } from '@/lib/types'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { getAverageForJrh, getQuarterlyGrades, remarks } from '@/lib/utils'

function QuarterlyGradesTemplate({
    section,
   
    cls
   }:{
    section: Doc<'sections'>

    cls: ClassesWithDetails
   }) {
    const studentQuarterlyGrades = useQuery(api.quarterlyGrades.get,{
        gradeLevel: section?.gradeLevel,
        classId: cls._id
    })
    const schoolYear =  cls.schoolYear?.sy
    const subjectName = cls.subject?.name
    const males = studentQuarterlyGrades
        ?.filter(student => student?.sex?.toLowerCase() === 'male')
        .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
  
    const females = studentQuarterlyGrades
        ?.filter(student => student?.sex?.toLowerCase() === 'female')
        .sort((a, b) => (a?.lastName && b?.lastName ? a.lastName.localeCompare(b.lastName) : 0));
        const teacherName = `${cls.teacher?.firstName} ${cls.teacher?.middleName} ${cls.teacher?.lastName}`

        const gradeAndSection = `${section?.gradeLevel} - ${section?.name}`

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
                            {getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {getQuarterlyGrades(student?.quarterlyGrades, "3rd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {getQuarterlyGrades(student?.quarterlyGrades, "4th")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        { getAverageForJrh(
                                    getQuarterlyGrades(student?.quarterlyGrades, "1st"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "2nd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "3rd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "4th")
                                
                        )}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {remarks(
                                getAverageForJrh(
                                    getQuarterlyGrades(student?.quarterlyGrades, "1st"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "2nd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "3rd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "4th")
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
                            {getQuarterlyGrades(student?.quarterlyGrades, "1st")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {getQuarterlyGrades(student?.quarterlyGrades, "2nd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {getQuarterlyGrades(student?.quarterlyGrades, "3rd")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {getQuarterlyGrades(student?.quarterlyGrades, "4th")}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                        { getAverageForJrh(
                                    getQuarterlyGrades(student?.quarterlyGrades, "1st"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "2nd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "3rd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "4th")
                                
                        )}
                        </h1>
                        <h1 className='text-xs text-center w-2/12 border-collapse border border-black'>
                            {remarks(
                                getAverageForJrh(
                                    getQuarterlyGrades(student?.quarterlyGrades, "1st"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "2nd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "3rd"),
                                    getQuarterlyGrades(student?.quarterlyGrades, "4th")
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