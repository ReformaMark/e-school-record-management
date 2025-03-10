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
import { Edit } from 'lucide-react'
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
import { AssessmentTypes } from "@/lib/types"


const assessmentNumber = [1,2,3,4,5,6,7,8,9,10]
const quarter = ["1st","2nd","3rd","4th"]

export const EditAssessmentForm = ({
    type,
    assessment,
    id,
}:{
    type: string,
    assessment: AssessmentTypes,
    id: Id<'assessments'>
}) => {
    
    const [ dialogOpen, setDialogOpen ] = useState(false)
    const gLevel = `Grade ${assessment.gradeLevel.toString()}`
    const [selectedGLevel, setSelectedGLevel] = useState<string>(gLevel)
    const [selectedQuarter, setSelectedQuarter] = useState<string>(assessment.quarter)
    const [selectedSubjectId, setSelectedSubjectId] = useState<Id<'subjects'> | undefined>(assessment.subjectId)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const editAssessment = useMutation(api.assessments.editAssessment)
    const {classes} = useClasses()
    const teacherGradeLevels = Array.from(new Set(classes?.map((cl) => cl?.section?.gradeLevel?.level)));
    const gradelevels = teacherGradeLevels.filter(level => level !== undefined)

    console.log("gradelevels:", gradelevels)
    console.log("selectedGLevel:", selectedGLevel)

    const teacherSubjects = Array.from(new Set(classes?.map((cl) => cl?.subject?.name)));
    const subjects = useQuery(api.subjects.getSubjects);
    const filteredSubjects = subjects?.filter(subject => 
        subject.gradeLevel?.level === selectedGLevel && 
        teacherSubjects.includes(subject.name)
    );
    const getTheHighestAssessmentNo = useQuery(api.assessments.getTheHighestAssessmentNo, {type: type, gradeLevel: selectedGLevel, subjectId: selectedSubjectId, quarter: selectedQuarter})
    const existingAssessmentNo = getTheHighestAssessmentNo?.assessments.map(assessment => assessment.assessmentNo) ?? [];

    const form = useForm<z.infer<typeof AssessmentFormSchema>>({
        resolver: zodResolver(AssessmentFormSchema),
        defaultValues:{
            type: type,
            gradeLevel: gLevel,
            quarter: assessment?.quarter, 
            semester: assessment.semester, // for senior high
            assessmentNo: assessment?.assessmentNo ,
            highestScore: assessment?.highestScore ,
            classId: [],
            schoolYear: assessment.schoolYear,
            subject: assessment?.subjectId as string,
            subComponent: assessment.subComponent,
            createClassRecords: "yes"
        }
    })
  


    function onSubmit(data: z.infer<typeof AssessmentFormSchema>) {
        setIsLoading(true)
        console.log(data)
        toast.promise(
            editAssessment({
                id: id,
                type: type,
                assessmentNo: assessment.assessmentNo,
                highestScore: data.highestScore,
                schoolYear: data.schoolYear as Id<'schoolYears'>,
               
            }),
            {
                loading: 'Saving assessment...',
                success: () => {
                    setIsLoading(false);
                    setDialogOpen(false);
                    return 'Assessment saved successfully.';
                },
                error: (error) => {
                    setIsLoading(false);
                    if (error instanceof ConvexError) {
                        return `Failed to save assessment : ${error.data}`;
                    }
                    return 'Failed to save assessment.';
                }
            }
        );
    }
    return (
        <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger className='flex items-center text-orange-500 space-x-2'>
                <Edit/>
            </DialogTrigger>
            <DialogContent className='max-w-6xl max-h-screen overflow-auto'>
             
                <Card className="flex flex-col h-fit">
                    <DialogTitle>
                        <CardHeader>
                            <CardTitle>Edit {type}</CardTitle>
                            <CardDescription>
                                Edit the details of the assessment below.
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
                                                        value={field.value?.toString()} 
                                                        disabled
                                                      
                                                    >
                                                        
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Grade Level" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {gradelevels.map((level) => (
                                                                <SelectItem key={`${level}`} value={`${level}`}>{level}</SelectItem>
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
                                                        value={field.value} 
                                                        disabled
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Grade Level" />
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
                                    {assessment.gradeLevel > 10 && (
                                        <div className="grid gap-2">
                                        <FormField
                                            name="semester"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Semester <span className='text-red-700'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value)
                                                        }} 
                                                        value={field.value} 
                                                       disabled
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a semester" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                     
                                                            <SelectItem  value={'1st'}>1st</SelectItem>
                                                            <SelectItem  value={'2nd'}>2nd</SelectItem>
                                                     
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    )}
                                    <div className="grid gap-2">
                                        <FormField
                                            name="subject"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject <span className='text-red-700'>*</span></FormLabel>
                                                <FormControl>
                                                    <Select 
                                                        onValueChange={(value) => {
                                                            field.onChange(value)
                                                            setSelectedSubjectId(value as Id<'subjects'>)
                                                        }} 
                                                        value={field.value.toString()} 
                                                       disabled
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a subject" />
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
                                                    disabled
                                                    value={field.value !== undefined ? field.value.toString() : ""}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Assessment No" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                    {assessmentNumber.map((number) => (
                                                        <SelectItem 
                                                            key={`assessment_${number}`} 
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
                                    onClick={()=>{
                                        setSelectedGLevel(gLevel)
                                        setSelectedQuarter(assessment.quarter)
                                        setSelectedSubjectId(assessment.subjectId)
                                        setDialogOpen(false)}} 
                                    type="button" 
                                    disabled={isLoading} 
                                    className=""
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" variant={'default'} disabled={isLoading} className="text-white">
                                    Save
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>    
            </DialogContent>
        </Dialog>
    )
}