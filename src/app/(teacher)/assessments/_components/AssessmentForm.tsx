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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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
    const [subComponent, setSubComponent] = useState<string>()
    const [semester, setSemester] = useState<string>()
    
    const addWrittenWorks = useMutation(api.assessments.addWrittenWorks)
    const createClassRecords = useMutation(api.classRecords.create)
    const {classes} = useClasses()
    const schoolYears = useQuery(api.schoolYear.get)
    const subject = useQuery(api.subjects.getSubject, {subjectId: selectedSubjectId})

    const sy = schoolYears && schoolYears[0] 
    const teacherGradeLevels = Array.from(new Set(classes?.map((cl) => cl?.subject?.gradeLevel?.level)));
    const gradelevels = teacherGradeLevels.filter(level => level !== undefined).sort((a,b)=> Number(a) - Number(b))

    const teacherSubjects = Array.from(new Set(classes?.map((cl) => cl?.subject?.name)));
    const subjects = useQuery(api.subjects.getSubjects);
    const filteredSubjects = subjects?.filter(subject => 
        subject.gradeLevel?.level === selectedGLevel && 
        teacherSubjects.includes(subject.name)
    )

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
            schoolYear: sy?._id,
            subject: "",
            subComponent: undefined,
            createClassRecords: "yes"
        }
    })
    const getTheHighestAssessmentNo = useQuery(api.assessments.getTheHighestAssessmentNo, {
        type: assessmment, 
        gradeLevel: selectedGLevel, 
        subjectId: selectedSubjectId,
        quarter: selectedQuarter, 
        subComponent:subComponent,
        semester: semester,
    })
    const existingAssessmentNo = getTheHighestAssessmentNo?.assessments.map(assessment => assessment.assessmentNo) ?? [];
    
    function onSubmit(data: z.infer<typeof AssessmentFormSchema>) {
        setIsLoading(true);
      
        toast.promise(
          addWrittenWorks({
            type: assessmment,
            gradeLevel: Number(data.gradeLevel),
            quarter: data.quarter,
            semester: data.semester, // for senior high
            assessmentNo: data.assessmentNo,
            highestScore: data.highestScore,
            classId: [],
            schoolYear: data.schoolYear as Id<'schoolYears'>,
            subjectId: data.subject as Id<"subjects">,
            subComponent: subComponent,
          }),
          {
            loading: "Adding new assessment...",
            success: async (assessmentId) => {
            if(data.createClassRecords === 'yes') {
                try {
                    await createClassRecords({
                        gradeLevel: Number(data.gradeLevel),
                        subjectId: data.subject as Id<"subjects">,
                        quarter: data.quarter,
                        assessmentNo: data.assessmentNo,
                        type: data.type as string,
                        score: data.highestScore,
                        schoolYearId: sy?._id,
                        subComponent: subComponent,
                        assessmentId, // ✅ Use the returned assessmentId
                    });
                } catch (error) {
                    console.error("Error creating class records:", error);
                    throw new Error("Failed to create class records.");
                } finally {
                    setIsLoading(false); // ✅ Ensure this runs after createClassRecords
                }
            }
              
                form.reset();
                setSelectedGLevel("");
                setSelectedQuarter("");
                setSelectedSubjectId(undefined);
                setSubComponent(undefined);
                return "Assessment added successfully.";
           
            },
            error: (error) => {
              setIsLoading(false);
              if (error instanceof ConvexError) {
                return `Failed to add new assessment: ${error.data}`;
              }
              return "Failed to add new assessment.";
            },
          }
        );
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
                                    {Number(selectedGLevel) > 10 && (
                                         <div className="grid gap-2">
                                         <FormField
                                             name="semester"
                                             control={form.control}
                                             render={({ field }) => (
                                             <FormItem>
                                                 <FormLabel>Semester <span className='text-red-700'>*</span></FormLabel>
                                                 <FormControl>
                                                     <Select  onValueChange={(value) => {
                                                             field.onChange(value);
                                                             setSemester(value)
                                                             setSelectedQuarter(value === "1st" ? "1st" : "3rd")
                                                         }}
                                                         value={field.value} >
                                                         <SelectTrigger>
                                                             <SelectValue placeholder="Select a Semester" />
                                                         </SelectTrigger>
                                                         <SelectContent>
                                                             <SelectItem value={"1st"}>1st</SelectItem>
                                                             <SelectItem value={"2nd"}>2nd</SelectItem>
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
                                                        {Number(selectedGLevel) > 10 ? semester === "2nd" ? (
                                                            <>
                                                                <SelectItem  value={"3rd"}>3rd</SelectItem>
                                                                <SelectItem  value={"4th"}>4th</SelectItem>
                                                            </>
                                                        ): (
                                                            <>
                                                                <SelectItem  value={"1st"}>1st</SelectItem>
                                                                <SelectItem  value={"2nd"}>2nd</SelectItem>
                                                            </>
                                                        ): quarter.map((q)=> (
                                                            <SelectItem key={q}  value={q}>{q}</SelectItem>
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
                                                            <SelectItem key={subject._id} value={subject._id} onClick={() => subject?.name?.toUpperCase() !== "MAPEH" && setSubComponent(undefined)}>{subject.name}</SelectItem>
                                                        ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                    {subject && subject.name?.toUpperCase() === "MAPEH" && (
                                        <div className="grid gap-2">
                                            <FormField
                                                name="subComponent"
                                                control={form.control}
                                                render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sub Component <span className='text-red-700'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Select 
                                                            onValueChange={(value) => {
                                                                setSubComponent(value)
                                                                field.onChange(value)
                                                            }} 
                                                            value={subject?.name?.toUpperCase() !== "MAPEH" ? undefined : field.value} 
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a Subject " />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                            {["Music","Arts", "Physical Education", "Health"].map((s)=>(
                                                                <SelectItem key={s} value={s} >{s}</SelectItem>
                                                            ))}
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
                                    <div className="grid col-span-2 gap-2">
                                        <FormField
                                            name="createClassRecords"
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem className=" flex items-center space-y-3">
                                                    <FormLabel className='mt-3 text-text text-xs'>Automatically use this assessment to your students?</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup 
                                                            defaultValue="Yes" 
                                                            className='pl-5 flex gap-x-5'
                                                            onValueChange={field.onChange}
                                                        >
                                                            <FormItem  className="space-x-2">
                                                                <FormControl>
                                                                    <RadioGroupItem 
                                                                        value="Yes" 
                                                                        id="yes" 
                                                                       
                                                                        className='rounded-none' />
                                                                    
                                                                </FormControl>
                                                                <Label htmlFor="Yes">Yes</Label>
                                                            </FormItem >
                                                            <FormItem  className="space-x-2">
                                                                <FormControl>
                                                                    <RadioGroupItem 
                                                                        value="No" 
                                                                        id="no" 
                                                                      
                                                                        className='rounded-none' />
                                                                </FormControl>
                                                                <Label htmlFor="No">No</Label>
                                                            </FormItem >
                                                        </RadioGroup>
                                                    </FormControl>
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
                                        setSubComponent(undefined)
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