"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { Award, Book, Calendar, Mail, MapPin, Phone, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";

const SystemAdminPrincipalPage = () => {
    const principals = useQuery(api.admin.fetchPrincipals);
    const currentPrincipal = principals?.find(p => p.isActive);

    const storageUrl = useQuery(api.files.getStorageUrl, 
        currentPrincipal?.imageStorageId ? { storageId: currentPrincipal.imageStorageId } : "skip"
    );

    if (!currentPrincipal) {
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
                            <BreadcrumbPage>Current School Head Principal</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="max-w-4xl mx-auto mt-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold">No Active Principal</h2>
                        <p className="text-muted-foreground mt-2">There is currently no active school head principal.</p>
                    </Card>
                </div>
            </div>
        );
    }

    const fullName = `${currentPrincipal.firstName} ${currentPrincipal.middleName ? `${currentPrincipal.middleName} ` : ''}${currentPrincipal.lastName}`;

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
                        <BreadcrumbPage>Current School Head Principal</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl mx-auto">
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            {storageUrl ? (
                                <Image
                                    className="h-48 w-full object-cover md:h-full md:w-48"
                                    width={200}
                                    height={200}
                                    src={storageUrl}
                                    alt={fullName}
                                />
                            ) : (
                                <Avatar className="h-48 w-full md:h-full md:w-48">
                                    <AvatarFallback className="text-4xl">
                                        {currentPrincipal.firstName[0]}{currentPrincipal.lastName[0]}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-[#099443] font-semibold">School Head Principal</div>
                            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {fullName}
                            </h1>
                            <p className="mt-2 text-xl text-gray-500">{currentPrincipal.description || "School Head Principal"}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-[#e6f7ed] text-[#099443]">School Head</Badge>
                                {currentPrincipal.gender && (
                                    <Badge variant="secondary" className="bg-[#e6f7ed] text-[#099443] capitalize">{currentPrincipal.gender}</Badge>
                                )}
                                <Badge variant="secondary" className="bg-[#e6f7ed] text-[#099443]">
                                    {currentPrincipal.isActive ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <Card className="bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <Mail className="h-5 w-5 text-[#099443] mr-2" />
                                <span>{currentPrincipal.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-[#099443] mr-2" />
                                <span>{currentPrincipal.contactNumber}</span>
                            </div>
                            {[
                                currentPrincipal.houseNumber,
                                currentPrincipal.street,
                                currentPrincipal.barangay,
                                currentPrincipal.city,
                                currentPrincipal.province,
                                currentPrincipal.region,
                                currentPrincipal.postalCode
                            ].some(Boolean) && (
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                    <span>
                                        {[
                                            currentPrincipal.houseNumber,
                                            currentPrincipal.street,
                                            currentPrincipal.barangay,
                                            currentPrincipal.city,
                                            currentPrincipal.province,
                                            currentPrincipal.region,
                                            currentPrincipal.postalCode
                                        ].filter(Boolean).join(', ')}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-[#099443] mr-2" />
                                <span>Birth Date: {new Date(currentPrincipal.birthDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Award className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                <span>Overall management of school operations</span>
                            </li>
                            <li className="flex items-start">
                                <Book className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                <span>Curriculum development and oversight</span>
                            </li>
                            <li className="flex items-start">
                                <Users className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                <span>Staff and student leadership</span>
                            </li>
                        </ul>
                    </Card>
                </div>

                {currentPrincipal.description && (
                    <Card className="bg-white p-6 mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">About {fullName}</h2>
                        <p className="text-gray-600 mb-4">
                            {currentPrincipal.description}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default SystemAdminPrincipalPage;