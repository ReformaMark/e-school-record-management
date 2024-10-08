'use client'
import React from 'react'
import { studentsData } from '../../../data/students-data'
import EditableHeader from './EditableHeader'

function QuarterlyGradesTemplate({
    gradeAndSection,
    subject,
    teacher,
    schoolYear,
}:{
    gradeAndSection?: string,
    subject?: string,
    teacher?: string,
    schoolYear?: string,
}) {
    //fetch students that are assigned to the teache that are currently logs in
    //inlcude there grades
    const males = studentsData
                .filter((student) => student.gender === 'male')
                .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const females = studentsData
                .filter((student) => student.gender === 'female')
                .sort((a, b) => a.lastName.localeCompare(b.lastName));
  return (
    <div>
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
                        <h1 className='w-[60%] p-2 uppercase text-xs  border-collapse border border-black'>TEACHER: {teacher}</h1>
                        <h1 className='w-[40%] p-2 uppercase text-xs  border-collapse border border-black'>SUBJECT: {subject}</h1>
                    </div>
                    <div className="w-full flex col-span-2">
                        <div className='text-xs  text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>MATH</h1> 
                           <h1>1st Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>MATH</h1> 
                           <h1>2nd Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>MATH</h1> 
                           <h1>3rd Quarter</h1> 
                        </div>
                        <div className='text-xs text-center w-2/12  border-collapse border border-black'>
                            <h1 className=''>MATH</h1> 
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
            {males.map((male, index)=>(
                <div key={male.id} className="flex border-collapse font-semibold hover:bg-gray-200">
                   <div className="w-[3%] border-collapse text-center text-sm h-auto border border-black">{index + 1}</div>
                
                   <h1 className="w-[32%] border-collapse h-auto flex justify-start px-3 text-sm items-center border border-black">
                    {male.lastName}, {male.firstName} {male.middleName}</h1>
                   
                   <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                      
                       <div className="w-full flex col-span-2">
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           
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
             {females.map((female, index)=>(
                <div key={female.id} className="flex border-collapse font-semibold ">
                   <div className="w-[3%] text-center text-sm border-collapse h-auto border border-black">{index + 1}</div>
                
                   <h1 className="w-[32%] border-collapse h-auto flex justify-start px-3 text-sm items-center border border-black">
                    {female.lastName}, {female.firstName} {female.middleName}</h1>
                   
                   <div className="w-[65%] font-semibold border-collapse h-auto grid grid-cols-2 border border-black">
                      
                       <div className="w-full flex col-span-2">
                        {/* put the grades value of each student on each editable header using 
                            inputValue={theActualValue}
                        */}
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           <EditableHeader/>
                           
                       </div>
                   </div>
                  
               </div>
             ))}
          
        </div>

    </div>
  )
}

export default QuarterlyGradesTemplate