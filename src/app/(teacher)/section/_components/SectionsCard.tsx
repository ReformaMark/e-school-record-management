import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { ClassesWithDetails } from '@/lib/types'

function SectionsCard({
    cls
}:{
    cls: ClassesWithDetails,
}) {
   const totalStudents = cls?.section?.students.length
  return (
    <div className='bg-white rounded-md shadow-md flex flex-col justify-between'>
        <div className={`flex justify-between text-white shadow-md px-5 py-1 bg-primary-foreground text-lg font-semibold`}>
            <h1>{cls.section?.name}</h1>
            <h1>Grade {cls.section?.gradeLevel.toString()}</h1>
        </div>
        <div className="p-5 text-sm ">
            <h3>Subject: <span className='font-medium text-sm'>{cls.subject?.name}</span></h3>
            <h3>Time: {cls.schedule.startTime} - {cls.schedule.endTime}</h3>
            <h3>Days: {cls.schedule.day}</h3>
            <h3>Room: {cls.schedule.room?.name}</h3>
            <h3>Students: {totalStudents}</h3>
        </div>
        <div className='flex justify-end'>
            <Button variant={'ghost'}>
                <Link href={`/section/${cls.section?.name}`} className='flex items-center gap-3 text-gray-400'>
                    View section <FaAngleDoubleRight className='size-6'/>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default SectionsCard