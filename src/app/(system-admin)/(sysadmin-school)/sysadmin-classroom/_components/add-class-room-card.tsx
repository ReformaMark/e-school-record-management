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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { roomTypes } from "../../../../../../data/room-data"

export const AddClassRoomCard = () => {
    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>Add Class Room</CardTitle>
                <CardDescription>
                    Fill out the form to add a room
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                <div className="grid gap-2">
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input
                        id="roomNumber"
                        type="text"
                        placeholder="Ex: 101"
                        className="w-full"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="est-capacity" className="font-semibold">Est.Capacity</Label>
                    <Input
                        id="est-capacity"
                        type="text"
                        placeholder="Ex: 20-30"
                        className="w-full"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="roomType" className="font-semibold">Room Type</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a room type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Room Type</SelectLabel>
                                {roomTypes.map((roomType) => (
                                    <SelectItem
                                        key={roomType}
                                        value={roomType}
                                    >
                                        {roomType}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="room-features" className="font-semibold">Room Features (Optional)</Label>
                    <Textarea
                        id="room-features"
                        placeholder="Room description / information"
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