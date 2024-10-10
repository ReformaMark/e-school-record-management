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
import { Separator } from "@/components/ui/separator"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export const AddSectionCard = () => {
    const [step, setStep] = useState<number>(1)
    const [selectCount, setSelectCount] = useState<number>(1);

    const addSubjectTeacher = () => {
        if (selectCount >= 5) {
            toast.error("Cannot add more than 5 subject teachers")
        } else {
            setSelectCount(selectCount + 1);
        }
    }

    const removeSubjectTeacher = () => {
        if (selectCount <= 1) {
            toast.error("Cannot remove less than 1 subject teacher")
        } else {
            setSelectCount(selectCount - 1);
        }
    }

    return (
        <Card className="flex flex-col h-fit">
            <CardHeader>
                <CardTitle>
                    {step === 1 ? "Add Section" : "Add Subject teachers"}
                </CardTitle>
                <CardDescription>
                    {step === 1 ? "Fill out the form to add a section" : "Fill out the form to add subject teachers to this section"}
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 mt-7">
                {step === 1 ? (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="sectionName" className="font-semibold">Section Name</Label>
                            <Input
                                id="sectionName"
                                type="text"
                                placeholder="Section name"
                                className="w-full"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="select" className="font-semibold">School Year</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select School Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>School Year</SelectLabel>
                                        <SelectItem value="2018-2019">2018 - 2019</SelectItem>
                                        <SelectItem value="2019-2020">2019 - 2020</SelectItem>
                                        <SelectItem value="2020-2021">2020 - 2021</SelectItem>
                                        <SelectItem value="2021-2022">2021 - 2022</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="select" className="font-semibold">Grade Level</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Grade Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Grade Level</SelectLabel>
                                            <SelectItem value="grade-7">Grade 7</SelectItem>
                                            <SelectItem value="grade-8">Grade 8</SelectItem>
                                            <SelectItem value="grade-9">Grade 9</SelectItem>
                                            <SelectItem value="grade-10">Grade 10</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="select" className="font-semibold">Room Number</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select room number" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Room Number</SelectLabel>
                                            <SelectItem value="101">101</SelectItem>
                                            <SelectItem value="102">102</SelectItem>
                                            <SelectItem value="103">103</SelectItem>
                                            <SelectItem value="104">104</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                            <div className="grid gap-2">
                                <Label htmlFor="select" className="font-semibold">Adviser</Label>
                                <Select>
                                    <SelectTrigger className="w-full truncate">
                                        <SelectValue placeholder="Select Adviser for this section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Advisers</SelectLabel>
                                            <SelectItem value="John Doe">John Doe</SelectItem>
                                            <SelectItem value="James Bond">James Bond</SelectItem>
                                            <SelectItem value="Karen Jackson">Karen Jackson</SelectItem>
                                            <SelectItem value="Frank Gallagher">Frank Gallagher</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="select" className="font-semibold">Subject</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Subjects</SelectLabel>
                                            <SelectItem value="English">English</SelectItem>
                                            <SelectItem value="Math">Math</SelectItem>
                                            <SelectItem value="Science">Science</SelectItem>
                                            <SelectItem value="History">History</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </>
                ) : <>
                    {/* step 2 */}
                    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 space-y-2">
                        {[...Array(selectCount)].map((_, index) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor={`select-${index}`} className="font-semibold">
                                        Teacher {index + 1}
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full truncate">
                                            <SelectValue placeholder="Select Adviser for this section" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Advisers</SelectLabel>
                                                <SelectItem value="John Doe">John Doe</SelectItem>
                                                <SelectItem value="James Bond">James Bond</SelectItem>
                                                <SelectItem value="Karen Jackson">Karen Jackson</SelectItem>
                                                <SelectItem value="Frank Gallagher">Frank Gallagher</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div key={index} className="grid gap-2">
                                    <Label htmlFor={`select-${index}`} className="font-semibold">
                                        Subject {index + 1}
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Subject" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Subjects</SelectLabel>
                                                <SelectItem value="English">English</SelectItem>
                                                <SelectItem value="Math">Math</SelectItem>
                                                <SelectItem value="Science">Science</SelectItem>
                                                <SelectItem value="History">History</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        ))}
                    </div>
                </>}
            </CardContent>

            <Separator className="my-3" />

            {step === 2 && (
                <div className="flex items-center justify-center gap-1">
                    <Button
                        variant="ghost"
                        className="text-xs"
                        onClick={removeSubjectTeacher}
                    >
                        <MinusIcon className="h-4 w-4 mr-1" />
                        Remove Teacher
                    </Button>

                    <Button
                        variant="ghost"
                        className="text-xs"
                        onClick={addSubjectTeacher}
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Teacher
                    </Button>
                </div>
            )}

            <CardFooter className="mt-auto flex justify-between items-center">
                {step === 1 ? (
                    <Button
                        className="text-white ml-auto"
                        onClick={() => setStep((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                ) : <>
                    <Button
                        variant="outline"
                        onClick={() => setStep((prev) => prev - 1)}
                    >
                        Back
                    </Button>

                    <Button
                        id="add-section-btn"
                        className="text-white ml-auto"
                    >
                        Save
                    </Button>
                </>}
            </CardFooter>
        </Card>
    )
}