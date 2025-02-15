/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'

import EnrollmentDialog from '../my-advisees/_components/EnrollmentDialog'
import { enrollmentColumn } from './enrollment-data'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Loading from '@/app/components/Loading'



function StudentsPage() {
    const students = useQuery(api.students.getStudent)



    if(!students){
        return <Loading/>
    }

    return (
        <div className='container mx-auto p-4'>
            <main className="space-y-4">
                <div className="flex items-center">
                    <div className="hidden md:flex   ml-auto items-center gap-2">
                      
                        <EnrollmentDialog />
                    </div>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>List of Students</CardTitle>
                        <CardDescription className="flex justify-between">
                           Manage the list of students.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className=''>
                        <div className="">
                            <DataTable
                                columns={enrollmentColumn}
                                // @ts-ignore
                                data={students}
                                filter="fullName"
                                placeholder="students by name"
                                
                            />
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default StudentsPage