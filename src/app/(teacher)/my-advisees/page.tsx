/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { File, ListFilterIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { studentsData } from '../../../../data/students-data'
import { studentColumn } from './_components/studentsColumn'
import EnrollmentDialog from './_components/EnrollmentDialog'

function Studentpage() {
  return (
    <div>
      <div className="container mx-auto p-4">
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard">Students</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Advisees</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
                    <EnrollmentDialog/>
                </div>
            </div>

            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                    <CardDescription>
                        <div className="flex justify-between">
                            <h1>Manage the list of students.</h1>
                            <div className="text-xs">
                                <div className="flex items-center gap-x-2">
                                    <div className="bg-blue-600 p-1 rounded-full size-2"></div>
                                    <h1 className=''>Ready for promotion</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <div className="bg-orange-600 p-1 rounded-full size-2"></div>
                                    <h1 className=''>Needs Intervention</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <div className="bg-red-600 p-1 rounded-full size-2"></div>
                                    <h1 className=''>Failed</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <div className="bg-text p-1 rounded-full size-2"></div>
                                    <h1 className=''>Pending</h1>
                                </div>
        
                            </div>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        //@ts-expect-error
                        columns={studentColumn}
                        data={studentsData}
                        filter="lastName"
                        placeholder="students by Last Name"
                        
                    />
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  )
}

export default Studentpage