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
import { toast } from "sonner"
import { api } from "../../../../../../convex/_generated/api"

export const AddSchoolPeriodCard = () => {
    const [period, setPeriod] = useState("")
    const [timeRange, setTimeRange] = useState("")

    const { mutate, isPending } = useMutation({
        mutationFn: useConvexMutation(api.schoolPeriod.create),
    })

    const onSubmit = async () => {
        if (period.length <= 1) return toast.error("Invalid period")

        if (timeRange.length <= 1) return toast.error("Invalid time range")

        await mutate({
            period,
            timeRange,
        })
        toast.success("Successfully created a school period.")
        setPeriod("")
        setTimeRange("")
    }

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
                        disabled={isPending}
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="tr" className="font-semibold">Time Range</Label>
                    <Input
                        id="tr"
                        type="text"
                        placeholder="Ex: 6:30AM - 7:30AM"
                        className="w-full"
                        disabled={isPending}
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    />
                </div>

            </CardContent>
            <CardFooter className="mt-auto">
                <Button
                    className="text-white"
                    onClick={onSubmit}
                    disabled={isPending}
                >
                    Add
                </Button>
            </CardFooter>
        </Card>
    )
}