'use client'
import React, { useState } from 'react'
import { InputGradesCol } from './studentData'
import { DataTable } from '@/components/data-table';
import ClassRecordDialog from './ClassRecordDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassesWithDetails, SectionWithGradeLevel, SubjectWithGradeLevel } from '@/lib/types';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IProps {
    clss: ClassesWithDetails
}

function InputGrades({clss}:IProps) {
    const students = useQuery(api.classRecords.get, {classId: clss?._id})
    const teacher = useQuery(api.users.teacher)
    const [selectedSubComponent, setSelectedSubComponent] = useState<string>("Music")
    const isMAPEH = clss.subject?.name.toLocaleUpperCase() === 'MAPEH'
    const isShs = Number(clss.section?.gradeLevel?.level ?? 0) > 10
    const sem = clss.semester
    const studentsWithClassRecord = students?.sort((a, b) => (a?.lastName ?? '').localeCompare(b?.lastName ?? ''));
  
    const appliedGW = useQuery(api.appliedGradeWeigths.get, {subjectId: clss?.subjectId })
    const assessments = useQuery(api.assessments.getAssessmentsBySubject, {subjectId: clss?.subjectId })

  
    const filterByQuarter = (quarter: string, subComponent?: string) => {
        if(isMAPEH){
            const filter = studentsWithClassRecord?.map(student => ({
                ...student,
                classRecords: student.classRecords.filter(classRecord => classRecord.quarter === quarter && classRecord.subComponent === subComponent)
            }));
         
            return filter
        }
        return studentsWithClassRecord?.map(student => ({
            ...student,
            classRecords: student.classRecords.filter(classRecord => classRecord.quarter === quarter)
        }));
    };

    const firstQuarterStudents = isMAPEH ?filterByQuarter("1st", selectedSubComponent) : filterByQuarter("1st") ;
   
    const secondQuarterStudents = isMAPEH ?filterByQuarter("2nd", selectedSubComponent) : filterByQuarter("2nd") ;
    const thirdQuarterStudents = isMAPEH ?filterByQuarter("3rd", selectedSubComponent) : filterByQuarter("3rd") ;
    const fourthQuarterStudents = isMAPEH ?filterByQuarter("4th", selectedSubComponent) : filterByQuarter("4th") ;


  return (
    <div className='text-primary'>
        <Tabs defaultValue={sem ? sem === "2nd" ? "3rd" : "1st" : "1st"} className="w-full">
        {isMAPEH ? (
            <div className="grid grid-cols-3 ">
                <div className="">
 
                <TabsList className='space-x-3 bg-transparent'>
                    <TabsTrigger value="1st" className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>1st</TabsTrigger>
                    <TabsTrigger value="2nd" className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>2nd</TabsTrigger>
                    <TabsTrigger value="3rd" className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>3rd</TabsTrigger>
                    <TabsTrigger value="4th" className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary'>4th</TabsTrigger>
                </TabsList>
                </div>
                <div className="col-span-1">
                    <Select defaultValue={'Music'} onValueChange={(value)=>{setSelectedSubComponent(value)}}>
                        <SelectTrigger className='w-40'>
                            <SelectValue placeholder="Select component" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Music">Music</SelectItem>
                            <SelectItem value="Arts">Arts</SelectItem>
                            <SelectItem value="Physical Education">Physical Education</SelectItem>
                            <SelectItem value="Health">Health</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              
            </div>
        ): !isShs ? (
            <TabsList className={'space-x-3 bg-transparent'}>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="1st">1st</TabsTrigger>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="2nd">2nd</TabsTrigger>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="3rd">3rd</TabsTrigger>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="4th">4th</TabsTrigger>
            </TabsList>
        ) : sem && sem === "1st" ?(
            <TabsList className={'space-x-3 bg-transparent'}>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="1st">1st</TabsTrigger>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="2nd">2nd</TabsTrigger>
            </TabsList>
        ): (
            <TabsList className={'space-x-3 bg-transparent'}>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="3rd">3rd</TabsTrigger>
                <TabsTrigger className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' value="4th">4th</TabsTrigger>
            </TabsList>
        )}
              
  
        <TabsContent value="1st">
            <div className="flex justify-end">

            <ClassRecordDialog 
                teacher={teacher as Doc<'users'>}
                data={firstQuarterStudents ?? []} 
                subject={clss?.subject as SubjectWithGradeLevel } 
                section={clss?.section as SectionWithGradeLevel}
                appliedGW={appliedGW as Doc<'appliedGradeWeigths'>}
                assessments={assessments as Doc<'assessments'>[]}
                subComponent={selectedSubComponent}
                />
            </div>
            <DataTable
                columns={InputGradesCol}
                data={firstQuarterStudents ?? []}
                filter='fullName'
                placeholder='by name'
            />
        </TabsContent>
        <TabsContent value="2nd">
            <div className="flex justify-end">
                <ClassRecordDialog 
                    teacher={teacher as Doc<'users'>}
                    data={secondQuarterStudents ?? []} 
                    subject={clss?.subject as SubjectWithGradeLevel } 
                    section={clss?.section as SectionWithGradeLevel}
                    appliedGW={appliedGW as Doc<'appliedGradeWeigths'>}
                    assessments={assessments as Doc<'assessments'>[]}
                    subComponent={selectedSubComponent}
                />
            </div>
            <DataTable
                columns={InputGradesCol}
                data={secondQuarterStudents ?? []}
                filter='fullName'
                placeholder='by Full Name'
            />
        </TabsContent>
        <TabsContent value="3rd">
            <div className="flex justify-end">
            <ClassRecordDialog 
                teacher={teacher as Doc<'users'>}
                data={thirdQuarterStudents ?? []} 
                subject={clss?.subject as SubjectWithGradeLevel } 
                section={clss?.section as SectionWithGradeLevel}
                appliedGW={appliedGW as Doc<'appliedGradeWeigths'>}
                assessments={assessments as Doc<'assessments'>[]}
                subComponent={selectedSubComponent}
            />
            </div>
            <DataTable
                columns={InputGradesCol}
                data={thirdQuarterStudents ?? []}
                filter='fullName'
                placeholder='by Full Name'
            />
        </TabsContent>
        <TabsContent value="4th">
            <div className="flex justify-end">
                <ClassRecordDialog 
                    teacher={teacher as Doc<'users'>}
                    data={fourthQuarterStudents ?? []} 
                    subject={clss?.subject as SubjectWithGradeLevel } 
                    section={clss?.section as SectionWithGradeLevel}
                    appliedGW={appliedGW as Doc<'appliedGradeWeigths'>}
                    assessments={assessments as Doc<'assessments'>[]}
                    subComponent={selectedSubComponent}
                />
            </div>
            <DataTable
                columns={InputGradesCol}
                data={fourthQuarterStudents ?? []}
                filter='fullName'
                placeholder='by Full Name'
            />
        </TabsContent>
        </Tabs>
       
    </div>
  )
}

export default InputGrades