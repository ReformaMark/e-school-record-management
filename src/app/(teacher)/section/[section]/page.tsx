/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React from 'react'
import { useClasses } from '../section-data'
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

import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import FinalGradeSHSTemplate from '@/app/components/FinalGradeSHSTemplate'
import { DataTable } from '@/components/data-table'
import { forRemedial, studentMasterList, summerClassStatus } from '../_components/studentData'
import NeedsImprovement from '../_components/NeedsImprovement'
import InputGrades from '../_components/InputGrades'
import SeniorHighInputGrades from '../_components/SeniorHighInputGrades'
import Loading from '@/app/components/Loading'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { StudentsWithEnrollMentTypes } from '@/lib/types'

function Section({params}:{params: {section: string}}) {
  const sectionName = params.section.replace(/%20/g, ' ');
  const {isLoading, classes} = useClasses()
  //section === class
  const section = classes?.find((section) => section.section?.name === sectionName);
  
  const studentInMasterlist = useQuery(api.students.studentsInMasterList, {classId: section?._id })
 
  if(isLoading || !studentInMasterlist ){
    return <Loading/>
  }

  return (
    <div className='bg-white text-primary md:m-5 min-h-screen max-w-full shadow-md p-5 space-y-5'>
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
            <DialogTrigger disabled className='border shadow-md flex justify-center items-center gap-x-3 disabled:bg-blue-200 bg-blue-600 text-white border-gray-100 rounded-md px-2 py-1'>
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

        <div className="grid grid-cols-1 md:grid-cols-2 font-bold text-sm">
          
          <h1>Section: <span className='font-normal'>{sectionName}</span></h1>
          <h1>Grade Level: <span className='font-normal'>{section?.section?.gradeLevel}</span></h1>
          <h1>Subject: <span className='font-normal'>{section?.subject?.name}</span></h1>
          <h1>Schedule: <span className='font-normal'>{section?.schedule.startTime} - {section?.schedule.endTime} - ( {section?.schedule.day} )</span></h1>
          <h1>Room: <span className='font-normal'>{section?.schedule.room?.name}</span></h1>
          <h1>School Year: <span className='font-normal'>{section?.schoolYear?.sy}</span></h1>
          {section?.section?.gradeLevel === 11 && ( 
            <h1><span className='font-normal'>Current Semester: 1st</span></h1>
          )}
          {section?.section?.gradeLevel === 12 && ( 
            <h1><span className='font-normal'>Current Semester: 1st</span></h1>
          )}
        </div>
       
        <Tabs defaultValue={"students"} className="w-full relative  space-y-5 mt-5 shadow-md ">
          {/* <h1 className='text-xs text-foreground font-semibold'>Select tab to show: </h1> */}
          <TabsList className='w-fit grid grid-cols-3 md:block'> 
            <TabsTrigger value="students" className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' ><span className=''>Master List</span> </TabsTrigger>
            {/* <TabsTrigger value="attendance" className='font-medium shadow-md border-b-2 data-[state=active]:border-b-primary' >Attendance</TabsTrigger> */}
            <TabsTrigger value="class-record" className='font-medium text-xs md:text-md  shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >Class Record</TabsTrigger>
            <TabsTrigger value="grades-summary" className='font-medium text-xs md:text-md  shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>Grades Summary</TabsTrigger>
            <TabsTrigger value="intervention" className='font-medium text-xs md:text-md  shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>Needs Intervention</TabsTrigger>
            <TabsTrigger value="remedial-class" className='font-medium text-xs md:text-md  shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>For Summer Class</TabsTrigger>
          </TabsList>

          {/* Master List */}
          <TabsContent value="students" className='min-h-screen border-2 p-5'>
           
           <DataTable 
     
            columns={studentMasterList}
            data={studentInMasterlist as StudentsWithEnrollMentTypes[]}
            filter='lastName'
            placeholder="students by LRN"
           />
          </TabsContent>

          {/* Class Record*/}
          <TabsContent value="class-record" className=''>
            {section && section.section?.gradeLevel === 11 || section?.section?.gradeLevel === 12 ? (
            
              <SeniorHighInputGrades sec={section?.section ? section.section.name : ""}/>
            ) : (
              <InputGrades sec={section?.section?.name ?? ""}/>
            )}
          </TabsContent>

          {/* Grade summary */}
          <TabsContent value="grades-summary" className='min-h-screen max-w-full overflow-y-auto border-2 border-gray-300'>
            {section && section.section?.gradeLevel === 11 || section?.section?.gradeLevel === 12 ? (
              <FinalGradeSHSTemplate section={section.section} subject={section.subject}/>
            ) :(
              <QuarterlyGradesTemplate 
                teacher='Currently Login Teacher name' 
                subject={section?.subject?.name} 
                // change to dynamic data from db
                schoolYear={section?.schoolYear?.sy}
                gradeAndSection={`${section?.section?.gradeLevel} - ${section?.section?.name}`}
              />

            )}
          </TabsContent>

          <TabsContent value="intervention" className="">
            <NeedsImprovement/>
          </TabsContent>
          <TabsContent value="remedial-class" className="">
            <DataTable 
              //@ts-ignore
              columns={forRemedial}
              data={summerClassStatus}
              filter='lrn'
              placeholder="students by LRN"
              />
          </TabsContent>
        </Tabs>
    </div>
  )
}

export default Section