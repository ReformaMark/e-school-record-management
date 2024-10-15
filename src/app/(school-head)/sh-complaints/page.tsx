import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { CheckCircle2Icon, ClockIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
import { ComplaintsCard } from "./_components/complaints-card";

const SchoolHeadComplaintsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/school-head">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Complaints</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <Card className="bg-[#A3C6C4] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                        <MessageSquareIcon className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold ">28</div>
                        <p className="text-xs ">+2 from last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#354649] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium ">Pending</CardTitle>
                        <ClockIcon className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold ">7</div>
                        <p className="text-xs ">Requires attention</p>
                    </CardContent>
                </Card>
                <Card className="bg-[#6C7A89] text-white border-none">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium ">Resolved</CardTitle>
                        <CheckCircle2Icon className="h-4 w-4 " />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">21</div>
                        <p className="text-xs">75% resolution rate</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ComplaintsCard />
            </div>
        </div>
    )
}

export default SchoolHeadComplaintsPage;