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

export const AddGradeLevelCard = () => {
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
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button className="text-white">
                    Add
                </Button>
            </CardFooter>
        </Card>
    )
}