'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassRecordTemplate from '../_components/ClassRecordTemplate'
import { sections } from '../../section/section-data'
function SectionClassRecord({
    params
}:{
    params:{
        section: string
    }
}) {
    const section = sections.find((section)=> section.section === params.section)
  return (
    <div className='m-5 bg-white max-w-full min-h-screen'>
        <Tabs defaultValue="1st" className="w-full mt-5 shadow-md bg-gray-50">
          {/* <h1 className='text-xs text-foreground font-semibold'>Select tab to show: </h1> */}
          <TabsList className='bg-gray-100 border border-gray-600  w-full'>
            <TabsTrigger value="1st" className='w-full uppercase data-[state=active]:bg-primary text-lg font-semibold data-[state=active]:text-white' >1st Quarter</TabsTrigger>
            <TabsTrigger value="2nd" className='w-full uppercase data-[state=active]:bg-primary text-lg font-semibold data-[state=active]:text-white'>2nd Quarter</TabsTrigger>
            <TabsTrigger value="3rd" className='w-full uppercase data-[state=active]:bg-primary text-lg font-semibold data-[state=active]:text-white'>3rd Quarter</TabsTrigger>
            <TabsTrigger value="4th" className='w-full uppercase data-[state=active]:bg-primary text-lg font-semibold data-[state=active]:text-white'>4th Quarter</TabsTrigger>
          </TabsList>
          <TabsContent value="1st" className='min-h-screen border-2 border-gray-300'>
            <ClassRecordTemplate subject={section ? section.subject : ''} />
          </TabsContent>
          <TabsContent value="2nd" className='min-h-screen border-2 border-gray-300'>
           
          </TabsContent>
          <TabsContent value="3rd" className='min-h-screen border-2 border-gray-300'>
           
          </TabsContent>
          <TabsContent value="4th" className='min-h-screen border-2 border-gray-300'>
           
          </TabsContent>
        </Tabs>
    </div>
  )
}

export default SectionClassRecord