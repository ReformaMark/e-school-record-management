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

export const AddSchoolPeriodCard = () => {
    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add School Period</CardTitle>
                <CardDescription>
                    Fill out the form to add a school period
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                <div className="grid gap-2">
                    <Label htmlFor="period">Period</Label>
                    <Input
                        id="period"
                        type="text"
                        placeholder="Ex: 1st Period"
                        className="w-full"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tr" className="font-semibold">Time Range</Label>
                    <Input
                        id="tr"
                        type="text"
                        placeholder="Ex: 6:30AM - 7:30AM"
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