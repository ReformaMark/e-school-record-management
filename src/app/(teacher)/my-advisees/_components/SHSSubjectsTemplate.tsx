import React from 'react'
import RemedialTemplate from './RemedialTemplate'

function SHSSubjectsTemplate() {
  return (
    <div>
        <div className="">
          
            <div className="grid grid-cols-12 gap-x-2 text-[0.6rem] font-semibold">
                <h1 className='flex col-span-5 uppercase'>School: <span className='border-b border-b-black flex-1 '></span></h1>
                <h1 className='flex col-span-2 uppercase'>School Id: <span className='border-b border-b-black flex-1 '></span></h1>
                <h1 className='flex col-span-2 uppercase'>Grade Level: <span className='border-b border-b-black flex-1 '></span></h1>
                <h1 className='flex col-span-2 uppercase'>SY: <span className='border-b border-b-black flex-1 '></span></h1>
                <h1 className='flex col-span-1 uppercase'>SEM: <span className='border-b border-b-black flex-1 '></span></h1>
            </div>
            <div className="grid grid-cols-12 gap-x-2 text-[0.6rem] pt-1 font-semibold mt-[-4px]">
                <h1 className='flex col-span-7 uppercase'>TRACK/STRAND: <span className='border-b border-b-black flex-1 '></span></h1>
                <h1 className='flex col-span-5 uppercase'>SECTION: <span className='border-b border-b-black flex-1 '></span></h1>
            </div>
        </div>
        <div className="grid grid-cols-12 border-y-black border-y  text-[0.5rem] leading-3 bg-gray-300 font-semibold mt-1">
            <div className="col-span-2 text-center border-l-black border-l  flex items-center justify-center py-1"><p>Indicate if Subject is CORE, APPLIED, or Specialized</p></div>
            <div className="col-span-6 flex items-center justify-center border-x-black border-x"><h1 className='uppercase text-center my-auto'>Subject</h1></div>
            <div className="col-span-2 text-center">
                <h1 className='text-center border-b-black border-b h-1/2'>Quarter</h1>
                <div className="grid grid-cols-2">
                    <div className='col-span-1 h-full'></div>
                    <div className='col-span-1 border-l-black border-l h-full flex-1'></div>
                </div>
            </div>
            <div className="col-span-1 text-center  border-l-black border-l  flex items-center justify-center">
                <p className=''>SEM FINAL GRADE</p>
            </div>
            <div className="col-span-1 text-center border-l-black border-l border-r border-r-black  flex items-center justify-center">
                <p>ACTION <br /> TAKEN</p>
            </div>
        </div>
        
        {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="grid grid-cols-12 border-b-black border-b  text-[0.6rem] h-[0.95rem]">
                <div className="col-span-2 text-center border-l-black border-l h-full"><p></p></div>
                <div className="col-span-6 flex items-center justify-center border-x-black border-x h-full"><h1 className='uppercase text-center my-auto'></h1></div>
                <div className="col-span-2 tex-center h-full">
                    <div className="grid grid-cols-2 h-full">
                        <div className='col-span-1 h-full'></div>
                        <div className='col-span-1 border-l-black border-l h-full flex-1'></div>
                    </div>
                </div>
                <div className="col-span-1 text-center border-l-black border-l h-full">
                    <p className=''></p>
                </div>
                <div className="col-span-1 text-center border-l-black border-l border-r border-r-black h-full">
                    <p></p>
                </div>
            </div>
        ))}
        <div className="grid grid-cols-12 border-b-black border-b  text-[0.6rem]">
            <div className="col-span-10 text-right pt-1 px-1 border-l border-l-black border-b-black border-b font-semibold bg-gray-300">
                <span>Gen Ave. for the Semester:</span>
            </div>
            <div className="border-l-black border-l border-b-black border-b">

            </div>
            <div className="border-x-black border-x border-b-black border-b">

            </div>
        </div>
        <div className="">
            <h1 className='flex items-baseline text-[0.6rem] mt-1'>REMARKS: <span className='border-b border-b-black flex-1'></span></h1>
            <div className="grid grid-cols-12 text-[0.55rem] gap-x-10">
                <h3 className='col-span-4 mt-[-5px]'>Prepared by</h3>
                <h3 className='col-span-5 mt-[-5px]'>Certified True and Correct:</h3>
                <h3 className='col-span-3 mt-[-5px]'>Date Checked (MM/DD/YYYY):</h3>
                <div className="border-b-black border-b col-span-4 mt-4"></div>
                <div className="border-b-black border-b col-span-5"></div>
                <div className="border-b-black border-b col-span-3"></div>
                <h3 className='text-center col-span-4'>Signature of Adviser over Printed Name</h3>
                <h3 className='text-center col-span-5'>Signature of Authorized Person over Printed Name, Designation</h3>
                <h3 className='text-center col-span-3'></h3>
            </div>
        </div>
        <div className="">
            <RemedialTemplate/>
        </div>
    </div>
  )
}

export default SHSSubjectsTemplate