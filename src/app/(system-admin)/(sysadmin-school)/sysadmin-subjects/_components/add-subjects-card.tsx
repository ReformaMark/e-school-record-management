"use client"

import { MultiSelectGradeLevels } from "@/app/(system-admin)/_components/multi-select-grade-levels"
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

export const AddSubjectsCard = () => {
    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add a Subject</CardTitle>
                <CardDescription>
                    Fill out the form to add a subject
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                <div className="grid gap-2">
                    <Label htmlFor="subjName" className="font-semibold">Subject Name</Label>
                    <Input
                        id="subjName"
                        type="text"
                        placeholder="Subject name"
                        className="w-full"
                    />
                </div>

                <div className="grid gap-2">
                    <MultiSelectGradeLevels />
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