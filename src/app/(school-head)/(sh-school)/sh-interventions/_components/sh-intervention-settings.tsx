"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

type Intervention = {
    _id: Id<"interventions">;
    name: string;
    description?: string;
};

export const ShInterventionSettings = () => {
    const interventions = useQuery(api.interventions.get);

    if (!interventions) return <div className="flex justify-center items-center h-screen">Loading...</div>

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-3">
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
                                            {/* <div className="flex gap-2">
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
                                            </div> */}
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