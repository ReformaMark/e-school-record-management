/* eslint-disable @typescript-eslint/ban-ts-comment */


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { SectionAverageChart } from './_components/SectionAverageChart'
import { DataTable } from './_components/data-table'
import { sectionColumns, sections } from './section-data'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"


function SectionPage() {
  return (
    <div className='p-5 bg-white shadow-md m-5'>
        <Breadcrumb className="hidden md:flex mb-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-muted-foreground">Students</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage  >Sections</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>Manage the list of sections.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                   
                    columns={sectionColumns}
                    data={sections}
                    filter="section"
                    placeholder="section by section name"
                    
                />
            </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
            <SectionAverageChart />
        </div>
    </div>
  )
}

export default SectionPage