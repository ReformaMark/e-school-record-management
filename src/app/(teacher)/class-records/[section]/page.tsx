'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassRecordTemplate from '../_components/ClassRecordTemplate'
import { sections } from '../../section/section-data'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

function SectionClassRecord({
    params
}:{
    params:{
        section: string
    }
}) {
    const section = sections.find((section)=> section.section === params.section)
    const currentQuarter = 1;
  return (
    <div className='m-5 max-w-full min-h-screen'>
         <Breadcrumb className="hidden md:flex mb-6 mt-5 ml-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-muted-foreground">Students</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage  className="text-muted-foreground">Class Records</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{section?.section}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-right w-full text-sm text-gray-400'>Current Quarter: {currentQuarter=== 1 ?"1st": currentQuarter === 2 ? "2nd" : currentQuarter === 3 ? "3rd" : "4th" } </h1>
        <Tabs defaultValue={currentQuarter=== 1 ?"1st": currentQuarter === 2 ? "2nd" : currentQuarter === 3 ? "3rd" : "4th" } className="w-full mt-5 shadow-md ">
          {/* <h1 className='text-xs text-foreground font-semibold'>Select tab to show: </h1> */}
          <TabsList className=' space-x-3   w-full'>
            <TabsTrigger value="1st" className='w-full shadow-lg  bg-white border-2 transition-colors duration-700 ease-in border-gray-100 font-mono uppercase data-[state=active]:bg-blue-600 text-lg font-semibold data-[state=active]:text-white' >1st Quarter</TabsTrigger>
            <TabsTrigger disabled={currentQuarter < 2 ? true : false } value="2nd" className='w-full shadow-lg  bg-white border-2 transition-colors duration-700 ease-in border-gray-100 font-mono uppercase data-[state=active]:bg-blue-600 text-lg font-semibold data-[state=active]:text-white'>2nd Quarter</TabsTrigger>
            <TabsTrigger disabled={currentQuarter < 3 ? true : false }  value="3rd" className='w-full shadow-lg  bg-white border-2 transition-colors duration-700 ease-in border-gray-100 font-mono  uppercase data-[state=active]:bg-blue-600 text-lg font-semibold data-[state=active]:text-white'>3rd Quarter</TabsTrigger>
            <TabsTrigger disabled={currentQuarter < 4 ? true : false } value="4th" className='w-full shadow-lg bg-white  border-2 transition-colors duration-700 ease-in border-gray-100 font-mono  uppercase data-[state=active]:bg-blue-600 text-lg font-semibold data-[state=active]:text-white'>4th Quarter</TabsTrigger>
          </TabsList>
          <TabsContent value="1st" className='min-h-screen transition-all duration-300 ease-in-out space-y-5 p-5 bg-white border-2 border-gray-300'>
            <h1 className='text-lg uppercase tracking-wider font-semibold font-mono text-center'>Class Record</h1>
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