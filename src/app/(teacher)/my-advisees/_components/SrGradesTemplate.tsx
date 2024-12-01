import React from 'react'
import { shsSubjectsByStrand } from '../../../../../data/senior-high-subjects'

function SrGradesTemplate({

    strand,
    sem
}:{
    
    strand: string,
    sem: string
}) {
    
    const subject = shsSubjectsByStrand.find((subject)=> subject.strand === strand)

  return (
    <div className="max-w-full">
        <h1 className='text-center'>LEARNER&apos;S PROGRESS REPORT CARD</h1>
        <div className="max-w-full flex text-lg bg-gray-300 border border-black">
            <div className="w-[60%] font-bold flex items-center justify-center">
                <h1>Subject</h1>
            </div>
            <div className="w-[25%] font-bold border-x border-x-black">
                <h1 className='text-center border-b border-b-black'>Quarter</h1>
                <div className="grid grid-cols-2 text-center">
                    <h1>1</h1>
                    <h1 className='border-l border-l-black'>2</h1>
                </div>
            </div>
            <div className="w-[15%] font-bold text-center">
                <h1>Semester</h1>
                <h1>Final Grade</h1>
            </div>
        </div>
        <div className="max-w-full flex text-lg font-bold bg-gray-300 border border-black">
            <div className="w-[60%] flex items-center justify-start px-2 py-1">
                <h1>Core Subjects</h1>
            </div>
        </div>
        {subject && sem === "1st" && subject?.coreSubjects.grade11.firstSemester.map((coreSubject)=>(
             <div key={coreSubject} className="max-w-full flex text-lg  border-black">
             <div className="w-[60%] font-bold flex items-center justify-start py-1 px-2 border border-black">
                 <h1>{coreSubject}</h1>
             </div>
             <div className="w-[25%] flex font-bold border-y border-y-black">
                <div className='w-1/2'></div>
                <div className='w-1/2 border-l border-l-black'></div>
              
             </div>
             <div className="w-[15%] font-bold text-center border border-black">
                 <h1></h1>
             </div>
         </div>
        ))}
        {subject && sem === "2nd" && subject?.coreSubjects.grade11.secondSemester.map((coreSubject)=>(
             <div key={coreSubject} className="max-w-full flex text-lg  border-black">
             <div className="w-[60%] font-bold flex items-center justify-start py-1 px-2 border border-black">
                 <h1>{coreSubject}</h1>
             </div>
             <div className="w-[25%] flex font-bold border-y border-y-black">
                <div className='w-1/2'></div>
                <div className='w-1/2 border-l border-l-black'></div>
              
             </div>
             <div className="w-[15%] font-bold text-center border border-black">
                 <h1></h1>
             </div>
         </div>
        ))}
         <div className="max-w-full flex text-lg font-bold bg-gray-300 border border-black">
            <div className="w-[60%] flex items-center justify-start px-2 py-1">
                <h1>Applied Subjects</h1>
            </div>
        </div>
        {subject && sem === "1st" && subject?.appliedSubjects.grade11.firstSemester.map((appliedSubjects)=>(
             <div key={appliedSubjects} className="max-w-full flex text-lg  border-black">
             <div className="w-[60%] font-bold flex items-center justify-start py-1 px-2 border border-black">
                 <h1>{appliedSubjects}</h1>
             </div>
             <div className="w-[25%] flex font-bold border-y border-y-black">
                <div className='w-1/2'></div>
                <div className='w-1/2 border-l border-l-black'></div>
              
             </div>
             <div className="w-[15%] font-bold text-center border border-black">
                 <h1></h1>
             </div>
         </div>
        ))}
        {subject && sem === "2nd" && subject?.appliedSubjects.grade11.secondSemester.map((appliedSubjects)=>(
            <div key={appliedSubjects} className="max-w-full flex text-lg  border-black">
            <div className="w-[60%] font-bold flex items-center justify-start py-1 px-2 border border-black">
                <h1>{appliedSubjects}</h1>
            </div>
            <div className="w-[25%] flex font-bold border-y border-y-black">
            <div className='w-1/2'></div>
            <div className='w-1/2 border-l border-l-black'></div>
            
            </div>
            <div className="w-[15%] font-bold text-center border border-black">
                <h1></h1>
            </div>
        </div>
        ))}
        <div className="max-w-full flex text-lg font-bold  border border-black py-1">
            <div className="w-[85%] text-right tracking-widest text-xl border-r border-r-black px-2">General Average for this Semester</div>
        </div>
    </div>
  )
}

export default SrGradesTemplate