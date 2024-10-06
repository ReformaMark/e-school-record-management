import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import Link from "next/link";
import { File, ListFilterIcon, PlusCircleIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { teacherColumns, teachersData } from "../../../../data/teachers-data";
import { cn } from "@/lib/utils";

// Column definitions for the DataTable


const SystemAdminTeachersPage = () => {
    return (
        <div className="container mx-auto p-4">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/sysadmin">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Teachers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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
                                    Adviser
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Subject Teacher
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Link
                            href="/sysadmin-teachers/sysadmin-add-teacher"
                            className={cn("", buttonVariants({
                                variant: "default",
                                size: "sm",
                                className: "text-white h-7 gap-1 w-full p-2"
                            }))}>
                            <PlusCircleIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add teacher
                            </span>
                        </Link>
                    </div>
                </div>

                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Teachers</CardTitle>
                        <CardDescription>Manage the list of teachers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={teacherColumns}
                            data={teachersData}
                            filter="firstName"
                            placeholder="teachers by first name"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default SystemAdminTeachersPage;