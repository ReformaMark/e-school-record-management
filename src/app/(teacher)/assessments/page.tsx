import React from 'react'
import WrittenWorks from './_components/WrittenWorks'
import PerformanceTask from './_components/PerformanceTask'
import QuarterExam from './_components/QuarterExam'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function AssessmentPage() {
  return (


    <div className='m-5 '>  
    <Tabs defaultValue="ww" className="max-w-full">
        <TabsList>
            <TabsTrigger value="ww">Written Works</TabsTrigger>
            <TabsTrigger value="pt">Performance Task</TabsTrigger>
            <TabsTrigger value="qe">Quarterly Exams</TabsTrigger>
        </TabsList>
        <TabsContent value="ww" className='w-full'>
            <WrittenWorks/>
        </TabsContent>
        <TabsContent value="pt" className='w-full'>
            <PerformanceTask/>
        </TabsContent>
        <TabsContent value="qe" className='w-full'>
            <QuarterExam/>
        </TabsContent>
    </Tabs>
        
       
     
    </div>
  )
}

export default AssessmentPage