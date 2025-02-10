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
import { api } from "../../../../../convex/_generated/api";
import { principalColumns } from "./columns";

const SystemAdminPrincipalListPage = () => {
    const principals = useQuery(api.admin.fetchPrincipals);
    const [showActive, setShowActive] = useState(true);
    const [showInactive, setShowInactive] = useState(true);
    const [selectedType, setSelectedType] = useState<"all" | "junior-high" | "senior-high">("all");

    const filteredPrincipals = principals?.filter(principal => {
        if (!showActive && principal.isActive) return false;
        if (!showInactive && !principal.isActive) return false;
        if (selectedType !== "all" && principal.schoolHeadType !== selectedType) return false;
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
                        <BreadcrumbPage>List of School Head</BreadcrumbPage>
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

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilterIcon className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        School Level
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by Level</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    checked={selectedType === "all"}
                                    onCheckedChange={() => setSelectedType("all")}
                                >
                                    All Levels
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={selectedType === "junior-high"}
                                    onCheckedChange={() => setSelectedType("junior-high")}
                                >
                                    Junior High
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={selectedType === "senior-high"}
                                    onCheckedChange={() => setSelectedType("senior-high")}
                                >
                                    Senior High
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button size="sm" variant="outline" className="h-7 gap-1" onClick={() => exportToExcel(filteredPrincipals || [], "school_principals")}>
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Link
                            href="/sysadmin-principal/handle-principal"
                            className={cn("", buttonVariants({
                                variant: "default",
                                size: "sm",
                                className: "text-white h-7 gap-1 w-full p-2"
                            }))}>
                            <PlusCircleIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add a principal
                            </span>
                        </Link>
                    </div>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>School Principals</CardTitle>
                        <CardDescription>
                            Manage school heads for both Junior and Senior High. Note: There can only be one active school head per level.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={principalColumns}
                            // @ts-expect-error slight typing issue
                            data={filteredPrincipals}
                            filter="firstName"
                            placeholder="principals by first name"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default SystemAdminPrincipalListPage;