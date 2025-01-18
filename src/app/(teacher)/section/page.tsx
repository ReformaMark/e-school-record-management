
'use client'
import React from 'react'

import { useClasses } from './section-data'

import SectionsCard from './_components/SectionsCard'
import Loading from '@/app/components/Loading'


function SectionPage() {
  const {isLoading, classes} = useClasses()


  return (
    <div className=' m-5 text-primary'>
        <h1 className="font-semibold font-serif text-lg text-center">Classes</h1>
        {isLoading ? (<Loading/>) : classes && (
          <div className=' m-5 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10'>
            {classes.map((cl) =>(
              <SectionsCard 
                key={cl._id}
             
                cls={cl}/>
            ))}
          </div>
        )}
       
           
       
        
    </div>
  )
}

export default SectionPage