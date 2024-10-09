import React from 'react'
import { Section } from '../../section/section-data'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FaAngleDoubleRight } from 'react-icons/fa'

function SectionsCard({
    section
}:{
    section: Section,
}) {
   
  return (
    <div className='bg-white rounded-md shadow-md flex flex-col justify-between'>
        <div className={`flex justify-between text-white shadow-md px-5 py-1 bg-[#09A599] text-lg font-semibold`}>
            <h1>{section.section}</h1>
            <h1>{section.gradeLevel}</h1>
        </div>
        <div className="p-5 text-sm ">
            <h3>Subject: <span className='font-medium text-sm'>{section.subject}</span></h3>
            <h3>Time: {section.schedule}</h3>
            <h3>Days: {section.days.join(',')}</h3>
            <h3>Room: {section.roomNumber}</h3>
            <h3>Students: {section.totalStudents}</h3>
        </div>
        <div className='flex justify-end'>
            <Button variant={'ghost'}>
                <Link href={`/class-records/${section.section}`} className='flex items-center gap-3 text-gray-400'>
                View Class Record <FaAngleDoubleRight className='size-6'/>
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default SectionsCard