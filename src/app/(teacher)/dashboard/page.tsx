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
import { GraduationCapIcon, UserCheckIcon, Users2Icon } from "lucide-react"
import EraInterventionCard from "./_components/era-intervention-card"
import { EraSparCard } from "./_components/era-spar-card"
function DashboardPage() {
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

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-foreground text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <UserCheckIcon className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs ">Total Students</p>
          </CardContent>
        </Card>
        <Card className="bg-primary-foreground text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <Users2Icon className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs ">At-Risk Students</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Interventions</CardTitle>
            <GraduationCapIcon className="h-4 w-4 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27</div>
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