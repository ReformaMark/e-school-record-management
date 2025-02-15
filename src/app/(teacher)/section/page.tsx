
'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionsCard from './_components/SectionsCard'
import Loading from '@/app/components/Loading'
import { ClassesWithDetails } from '@/lib/types'
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { Label } from '@/components/ui/label';


function SectionPage() {

  const sy = useQuery(api.schoolYear.get)
  const latestSY = sy ? sy[0]._id : undefined
  const [selectedSY , setSelectedSY] = useState<Id<'schoolYears'> | undefined>(latestSY)

  const classes = useQuery(api.classes.getTeacherClassesWithSchoolYear, {
    schoolYearId: selectedSY
  })

  return (
    <div className=' m-5 text-primary'>
        <h1 className="font-semibold font-serif text-lg text-center">Classes</h1>
        <div className='flex items-center justify-end gap-x-1'>
          <Label >School Year : </Label>
          <Select defaultValue={selectedSY} onValueChange={(value)=>{setSelectedSY(value as Id<'schoolYears'>)}}>
              <SelectTrigger className='w-40 bg-white'>
                  <SelectValue placeholder="Select school year" />
              </SelectTrigger>
              <SelectContent>
                {sy && sy.map((sy) =>(
                  <SelectItem key={sy._id} value={sy._id}>{sy.sy}</SelectItem>
                ))}
              </SelectContent>
          </Select>
        </div>
        {classes === undefined ? (<Loading/>) : classes && classes.length > 0 ? (
          <div className=' m-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10'>
            {classes.map((cl) =>(
              <SectionsCard 
                key={cl?._id}
             
                cls={cl as ClassesWithDetails}/>
            ))}
          </div>
        ) :(
          <div className="text-gray-500 text-sm text-center py-4">No assigned subject yet.</div>
        )}
       
           
       
        
    </div>
  )
}

export default SectionPage