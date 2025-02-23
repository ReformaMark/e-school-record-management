import React from 'react'

function RemedialTemplate() {
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
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="grid grid-cols-12 border-b-black border-b text-[0.6rem] font-semibold h-[0.95rem]">
                <div className="col-span-2 text-center border-l-black border-l  flex items-center justify-center"><p></p></div>
                <div className="col-span-6 flex items-center justify-center border-x-black border-x">
                    <h1 className='uppercase text-center my-auto'></h1>
                </div>
                <div className="col-span-1 flex items-center justify-center text-center px-1">
                    <p className=''></p>
                </div>
                <div className="col-span-1 flex items-center justify-center text-center border-l-black border-l border-r border-r-black">
                    <p></p>
                </div>
                <div className="col-span-1 text-center  flex items-center justify-center">
                    <p></p>
                </div>
                <div className="col-span-1 text-center border-l-black border-l border-r border-r-black flex items-center justify-center">
                    <p></p>
                </div>
            </div>
        ))}
        <div className="grid grid-cols-12 gap-x-10 mt-1 text-[0.6rem]">
            <h1 className='col-span-8 flex items-baseline gap-x-2'>Name of Teacher/Adviser: <span className='border-b-black border-b flex-1'></span></h1>
            <h1 className='col-span-4 flex items-baseline gap-x-2'>Signature: <span className='border-b-black border-b flex-1'></span></h1>
        </div>
    </div>
  )
}

export default RemedialTemplate