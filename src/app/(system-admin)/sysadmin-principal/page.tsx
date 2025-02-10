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
import { Award, Book, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../../convex/_generated/api";
import { cn } from "@/lib/utils";

const SystemAdminPrincipalPage = () => {
    const principals = useQuery(api.admin.fetchPrincipals);
    const activeJHPrincipal = principals?.find(p =>
        p.isActive && p.schoolHeadType === "junior-high"
    );
    const activeSHPrincipal = principals?.find(p =>
        p.isActive && p.schoolHeadType === "senior-high"
    );

    const jhPrincipalImageUrl = useQuery(
        api.files.getStorageUrl,
        activeJHPrincipal?.imageStorageId
            ? { storageId: activeJHPrincipal.imageStorageId }
            : "skip"
    );
    const shPrincipalImageUrl = useQuery(
        api.files.getStorageUrl,
        activeSHPrincipal?.imageStorageId
            ? { storageId: activeSHPrincipal.imageStorageId }
            : "skip"
    );

    const renderPrincipalCard = (principal: typeof activeJHPrincipal, imageUrl: string | undefined) => {
        if (!principal) return null;

        const fullName = `${principal.firstName} ${principal.middleName ? `${principal.middleName} ` : ''}${principal.lastName}`;
        const isJH = principal.schoolHeadType === "junior-high";

        return (
            <div className="space-y-6 mb-9">
                <Card className={cn(
                    "bg-white shadow-lg rounded-lg overflow-hidden border-l-4",
                    isJH ? "border-l-blue-600" : "border-l-green-600"
                )}>
                    <div className="md:flex flex-col md:flex-row">
                        {/* Header for mobile */}
                        <div className="bg-gradient-to-r p-4 md:hidden text-center
                            from-gray-50 to-gray-100">
                            <Badge variant={isJH ? "default" : "secondary"}
                                className={cn(
                                    "text-sm md:text-base px-4 py-1",
                                    isJH ? "bg-blue-600 hover:bg-blue-600" : "bg-green-600 hover:bg-green-600",
                                    "text-white"
                                )}
                            >
                                {isJH ? "Junior High" : "Senior High"} School Head
                            </Badge>
                        </div>

                        <div className="md:shrink-0 p-6 flex items-center justify-center 
                            bg-gradient-to-b from-gray-50 to-gray-100">
                            {imageUrl ? (
                                <div className={cn(
                                    "rounded-full p-1",
                                    isJH ? "bg-blue-100" : "bg-green-100"
                                )}>
                                    <Image
                                        src={imageUrl}
                                        alt={fullName}
                                        width={120}
                                        height={120}
                                        className="rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>
                            ) : (
                                <div className={cn(
                                    "rounded-full p-1",
                                    isJH ? "bg-blue-100" : "bg-green-100"
                                )}>
                                    <Avatar className="h-[120px] w-[120px] border-4 border-white shadow-lg">
                                        <AvatarFallback className={cn(
                                            isJH ? "bg-blue-50" : "bg-green-50",
                                            isJH ? "text-blue-600" : "text-green-600"
                                        )}>
                                            {principal.firstName[0]}
                                            {principal.lastName[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            )}
                        </div>

                        <div className="p-8 flex-1">
                            {/* Badge for desktop */}
                            <Badge variant={isJH ? "default" : "secondary"}
                                className={cn(
                                    "mb-2 hidden md:inline-flex text-sm md:text-base px-4 py-1",
                                    isJH ? "bg-blue-600 hover:bg-blue-600" : "bg-green-600 hover:bg-green-600",
                                    "text-white"
                                )}
                            >
                                {isJH ? "Junior High" : "Senior High"} School Head
                            </Badge>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{fullName}</h2>
                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="h-4 w-4" />
                                    <span className="text-sm md:text-base truncate">{principal.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="h-4 w-4" />
                                    <span className="text-sm md:text-base">{principal.contactNumber}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    <Card className={cn(
                        "p-6 border-t-4",
                        isJH ? "border-t-blue-600" : "border-t-green-600"
                    )}>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-[#099443]" />
                            Contact Information
                        </h3>
                        <div className="space-y-3 text-gray-600">
                            {principal.houseNumber && principal.street && (
                                <p>{principal.houseNumber} {principal.street}</p>
                            )}
                            {principal.barangay && <p>Barangay {principal.barangay}</p>}
                            {principal.city && <p>{principal.city}</p>}
                            {principal.province && <p>{principal.province}</p>}
                            {principal.region && <p>{principal.region}</p>}
                            {principal.postalCode && <p>Postal Code: {principal.postalCode}</p>}
                        </div>
                    </Card>

                    <Card className={cn(
                        "p-6 border-t-4",
                        isJH ? "border-t-blue-600" : "border-t-green-600"
                    )}>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5 text-[#099443]" />
                            Responsibilities
                        </h3>
                        <div className="space-y-2">
                            <p className="text-gray-600">• Oversees academic programs and curriculum implementation</p>
                            <p className="text-gray-600">• Manages teaching and non-teaching staff</p>
                            <p className="text-gray-600">• Ensures compliance with DepEd guidelines</p>
                            <p className="text-gray-600">• Coordinates with stakeholders and community</p>
                        </div>
                    </Card>
                </div>

                {principal.description && (
                    <Card className={cn(
                        "p-6 border-t-4",
                        isJH ? "border-t-blue-600" : "border-t-green-600"
                    )}>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Book className="h-5 w-5 text-[#099443]" />
                            About
                        </h3>
                        <p className="text-gray-600">{principal.description}</p>
                    </Card>
                )}
            </div>
        );
    };

    if (!activeJHPrincipal && !activeSHPrincipal) {
        return (
            <div className="container mx-auto p-4">
                <Breadcrumb className="hidden md:flex">
                    {/* ... existing breadcrumb ... */}
                </Breadcrumb>

                <div className="max-w-4xl mx-auto mt-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold">No Active School Heads</h2>
                        <p className="text-muted-foreground mt-2">
                            There are currently no active school heads for either Junior or Senior High.
                        </p>
                    </Card>
                </div>
            </div>
        );
    }

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
                        <BreadcrumbPage>Current School Head</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl mx-auto">
                {activeJHPrincipal && (
                    <>
                        {renderPrincipalCard(activeJHPrincipal, jhPrincipalImageUrl as string | undefined)}
                    </>
                )}

                {activeSHPrincipal && (
                    <>
                        {renderPrincipalCard(activeSHPrincipal, shPrincipalImageUrl as string | undefined)}
                    </>
                )}

                {(!activeJHPrincipal || !activeSHPrincipal) && (
                    <Card className="bg-white p-6 mt-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Notice</h2>
                        <p className="text-gray-600">
                            {!activeJHPrincipal && "No active Junior High School Head. "}
                            {!activeSHPrincipal && "No active Senior High School Head."}
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default SystemAdminPrincipalPage;