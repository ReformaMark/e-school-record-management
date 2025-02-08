import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { ClassesWithDetails } from '@/lib/types'

function SectionsCard({
    cls
}:{
    cls: ClassesWithDetails | undefined,
}) {
   const totalStudents = cls?.section?.students.length
  return (
    <div className='bg-white rounded-md shadow-md flex flex-col justify-between'>
        <div className={`flex justify-between text-white shadow-md px-5 py-1 bg-primary-foreground text-lg font-semibold`}>
            <h1>{cls?.section?.name}</h1>
            <h1>Grade {cls?.section?.gradeLevel?.level}</h1>
        </div>
        <div className="p-5 text-sm">
            <h3>Subject: <span className="font-medium text-sm">{cls?.subject?.name || "N/A"}</span></h3>

            {/* Display multiple schedules properly */}
            {cls && cls?.schedules?.length > 0 ? (
                cls.schedules.map((schedule, index) => (
                <div key={index} className="mt-2">
                    <h3>Time: {schedule.schoolPeriod?.timeRange}</h3>
                    <h3>Days: {schedule.day}</h3>
                    <h3>Room: {schedule.room?.name || "No assigned room"}</h3>
                </div>
                ))
            ) : (
                <h3 className="text-gray-500">No schedule assigned</h3>
            )}

            <h3>Students: {totalStudents}</h3>
        </div>
        <div className='flex justify-end'>
            <Button variant={'ghost'}>
                <Link href={`/section/${cls?._id}`} className='flex items-center gap-3 text-gray-400'>
                    View section <FaAngleDoubleRight className='size-6'/>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default SectionsCard