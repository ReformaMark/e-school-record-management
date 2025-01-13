/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

import { Button } from '@/components/ui/button'
import { File } from 'lucide-react'
import { StudentTable } from './_components/StudentTable'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function Studentpage() {
  return (
    
    <div className="container mx-auto p-4">
    <main className="">
        <div className="flex items-center">
            <div className="hidden md:flex   ml-auto items-center gap-2">
                {/* <DropdownMenu >
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
                </DropdownMenu> */}
                <Button size="sm" variant="outline" className="hidden md:flex  h-7 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                    </span>
                </Button>
            </div>
        </div>
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