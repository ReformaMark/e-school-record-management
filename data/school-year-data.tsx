"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../convex/_generated/api";
import { Doc } from "../convex/_generated/dataModel";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";


const ActionCell = ({ schoolYear }: { schoolYear: Doc<"schoolYears"> }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const updateSchoolYear = useMutation(api.schoolYear.update);
    const removeSchoolYear = useMutation(api.schoolYear.remove);

    const [ConfirmDialog, confirm] = useConfirm(
        "Delete School Year",
        "Are you sure you want to delete this school year?"
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            batchName: schoolYear.batchName,
            startDate: schoolYear.startDate,
            endDate: schoolYear.endDate,
            sy: schoolYear.sy
        }
    });

    const onSubmit = async (data: any) => {
        try {
            await updateSchoolYear({
                id: schoolYear._id,
                ...data
            });
            toast.success("School year updated successfully");
            setIsEditOpen(false);
        } catch (error) {
            toast.error("Error updating school year: " + (error as Error).message);
        }
    };

    const handleDelete = async () => {
        const confirmed = await confirm();
        if (confirmed) {
            try {
                await removeSchoolYear({ id: schoolYear._id });
                toast.success("School year deleted successfully");
            } catch (error) {
                toast.error("Error deleting school year: " + (error as Error).message);
            }
        }
    };

    return (
        <>
            <ConfirmDialog />
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onSelect={(e) => {
                                e.preventDefault();
                                setIsEditOpen(true);
                            }}
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onSelect={handleDelete}
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-black">Edit School Year</DialogTitle>
                        <DialogDescription>
                            Make changes to the school year details
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="batchName">Batch Name</Label>
                                <Input
                                    {...register("batchName", { required: true })}
                                    placeholder="Enter batch name"
                                />
                                {errors.batchName && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input
                                    type="date"
                                    {...register("startDate", { required: true })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input
                                    type="date"
                                    {...register("endDate", { required: true })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="sy">School Year</Label>
                                <Input
                                    {...register("sy", { required: true })}
                                    placeholder="e.g., 2025-2026"
                                />
                            </div>
                        </div>
                        <Button type="submit" className="text-white">Save changes</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export const schoolYearColumns: ColumnDef<Doc<"schoolYears">>[] = [
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