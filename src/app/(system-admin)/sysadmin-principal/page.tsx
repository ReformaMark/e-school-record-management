import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Award, Book, Calendar, Mail, MapPin, Phone, Users } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { schoolHeadData } from "../../../../data/school-head-data";

const SystemAdminPrincipalPage = () => {

    const fullName = `${schoolHeadData.firstName} ${schoolHeadData.middleName} ${schoolHeadData.lastName}`

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
                        <BreadcrumbPage>School Head</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl mx-auto">
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:flex-shrink-0">
                            <Image
                                className="h-48 w-full object-cover md:h-full md:w-48"
                                width={200}
                                height={200}
                                src="https://github.com/shadcn.png"
                                alt="Dr. Margaret Thompson"
                            />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-[#099443] font-semibold">School Head Principal</div>
                            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                Dr. {fullName}
                            </h1>
                            <p className="mt-2 text-xl text-gray-500">Ph.D. in Educational Leadership</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-[#e6f7ed] text-[#099443]">20+ Years Experience</Badge>
                                <Badge variant="secondary" className="bg-[#e6f7ed] text-[#099443]">Curriculum Development Expert</Badge>
                                <Badge variant="secondary" className="bg-[#e6f7ed] text-[#099443]">Published Author</Badge>
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
                                <span>{schoolHeadData.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-5 w-5 text-[#099443] mr-2" />
                                <span>(555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 text-[#099443] mr-2" />
                                <span>Office 201, Administration Building</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="h-5 w-5 text-[#099443] mr-2" />
                                <span>Office Hours: Mon-Fri, 9AM-4PM</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Achievements</h2>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <Award className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                <span>Increased graduation rates by 15% over 5 years</span>
                            </li>
                            <li className="flex items-start">
                                <Book className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                <span>Implemented innovative STEM curriculum</span>
                            </li>
                            <li className="flex items-start">
                                <Users className="h-5 w-5 text-[#099443] mr-2 mt-1" />
                                <span>Established successful mentorship program</span>
                            </li>
                        </ul>
                    </Card>
                </div>

                <Card className="bg-white p-6 mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About Dr. {fullName}</h2>
                    <p className="text-gray-600 mb-4">
                        Dr. {fullName} has been at the helm of our school for over a decade, bringing with her a wealth of
                        experience in educational leadership and a passion for nurturing young minds. Her innovative approaches
                        to curriculum development and student engagement have transformed our institution into a beacon of
                        academic excellence.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Under her guidance, our school has seen remarkable improvements in student performance, teacher
                        satisfaction, and community involvement. Dr. {schoolHeadData.lastName} open-door policy and commitment to transparent
                        communication have fostered a collaborative and supportive environment for students, parents, and staff alike.
                    </p>
                    <Button className="bg-[#099443] hover:bg-[#077a36] text-white">
                        Read Full Bio
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default SystemAdminPrincipalPage;