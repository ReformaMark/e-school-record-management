
'use client'
import WrittenWorks from './_components/WrittenWorks'
import PerformanceTask from './_components/PerformanceTask'
import QuarterExam from './_components/QuarterExam'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
  } from "@/components/ui/card"
import AssignSubjects from './_components/AssignSubjects'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { AssessmentTypes } from '@/lib/types'

function AssessmentPage() {
    const schoolYears = useQuery(api.schoolYear.get)
    const latestSY = schoolYears ? schoolYears[0]._id : undefined
    const data = useQuery(api.assessments.getAssessments, {sy: latestSY})
    const getAssignSubjects = useQuery(api.subjects.getAssignSubjects)
  return (
    
    <div className='m-5 '>  
    <Tabs defaultValue="subjects" className="max-w-full">
        <TabsList className='text-primary text-xl tracking-wide mb-0 gap-0 rounded-b-none bg-transparent px-0'>
            <TabsTrigger value="subjects" className='font-medium rounded-b-none rounded-tr-none bg-white  text-lg data-[state=active]:border-b-4 border-b-primary data-[state=active]:text-primary data-[state=active]:bg-white'>Subjects</TabsTrigger>
            <TabsTrigger value="assessments" className='font-medium rounded-b-none rounded-tl-none bg-white  text-lg data-[state=active]:border-b-4 border-b-primary data-[state=active]:text-primary data-[state=active]:bg-white'>Assessments</TabsTrigger>
        </TabsList>
        <TabsContent value="subjects" className='w-full'>
            <Card className='rounded-t-none px-0'>
                <CardContent>
                    <AssignSubjects subjects={getAssignSubjects}/>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="assessments" className='w-full'>
            <Card className='rounded-t-none px-0'>
                <CardContent className='px-0'>
                    <Tabs defaultValue="ww" className="max-w-full">
                        <TabsList>
                            <TabsTrigger value="ww">Written Works</TabsTrigger>
                            <TabsTrigger value="pt">Performance Task</TabsTrigger>
                            <TabsTrigger value="qe">Quarterly Exams</TabsTrigger>
                        </TabsList>
                        
                            <TabsContent value="ww" className='w-full'>
                                <WrittenWorks assessments={data as AssessmentTypes[]}/>
                            </TabsContent>
                            <TabsContent value="pt" className='w-full'>
                                <PerformanceTask assessments={data as AssessmentTypes[]}/>
                            </TabsContent>
                            <TabsContent value="qe" className='w-full'>
                                <QuarterExam assessments={data as AssessmentTypes[]}/>
                            </TabsContent>
                    
                    </Tabs>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
    </div>
  )
}

export default AssessmentPage