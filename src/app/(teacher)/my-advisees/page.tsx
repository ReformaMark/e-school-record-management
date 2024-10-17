/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { File, ListFilterIcon } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { studentsData } from '../../../../data/students-data'
import { studentColumn } from './_components/studentsColumn'

function Studentpage() {
  return (
    <div className='max-w-full'>
      <div className="container mx-auto px-2 md:p-4">
        <main className="max-w-full grid flex-1 items-start gap-4  sm:px-6 sm:py-0 md:gap-8">
            <div className="flex items-center">
                <div className="hidden md:flex   ml-auto items-center gap-2">
                    <DropdownMenu >
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
                    <Button size="sm" variant="outline" className="hidden md:flex  h-7 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Export
                        </span>
                    </Button>
                </div>
            </div>
            <div className='bg-white p-3'>
                <h1 className='font-semibold text-primary text-lg'>Advisory Class</h1>
                <p className='text-primary/50 text-xs'>List of students</p>
                <DataTable
                    //@ts-expect-error
                    columns={studentColumn}
                    data={studentsData}
                    filter="lastName"
                    placeholder="students by Last Name"
                    
                />
            </div>
         
        </main>
      </div>
    </div>
  )
}

export default Studentpage