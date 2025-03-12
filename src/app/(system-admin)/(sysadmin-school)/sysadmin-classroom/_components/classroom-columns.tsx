"use client"

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { EditRoomDialog } from "./edit-room-dialog";

export const roomTypes = {
    REGULAR: "Regular Classroom",
    LABORATORY: "Science Laboratory",
    COMPUTER_LABORATORY: "Computer Laboratory"
} as const;

export type RoomWithTeacher = Doc<"rooms"> & {
    teacher: Doc<"users"> | null;
}

export const ClassroomColumns: ColumnDef<RoomWithTeacher>[] = [
    {
        accessorKey: "name",
        header: "Room Name"
    },
    {
        accessorKey: "type",
        header: "Room Type",
        cell: ({ row }) => roomTypes[row.original.type as keyof typeof roomTypes]
    },
    {
        accessorKey: "capacity",
        header: "Capacity"
    },
    {
        accessorKey: "teacher",
        header: "Assigned Teacher",
        cell: ({ row }) => {
            const teacher = row.original.teacher;
            return teacher ? `${teacher.lastName}, ${teacher.firstName}` : "Unassigned";
        }
    },
    {
        accessorKey: "track",
        header: "Track",
        cell: ({ row }) => {
            const track = row.original.track;

            return track ? track : "N/A";
        }
    },
    {
        accessorKey: "strand",
        header: "Strand",
        cell: ({ row }) => {
            const strand = row.original.strand;

            return strand ? strand : "N/A";
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: function Cell({ row }) {
            const [showEdit, setShowEdit] = useState(false);
            const removeRoom = useMutation(api.classroom.remove);

            const [ConfirmDialog, confirm] = useConfirm(
                "Delete Room",
                "Are you sure you want to delete this room? This action cannot be undone."
            );

            const handleDelete = async () => {
                const confirmed = await confirm();
                if (confirmed) {
                    try {
                        await removeRoom({ id: row.original._id });
                        toast.success("Room deleted successfully");
                    } catch (error) {
                        console.error(error)
                        toast.error("Failed to delete room");
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
                    <EditRoomDialog
                        open={showEdit}
                        onClose={() => setShowEdit(false)}
                        room={row.original}
                    />
                    <ConfirmDialog />
                </>
            );
        }
    }
];