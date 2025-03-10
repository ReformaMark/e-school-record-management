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
import { useConfirm } from "@/hooks/use-confirm"
import { SchoolHeadType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useMutation } from "convex/react"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

// Define the Principal type
export type Principal = {
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
    houseNumber?: string
    postalCode?: string
    schoolHeadType: SchoolHeadType;
}

const ActionCell = ({ principal }: { principal: Principal }) => {
    // const updateStatus = useMutation(api.admin.mutateStatus)
    // const [ConfirmDialog, confirm] = useConfirm(
    //     `${principal.isActive ? "Deactivate" : "Activate"} Principal`,
    //     `Are you sure you want to ${principal.isActive ? "deactivate" : "activate"} ${principal.firstName} ${principal.lastName}?`
    // )
    const removeSchoolHead = useMutation(api.admin.removeAdmin)
    const router = useRouter()
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Principal",
        `Are you sure you want to delete ${principal.firstName} ${principal.lastName}?`
    )

    // const handleStatusChange = async () => {
    //     const confirmed = await confirm()
    //     if (confirmed) {
    //         try {
    //             await updateStatus({
    //                 adminId: principal._id as Id<"users">,
    //                 isActive: !principal.isActive
    //             })

    //             toast.success(`Successfully ${principal.isActive ? "deactivated" : "activated"} ${principal.firstName} ${principal.lastName}`)
    //         } catch {
    //             toast.error("Failed to update principal status")
    //         }
    //     }
    // }

    const handleDeletePrincipal = async () => {
        const confirmed = await confirm()
        if (confirmed) {
            try {
                removeSchoolHead({
                    id: principal._id as Id<"users">
                })

                toast.success("Principal has been deleted")
            } catch (error) {
                toast.error("Failed to delete principal")
            }
        }
    }

    return (
        <>
            <ConfirmDialog />

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
                                    Principal Details
                                </DialogTitle>
                                <DialogDescription className="text-muted-foreground">
                                    Viewing details for <span className="font-medium">{principal.firstName} {principal.lastName}</span>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-6">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Name</p>
                                    <p className="col-span-3 text-base">
                                        {principal.firstName} {principal.middleName ? `${principal.middleName} ` : ''}{principal.lastName}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                                    <p className="col-span-3 text-base">{principal.email}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Contact</p>
                                    <p className="col-span-3 text-base">{principal.contactNumber}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Birth Date</p>
                                    <p className="col-span-3 text-base">{principal.birthDate}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Gender</p>
                                    <p className="col-span-3 text-base capitalize">{principal.gender}</p>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Status</p>
                                    <p className={cn("col-span-3 text-base font-medium",
                                        principal.isActive ? "text-green-600" : "text-red-600"
                                    )}>
                                        {principal.isActive ? "Active" : "Inactive"}
                                    </p>
                                </div>
                                {principal.description && (
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <p className="text-sm font-semibold text-muted-foreground">Description</p>
                                        <p className="col-span-3 text-base">{principal.description}</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-semibold text-muted-foreground">Address</p>
                                    <p className="col-span-3 text-base">
                                        {[
                                            principal.houseNumber,
                                            principal.street,
                                            principal.barangay,
                                            principal.city,
                                            principal.province,
                                            principal.region,
                                            principal.postalCode
                                        ].filter(Boolean).join(', ')}
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                    {/* <DropdownMenuItem onSelect={handleStatusChange} className={principal.isActive ? "text-red-600" : "text-green-600"}>
                        {principal.isActive ? "Deactivate" : "Activate"}
                    </DropdownMenuItem> */}
                    <DropdownMenuItem
                        onClick={() => router.push(`/sysadmin-principal/edit-principal/${principal._id}`)}
                    >
                        Edit
                    </DropdownMenuItem>

                    {principal.isActive === false && (
                        <DropdownMenuItem
                            onClick={handleDeletePrincipal}
                            className="text-red-500"
                        >
                            Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export const principalColumns: ColumnDef<Principal>[] = [
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
        accessorKey: "schoolHeadType",
        header: "School Level",
        cell: ({ row }) => {
            const type = row.original.schoolHeadType;
            return type ? (
                <div className="capitalize">
                    {type === "junior-high" ? "Junior High" : "Senior High"}
                </div>
            ) : "Not specified";
        }
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
        cell: ({ row }) => <ActionCell principal={row.original} />
    }
] 