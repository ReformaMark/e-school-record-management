"use client"
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
    ChevronLeft,
    MinusIcon,
    PlusIcon
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { schoolPeriodData } from "../../../../../../data/school-period-data";

const SystemAdminAddSectionPage = () => {
    const [selectCount, setSelectCount] = useState<number>(1);

    const addSubjectTeacher = () => {
        if (selectCount >= 5) {
            toast.error("Cannot add more than 5 subject teachers")
        } else {
            setSelectCount(selectCount + 1);
        }
    }

    const removeSubjectTeacher = () => {
        if (selectCount <= 1) {
            toast.error("Cannot remove less than 1 subject teacher")
        } else {
            setSelectCount(selectCount - 1);
        }
    }

    return (
        <div className="container mx-auto p-4">
            {/* <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/sysadmin">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/sysadmin-registrar">Registrar</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add a School Registrar</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> */}

            <main className="space-y-4 mt-8">
                <div className="mx-auto grid max-w-full flex-1 auto-rows-max gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/sysadmin-sections"
                            className={cn("h-7 w-7", buttonVariants({
                                variant: "outline",
                                size: "icon",
                            }))}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Add a Section
                        </h1>

                        {/* Button for desktop/laptop users */}
                        <div className="hidden items-center gap-2 md:flex md:ml-auto">
                            <Button
                                size="sm"
                                className="text-white"
                            >
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8">
                            {/* Fname, Lname, Mname, Desc */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Section Details</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="sectionName" className="font-semibold">Section Name</Label>
                                            <Input
                                                id="sectionName"
                                                type="text"
                                                placeholder="Section name"
                                                className="w-full"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="select" className="font-semibold">School Year</Label>
                                            <Select>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select School Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>School Year</SelectLabel>
                                                        <SelectItem value="2018-2019">2018 - 2019</SelectItem>
                                                        <SelectItem value="2019-2020">2019 - 2020</SelectItem>
                                                        <SelectItem value="2020-2021">2020 - 2021</SelectItem>
                                                        <SelectItem value="2021-2022">2021 - 2022</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label htmlFor="select" className="font-semibold">Grade Level</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Grade Level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Grade Level</SelectLabel>
                                                            <SelectItem value="grade-7">Grade 7</SelectItem>
                                                            <SelectItem value="grade-8">Grade 8</SelectItem>
                                                            <SelectItem value="grade-9">Grade 9</SelectItem>
                                                            <SelectItem value="grade-10">Grade 10</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="select" className="font-semibold">Room Number</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select room number" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Room Number</SelectLabel>
                                                            <SelectItem value="101">101</SelectItem>
                                                            <SelectItem value="102">102</SelectItem>
                                                            <SelectItem value="103">103</SelectItem>
                                                            <SelectItem value="104">104</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label htmlFor="select" className="font-semibold">Adviser</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full truncate">
                                                        <SelectValue placeholder="Select Adviser for this section" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Advisers</SelectLabel>
                                                            <SelectItem value="John Doe">John Doe</SelectItem>
                                                            <SelectItem value="James Bond">James Bond</SelectItem>
                                                            <SelectItem value="Karen Jackson">Karen Jackson</SelectItem>
                                                            <SelectItem value="Frank Gallagher">Frank Gallagher</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="select" className="font-semibold">Subject</Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Subject" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Subjects</SelectLabel>
                                                            <SelectItem value="English">English</SelectItem>
                                                            <SelectItem value="Math">Math</SelectItem>
                                                            <SelectItem value="Science">Science</SelectItem>
                                                            <SelectItem value="History">History</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Other details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Subject Teachers</CardTitle>
                                    <CardDescription>
                                        Lipsum dolor sit amet, consectetur adipiscing elit
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
                                            {[...Array(selectCount)].map((_, index) => (
                                                <>
                                                    <div className="grid gap-2">
                                                        <Label htmlFor={`select-${index}`} className="font-semibold">
                                                            Teacher {index + 1}
                                                        </Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full truncate">
                                                                <SelectValue placeholder="Select teacher for this section" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Advisers</SelectLabel>
                                                                    <SelectItem value="John Doe">John Doe</SelectItem>
                                                                    <SelectItem value="James Bond">James Bond</SelectItem>
                                                                    <SelectItem value="Karen Jackson">Karen Jackson</SelectItem>
                                                                    <SelectItem value="Frank Gallagher">Frank Gallagher</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div key={index} className="grid gap-2">
                                                        <Label htmlFor={`select-${index}`} className="font-semibold">
                                                            Subject {index + 1}
                                                        </Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Subject" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Subjects</SelectLabel>
                                                                    <SelectItem value="English">English</SelectItem>
                                                                    <SelectItem value="Math">Math</SelectItem>
                                                                    <SelectItem value="Science">Science</SelectItem>
                                                                    <SelectItem value="History">History</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div key={index} className="grid gap-2">
                                                        <Label htmlFor={`select-${index}`} className="font-semibold">
                                                            Period {index + 1}
                                                        </Label>
                                                        <Select>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Period" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Period</SelectLabel>
                                                                    {schoolPeriodData.map((period) => (
                                                                        <SelectItem
                                                                            key={period.id}
                                                                            value={period.period}
                                                                        >
                                                                            {period.timeRange}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <Separator className="my-2 lg:hidden" />
                                                </>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                className="text-xs"
                                                onClick={removeSubjectTeacher}
                                            >
                                                <MinusIcon className="h-4 w-4 mr-1" />
                                                Remove Teacher
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                className="text-xs"
                                                onClick={addSubjectTeacher}
                                            >
                                                <PlusIcon className="h-4 w-4 mr-1" />
                                                Add Teacher
                                            </Button>
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

export default SystemAdminAddSectionPage;