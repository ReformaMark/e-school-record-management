
'use client'
import React from 'react'

import {  sections } from './section-data'

import SectionsCard from './_components/SectionsCard'


function SectionPage() {
  return (
    <div className='p-5 bg-white shadow-md m-5'>
        
        <div className=' m-5 grid grid-cols-3 gap-10'>
            {sections.map((section) =>(
                <SectionsCard key={section.section} section={section}/>
            ))}
        </div>
        
    </div>
  )
}

export default SectionPage