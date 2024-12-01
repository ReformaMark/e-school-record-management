import React from 'react'
import { InputGradesCol, studentsData } from './studentData'
import { DataTable } from '@/components/data-table';
import ClassRecordDialog from './ClassRecordDialog';
import { sections } from '../section-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function SeniorHighInputGrades({sec}:{sec:string}) {
    const males = studentsData
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
        const section = sections.find((section)=> section.section === sec)
  return (
    <div className='text-primary'>
       
        <Tabs defaultValue="1st" className="w-full">
            <TabsList>
                <TabsTrigger value="1st">1st quarter</TabsTrigger>
                <TabsTrigger value="2nd">2nd quarter</TabsTrigger>
            </TabsList>
            <TabsContent value="1st">
                <ClassRecordDialog subject={section ? section.subject : ''} gradeLevel={section ? section.gradeLevel : ''}/>
                <DataTable
                    columns={InputGradesCol}
                    data={males}
                    filter='fullName'
                    placeholder='by Full Name'
                />
            </TabsContent>
            <TabsContent value="2nd">
                <ClassRecordDialog subject={section ? section.subject : ''} gradeLevel={section ? section.gradeLevel : ''}/>
                <DataTable
                    columns={InputGradesCol}
                    data={males}
                    filter='fullName'
                    placeholder='by Full Name'
                />
            </TabsContent>
            
        </Tabs>
            
    </div>
  )
}

export default SeniorHighInputGrades