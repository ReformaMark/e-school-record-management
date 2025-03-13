"use client"

import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { ColumnDef } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { Eye, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import { EditSubjectDialog } from "./edit-subject-dialog";
import { GradeWeightsDialog } from "./grade-weights-dialog";

type SubjectWithGradeLevel = Doc<"subjects"> & {
    gradeLevel?: Doc<"gradeLevels"> | null;
};

export const SubjectsColumns: ColumnDef<SubjectWithGradeLevel>[] = [
    {
        accessorKey: "name",
        header: "Subject Name",
    },
    {
        accessorKey: "subjectCode",
        header: "Subject Code",
    },
    {
        accessorKey: "gradeLevel",
        header: "Grade Level",
        cell: ({ row }) => {
            const gradeLevel = row.original.gradeLevel;
            return gradeLevel ? `${gradeLevel.level}` : "Not assigned";
        }
    },
    {
        accessorKey: "subjectCategory",
        header: "Category",
        cell: ({ row }) => {
            const category = row.original.subjectCategory

            return category ? category : "N/A"
        }
    },
    // {
    //     accessorKey: "isMapeh",
    //     header: "Type",
    //     cell: ({ row }) => row.original.isMapeh ? "MAPEH" : "Regular"
    // },
    {
        id: "actions",
        cell: function Cell({ row }) {
            const [showWeights, setShowWeights] = useState(false);
            const [showEdit, setShowEdit] = useState(false);
            const removeSubject = useMutation(api.subjects.remove);

            const [ConfirmDialog, confirm] = useConfirm(
                "Delete Subject",
                "Are you sure you want to delete this subject? This action cannot be undone."
            );

            const handleDelete = async () => {
                const confirmed = await confirm();
                if (confirmed) {
                    try {
                        await removeSubject({ id: row.original._id });
                        toast.success("Subject deleted successfully");
                    } catch (error) {
                        console.error(error)
                        toast.error("Failed to delete subject");
                    }
                }
            };

            return (
                <>
                    <div className="flex gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowWeights(true)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
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
                            className="text-red-500 hover:text-red-500"
                            onClick={handleDelete}
                        >
                            <Trash2Icon className="h-4 w-4" />
                        </Button>
                    </div>
                    <GradeWeightsDialog
                        open={showWeights}
                        onClose={() => setShowWeights(false)}
                        subject={row.original}
                    />
                    <EditSubjectDialog
                        open={showEdit}
                        onClose={() => setShowEdit(false)}
                        subject={row.original}
                    />
                    <ConfirmDialog />
                </>
            );
        }
    }
]