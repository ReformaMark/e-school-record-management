import React from 'react'
import { StudentWithDetails } from '@/lib/types'
import { getAverageForShs, getStudentGeneralAverage, getStudentGrade } from '@/lib/utils'
import FinalizeGradesDialog from './FinalizeGradesDialog'

function SrGradesTemplate({
    student,
   
    sem
}:{
    student: StudentWithDetails
   
    sem: string
}) {
    
    // const subject = shsSubjectsByStrand.find((subject)=> subject.strand === strand)
    const coreSubjects = student.subjects.filter(s => s.subject.subjectCategory === "core" && s.semester === sem)
    const appliedAndSpecialied = student.subjects.filter(s => s.subject.subjectCategory === "specialied" || s.subject.subjectCategory === "applied" && s.semester === sem)
    
    const allSubjects = [...coreSubjects, ...appliedAndSpecialied]

    const averages = allSubjects.map((s)=>{
        const subjectName = s.subject.name
        const finalGrade = getAverageForShs(
            getStudentGrade(student.quarterlyGrades, s._id, "1st"),
            getStudentGrade(student.quarterlyGrades, s._id, "2nd")
            )
        return {
            classId: s._id,
            subjectName: subjectName,
            finalGrade: finalGrade
        }
    })

    const genAve = getStudentGeneralAverage(coreSubjects ,appliedAndSpecialied, student, sem)

  return (
    <div className="max-w-full">
        <div className="flex justify-end">
            <FinalizeGradesDialog student={student} averages={averages} generalAverage={genAve}/>
        </div>
        <h1 className='text-center'>LEARNER&apos;S PROGRESS REPORT CARD</h1>
        <div className="max-w-full flex text-lg bg-gray-300 border border-black">
            <div className="w-[60%] font-bold flex items-center justify-center">
                <h1>Subject</h1>
            </div>
            <div className="w-[25%] font-bold border-x border-x-black">
                <h1 className='text-center border-b border-b-black'>Quarter</h1>
                <div className="grid grid-cols-2 text-center">
                    <h1>{sem === "1st" ? "1" : "3"}</h1>
                    <h1 className='border-l border-l-black'>{sem === "1st" ? "2" : "4"}</h1>
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
        {coreSubjects && coreSubjects.map((clss)=>(
            <div key={clss._id} className="max-w-full flex text-lg  border-black">
                <div className="w-[60%] font-bold flex items-center justify-start py-1 px-2 border border-black">
                    <h1>{clss.subject.name}</h1>
                </div>
                <div className="w-[25%] grid grid-cols-2 items-center font-bold border-y border-y-black">
                <h1 className='text-center my-auto border-r h-full border-black content-center'>{getStudentGrade(student.quarterlyGrades, clss._id, "1st")}</h1>
                <h1 className='text-center my-auto h-full content-center'>{getStudentGrade(student.quarterlyGrades, clss._id, "2nd")}</h1>
                
                </div>
                <div className="w-[15%] font-bold text-center border border-black">
                    <h1 className='text-center my-auto h-full content-center'>{getAverageForShs(
                    getStudentGrade(student.quarterlyGrades, clss._id, "1st"),
                    getStudentGrade(student.quarterlyGrades, clss._id, "2nd")
                    )}</h1>
                </div>
            </div>
        ))}
       
         <div className="max-w-full flex text-lg font-bold bg-gray-300 border border-black">
            <div className="w-[60%] flex items-center justify-start px-2 py-1">
                <h1>Applied & Specialized Subjects</h1>
            </div>
        </div>
        {appliedAndSpecialied && appliedAndSpecialied.map((s)=>(
            <div key={s._id} className="max-w-full flex text-lg  border-black">
                <div className="w-[60%] font-bold flex items-center justify-start py-1 px-2 border border-black">
                    <h1>{s.subject.name}</h1>
                </div>
                <div className="w-[25%] grid grid-cols-2 items-center font-bold border-y border-y-black">
                <h1 className='text-center my-auto border-r h-full border-black content-center'>{getStudentGrade(student.quarterlyGrades, s._id, "1st")}</h1>
                <h1 className='text-center my-auto h-full content-center'>{getStudentGrade(student.quarterlyGrades, s._id, "2nd")}</h1>
                
                </div>
                <div className="w-[15%] font-bold text-center border border-black">
                    <h1 className='text-center my-auto h-full content-center'>{getAverageForShs(
                        getStudentGrade(student.quarterlyGrades, s._id, "1st"),
                        getStudentGrade(student.quarterlyGrades, s._id, "2nd")
                    )}
                    </h1>
                </div>
            </div>
        ))}

        <div className="max-w-full flex text-lg font-bold  border border-black py-1">
            <div className="w-[85%] text-right tracking-widest text-xl border-r border-r-black px-2">General Average for this Semester</div>
            <div className="w-[15%] content-center text-center">{genAve}</div>
        </div>
    </div>
  )
}

export default SrGradesTemplate