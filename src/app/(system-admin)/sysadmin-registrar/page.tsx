"use client";

import { DataTable } from "@/components/data-table";
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
import { exportToExcel } from "@/lib/export-to-excel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { File, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { registrarColumns } from "./_components/registrar-columns";

const SystemAdminRegistrarPage = () => {
    const registrars = useQuery(api.users.fetchRegistrars);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showActive, setShowActive] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [showInactive, setShowInactive] = useState(true);

    const filteredRegistrars = registrars?.filter(registrar => {
        if (!showActive && registrar.isActive) return false;
        if (!showInactive && !registrar.isActive) return false;
        return true;
    }) || [];

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
                        <BreadcrumbPage>Registrar</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="space-y-4">
                <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                        {/* <DropdownMenu>
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
                        </DropdownMenu> */}

                        <Button size="sm" variant="outline" className="h-7 gap-1"
                            onClick={() => exportToExcel(filteredRegistrars || [], "school_registrars")}
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>

                        <Link
                            href="/sysadmin-registrar/sysadmin-add-registrar"
                            className={cn("", buttonVariants({
                                variant: "default",
                                size: "sm",
                                className: "text-white h-7 gap-1 w-full p-2"
                            }))}
                        >
                            <PlusCircleIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add registrar
                            </span>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>School Registrars</CardTitle>
                        <CardDescription>
                            Manage school registrars and their information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={registrarColumns}
                            // @ts-expect-error slight type issue
                            data={filteredRegistrars}
                            filter="firstName"
                            placeholder="Search registrars by first name"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
};

export default SystemAdminRegistrarPage;