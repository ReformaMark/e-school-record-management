
'use client'
import React from 'react'

import {  sections } from './section-data'

import SectionsCard from './_components/SectionsCard'


function SectionPage() {
  return (
    <div className=' shadow-md m-5 text-primary'>
        <h1 className="font-semibold font-serif text-lg text-center">Classes</h1>
        <div className=' m-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10'>
            {sections.map((section) =>(
                <SectionsCard key={section.section} section={section}/>
            ))}
        </div>
        
    </div>
  )
}

export default SectionPage