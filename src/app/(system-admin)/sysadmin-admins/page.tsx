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
import { exportToExcel } from "@/lib/export-to-excel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { File, ListFilterIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { sysadminColumns } from "./columns";

const SystemAdminListPage = () => {
    const admins = useQuery(api.admin.fetchAdmins);
    const [showActive, setShowActive] = useState(true);
    const [showInactive, setShowInactive] = useState(true);

    const filteredAdmins = admins?.filter(admin => {
        if (showActive && admin.isActive) return true;
        if (showInactive && !admin.isActive) return true;
        return false;
    });

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
                        <BreadcrumbPage>System Administrators</BreadcrumbPage>
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
                                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem 
                                    checked={showActive}
                                    onCheckedChange={setShowActive}
                                >
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem 
                                    checked={showInactive}
                                    onCheckedChange={setShowInactive}
                                >
                                    Inactive
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1" onClick={() => exportToExcel(filteredAdmins || [], "system_administrators")}>
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Link
                            href="/sysadmin-admins/sysadmin-add-admin"
                            className={cn("", buttonVariants({
                                variant: "default",
                                size: "sm",
                                className: "text-white h-7 gap-1 w-full p-2"
                            }))}>
                            <PlusCircleIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add an admin
                            </span>
                        </Link>
                    </div>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>System Administrators</CardTitle>
                        <CardDescription>Manage the list of system administrators. Note: Only ICT Coordinators can be admin</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={sysadminColumns}
                            data={filteredAdmins || []}
                            filter="firstName"
                            placeholder="administrators by first name"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default SystemAdminListPage;