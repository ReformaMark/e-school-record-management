"use client"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useQuery } from "convex/react"
import { GraduationCap, School, UserCheck, Users } from "lucide-react"
import { api } from "../../../../convex/_generated/api"
import { InterventionEffectiveness } from "../_components/intervention-effectiveness"
import { StudentDistribution } from "../_components/student-distribution"
import { StudentPerformance } from "../_components/student-performance"

const SystemAdminPage = () => {
    const principals = useQuery(api.users.list, { role: "school-head" }) || [];
    const counts = useQuery(api.users.getCounts);

    const activeJHPrincipal = principals.find(p =>
        p.isActive && p.schoolHeadType === "junior-high"
    );
    const activeSHPrincipal = principals.find(p =>
        p.isActive && p.schoolHeadType === "senior-high"
    );

    return (
        <div className="p-4">
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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-[#A3C6C4] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Junior High Principal</CardTitle>
                        <School className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {activeJHPrincipal ?
                                `${activeJHPrincipal.lastName}, ${activeJHPrincipal.firstName}` :
                                "Not Assigned"}
                        </div>
                        <p className="text-xs text-white">Junior High School Head</p>
                    </CardContent>
                </Card>

                {/* Senior High Principal Card */}
                <Card className="bg-[#354649] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Senior High Principal</CardTitle>
                        <School className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {activeSHPrincipal ?
                                `${activeSHPrincipal.lastName}, ${activeSHPrincipal.firstName}` :
                                "Not Assigned"}
                        </div>
                        <p className="text-xs text-white">Senior High School Head</p>
                    </CardContent>
                </Card>

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
                <StudentPerformance />

                {/* <FormGenerationCard /> */}

                <StudentDistribution />

                <InterventionEffectiveness />

            </div>

        </div>
    )
}

export default SystemAdminPage;