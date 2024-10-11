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

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export const AssessmentForm = ({
    assessmment
}:{
    assessmment: string
}) => {

    const gradeLevels = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add {assessmment}</CardTitle>
                <CardDescription>
                    Fill out the form to add a new assessment
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                <div className="grid gap-2">
                <Label htmlFor="roomType" className="font-semibold">Grade Level</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a room type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Grade Level</SelectLabel>
                                {gradeLevels.map((gradeLevel) => (
                                    <SelectItem
                                        key={gradeLevel}
                                        value={gradeLevel}
                                    >
                                        {gradeLevel}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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