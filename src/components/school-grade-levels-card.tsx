"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useQuery } from "convex/react";
import {
    PencilIcon,
    Trash2Icon
} from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { useConfirm } from "@/hooks/use-confirm";
import { Id } from "../../convex/_generated/dataModel";
import { toast } from "sonner";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SchoolGradeLevelsCardTableProps {
    isSystemAdmin?: boolean;
}
export const SchoolGradeLevelsCardTable = ({
    isSystemAdmin
}: SchoolGradeLevelsCardTableProps) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentGradeLevel, setCurrentGradeLevel] = useState<Id<"gradeLevels"> | null>(null);
    const [newGradeLevel, setNewGradeLevel] = useState("");

    const gradeLevelData = useQuery(api.gradeLevel.get)

    const { mutate: remove } = useMutation({
        mutationFn: useConvexMutation(api.gradeLevel.remove)
    })

    const { mutate: update, isError } = useMutation({
        mutationFn: useConvexMutation(api.gradeLevel.update)
    });

    const [ConfirmDialog, confirm] = useConfirm(
        "Confirm Deletion",
        "Are you sure you want to delete this grade level?"
    )

    const handleRemove = async (gradeLevelId: Id<"gradeLevels">) => {
        const confirmed = await confirm();
        if (confirmed) {
            remove({
                gradeLevelId,
            })

            toast.success("Grade level removed")
        }

    }

    const handleEdit = (gradeLevelId: Id<"gradeLevels">, level: string) => {
        setCurrentGradeLevel(gradeLevelId);
        setNewGradeLevel(level);
        setEditDialogOpen(true);
    };

    const handleUpdate = () => {
        if (currentGradeLevel) {
            update({
                gradeLevelId: currentGradeLevel,
                newGradeLevel
            });

            if (isError) return toast.error("Grade level already exists")

            toast.success("Grade level updated");
            setEditDialogOpen(false);
        }
    };

    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>All grade levels</CardTitle>
                <CardDescription className="text-[13px]">In this section you can manage all grade levels</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {gradeLevelData ? (
                    gradeLevelData.map((gradeLevel) => (
                        <div
                            key={gradeLevel?._id}
                            className="flex flex-row items-center justify-between gap-3 p-3 hover:bg-green-50"
                        >
                            <p className="flex-1 text-black">
                                {gradeLevel?.level}
                            </p>

                            {isSystemAdmin && (
                                <div className="flex gap-3 cursor-pointer">
                                    <PencilIcon
                                        className="h-4 w-4 text-primary"
                                        onClick={() => handleEdit(gradeLevel._id, gradeLevel.level)}
                                    />
                                    <Trash2Icon
                                        className="h-4 w-4 text-rose-500"
                                        onClick={() => handleRemove(gradeLevel._id)}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </CardContent>
            <ConfirmDialog />
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Grade Level</DialogTitle>
                        <DialogDescription>
                            Update the grade level name.
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        value={newGradeLevel}
                        onChange={(e) => setNewGradeLevel(e.target.value)}
                        placeholder="Grade Level"
                    />
                    <DialogFooter>
                        <Button onClick={() => setEditDialogOpen(false)} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate}>
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    )
}