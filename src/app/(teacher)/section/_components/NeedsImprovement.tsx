'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from '@/components/data-table'
import { forImprovementsColumns } from './studentData'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { ClassesWithDetails, SectionWithGradeLevel, StudentsWithQuarterlyGrades } from '@/lib/types'

function NeedsImprovement({
    section,
    cls
}: { 
    section: SectionWithGradeLevel
    cls: ClassesWithDetails
}) {
    const studentNeedsIntervention = useQuery(api.quarterlyGrades.needIntervention, {
        gradeLevel: Number(section?.gradeLevel?.level),
        classId: cls._id,
        needsIntervention: true
    })

    const getUniqueQuarterlyGrades = (
        quarter: string,
        studentNeedsIntervention: StudentsWithQuarterlyGrades[]
      ) => {
        const filteredGrades = studentNeedsIntervention.map((student) => {

            const quarterlyGrade = student.quarterlyGrades.find(grade => grade.quarter === quarter)

            if(quarterlyGrade === undefined) return null

            return {
                ...student,
                quarterlyGrade: quarterlyGrade
            }
        });

        const removeNull = filteredGrades.filter(g => g !== null)
        return removeNull;
      };

      const semester = cls.semester
      
      const firstQuarterIntervention = getUniqueQuarterlyGrades("1st", studentNeedsIntervention ?? []);
      const secondQuarterIntervention = getUniqueQuarterlyGrades("2nd", studentNeedsIntervention ?? []);
      const thirdQuarterIntervention = getUniqueQuarterlyGrades("3rd", studentNeedsIntervention ?? []);
      const fourthQuarterIntervention = getUniqueQuarterlyGrades("4th", studentNeedsIntervention ?? []);
  return (
    <div>
        <Tabs defaultValue={semester ? semester === "2nd" ? "3rd" : "1st" : "1st"} className='w-full'>
            <TabsList  className='space-x-3 bg-transparent'>
            {semester ? semester === "1st" ? (
                <>
                  <TabsTrigger value='1st'  className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >1st</TabsTrigger>
                  <TabsTrigger value='2nd' className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >2nd</TabsTrigger>  
                </>
            ): (
                <>
                <TabsTrigger value='3rd' className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >3rd</TabsTrigger>
                <TabsTrigger value='4th' className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >4th</TabsTrigger>
                </>
            ): (
                <>
                    <TabsTrigger value='1st'  className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >1st</TabsTrigger>
                    <TabsTrigger value='2nd' className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >2nd</TabsTrigger>
                    <TabsTrigger value='3rd' className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >3rd</TabsTrigger>
                    <TabsTrigger value='4th' className='font-medium text-xs md:text-md shadow-md border-b-2 data-[state=active]:border-b-primary data-[state=active]:text-primary' >4th</TabsTrigger>
                </>
            )}
            </TabsList>
            <TabsContent value="1st">
                <DataTable
                
                    columns={forImprovementsColumns}
                    data={firstQuarterIntervention ?? []}
                    filter='fullName' 
                    placeholder='by name'
                />
            </TabsContent>
            <TabsContent value="2nd">
                <DataTable
                    columns={forImprovementsColumns}
                    data={secondQuarterIntervention ?? []}
                    filter='fullName' 
                    placeholder='by name'
                />
            </TabsContent>
            <TabsContent value="3rd">
                <DataTable
                    columns={forImprovementsColumns}
                    data={thirdQuarterIntervention ?? []}
                    filter='fullName' 
                    placeholder='by name'
                />
            </TabsContent>
            <TabsContent value="4th">
                <DataTable
                    columns={forImprovementsColumns}
                    data={fourthQuarterIntervention ?? []}
                    filter='fullName' 
                    placeholder='by name'
                />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default NeedsImprovement