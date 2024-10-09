'use client'
import React from 'react'
import { sections } from '../section-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuarterlyGradesTemplate from '@/app/components/QuarterlyGradesTemplate'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaRegSave } from 'react-icons/fa'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import ClassRecord from '../_components/ClassRecord'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import FinalGradeSHSTemplate from '@/app/components/FinalGradeSHSTemplate'

function Section({params}:{params: {section: string}}) {

  const section = sections.find((section) => section.section === params.section);


  return (
    <div className='bg-white m-5 min-h-screen max-w-full shadow-md p-5 space-y-5'>
       <Breadcrumb className="hidden md:flex mb-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-muted-foreground">Students</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage  className="text-muted-foreground">Sections</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage  >{section?.section}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
      <div className="w-full flex items-center justify-between">
        <Link
          href="/section"
          className={cn("h-7 w-7", buttonVariants({
              variant: "outline",
              size: "icon",
          }))}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
        <Dialog>
            <DialogTrigger className='border shadow-md flex justify-center items-center gap-x-3 bg-blue-600 text-white border-gray-100 rounded-md px-2 py-1'>
            <FaRegSave />Submit Grades</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Grades?</DialogTitle>
                <DialogDescription>
                  Once you submit the grades to students adviser you can no longer edit the grades.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant={'ghost'}>No</Button>
                <Button  variant={'default'}>Yes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      </div>

       
        <div className="grid grid-cols-2 font-semibold text-sm">
          
          <h1>Section: {params.section}</h1>
          <h1>Grade Level: {section?.gradeLevel}</h1>
          <h1>Subject: {section?.subject}</h1>
          <h1>Schedule: {section?.schedule} - ( {section?.days.join(',')} )</h1>
          <h1>Room: {section?.roomNumber}</h1>
          <h1>School Year: 2025-2026</h1>
        </div>
       
        <Tabs defaultValue={"attendance"} className="w-full relative space-y-5 mt-5 shadow-md ">
          {/* <h1 className='text-xs text-foreground font-semibold'>Select tab to show: </h1> */}
          <TabsList className=''> 
            <TabsTrigger value="attendance" className='font-medium shadow-md border-b-2 data-[state=active]:border-b-primary' >Attendance</TabsTrigger>
            <TabsTrigger value="class-record" className='font-medium shadow-md border-b-2 data-[state=active]:border-b-primary' >Class Record</TabsTrigger>
            <TabsTrigger value="grades-summary" className='font-medium shadow-md border-b-2 data-[state=active]:border-b-primary'>Grades Summary</TabsTrigger>
          </TabsList>

          {/* Attendance */}
          <TabsContent value="attendance" className='min-h-screen border-2 border-gray-300'>
            
          </TabsContent>

          {/* Class Record*/}
          <TabsContent value="class-record" className=''>
             <ClassRecord sec={section ? section.section : ""}/>
          </TabsContent>

          {/* Grade summary */}
          <TabsContent value="grades-summary" className='min-h-screen border-2 border-gray-300'>
            {section && section.gradeLevel === "Grade 11" || section?.gradeLevel === "Grade 12" ? (
              <FinalGradeSHSTemplate section={section}/>
            ) :(
              <QuarterlyGradesTemplate 
                teacher='Currently Login Teacher name' 
                subject={section?.subject} 
                // change to dynamic data from db
                schoolYear='2024-2025'
                gradeAndSection={(section?.section)}
              />

            )}
          </TabsContent>
        </Tabs>
    </div>
  )
}

export default Section