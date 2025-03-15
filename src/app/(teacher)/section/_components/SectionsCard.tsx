import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { ClassesWithDetails } from '@/lib/types'
import { Building, Calendar, Clock } from 'lucide-react'

function SectionsCard({
    cls
}:{
    cls: ClassesWithDetails | undefined,
}) {
    const isShs = Number(cls?.section?.gradeLevel?.level.replace("Grade", "") ?? 0) > 10
    const totalStudents = isShs ? cls?.semester === "1st" ? cls?.section?.firstSemStudents.length : cls?.section?.secondSemStudents.length : cls?.section?.students.length
  return (
    <div className='bg-white rounded-md shadow-md flex flex-col justify-between'>
        <div className={`flex justify-between bg-nav text-white shadow-md px-5 py-1 text-lg font-semibold`}>
            <h1>{cls?.section?.name}</h1>
            <h1 className='capitalize'>{cls?.section?.gradeLevel?.level} {cls?.semester ?  ` - ${cls.semester} Semester` : ""}</h1>
        </div>
        <div className="p-5 text-sm space-y-3 font-semibold">
            <h3>Subject: <span className="font-medium text-sm">{cls?.subject?.name || "N/A"}</span></h3>
           
            {/* Display multiple schedules properly */}
            <div className="">
            <div className="grid grid-cols-2">
            {cls && cls?.schedules?.length > 0 ? (
                cls.schedules.map((schedule, index) => (
                <div key={index} className="space-y-1 gap-x-1">
                  <h3 className='flex items-center'><Calendar className='size-5'/> : <span className="font-medium text-sm">{schedule.day.join(',')}</span></h3>
                  <h3 className='flex items-center'><Clock className='size-5'/>: <span className="font-medium text-sm">{schedule.schoolPeriod?.timeRange}</span></h3>
                  <h3 className='flex items-center'><Building className='size-5'/> : <span className="font-medium text-sm">{schedule.room?.name  || "No assigned room"}</span></h3>
                </div>
                ))
            ) : (
                <h3 className="text-gray-500">No schedule assigned</h3>
            )}
            </div>
            </div>

            <h3>Students: <span className="font-medium text-sm">{totalStudents}</span></h3>
        </div>
        <div className='flex justify-end'>
            <Button variant={'ghost'}>
                <Link href={`/section/${cls?._id}?sy=${cls?.schoolYearId}`} className='flex items-center gap-3 text-gray-400'>
                    View section <FaAngleDoubleRight className='size-6'/>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default SectionsCard