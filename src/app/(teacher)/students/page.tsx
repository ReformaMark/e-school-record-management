/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { File, ListFilterIcon } from 'lucide-react'
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
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilterIcon className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    none
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    At risks/Needs Intervention
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Failed
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <EnrollmentDialog />
                    </div>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>List of Students</CardTitle>
                        <CardDescription>
                            <div className="flex justify-between">
                                <h1>Manage the list of students.</h1>

                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className=''>
                        <DataTable
                            columns={enrollmentColumn}
                            // @ts-ignore
                            data={students}
                            filter="fullName"
                            placeholder="students by name"

                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default StudentsPage