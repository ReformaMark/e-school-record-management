"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Link from "next/link";

export type Teacher = {
    id: string;
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

export const teacherColumns: ColumnDef<Teacher>[] = [
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
        accessorKey: "name",
        header: "Name",
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
        accessorKey: "position",
        header: "Position",
    },
    {
        accessorKey: "specialization",
        header: "Specialization",
    },
    {
        accessorKey: "advisoryClass",
        header: "Advisory Class",
        cell: ({ row }) => {
            return row.original.advisoryClass || "N/A";
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/sysadmin-teachers/sysadmin-edit-teacher/${row.original.id}`}>
                                Edit teacher
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>View schedule</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Delete teacher
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
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

export type SchoolSubjects = Record<"value" | "label", string>;

export const schoolSubjects = [
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