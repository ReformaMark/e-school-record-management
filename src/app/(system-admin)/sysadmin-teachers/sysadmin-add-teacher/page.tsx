
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import {
    CalendarIcon,
    ChevronLeft,
    Upload
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { schoolSubjects } from "../../../../../data/teachers-data";
import { MultiSelectSubject } from "../../_components/multi-select-subject";

const SystemAdminAddTeacherPage = () => {
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
                        <BreadcrumbLink asChild>
                            <Link href="/sysadmin-teachers">Teachers</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add a Teacher</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/sysadmin-teachers"
                            className={cn("h-7 w-7", buttonVariants({
                                variant: "outline",
                                size: "icon",
                            }))}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Add a Teacher
                        </h1>

                        {/* Button for desktop/laptop users */}
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                size="sm"
                                className="text-white"
                            >
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            {/* Fname, Lname, Mname, Desc */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Teacher Details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                className="w-full"
                                                placeholder="zKj6w@example.com"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">First Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Last Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Middle Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Kennedy"
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="empId">Employee ID</Label>
                                                <Input
                                                    id="empId"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="2023-002"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* password and current password */}
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    className="w-full"
                                                    placeholder="********"
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Confirm Password</Label>
                                                <Input
                                                    id="cpassword"
                                                    type="password"
                                                    className="w-full"
                                                    placeholder="********"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Other details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Other details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="bday">Birthday</Label>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    // !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <span>Pick a date</span>
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="gender">Gender</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Gender</SelectLabel>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                {/* contact number */}
                                                <Label htmlFor="contact">Contact Number</Label>
                                                <Input
                                                    id="contact"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Enter your contact number"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="gender">Specialization</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a specialization" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Subjects</SelectLabel>
                                                            {schoolSubjects.map((subject, i) => (
                                                                <SelectItem key={i} value={subject.value}>
                                                                    {subject.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                {/* contact number */}
                                                <Label htmlFor="yrsOfExp">Years of Experience</Label>
                                                <Input
                                                    id="yrsOfExp"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Enter years of experience"
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </CardContent>
                            </Card>

                            {/* Address details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Address Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="province">Province</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select province" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Province</SelectLabel>
                                                            <SelectItem value="negros-oriental">Negros Oriental</SelectItem>
                                                            <SelectItem value="pangasinan">Pangasinan</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="city">City</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select city" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>City</SelectLabel>
                                                            <SelectItem value="metropolitan-manila">Metropolitan Manila</SelectItem>
                                                            <SelectItem value="quezon-city">Quezon City</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="brgy">Barangay</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select brgy" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Barangay</SelectLabel>
                                                            <SelectItem value="bahay-toro">Brgy. Bahay Toro</SelectItem>
                                                            <SelectItem value="san-jose">Brgy. Bahay San Jose</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="strt">Street</Label>
                                                <Input
                                                    id="strt"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Enter street"
                                                />
                                            </div>
                                        </div>


                                        <div className="grid gap-3">
                                            <Label htmlFor="address">Complete Address</Label>
                                            <Input
                                                id="address"
                                                type="text"
                                                className="w-full"
                                                placeholder="Enter address"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            {/* academic details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Academic Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Position</Label>
                                            <Select>
                                                <SelectTrigger id="status" aria-label="Select status">
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="adviser">Adviser</SelectItem>
                                                    <SelectItem value="subject-teacher">Subject Teacher</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="subjects">Advisory Class</Label>
                                            <Select>
                                                <SelectTrigger id="subjects" aria-label="Select subjects">
                                                    <SelectValue placeholder="Select subjects" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Sections</SelectLabel>
                                                        <SelectItem value="math">Section 1 (Oxygen)</SelectItem>
                                                        <SelectItem value="science">Section 2 (Phosporus)</SelectItem>
                                                        <SelectItem value="english">Section 3 (Hydrogen)</SelectItem>
                                                        <SelectItem value="history">Section 4 (Iron)</SelectItem>
                                                        <SelectItem value="physical-education">Section 5 (Boron)</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* MULTI-SELECT SUBJECTS */}
                                        <MultiSelectSubject />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* teacher Image */}
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle>Teacher Image</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <div className="grid grid-cols-1 gap-2">
                                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Button for mobile users */}
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button
                            size="sm"
                            className="text-white"
                        >
                            Save Product
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default SystemAdminAddTeacherPage;