import React from 'react'
import { studentsData } from '../../../data/students-data'
import { Section } from '../(teacher)/section/section-data';

function FinalGradeSHSTemplate({
    section
}:{
    section: Section
}) {
    
    const males = studentsData
        .filter((student) => student.gender === 'male')
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

    const females = studentsData
        .filter((student) => student.gender === 'female')
        .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="">
        <div className='flex text-sm font-semibold max-w-full'>
            <div className='w-[25%]'>
                <h1 className='uppercase w-full h-full  flex justify-center items-center border border-collapse border-black'>Learners&apos; Names</h1>
            </div>

            <div className='w-[75%]'>
                <div className="border border-collapse border-black flex items-center">
                    <h1 className='uppercase w-[60%] h-full px-2 text-sm font-semibold '>Grade & Section: {section.gradeLevel} - {section.section}</h1>
                    <div className="w-[40%]">
                        <h1 className='uppercase border border-collapse py-1 px-2 border-black h-full text-sm font-semibold'>Semester: 1st</h1>
                        <h1 className='uppercase border border-collapse border-b-0 py-1 pl-2 border-black h-full text-sm font-semibold'>Subject: {section.subject}</h1>
                    </div>
                </div>
                <div className="flex">
                    <h1 className='w-[60%] uppercase border border-collapse pl-2  py-1 border-black'>Teacher: Currently Login Teacher</h1>
                    <h1 className='w-[40%] uppercase border border-collapse pl-2 py-1 border-black'>Track: STEM</h1>
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
             <div key={student.id} className='flex text-sm font-semibold max-w-full'>
             <div className='w-[25%] flex items-center'>
                <h1 className='w-[10%] flex justify-center items-center border border-collapse border-black'>{index + 1}</h1>
                 <h1 className='uppercase w-full h-full text-xs  flex justify-start items-center border border-collapse border-black'>{student.lastName}, {student.firstName} {student.middleName}</h1>
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
             <div key={student.id} className='flex text-sm font-semibold max-w-full'>
             <div className='w-[25%] flex items-center'>
                <h1 className='w-[10%] flex justify-center items-center border border-collapse border-black'>{index + 1}</h1>
                 <h1 className='uppercase w-full h-full text-xs  flex justify-start items-center border border-collapse border-black'>{student.lastName}, {student.firstName} {student.middleName}</h1>
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
        ))

        }
    </div>
  )
}

export default FinalGradeSHSTemplate