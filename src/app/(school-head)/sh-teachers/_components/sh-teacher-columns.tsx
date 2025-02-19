"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

export type Teacher = {
    id: Id<"users">;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    employeeId: string;
    position: string;
    specialization: string;
    advisoryClass?: string;
    imageUrl?: string;
}

export const ShTeacherColumns: ColumnDef<Teacher>[] = [
    {
        accessorKey: "imageUrl",
        header: "",
        cell: ({ row }) => {
            const initials = `${row.original.firstName[0]}${row.original.lastName[0]}`;
            return (
                <Avatar className="h-8 w-8">
                    <AvatarImage src={row.original.imageUrl} alt={`${row.original.firstName} ${row.original.lastName}`} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            );
        },
    },
    {
        accessorKey: "employeeId",
        header: "Employee ID",
    },
    {
        accessorKey: "firstName",
        header: "Full Name",
        cell: ({ row }) => {
            const fullName = `${row.original.firstName} ${row.original.middleName ? row.original.middleName + ' ' : ''}${row.original.lastName}`;
            return <span className="font-medium">{fullName}</span>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "specialization",
        header: "Specialization",
        cell: ({ row }) => {
            const specialization = row.original.specialization

            return (
                <div>
                    {
                        specialization === "math" ? "Math"
                            : specialization === "english" ? "English"
                                : specialization === "physical-education" ? "Physical Education"
                                    : specialization === "science" ? "Science"
                                        : specialization === "history" ? "History"
                                            : "No specialization assigned"
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "advisoryClass",
        header: "Classes",
        cell: function Cell({ row }) {
            const classes = useQuery(api.classes.getClassesByTeacherId, {
                teacherId: row.original.id
            });
            const [isOpen, setIsOpen] = useState(false);

            if (!classes) return "Loading...";
            if (classes.length === 0) return "No classes assigned";

            return (
                <>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-8 px-2 text-left font-normal">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <Users className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{classes[0]?.subject?.name}</span>
                                    {classes.length > 1 && (
                                        <Badge variant="secondary" className="ml-auto">
                                            +{classes.length - 1}
                                        </Badge>
                                    )}
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] max-w-4xl h-[90vh] flex flex-col p-3">
                            <DialogHeader className="px-6 pt-6">
                                <DialogTitle className="text-black">Classes for {row.original.firstName} {row.original.lastName}</DialogTitle>
                                <DialogDescription>
                                    Assigned classes and their details
                                </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="flex-1 p-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {classes.map((classItem) => (
                                        <div
                                            key={classItem?._id}
                                            className="rounded-lg border bg-card text-card-foreground shadow-sm"
                                        >
                                            <div className="space-y-1.5 p-4">
                                                <h3 className="font-semibold tracking-tight text-base">
                                                    {classItem?.subject?.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {classItem?.section?.name} • {classItem?.section?.gradeLevel?.level}
                                                </p>
                                            </div>
                                            {classItem?.track && (
                                                <div className="px-4 py-2 bg-muted/50">
                                                    <Badge variant="outline" className="h-5 px-1.5 text-xs font-normal bg-foreground text-white capitalize">
                                                        {classItem?.track}
                                                    </Badge>
                                                </div>
                                            )}
                                            <div className="p-4 space-y-3">
                                                {classItem?.schedules?.map((schedule) => (
                                                    <div key={schedule._id} className="space-y-1.5">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <div className="flex flex-wrap gap-1">

                                                                {(Array.isArray(schedule.day) ? schedule.day :
                                                                    // @ts-expect-error bug
                                                                    schedule.day.split(','))
                                                                    .map((day: string) => (
                                                                        <Badge
                                                                            key={day}
                                                                            variant="outline"
                                                                            className="h-5 px-1.5 text-xs font-normal text-black border-black"
                                                                        >
                                                                            {day.trim()}
                                                                        </Badge>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                        <div className="ml-6 space-y-1">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock className="h-3 w-3" />
                                                                <span>{schedule.schoolPeriod?.timeRange}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <MapPin className="h-3 w-3" />
                                                                <span>{schedule.room?.name}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </>
            );
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem asChild>
    //                         <Link href={`/sysadmin-teachers/sysadmin-edit-teacher/${row.original.id}`}>
    //                             Edit teacher
    //                         </Link>
    //                     </DropdownMenuItem>
    //                     {/* <DropdownMenuItem>View schedule</DropdownMenuItem> */}
    //                     {/* <DropdownMenuItem className="text-destructive">
    //                         Delete teacher
    //                     </DropdownMenuItem> */}
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
];

export const teachersData = [
    {
        id: "1",
        firstName: "Emily",
        middleName: "Rose",
        lastName: "Johnson",
        email: "emily.johnson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/emily.jpg",
        role: "teacher",
        specialization: "Mathematics",
        yearsOfExperience: 8
    },
    {
        id: "2",
        firstName: "Michael",
        middleName: "",
        lastName: "Smith",
        email: "michael.smith@school.edu",
        emailVerified: true,
        image: "https://example.com/images/michael.jpg",
        role: "teacher",
        specialization: "Science",
        yearsOfExperience: 12
    },
    {
        id: "3",
        firstName: "Sarah",
        middleName: "Elizabeth",
        lastName: "Brown",
        email: "sarah.brown@school.edu",
        emailVerified: true,
        image: "https://example.com/images/sarah.jpg",
        role: "teacher",
        specialization: "English",
        yearsOfExperience: 5
    },
    {
        id: "4",
        firstName: "David",
        middleName: "Alan",
        lastName: "Wilson",
        email: "david.wilson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/david.jpg",
        role: "teacher",
        specialization: "History",
        yearsOfExperience: 15
    },
    {
        id: "5",
        firstName: "Lisa",
        middleName: "",
        lastName: "Taylor",
        email: "lisa.taylor@school.edu",
        emailVerified: true,
        image: "https://example.com/images/lisa.jpg",
        role: "teacher",
        specialization: "Physical Education",
        yearsOfExperience: 7
    }
];

type SchoolSubjects = Record<"value" | "label", string>;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const schoolSubjects = [
    {
        value: "math",
        label: "Mathematics",
    },
    {
        value: "science",
        label: "Science",
    },
    {
        value: "english",
        label: "English",
    },
    {
        value: "history",
        label: "History",
    },
    {
        value: "physical-education",
        label: "Physical Education",
    },
] satisfies SchoolSubjects[];