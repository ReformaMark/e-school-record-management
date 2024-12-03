"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { useConfirm } from "@/hooks/use-confirm"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Define the Admin type based on what's returned from the API
type Admin = {
    _id: string
    firstName: string
    lastName: string
    email: string
    isActive?: boolean
    yearsOfExperience?: number
}

export const sysadminColumns: ColumnDef<Admin>[] = [
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
        cell: ({ row }) => {
            const admin = row.original
            const updateStatus = useMutation(api.admin.mutateStatus)
            const [ConfirmDialog, confirm] = useConfirm(
                `${admin.isActive ? "Deactivate" : "Activate"} Administrator`,
                `Are you sure you want to ${admin.isActive ? "deactivate" : "activate"} ${admin.firstName} ${admin.lastName}?`
            )

            const handleStatusChange = async () => {
                const confirmed = await confirm()
                if (confirmed) {
                    try {
                        await updateStatus({
                            adminId: admin._id as Id<"users">,
                            isActive: !admin.isActive
                        })
                        
                        toast.success(`Successfully ${admin.isActive ? "deactivated" : "activated"} ${admin.firstName} ${admin.lastName}`)
                    } catch (error) {
                        toast.error("Failed to update administrator status")
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
                                            Administrator Details
                                        </DialogTitle>
                                        <DialogDescription className="text-muted-foreground">
                                            Viewing details for <span className="font-medium">{admin.firstName} {admin.lastName}</span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-6 py-6">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold text-muted-foreground">Name</p>
                                            <p className="col-span-3 text-base">{admin.firstName} {admin.lastName}</p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold text-muted-foreground">Email</p>
                                            <p className="col-span-3 text-base">{admin.email}</p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold text-muted-foreground">Status</p>
                                            <p className={cn("col-span-3 text-base font-medium", 
                                                admin.isActive ? "text-green-600" : "text-red-600"
                                            )}>
                                                {admin.isActive ? "Active" : "Inactive"}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold text-muted-foreground">Experience</p>
                                            <p className="col-span-3 text-base">
                                                {admin.yearsOfExperience || 0} {admin.yearsOfExperience === 1 ? "year" : "years"}
                                            </p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <DropdownMenuItem onSelect={handleStatusChange}>
                                {admin.isActive ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        }
    }
]