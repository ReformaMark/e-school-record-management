"use client"

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQuery } from "convex/react";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const schoolPeriodColumns: ColumnDef<Doc<"schoolPeriods">>[] = [
    { accessorKey: "period", header: "Period" },
    { accessorKey: "timeRange", header: "Time Range" },
    {
        id: "actions",
        header: "Actions",
        cell: function Cell({ row }) {
            const [open, setOpen] = useState<boolean>(false)
            const [period, setPeriod] = useState(row.original.period)
            const [timeRange, setTimeRange] = useState(row.original.timeRange)

            const removeSP = useMutation(api.schoolPeriod.remove)
            const updateSP = useMutation(api.schoolPeriod.update)
            const [ConfirmDialog, confirm] = useConfirm(
                "Delete School Period?",
                "Are you sure you want to delete this school period?"
            )

            useEffect(() => {
                if (open) {
                    setPeriod(row.original.period)
                    setTimeRange(row.original.timeRange)
                }
            }, [open, row.original])

            const handleDelete = async () => {
                const confirmed = await confirm();

                if (confirmed) {
                    try {
                        await removeSP({
                            id: row.original._id
                        })

                        toast.success("School period deleted successfully")
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (error) {
                        toast.error("Error deleting school period")
                    }
                }
            }

            const handleUpdate = async () => {
                try {
                    await updateSP({
                        id: row.original._id,
                        period,
                        timeRange,
                    })

                    toast.success("School period updated successfully")
                    setOpen(false)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    toast.error("Error updating school period")
                }
            }

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
                            <DropdownMenuItem
                                onClick={() => setOpen(true)}
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

                    <Dialog
                        open={open}
                        onOpenChange={setOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-black">Edit School Period</DialogTitle>
                                <DialogDescription>
                                    Make changes to the school period details
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-8 mt-7">
                                <div className="grid gap-2">
                                    <Label htmlFor="period">Period</Label>
                                    <Input
                                        id="period"
                                        type="text"
                                        placeholder="Ex: 1st Period"
                                        className="w-full"
                                        value={period}
                                        onChange={(e) => setPeriod(e.target.value)}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="tr" className="font-semibold">Time Range</Label>
                                    <Input
                                        id="tr"
                                        type="text"
                                        placeholder="Ex: 6:30AM - 7:30AM"
                                        className="w-full"
                                        value={timeRange}
                                        onChange={(e) => setTimeRange(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Button
                                    className="text-white"
                                    onClick={handleUpdate}
                                >
                                    Edit
                                </Button>
                            </div>

                        </DialogContent>
                    </Dialog>
                    <ConfirmDialog />
                </>
            )
        }
    }
];

export const SchoolPeriodCardTable = () => {
    const schoolPeriodData = useQuery(api.schoolPeriod.get)

    return (
        <Card
            className="xl:col-span-2"
        >
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>School Periods</CardTitle>
                    <CardDescription>
                        View and manage school periods
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    {/* <Link href="#">
                                    View All
                                    <ArrowUpRightIcon className="h-4 w-4" />
                                </Link> */}
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={schoolPeriodColumns}
                    data={schoolPeriodData || []}
                    filter="period"
                    placeholder="by period"
                />
            </CardContent>
        </Card>
    )
}