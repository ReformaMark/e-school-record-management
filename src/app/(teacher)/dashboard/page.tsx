import React from 'react'
import StatsOverview from './_components/StatsOverview'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

function DashboardPage() {
  return (
    <div className=''>
       <Breadcrumb className="hidden md:flex mb-6">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-muted-foreground">Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <StatsOverview/>
    </div>
  )
}

export default DashboardPage