"use client"

import { DatePickerWithRange } from "@/components/date-range-picker"
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

export const AddSchoolYearCard = () => {
    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add School Year</CardTitle>
                <CardDescription>
                    Fill out the form to add a school year
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                {/* <div className="grid gap-2">
                    <Label htmlFor="batchName" className="font-semibold">Batch Name</Label>
                    <Input
                        id="batchName"
                        type="text"
                        placeholder="Batch name"
                        className="w-full"
                    />
                </div> */}

                <div className="grid gap-2">
                    <Label htmlFor="SY" className="font-semibold">Start Date - End Date</Label>
                    <DatePickerWithRange />
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