"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { api } from "../../../../../../convex/_generated/api"
import { toast } from "sonner"

export const AddGradeLevelCard = () => {
    const [gradeLevel, setGradeLevel] = useState("")

    const { mutate, isPending, isError } = useMutation({
        mutationFn: useConvexMutation(api.gradeLevel.create)
    })

    const onSubmit = async () => {
        if (gradeLevel.length <= 1) return toast.error("Invalid grade level")

        await mutate({
            gradeLevel
        })

        if (isError) return toast.error("Grade level already exists")

        setGradeLevel("")
        toast.success("Grade level created!")
    }

    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add Grade Level</CardTitle>
                <CardDescription>
                    Fill out the form to add a new grade level
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                <div className="grid gap-2">
                    <Label htmlFor="gradeLevel">Grade Level</Label>
                    <Input
                        id="gradeLevel"
                        type="text"
                        placeholder="Ex: Grade 11"
                        className="w-full"
                        disabled={isPending}
                        value={gradeLevel}
                        onChange={(e) => setGradeLevel(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button
                    className="text-white"
                    onClick={onSubmit}
                    disabled={isPending}
                >
                    {isPending ? "Adding..." : "Add"}
                </Button>
            </CardFooter>
        </Card>
    )
}