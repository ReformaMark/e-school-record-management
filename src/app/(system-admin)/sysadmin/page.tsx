import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { GraduationCap, School, UserCheck, Users } from "lucide-react"
import { schoolStats } from "../../../../data/school-data"
import { FormGenerationCard } from "../_components/form-generation-card"
import { InterventionEffectiveness } from "../_components/intervention-effectiveness"
import { StudentDistribution } from "../_components/student-distribution"
import { StudentPerformance } from "../_components/student-performance"

const SystemAdminPage = () => {

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card className="bg-[#A3C6C4] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Principal</CardTitle>
                        <School className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.principal}</div>
                        <p className="text-xs text-white">School Head</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#6C7A89] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Registrars</CardTitle>
                        <UserCheck className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.totalRegistrars}</div>
                        <p className="text-xs text-white">School Registrars</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#354649] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <Users className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.totalTeachers}</div>
                        <p className="text-xs text-white">Class Advisers and Subject Teachers</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#A3C6C4] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-white" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.totalStudents}</div>
                        <p className="text-xs text-white">Enrolled Students</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <StudentPerformance />

                <FormGenerationCard />

                <StudentDistribution />

                <InterventionEffectiveness />

            </div>

        </div>
    )
}

export default SystemAdminPage;