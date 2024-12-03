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
                                        View
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent className="bg-white text-black">
                                    <DialogHeader>
                                        <DialogTitle>Administrator Details</DialogTitle>
                                        <DialogDescription>
                                            Details for {admin.firstName} {admin.lastName}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="font-medium">Name:</p>
                                            <p className="col-span-3">{admin.firstName} {admin.lastName}</p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="font-medium">Email:</p>
                                            <p className="col-span-3">{admin.email}</p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="font-medium">Status:</p>
                                            <p className="col-span-3">{admin.isActive ? "Active" : "Inactive"}</p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="font-medium">Experience:</p>
                                            <p className="col-span-3">{admin.yearsOfExperience || 0} years</p>
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