import { FinalGradesWithDetails, ForRemedial } from '@/lib/types'
import React, { useState } from 'react'

function RemedialTemplate({forRemedial, filteredFinalGrade}:{
    forRemedial: ForRemedial[] | undefined,
    filteredFinalGrade: FinalGradesWithDetails | undefined
}) {
  return (
    <div>
        <div className="grid grid-cols-12 border-y-black border-y mt-2 text-[0.5rem] bg-gray-300 font-semibold leading-3">
            <div className="col-span-2 text-center border-l-black border-l  flex items-center justify-center py-1"><p>Indicate if Subject is CORE, APPLIED, or Specialized</p></div>
            <div className="col-span-6 flex items-center justify-center border-x-black border-x">
                <h1 className='uppercase text-center my-auto'>Subject</h1>
            </div>
            <div className="col-span-1 flex items-center justify-center text-center px-1">
                <p className=''>SEM FINAL GRADE</p>
            </div>
            <div className="col-span-1 flex items-center justify-center text-center border-l-black border-l border-r border-r-black">
                <p>REMEDIAL CLASS <br /> MARK</p>
            </div>
            <div className="col-span-1 text-center text-[0.5rem]  flex items-center justify-center">
                <p>RECOMPUTED <br /> FINAL GRADE</p>
            </div>
            <div className="col-span-1 text-center border-l-black border-l border-r border-r-black flex items-center justify-center">
                <p>ACTION <br /> TAKEN</p>
            </div>
        </div>
        {filteredFinalGrade && forRemedial ? Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="grid grid-cols-12 border-b-black border-b text-[0.6rem] font-semibold h-[0.95rem]">
                <div className="col-span-2 text-center border-l-black border-l  flex items-center justify-center"><p>{forRemedial[index]?.subject.subjectCategory || ''}</p></div>
                <div className="col-span-6 flex items-center justify-center border-x-black border-x">
                    <h1 className='uppercase text-center my-auto'>{forRemedial[index]?.subjectName || ''}</h1>
                </div>
                <div className="col-span-1 flex items-center justify-center text-center px-1">
                    <p className=''>{forRemedial[index]?.finalGrade || ''}</p>
                </div>
                <div className="col-span-1 flex items-center justify-center text-center border-l-black border-l border-r border-r-black">
                    <p>{forRemedial[index]?.remedialGrade || ''}</p>
                </div>
                <div className="col-span-1 text-center  flex items-center justify-center">
                    <p>{forRemedial[index] ? Math.round((forRemedial[index].finalGrade + (forRemedial[index].remedialGrade ?? 0)) / 2) : ''}</p>
                </div>
                <div className="col-span-1 text-center border-l-black border-l border-r border-r-black flex items-center justify-center">
                    <p>{forRemedial[index] ? Math.round((forRemedial[index].finalGrade + (forRemedial[index].remedialGrade ?? 0)) / 2) <= 74 ? "Failed" : "Passed" : ''}</p>
                </div>
            </div>
            )) :  Array.from({ length: 4 }).map((_, index) => (
            <InputGrades key={index}/>
        ))}
        <div className="grid grid-cols-12 gap-x-10 mt-1 text-[0.6rem]">
            <h1 className='col-span-8 flex items-baseline gap-x-2'>Name of Teacher/Adviser: <input type="text" className='border-b-black border-b flex-1 px-3  h-5' /></h1>
            <h1 className='col-span-4 flex  gap-x-2'>Signature: <span className='border-b-black border-b flex-1 h-5'></span></h1>
        </div>
    </div>
  )
}

export default RemedialTemplate


function InputGrades () {
    const [input1Value, setInput1Value] = useState('')
    const [input2Value, setInput2Value] = useState('')

    const average = (input1Value && input2Value) ? (parseFloat(input1Value) + parseFloat(input2Value)) / 2 : '';
    return (
        <div  className="grid grid-cols-12 border-b-black border-b text-[0.6rem] font-semibold h-[0.95rem] ">
                <div className="col-span-2 text-center border-l-black border-l flex items-center justify-center"><input type="text" className='bg-transparent w-full uppercase h-[0.95rem] text-center' /></div>
                <div className="col-span-6 flex items-center justify-center border-x-black border-x">
                    <input type="text" className='uppercase text-left px-2 bg-transparent w-full h-full' />
                </div>
                <div className="col-span-1 flex items-center justify-center text-center px-1">
                    {/* input 1 */}
                    <input type="number" onChange={e => setInput1Value(e.target.value)} className='bg-transparent text-center size-full' />
                </div>
                <div className="col-span-1 flex items-center justify-center text-center border-l-black border-l border-r border-r-black">
                      {/* input 1 */}
                    <input type="number" onChange={e => setInput2Value(e.target.value)} className='bg-transparent text-center size-full' />
                </div>
                <div className="col-span-1 text-center flex items-center justify-center">
                    {/* recomputed final Grade */}
                    {average}
                </div>
                <div className="col-span-1 text-center border-l-black border-l border-r border-r-black flex items-center justify-center">
                    {/* Passed or failed */}
                    {typeof average === 'number' ? average <= 74 ? "Failed": "Passed" : ""}
                </div>
        </div>
    )
}