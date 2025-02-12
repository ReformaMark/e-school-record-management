'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import JrGradesTemplate from '../_components/JrGradesTemplate'
import SrGradesTemplate from '../_components/SrGradesTemplate'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Doc, Id } from '../../../../../convex/_generated/dataModel'
import Values from '../_components/Values'
import Attendance from '../_components/Attendance'

function Student({
    params
}:{
    params: {
        studentId: string
    }
}) {
    const student = useQuery(api.students.getStudentWithDetails,{
        id: params.studentId as Id<'students'>,
    })

    const attendance = useQuery(api.attendance.get, {
        studentId: student?._id,
        classId: student?.cLass?._id
    })

  return (
    <div className='p-3 md:p-10 text-primary'>
    
        <div className="bg-white w-full-full min-h-screen h-fit p-5 shadow-md">
            <Link
                href="/my-advisees"
                className={cn("h-7 w-7", buttonVariants({
                    variant: "outline",
                    size: "icon",
                }))}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Link>
            <div className="w-full flex item-start justify-between mb-5 gap-x-2">
                
                <h1 className='text-lg md:text-xl text-primary font-semibold flex items-center'>Student Report Card</h1>
                <div className="space-y-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger><Button variant={'link'}>Generate School Reports</Button></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>School Forms</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>School Form 9 (SF9)</DropdownMenuItem>
                            <DropdownMenuItem>School Form 9 (SF10)</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            
            <div className="grid grid-cols-4 mb-5 text-sm md:text-sm font-semibold">
                {/* <h1 className='col-span-4 md:col-span-2  text-text'>Student Number: <span className='text-sm md:text-lg font-semibold'> {student?} </span></h1> */}
                <h1 className='col-span-4 md:col-span-2  text-text'>LRN: <span className='text-sm md:text-lg font-normal'> {student?.lrn} </span></h1>
                <h1 className='col-span-4 md:col-span-2  text-text'>Full Name: <span className='text-sm md:text-lg font-normal'>{student?.lastName}, {student?.firstName} {student?.middleName} </span></h1>      
                <h1 className='col-span-4 md:col-span-2  text-text'>Grade Level: <span className='text-sm md:text-lg font-normal'>{student?.gradeLevel} </span></h1>           
                <h1 className='col-span-4 md:col-span-2  text-text'>Adviser: <span className='text-sm md:text-lg font-normal'>{student?.advisor?.firstName} {student?.advisor?.middleName} {student?.advisor?.lastName} </span></h1>           
                <h1 className='col-span-4 md:col-span-2  text-text'>Section: {student?.sectionDoc.name}</h1> 
                {student?.gradeLevel === "11"  && (
                    <>
                        <h1 className='col-span-4 md:col-span-2  text-text'>Semister: <span className='text-sm md:text-lg font-normal'> 1st </span></h1>
                    </>
                )}       
                {student?.gradeLevel === "12"  && (
                    <>
                        <h1 className='col-span-4 md:col-span-2  text-text'>Semister: <span className='text-sm md:text-lg font-normal'> 1st </span></h1>
                    </>
                )}       
            </div> 
       
          
             
            <Tabs defaultValue="grades" className="w-full">
                <TabsList>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                    <TabsTrigger value="values">Values</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>
                {/* Grades Content */}
                
                {student?.sectionDoc.gradeLevel.level === "11" ||student?.sectionDoc.gradeLevel.level === "12" ? (
                    <TabsContent value="grades" className='text-xs md:text-sm w-full gap-x-10'>
                        <Tabs defaultValue="1st">
                            <TabsList>
                                <TabsTrigger value="1st">1st Semester</TabsTrigger>
                                <TabsTrigger value="2nd">2nd Semester</TabsTrigger>
                            </TabsList>
                            <TabsContent value='1st'>
                                <SrGradesTemplate sem='1st' student={student} />
                            </TabsContent>
                            <TabsContent value='2nd'>
                                <SrGradesTemplate sem='2nd' student={student} />
                            </TabsContent>
                        </Tabs>
                       
                    </TabsContent>
                ) :(
                    <TabsContent value="grades" className='text-xs md:text-sm w-full gap-x-10'>
                        {student && (
                            <JrGradesTemplate student={student}/>
                        )}
                    </TabsContent>
                )}
                {/* {Values} */}
                <TabsContent value='values'>
                    <Values studentId={student?._id as Id<'students'>} classId={student?.cLass?._id as Id<'classes'>}/>
                </TabsContent>
                {/* Attendance Content */}
                <TabsContent value="attendance">
                {student && (
                    <Attendance attendance={attendance as Doc<'attendance'>} studentId={student?._id as Id<'students'>} classId={student?.cLass?._id as Id<'classes'>}/>
                )}
                </TabsContent>
            </Tabs>

        </div>
     
    </div>
  )
}

export default Student