import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, School, UserCheck, Users } from "lucide-react"
import { FormGenerationCard } from "../_components/form-generation-card"
import { InterventionEffectiveness } from "../_components/intervention-effectiveness"
import { StudentDistribution } from "../_components/student-distribution"
import { StudentPerformance } from "../_components/student-performance"

const SystemAdminPage = () => {

    const schoolStats = {
        principal: "Dr. Jane Smith",
        totalRegistrars: 5,
        totalTeachers: 50,
        totalStudents: 1000
    }

    return (
        <div className="container mx-auto p-4">
            {/* <h1 className="text-2xl font-bold mb-6">School Dashboard</h1> */}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Principal</CardTitle>
                        <School className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{schoolStats.principal}</div>
                        <p className="text-xs text-primary">School Head</p>
                    </CardContent>
                </Card>
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
                <StudentPerformance />

                <InterventionEffectiveness />

                <FormGenerationCard />
                {/* <StudentEnrollmentTrends /> */}

                <StudentDistribution />
            </div>

        </div>
    )
}

export default SystemAdminPage;