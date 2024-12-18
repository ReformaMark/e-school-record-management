"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { exportToExcelTeachers } from "@/lib/export-to-excel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { File, ListFilterIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { teacherColumns } from "../../../../data/teachers-data";

const SystemAdminTeachersPage = () => {
    const teachers = useQuery(api.users.getTeachers);
    const [showAdviser, setShowAdviser] = useState(true);
    const [showSubjectTeacher, setShowSubjectTeacher] = useState(true);

    const filteredTeachers = teachers?.filter(teacher => {
        if (showAdviser && teacher.position === "adviser") return true;
        if (showSubjectTeacher && teacher.position === "subject-teacher") return true;
        return false;
    })

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
                                <DropdownMenuCheckboxItem
                                    checked={showAdviser}
                                    onCheckedChange={setShowAdviser}
                                >
                                    Adviser
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={showSubjectTeacher}
                                    onCheckedChange={setShowSubjectTeacher}
                                >
                                    Subject Teacher
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button 
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1"
                            onClick={() => exportToExcelTeachers(filteredTeachers || [], "teachers")}
                        >
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

                <Card>
                    <CardHeader>
                        <CardTitle>Teachers</CardTitle>
                        <CardDescription>Manage the list of teachers.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {filteredTeachers ? (
                            <DataTable
                                columns={teacherColumns}
                                data={filteredTeachers}
                                filter="firstName"
                                placeholder="Search teachers..."
                            />
                        ) : (
                            <div className="flex items-center justify-center h-24">
                                Loading...
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default SystemAdminTeachersPage;