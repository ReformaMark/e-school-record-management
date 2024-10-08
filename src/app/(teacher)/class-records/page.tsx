'use client'
import React from 'react'
import SectionsCard from './_components/SectionsCard'
import { sections } from '../section/section-data'

function ClassRecordPage() {

  return (
    <div className=' m-5 grid grid-cols-4 gap-10'>
        {sections.map((section) =>(
            <SectionsCard key={section.section} section={section}/>
        ))}
    </div>
  )
}

export default ClassRecordPage