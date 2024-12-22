"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"

export type SchoolYearType = {
    _id: string;
    batchName: string;
    startDate: string;
    endDate: string;
}

const ActionCell = ({ schoolYear }: { schoolYear: SchoolYearType }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const schoolYearColumns: ColumnDef<SchoolYearType>[] = [
    { accessorKey: "batchName", header: "Batch Name" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionCell schoolYear={row.original} />
    }
]

// export const schoolYearData = [
//     {
//         id: "1",
//         startDate: "2022-01-01",
//         endDate: "2022-12-31",
//         batchName: "Marilag",
//         isActive: true,
//     },
//     {
//         id: "2",
//         startDate: "2023-01-01",
//         endDate: "2023-12-31",
//         batchName: "Matining",
//         isActive: false,
//     },
//     {
//         id: "3",
//         startDate: "2024-01-01",
//         endDate: "2024-12-31",
//         batchName: "Mahusay",
//         isActive: false,
//     },
//     {
//         id: "4",
//         startDate: "2025-01-01",
//         endDate: "2025-12-31",
//         batchName: "Mabuhay",
//         isActive: false,
//     },
// ]


// export const schoolYearColumns = [
//     {
//         accessoryKey: "batchName",
//         header: "Batch Name",
//     },
// ]