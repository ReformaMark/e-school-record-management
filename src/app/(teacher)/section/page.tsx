
'use client'
import React from 'react'
import { SectionAverageChart } from './_components/SectionAverageChart'

import {  sections } from './section-data'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import SectionsCard from './_components/SectionsCard'


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
        <div className=' m-5 grid grid-cols-3 gap-10'>
            {sections.map((section) =>(
                <SectionsCard key={section.section} section={section}/>
            ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <SectionAverageChart />
        </div>
    </div>
  )
}

export default SectionPage