import React from 'react'
import { FaUsers } from 'react-icons/fa6'

function StatsOverview() {
  return (
    <div className='grid grid-cols-3 gap-x-10'>
        <div className="flex justify-around items-center bg-white rounded-lg px-5 py-3">
            <FaUsers />
           <div className="border-l border-l-primary-foreground px-5">
                <h1 className='text-sm font-normal text-pretty text-center'>Total Students</h1>
                <h1 className='text-lg font-semibold text-center'>50</h1>
           </div>
        </div>

        <div className="flex justify-around items-center bg-white rounded-lg px-5 py-3">
            <FaUsers />
           <div className="border-l border-l-primary-foreground px-5">
                <h1 className='text-sm font-normal text-pretty text-center'>At-Risk Students</h1>
                <h1 className='text-lg font-semibold text-center'>10</h1>
           </div>
        </div>
        <div className="flex justify-around items-center bg-white rounded-lg px-5 py-3">
            <FaUsers />
           <div className="border-l border-l-primary-foreground px-5">
                <h1 className='text-sm font-normal text-pretty text-center'>Pending Interventions</h1>
                <h1 className='text-lg font-semibold text-center'>50</h1>
           </div>
        </div>
    
    </div>
  )
}

export default StatsOverview