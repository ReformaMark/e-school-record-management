import React from 'react'
import { InputGradesCol, studentsData } from './studentData'
import { DataTable } from '@/components/data-table';
import ClassRecordDialog from './ClassRecordDialog';
import { useClasses } from '../section-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Loading from '@/app/components/Loading';

function SeniorHighInputGrades({sec}:{sec:string}) {
    const {isLoading, classes} = useClasses()
    const males = studentsData
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
        const section = classes?.find((cls)=> cls.section?.name === sec)

    if(isLoading){

        return <Loading/>
    }
  return (
    <div className='text-primary'>
       
        <Tabs defaultValue="1st" className="w-full">
            <TabsList>
                <TabsTrigger value="1st">1st quarter</TabsTrigger>
                <TabsTrigger value="2nd">2nd quarter</TabsTrigger>
            </TabsList>
            <TabsContent value="1st">
                <ClassRecordDialog subject={section ? section.subject?.name ?? "": ''} gradeLevel={section ? section.section?.name ?? "" : ''}/>
                <DataTable
                    columns={InputGradesCol}
                    data={males}
                    filter='fullName'
                    placeholder='by Full Name'
                />
            </TabsContent>
            <TabsContent value="2nd">
                <ClassRecordDialog subject={section ? section.subject?.name ?? "" : ''} gradeLevel={section ? section.section?.name ?? "" : ''}/>
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