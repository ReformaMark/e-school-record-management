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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "../../../../../../convex/_generated/api"
import { useMutation } from "@tanstack/react-query"
import { useConvexMutation } from "@convex-dev/react-query"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { toast } from "sonner"

export const AddSchoolYearCard = () => {
    const [batchName, setBatchName] = useState("")
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 365),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: useConvexMutation(api.schoolYear.create),
        onSuccess: () => {
            toast.success("New school year added!")
        },
        onError: () => {
            toast.error("Error adding school year!")
        }
    })

    const onSubmit = async () => {
        if (batchName.length <= 3) {
            toast.error("Please add a valid batch name")
            return;
        }

        if (dateRange?.from && dateRange?.to) {
            await mutate({
                batchName,
                startDate: new Date(dateRange.from.getTime() - dateRange.from.getTimezoneOffset() * 60000).toISOString().split('T')[0],
                endDate: new Date(dateRange.to.getTime() - dateRange.to.getTimezoneOffset() * 60000).toISOString().split('T')[0],
                sy: `${new Date(dateRange.from).getFullYear()}-${new Date(dateRange.to).getFullYear()}`
            })
        }
    }

    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add School Year</CardTitle>
                <CardDescription>
                    Fill out the form to add a school year
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                <div className="grid gap-2">
                    <Label htmlFor="batchName" className="font-semibold">Batch Name</Label>
                    <Input
                        id="batchName"
                        type="text"
                        placeholder="Batch name"
                        className="w-full"
                        value={batchName}
                        required
                        onChange={(e) => setBatchName(e.target.value)}
                        disabled={isPending}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="SY" className="font-semibold">Start Date - End Date</Label>
                    <DatePickerWithRange
                        value={dateRange}
                        onChange={setDateRange}
                    />
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button
                    className="text-white"
                    disabled={isPending}
                    onClick={onSubmit}
                >
                    {isPending ? "Adding..." : "Add School Year"}
                </Button>
            </CardFooter>
        </Card>
    )
}