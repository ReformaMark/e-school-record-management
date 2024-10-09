import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { File, ListFilterIcon, PlusCircleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from '@/components/data-table'
import { endrollmentData, studentColumns } from '../../../../data/enrollment-data'

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
                                Adviser
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Subject Teacher
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Export
                        </span>
                    </Button>
                    <Link
                        href="/sysadmin-teachers/sysadmin-add-teacher"
                        className={cn("", buttonVariants({
                            variant: "default",
                            size: "sm",
                            className: "text-white h-7 gap-1 w-full p-2"
                        }))}>
                        <PlusCircleIcon className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                           enroll student
                        </span>
                    </Link>
                </div>
            </div>

            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Students</CardTitle>
                    <CardDescription>Manage the list of students.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={studentColumns}
                        data={endrollmentData}
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