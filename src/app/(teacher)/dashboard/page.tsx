"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useQuery } from "convex/react"
import { GraduationCapIcon, UserCheckIcon } from "lucide-react"
import { api } from "../../../../convex/_generated/api"
import EraInterventionCard from "./_components/era-intervention-card"
import { EraSparCard } from "./_components/era-spar-card"

function DashboardPage() {
  const counts = useQuery(api.students.getTeacherStudentsCount);

  return (
    <div className='containter mx-auto p-4 space-y-3'>
      <Breadcrumb className="hidden md:flex mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-muted-foreground">Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Overview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card className="bg-[#354649] text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UserCheckIcon className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts?.totalStudents || 0}</div>
            <p className="text-xs ">Total Students</p>
          </CardContent>
        </Card>

        {/* <Card className="bg-[#354649] text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <Users2Icon className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts?.atRiskStudents || 0}</div>
            <p className="text-xs ">At-Risk Students</p>
          </CardContent>
        </Card> */}

        <Card className="bg-[#354649] text-white border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Interventions</CardTitle>
            <GraduationCapIcon className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts?.pendingInterventions || 0}</div>
            <p className="text-xs ">Pending Interventions</p>
          </CardContent>
        </Card>
      </div>

      <EraSparCard />

      <EraInterventionCard />

      {/* <EraPostInterventionCard /> */}
    </div>
  )
}

export default DashboardPage