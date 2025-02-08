'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassesWithDetails, SectionWithGradeLevel } from '@/lib/types';
import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import MapehQuarterlyGradesTemplate from "./MapehQuarterlyGradesTemplate";


function MapehQuarterlyGradesTab({
        section,
        cls
    }:{
        section: SectionWithGradeLevel
        cls: ClassesWithDetails
    }) {
        
        const studentQuarterlyGrades = useQuery(api.quarterlyGrades.get,{
            gradeLevel: Number(cls?.section?.gradeLevel?.level),
            classId: cls._id
        })
 
        const schoolYear =  cls.schoolYear?.sy
        const subjectName = cls.subject?.name

        const teacherName = `${cls.teacher?.firstName} ${cls.teacher?.middleName} ${cls.teacher?.lastName}`

        const gradeAndSection = `${section?.gradeLevel?.level} - ${section?.name}`
    
  return (
         <Tabs defaultValue="1st" className="w-full">
            <TabsList className='flex flex-row justify-start w-fit'>
                <TabsTrigger value="1st">1st</TabsTrigger>
                <TabsTrigger value="2nd">2nd</TabsTrigger>
                <TabsTrigger value="3rd">3rd</TabsTrigger>
                <TabsTrigger value="4th">4th</TabsTrigger>
            </TabsList>
            <TabsContent value="1st">
                <MapehQuarterlyGradesTemplate 
                    gradeAndSection={gradeAndSection} 
                    schoolYear={schoolYear} 
                    teacherName={teacherName} 
                    subjectName={subjectName}
                    quarter={"1st"}
                    students={studentQuarterlyGrades ?? []}
                />
            </TabsContent>
            <TabsContent value="2nd">
            <MapehQuarterlyGradesTemplate 
                    gradeAndSection={gradeAndSection} 
                    schoolYear={schoolYear} 
                    teacherName={teacherName} 
                    subjectName={subjectName}
                    quarter={"2nd"}
                    students={studentQuarterlyGrades ?? []}
                />
            </TabsContent>
            <TabsContent value="3rd">
                <MapehQuarterlyGradesTemplate 
                    gradeAndSection={gradeAndSection} 
                    schoolYear={schoolYear} 
                    teacherName={teacherName} 
                    subjectName={subjectName}
                    quarter={"3rd"}
                    students={studentQuarterlyGrades ?? []}
                />
            </TabsContent>
            <TabsContent value="4th">
            <MapehQuarterlyGradesTemplate 
                    gradeAndSection={gradeAndSection} 
                    schoolYear={schoolYear} 
                    teacherName={teacherName} 
                    subjectName={subjectName}
                    quarter={"4th"}
                    students={studentQuarterlyGrades ?? []}
                />
            </TabsContent>
        </Tabs>
  )
}

export default MapehQuarterlyGradesTab