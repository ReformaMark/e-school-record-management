/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React from 'react'
import { useClasses } from '../section-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import QuarterlyGradesTemplate from '@/app/components/QuarterlyGradesTemplate'
import {  buttonVariants } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import FinalGradeSHSTemplate from '@/app/components/FinalGradeSHSTemplate'
import { DataTable } from '@/components/data-table' 
import { forRemedial, studentMasterList, summerClassStatus } from '../_components/studentData'
import NeedsImprovement from '../_components/NeedsImprovement'
import InputGrades from '../_components/InputGrades'
import Loading from '@/app/components/Loading'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { ClassesWithDetails, SectionWithGradeLevel, StudentsWithEnrollMentTypes } from '@/lib/types'
import MapehQuarterlyGradesTab from '../_components/MapehQuarterlyGradesTab'
import { Doc } from '../../../../../convex/_generated/dataModel'

function Section({params}:{params: {class: string}}) {
  const classId = params.class;
  const {isLoading, classes} = useClasses()
  //section === class
  const cls = classes?.find((section) => section?._id === classId);
  
  const studentInMasterlist = useQuery(api.students.studentsInMasterList, {classId: cls?._id })
 
  if(isLoading || !studentInMasterlist ){
    return <Loading/>
  }

  return (
    <div className='bg-white text-primary md:m-5 min-h-screen max-w-full shadow-md p-5 space-y-5'>
      <div className="w-full flex items-center justify-start">
        <Link
          href="/section"
          className={cn("h-7 w-7", buttonVariants({
              variant: "outline",
              size: "icon",
          }))}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
       
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 font-bold text-sm">
          
          <h1>Section: <span className='font-normal'>{cls?.section?.name}</span></h1>
          <h1>Grade Level: <span className='font-normal'>{cls?.section?.gradeLevel?.level}</span></h1>
          <h1>Subject: <span className='font-normal'>{cls?.subject?.name}</span></h1>
          <h1>Schedule: 
            <span className="font-normal">
              {cls?.schedules.map((schedule, index) => (
                <span key={index}>
                  {schedule.schoolPeriod?.timeRange} ({schedule.day.slice(0, 3)}) 
                  {index < cls.schedules.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </h1>
          <h1>Room: 
            <span className="font-normal">
              {cls?.schedules.map((schedule, index) => (
                <span key={index}>
                  {schedule.room?.name}
                  {index < cls.schedules.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </h1>

          <h1>School Year: <span className='font-normal'>{cls?.schoolYear?.sy}</span></h1>
          {(Number(cls?.section?.gradeLevel?.level) ?? 0) > 10 && ( 
            <h1>Semester: <span className='font-normal'>{cls?.semester}</span></h1>
          )}

        </div>
       
        <Tabs defaultValue={"students"} className="w-full relative  space-y-5 mt-5  shadow-none">
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
            placeholder="students by name"
           />
          </TabsContent>

          {/* Class Record*/}
          <TabsContent value="class-record" className='border-2 p-5'>
              <InputGrades clss={cls as ClassesWithDetails}/>
          </TabsContent>

          {/* Grade summary */}
          <TabsContent value="grades-summary" className='min-h-screen border-2 p-5 '>
            {cls && Number(cls.section?.gradeLevel?.level) === 11 || Number(cls?.section?.gradeLevel?.level) === 12 ? (
              <FinalGradeSHSTemplate cls={cls as ClassesWithDetails} section={cls?.section as SectionWithGradeLevel} subject={cls?.subject as Doc<'subjects'>}/>
            ) : cls && cls.section !== null && cls.subject?.name?.toUpperCase() !== "MAPEH" ? (
              <QuarterlyGradesTemplate cls={cls as ClassesWithDetails} section={cls.section}/>

            ) : cls && cls.section !== null && (
              <MapehQuarterlyGradesTab cls={cls as ClassesWithDetails} section={cls?.section}/>
            )}
          </TabsContent>

          <TabsContent value="intervention" className="min-h-screen border-2 p-5">
            {cls && cls.section !== null && (
              <NeedsImprovement  cls={cls as ClassesWithDetails} section={cls?.section}/>

            )}
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