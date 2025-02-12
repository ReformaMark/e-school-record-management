"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, AlertCircle, Pencil, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useConfirm } from "@/hooks/use-confirm";
import { toast } from "sonner";

type Intervention = {
    _id: Id<"interventions">;
    name: string;
    description?: string;
};

type NewIntervention = {
    name: string;
    description: string;
};

export const InterventionSettings = () => {
    const [editMode, setEditMode] = useState<Id<"interventions"> | null>(null);
    const [newIntervention, setNewIntervention] = useState<NewIntervention>({
        name: '',
        description: ''
    });
    const [error, setError] = useState<string>('');

    const interventions = useQuery(api.interventions.get);

    const { mutate: create, isPending: isCreating } = useMutation({
        mutationFn: useConvexMutation(api.interventions.create),
    });

    const { mutate: update, isPending: isUpdating } = useMutation({
        mutationFn: useConvexMutation(api.interventions.update),
    })

    const { mutate: remove, isPending: isRemoving } = useMutation({
        mutationFn: useConvexMutation(api.interventions.remove),
    })

    const [DeleteConfirmDialog, confirmDelete] = useConfirm(
        "Delete Intervention",
        "Are you sure you want to delete this intervention?"
    );

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewIntervention(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (editMode) {
                await update({ id: editMode, ...newIntervention })
                toast.success("Intervention updated successfully")
                setEditMode(null)
            } else {
                await create(newIntervention)
                toast.success("Intervention created successfully")
            }
            setNewIntervention({ name: "", description: "" })
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
            toast.error(err instanceof Error ? err.message : "An error occurred")
        }
    }

    const handleEdit = (intervention: Intervention) => {
        setEditMode(intervention._id)
        setNewIntervention({
            name: intervention.name,
            description: intervention.description || "",
        })
    }

    const handleDelete = async (id: Id<"interventions">) => {
        const confirmed = await confirmDelete()
        if (confirmed) {
            try {
                await remove({ id })
                toast.success("Intervention deleted successfully")
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
                toast.error(err instanceof Error ? err.message : "An error occurred")
            }
        }
    }

    if (!interventions) return <div className="flex justify-center items-center h-screen">Loading...</div>

    return (
        <div className="container mx-auto py-8">
            <DeleteConfirmDialog />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>{editMode ? "Edit Intervention" : "Add New Intervention"}</CardTitle>
                        <CardDescription>
                            {editMode ? "Update the details of the intervention" : "Create a new intervention"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                name="name"
                                value={newIntervention.name}
                                onChange={handleInputChange}
                                placeholder="Intervention Name"
                                required
                            />
                            <Textarea
                                name="description"
                                value={newIntervention.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="h-24"
                            />
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    disabled={isCreating || isUpdating}
                                    className="text-white"
                                >
                                    {editMode ? (
                                        <>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Update Intervention
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Intervention
                                        </>
                                    )}
                                </Button>
                                {editMode && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setEditMode(null)
                                            setNewIntervention({ name: "", description: "" })
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Interventions</CardTitle>
                        <CardDescription>List of all interventions in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
                            <div className="space-y-4">
                                {interventions.map((intervention: Intervention) => (
                                    <Card key={intervention._id}>
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                            <div>
                                                <CardTitle>{intervention.name}</CardTitle>
                                                {intervention.description && <CardDescription>{intervention.description}</CardDescription>}
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="icon" onClick={() => handleEdit(intervention)}>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => handleDelete(intervention._id)}
                                                    disabled={isRemoving}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}