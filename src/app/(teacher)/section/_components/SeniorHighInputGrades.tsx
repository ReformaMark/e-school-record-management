'use client'
import React from 'react'
import { InputGradesCol } from './studentData'
import { DataTable } from '@/components/data-table';
import ClassRecordDialog from './ClassRecordDialog';
import { useClasses } from '../section-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Loading from '@/app/components/Loading';
import { ClassesWithDetails } from '@/lib/types';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';

interface IProps {
    sec: string
    clss: ClassesWithDetails
}

function SeniorHighInputGrades({clss, sec}:IProps) {
    const {isLoading, classes} = useClasses()
    const students = useQuery(api.classRecords.get, {classId: clss?._id})

    const studentsWithClassRecord = students?.sort((a, b) => (a?.lastName ?? '').localeCompare(b?.lastName ?? ''));
    const cls = classes?.find((section)=> section.section?.name === sec)
 
    if(isLoading) {
        return <Loading/>
    }

    const filterByQuarter = (quarter: string) => {
        return studentsWithClassRecord?.map(student => ({
            ...student,
            classRecords: student.classRecords.filter(classRecord => classRecord.quarter === quarter)
        }));
    };

    const firstQuarterStudents = filterByQuarter("1st");
    const secondQuarterStudents = filterByQuarter("2nd");
    const thirdQuarterStudents = filterByQuarter("3rd");
    const fourthQuarterStudents = filterByQuarter("4th");
    
  return (
    <div className='text-primary'>
       
        <Tabs defaultValue="1st" className="w-full">
            <TabsList>
                <TabsTrigger value="1st">1st quarter</TabsTrigger>
                <TabsTrigger value="2nd">2nd quarter</TabsTrigger>
                <TabsTrigger value="2nd">3rd quarter</TabsTrigger>
                <TabsTrigger value="2nd">4th quarter</TabsTrigger>
            </TabsList>
            <TabsContent value="1st">
                <ClassRecordDialog subject={cls ? cls.subject?.name ?? "": ''} gradeLevel={cls ? cls.section?.name ?? "" : ''}/>
                <DataTable
                    columns={InputGradesCol}
                    data={firstQuarterStudents  ?? []}
                    filter='fullName'
                    placeholder='by Full Name'
                />
            </TabsContent>
            <TabsContent value="2nd">
                <ClassRecordDialog subject={cls ? cls.subject?.name ?? "" : ''} gradeLevel={cls ? cls.section?.name ?? "" : ''}/>
                <DataTable
                    columns={InputGradesCol}
                    data={secondQuarterStudents ?? []}
                    filter='fullName'
                    placeholder='by Full Name'
                />
            </TabsContent>
            <TabsContent value="3rd">
                <ClassRecordDialog subject={cls ? cls.subject?.name ?? "" : ''} gradeLevel={cls ? cls.section?.name ?? "" : ''}/>
                <DataTable
                    columns={InputGradesCol}
                    data={thirdQuarterStudents  ?? []}
                    filter='fullName'
                    placeholder='by Full Name'
                />
            </TabsContent>
            <TabsContent value="4th">
                <ClassRecordDialog subject={cls ? cls.subject?.name ?? "" : ''} gradeLevel={cls ? cls.section?.name ?? "" : ''}/>
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

export default SeniorHighInputGrades