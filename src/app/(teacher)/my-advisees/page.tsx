/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { StudentTable } from './_components/StudentTable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
function Studentpage() {
 
    
  return (
    
    <div className="container mx-auto p-4">
    <main className="">
       
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>Advisory Class</CardTitle>
                <CardDescription className="flex justify-between">
                    List of students
                </CardDescription>
            </CardHeader>
            <CardContent className=''>
                <StudentTable/>
            </CardContent>
        </Card>
    </main>
    </div>
  )
}

export default Studentpage