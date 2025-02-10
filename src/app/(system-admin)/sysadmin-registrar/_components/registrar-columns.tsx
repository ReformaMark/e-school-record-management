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
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

export type Registrar = {
    _id: string
    firstName: string
    middleName?: string
    lastName: string
    email: string
    contactNumber: string
    birthDate: string
    isActive?: boolean
    description?: string
    gender: string
    region?: string
    province?: string
    city?: string
    barangay?: string
    street?: string
    employeeId?: string
}

const ActionCell = ({ registrar }: { registrar: Registrar }) => {
    const router = useRouter()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                View Details
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="bg-white text-black max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold tracking-tight">
                                    Registrar Details
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground">
                                    Viewing details for <span className="font-medium">{registrar.firstName} {registrar.lastName}</span>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-6">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Name</p>
                                    <p className="col-span-3 text-base">
                                        {registrar.firstName} {registrar.middleName ? `${registrar.middleName} ` : ''}{registrar.lastName}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                                    <p className="col-span-3 text-base">{registrar.email}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Contact</p>
                                    <p className="col-span-3 text-base">{registrar.contactNumber}</p>
                                </div>
                                {registrar.employeeId && (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <p className="text-sm font-semibold text-muted-foreground">Employee ID</p>
                                        <p className="col-span-3 text-base">{registrar.employeeId}</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Status</p>
                                    <p className={cn("col-span-3 text-base font-medium",
                                        registrar.isActive ? "text-green-600" : "text-red-600"
                                    )}>
                                        {registrar.isActive ? "Active" : "Inactive"}
                                    </p>
                                </div>
                                {registrar.description && (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <p className="text-sm font-semibold text-muted-foreground">Description</p>
                                        <p className="col-span-3 text-base">{registrar.description}</p>
                                    </div>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <DropdownMenuItem
                        onClick={() => router.push(`/sysadmin-registrar/edit-registrar/${registrar._id}`)}
                    >
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export const registrarColumns: ColumnDef<Registrar>[] = [
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "employeeId",
        header: "Employee ID"
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
            <span className={row.original.isActive ? "text-green-600" : "text-red-600"}>
                {row.original.isActive ? "Active" : "Inactive"}
            </span>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => <ActionCell registrar={row.original} />
    }
];