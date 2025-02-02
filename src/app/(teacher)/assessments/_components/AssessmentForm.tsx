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
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue } from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { AssessmentFormSchema } from "@/lib/validation/assessment-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { api } from "../../../../../convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { Input } from "@/components/ui/input"
import { useClasses } from "../../section/section-data"
import { ConvexError } from "convex/values"

const quarter = ["1st","2nd","3rd","4th"]
const assessmentNumber = [1,2,3,4,5,6,7,8,9,10]

export const AssessmentForm = ({
    assessmment,
}:{
    assessmment: string,
}) => {
    
    const [ dialogOpen, setDialogOpen ] = useState(false)
    const [selectedGLevel, setSelectedGLevel] = useState<string>("")
    const [selectedQuarter, setSelectedQuarter] = useState<string>("")
    const [selectedSubjectId, setSelectedSubjectId] = useState<Id<'subjects'> | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const addWrittenWorks = useMutation(api.assessments.addWrittenWorks)
    const createClassRecords = useMutation(api.classRecords.create)
    const {classes} = useClasses()
    const schoolYears = useQuery(api.schoolYear.get)

    const sy = schoolYears && schoolYears[0] 
    const teacherGradeLevels = Array.from(new Set(classes?.map((cl) => cl.section?.gradeLevel)));
    const gradelevels = teacherGradeLevels.filter(level => level !== undefined)

    const teacherSubjects = Array.from(new Set(classes?.map((cl) => cl.subject?.name)));
    const subjects = useQuery(api.subjects.getSubjects);
    const filteredSubjects = subjects?.filter(subject => 
        subject.gradeLevel === Number(selectedGLevel) && 
        teacherSubjects.includes(subject.name)
    );
    const getTheHighestAssessmentNo = useQuery(api.assessments.getTheHighestAssessmentNo, {type: assessmment, gradeLevel: selectedGLevel, subjectId: selectedSubjectId, quarter: selectedQuarter})
    const existingAssessmentNo = getTheHighestAssessmentNo?.assessments.map(assessment => assessment.assessmentNo) ?? [];
  

    const form = useForm<z.infer<typeof AssessmentFormSchema>>({
        resolver: zodResolver(AssessmentFormSchema),
        defaultValues:{
            type: assessmment,
            gradeLevel: "",
            quarter: "", 
            semester: "", // for senior high
            assessmentNo: undefined,
            highestScore: 0,
            classId: [],
            schoolYear: "",
            subject: ""
        }
    })

    function onSubmit(data: z.infer<typeof AssessmentFormSchema>) {
        setIsLoading(true)
        toast.promise(addWrittenWorks({
            type: assessmment,
            gradeLevel: Number(data.gradeLevel),
            quarter: data.quarter, 
            semester: data.semester, // for senior high
            assessmentNo: data.assessmentNo,
            highestScore: data.highestScore,
            classId: [],
            schoolYear: data.schoolYear,
            subjectId: data.subject as Id<'subjects'>
        }), {
            loading: 'Adding new assessment...',
            success: async() => {
                setIsLoading(false)
                await createClassRecords({
                    gradeLevel: Number(data.gradeLevel),
                    subjectId: data.subject as Id<'subjects'>,
                    quarter: data.quarter,
                    assessmentNo: data.assessmentNo,
                    type: data.type as string,
                    score: data.highestScore,
                    schoolYearId: sy?._id
                })
                form.reset()
                setDialogOpen(false)
                return 'Assessment added successfully.'
            },
            error: (error) => {
                setIsLoading(false);
                if (error instanceof ConvexError) {
                    return `Failed to add new assessment: ${error.data}`;
                }
                return 'Failed to add new assessment.'
            }
        })
    
    }
    return (
        <Dialog open={dialogOpen}>
            <DialogTrigger onClick={()=>{setDialogOpen(true)}} className='border shadow-md  text-xs flex justify-center items-center gap-x-3 disabled:bg-blue-200 bg-blue-600 text-white border-gray-100 rounded-md px-2 py-1'>
                <Plus/> Assesment
            </DialogTrigger>
            <DialogContent className='max-w-6xl max-h-screen overflow-auto'>
             
                <Card className="flex flex-col h-fit">
                    <DialogTitle>
                        <CardHeader>
                            <CardTitle>Add {assessmment}</CardTitle>
                            <CardDescription>
                                Fill out the form to add a new assessment
                            </CardDescription>
                        </CardHeader>
                    </DialogTitle>
                    <Form {...form}> 
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="grid gap-8 mt-7">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                                    <div className="grid gap-2">
                                        <FormField
                                            name="gradeLevel"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade Level <span className='text-red-700'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value);
                                                            setSelectedGLevel(value);
                                                        }}
                                                        value={field.value.toString()} >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Grade Level" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {gradelevels.map((level) => (
                                                                <SelectItem key={level} value={level.toString()}>{level}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            name="quarter"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quarter <span className='text-red-700'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select  onValueChange={(value) => {
                                                            field.onChange(value);
                                                            setSelectedQuarter(value); // Ensure this updates state properly
                                                        }}
                                                        value={field.value.toString()} >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a Quarter" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                        {quarter.map((quarter)=>(
                                                            <SelectItem key={quarter} value={quarter.toString()}>{quarter}</SelectItem>
                                                        ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            name="subject"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject <span className='text-red-700'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={(value) => {
                                                            field.onChange(value)
                                                            setSelectedSubjectId(value as Id<'subjects'>)
                                                        }} value={field.value.toString()} >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a Subject " />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                        {filteredSubjects && filteredSubjects.map((subject)=>(
                                                            <SelectItem key={subject._id} value={subject._id}>{subject.name}</SelectItem>
                                                        ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <FormField
                                            name="assessmentNo"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Assessment No <span className='text-red-700'>*</span></FormLabel>
                                                <FormControl>
                                                    
                                                <Select 
                                                    onValueChange={field.onChange} 
                                                    disabled={selectedGLevel === "" || selectedSubjectId === undefined || selectedQuarter === ""}
                                                    value={field.value !== undefined ? field.value.toString() : ""}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Assessment No" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {assessmentNumber.map((number) => (
                                                            <SelectItem 
                                                                key={`${number}`} 
                                                                value={number.toString()} 
                                                                disabled={existingAssessmentNo.includes(number)}
                                                            >
                                                                {number}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>   

                                    <div className="grid gap-2">
                                        <FormField
                                            name="highestScore"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Highest Possible Score</FormLabel>
                                                <FormControl>
                                                <Input 
                                                    type="number"
                                                    placeholder="50" 
                                                    {...field} 
                                                    value={field.value}
                                                    name='highestScore'
                                                />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                         />
                                    </div> 
                                </div>
                                
                            </CardContent>
                            <CardFooter className="flex justify-end gap-x-2 mt-auto">
                                <Button 
                                    variant={'ghost'} 
                                    type={'button'} 
                                    onClick={()=> {
                                        setDialogOpen(false)
                                        setSelectedGLevel("")
                                        setSelectedQuarter("")
                                        setSelectedSubjectId(undefined)
                                        form.reset()
                                    }} 
                                    disabled={isLoading} 
                                    className="">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isLoading} className="text-white">
                                    Add
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>    
            </DialogContent>
        </Dialog>
    )
}