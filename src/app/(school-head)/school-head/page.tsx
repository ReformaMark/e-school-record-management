"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { FormGenerationCard } from "@/app/(system-admin)/_components/form-generation-card"
import { InterventionEffectiveness } from "@/app/(system-admin)/_components/intervention-effectiveness"
import { StudentDistribution } from "@/app/(system-admin)/_components/student-distribution"
import { StudentEnrollmentTrends } from "@/app/(system-admin)/_components/student-enrollment-trends"
import { StudentPerformance } from "@/app/(system-admin)/_components/student-performance"
import { useQuery } from "convex/react"
import { GraduationCap, UserCheck, Users } from "lucide-react"
import { api } from "../../../../convex/_generated/api"

const SchoolHeadPage = () => {
    const counts = useQuery(api.users.getCounts);

    return (
        <div className="container mx-auto py-6 px-4">
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

            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card className="bg-[#6C7A89] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Registrars</CardTitle>
                        <UserCheck className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {counts?.totalRegistrars || 0}
                        </div>
                        <p className="text-xs text-white">School Registrars</p>
                    </CardContent>
                </Card>

                <Card className="bg-[#354649] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <Users className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {counts?.totalTeachers || 0}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#6C7A89] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {counts?.totalStudents || 0}
                        </div>
                        <p className="text-xs text-white">Enrolled Students</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <StudentEnrollmentTrends />

                {/* <TeacherPerformanceChart /> */}

                <StudentPerformance />

                <InterventionEffectiveness />

                <FormGenerationCard />

                <StudentDistribution />
            </div>
        </div>
    )
}

export default SchoolHeadPage;