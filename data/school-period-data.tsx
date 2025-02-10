"use client"

import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../convex/_generated/api";
import { Doc } from "../convex/_generated/dataModel";
import { useMutation } from "convex/react";

const ActionCell = ({ schoolPeriod }: { schoolPeriod: Doc<"schoolPeriods"> }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const updateSchoolPeriod = useMutation(api.schoolPeriod.update);
    const removeSchoolPeriod = useMutation(api.schoolPeriod.remove);

    const [ConfirmDialog, confirm] = useConfirm(
        "Delete School Period",
        "Are you sure you want to delete this school period? This action cannot be undone."
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            period: schoolPeriod.period,
            timeRange: schoolPeriod.timeRange,
        }
    });

    const onSubmit = async (data: any) => {
        try {
            await updateSchoolPeriod({
                id: schoolPeriod._id,
                ...data
            });
            toast.success("School period updated successfully");
            setIsEditOpen(false);
        } catch (error) {
            toast.error("Error updating school period: " + (error as Error).message);
        }
    };

    const handleDelete = async () => {
        const confirmed = await confirm();
        if (confirmed) {
            try {
                await removeSchoolPeriod({ id: schoolPeriod._id });
                toast.success("School period deleted successfully");
            } catch (error) {
                toast.error("Error deleting school period: " + (error as Error).message);
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
                        <DialogTitle className="text-black">Edit School Period</DialogTitle>
                        <DialogDescription>
                            Make changes to the school period details
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="period">Period</Label>
                                <Input
                                    {...register("period", { required: true })}
                                    placeholder="Enter period (e.g., 1st Period)"
                                />
                                {errors.period && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="timeRange">Time Range</Label>
                                <Input
                                    {...register("timeRange", { required: true })}
                                    placeholder="Enter time range (e.g., 7AM - 8AM)"
                                />
                                {errors.timeRange && (
                                    <span className="text-red-500">This field is required</span>
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="text-white">Save changes</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export const schoolPeriodColumns: ColumnDef<Doc<"schoolPeriods">>[] = [
    { accessorKey: "period", header: "Period" },
    { accessorKey: "timeRange", header: "Time Range" },
    {
        id: "actions",
        cell: ({ row }) => <ActionCell schoolPeriod={row.original} />
    }
];