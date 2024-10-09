'use client'
import React from 'react'
import SectionsCard from './_components/SectionsCard'
import { sections } from '../section/section-data'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
function ClassRecordPage() {

  return (
    <div className=" m-5 ">
        <Breadcrumb className="hidden md:flex mb-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-muted-foreground">Students</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Class Records</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <h1 className='text-sm text-muted-foreground w-full text-right'>Total handled Sections: {sections.length}</h1>
        <div className=' m-5 grid grid-cols-3 gap-10'>
            
            {sections.map((section) =>(
                <SectionsCard key={section.section} section={section}/>
            ))}
        </div>
    </div>
  )
}

export default ClassRecordPage