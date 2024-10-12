import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { GraduationCap, UserCheck, Users } from "lucide-react"
import { schoolStats } from "../../../../data/school-data"
import { StudentEnrollmentTrends } from "@/app/(system-admin)/_components/student-enrollment-trends"
import { TeacherPerformanceChart } from "@/components/teacher-performance-chart"
import { StudentPerformance } from "@/app/(system-admin)/_components/student-performance"
import { InterventionEffectiveness } from "@/app/(system-admin)/_components/intervention-effectiveness"
import { FormGenerationCard } from "@/app/(system-admin)/_components/form-generation-card"
import { StudentDistribution } from "@/app/(system-admin)/_components/student-distribution"

const SchoolHeadPage = () => {
    return (
        <div className="container mx-auto p-4">
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
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Registrars</CardTitle>
                        <UserCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.totalRegistrars}</div>
                        <p className="text-xs text-primary">School Registrars</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.totalTeachers}</div>
                        <p className="text-xs text-primary">Class Advisers and Subject Teachers</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.totalStudents}</div>
                        <p className="text-xs text-primary">Enrolled Students</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <StudentEnrollmentTrends />

                <TeacherPerformanceChart />

                <StudentPerformance />

                <InterventionEffectiveness />

                <FormGenerationCard />

                <StudentDistribution />
            </div>
        </div>
    )
}

export default SchoolHeadPage;