import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { DataTable } from "@/components/data-table";
import { File, ListFilterIcon } from "lucide-react";
import Link from "next/link";
import { studentColumns, studentsData } from "../../../../data/students-data";

const SchoolRegistrarStudentsPage = () => {
    return (
        <div className="container mx-auto p-4">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/sr-dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Students</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="space-y-4">
                <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilterIcon className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Graduated
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Students</CardTitle>
                        <CardDescription>Manage the list of students.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={studentColumns}
                            data={studentsData}
                            filter="firstName"
                            placeholder="students by first name"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default SchoolRegistrarStudentsPage;