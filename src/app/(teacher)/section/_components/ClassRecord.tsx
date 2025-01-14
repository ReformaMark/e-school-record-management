'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useClasses } from '../../section/section-data'
import ClassRecordTemplate from './ClassRecordTemplate'
import ClassRecordDialog from './ClassRecordDialog'
import Loading from '@/app/components/Loading'

function ClassRecord({sec}:{sec:string}) {
    const {isLoading, classes} = useClasses()
    const section = classes?.find((section)=> section.section?.name === sec)
    const currentQuarter = 1;

    if(isLoading){
      return <Loading/>
    }
  return (
    <div>
      <div className="flex justify-between px-5">
         <h1 className='text-left  w-full text-sm text-gray-400'>Current Quarter: {currentQuarter=== 1 ?"1st": currentQuarter === 2 ? "2nd" : currentQuarter === 3 ? "3rd" : "4th" } </h1>
         <ClassRecordDialog subject={section ? section.subject?.name ?? "" : ''} gradeLevel={section ? section.section?.gradeLevel.toString() ?? "" : ''}/>
      </div>
            <Tabs defaultValue={currentQuarter=== 1 ?"1st": currentQuarter === 2 ? "2nd" : currentQuarter === 3 ? "3rd" : "4th" } className="w-full mt-5 shadow-md ">
            {/* <h1 className='text-xs text-foreground font-semibold'>Select tab to show: </h1> */}
          
              {section && section.section?.gradeLevel === 11 || section?.section?.gradeLevel === 12 ? (
                <TabsList className=' space-x-3   w-full'>
                  <TabsTrigger value="1st" className='' >1st Quarter</TabsTrigger>
                  <TabsTrigger disabled={currentQuarter < 2 ? true : false } value="2nd" className=''>2nd Quarter</TabsTrigger>
                </TabsList>
              ): (
              <TabsList className=' space-x-3   w-full'>
                <TabsTrigger value="1st" className='' >1st Quarter</TabsTrigger>
                <TabsTrigger disabled={currentQuarter < 2 ? true : false } value="2nd" className=''>2nd Quarter</TabsTrigger>
                <TabsTrigger disabled={currentQuarter < 3 ? true : false }  value="3rd" className=''>3rd Quarter</TabsTrigger>
                <TabsTrigger disabled={currentQuarter < 4 ? true : false } value="4th" className=''>4th Quarter</TabsTrigger>
              </TabsList>
              )}
               
            <TabsContent value="1st" className='min-h-screen transition-all duration-300 ease-in-out space-y-5 p-5 bg-white border-2 border-gray-300'>
                <h1 className='text-lg uppercase tracking-wider font-semibold font-mono text-center'>Class Record</h1>
                <ClassRecordTemplate subject={section ? section.subject?.name ?? "" : ''} gradeLevel={section ? section.section?.gradeLevel.toString() ?? "" : ''} />
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

export default ClassRecord