"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { EditScheduleDialog } from "./edit-schedule-dialog";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";

type ScheduleWithDetails = Doc<"schedules"> & {
    teacher: Doc<"users"> | null;
    room: Doc<"rooms"> | null;
    period: Doc<"schoolPeriods"> | null;
};

export const ScheduleColumns: ColumnDef<ScheduleWithDetails>[] = [
    {
        accessorKey: "day",
        header: "Day"
    },
    {
        accessorKey: "period",
        header: "Time",
        cell: ({ row }) => {
            const period = row.original.period;
            return period ? `${period.timeRange}` : "Not set";
        }
    },
    {
        id: "teacher",
        header: "Teacher",
        accessorFn: (row) => row.teacher ? `${row.teacher.lastName}, ${row.teacher.firstName}` : "Unassigned",
        cell: ({ getValue }) => getValue()
    },
    {
        id: "room",
        header: "Room",
        accessorFn: (row) => row.room ? row.room.name : "Not assigned",
        cell: ({ getValue }) => getValue()
    },
    {
        id: "actions",
        cell: function Cell({ row }) {
            const [showEdit, setShowEdit] = useState(false);
            const removeSchedule = useMutation(api.schedules.remove);
            const [ConfirmDialog, confirm] = useConfirm(
                "Delete Schedule",
                "Are you sure you want to delete this schedule?"
            );

            const handleDelete = async () => {
                const confirmed = await confirm();
                if (confirmed) {
                    try {
                        await removeSchedule({ id: row.original._id });
                        toast.success("Schedule deleted successfully");
                    } catch (error) {
                        console.error(error)
                        toast.error("Failed to delete schedule");
                    }
                }
            };

            return (
                <>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowEdit(true)}
                        >
                            <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={handleDelete}
                        >
                            <Trash2Icon className="h-4 w-4" />
                        </Button>
                    </div>
                    <EditScheduleDialog
                        open={showEdit}
                        onClose={() => setShowEdit(false)}
                        schedule={row.original}
                    />
                    <ConfirmDialog />
                </>
            );
        }
    }
];