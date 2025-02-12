'use client'
import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Settings } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { GradeWeightsFormSchema } from '@/lib/validation/grade-weights-form';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { SubjectsWithAppliedGradeWeights } from '@/lib/types'

interface GradeWeightsFormProps{
    subject: SubjectsWithAppliedGradeWeights
}

function GradeWeightsForm({subject}: GradeWeightsFormProps) {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [learningMode, setLearningMode] = useState<string>("")

    const addAppliedGW = useMutation(api.appliedGradeWeigths.create)
 

    const form = useForm<z.infer<typeof GradeWeightsFormSchema>>({
        resolver: zodResolver(GradeWeightsFormSchema),
        defaultValues: {
            learningMode: "Face to face",
            written: subject.appliedGradeWeights ? subject.appliedGradeWeights?.written : subject.gradeWeights?.written,
            performance:  subject.appliedGradeWeights ? subject.appliedGradeWeights?.performance : subject.gradeWeights?.performance,
            exam: learningMode === "Alternative Learning Module" ? undefined : subject.appliedGradeWeights ? subject.appliedGradeWeights?.exam : subject.gradeWeights?.exam,
        }
    });

    console.log(typeof form.getValues('written'))
    const onSubmit = async (data: z.infer<typeof GradeWeightsFormSchema>) => {
        toast.promise(addAppliedGW({
            subjectId: subject._id,
            learningMode: data.learningMode,
            written: data.written,
            performance: data.performance,
            exam: data.exam
        }),{
            loading: `Saving ${subject.subjectCode} grade weights... Please wait.`,
            success:() => {
                return `${subject.subjectCode} grade weights were saved successfully.`
            },
            error: () =>{
                return `Failed to save ${subject.subjectCode}'s grade weights. Please try again.`
            }
        })
        setIsDialogOpen(false)
    };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger onClick={()=> setIsDialogOpen(!isDialogOpen)}><Settings/></DialogTrigger>
        <DialogContent>
            <DialogTitle className='text-primary'>Set Grade Weights & Learning Mode for {subject.subjectCode}</DialogTitle>
            <DialogDescription className='text-xs'>We recommend this balanced weight distribution, but you can adjust it to fit your subject, teaching style, or learning mode.</DialogDescription>
            <div className="pt-2 border-t-2 border-t-gray-300">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="text-primary space-y-2 mx-auto w-full">
                            <FormField
                                name="learningMode"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className='mt-3 text-white px-2 py-1 font-semibold text-sm block w-full bg-primary'>Learning Mode</FormLabel>
                                        <FormControl>
                                            <RadioGroup 
                                                defaultValue="Face to face" 
                                                className='pl-5 flex gap-x-5'
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    setLearningMode(value)
                                                }}
                                            >
                                                <FormItem  className="space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem 
                                                            value="Face to face" 
                                                            className='rounded-none' />
                                                        
                                                    </FormControl>
                                                    <Label htmlFor="Yes">Face to face</Label>
                                                </FormItem >
                                                <FormItem  className="space-x-2">
                                                    <FormControl>
                                                        <RadioGroupItem 
                                                            value="Alternative Learning Module" 
                                                            className='rounded-none' />
                                                    </FormControl>
                                                    <Label htmlFor="No">Alternative Learning Module</Label>
                                                </FormItem >
                                            </RadioGroup>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-1 ">
                            <FormLabel className='text-white px-2 py-1 font-semibold text-sm block w-full bg-primary'>Set Grade Weights</FormLabel>
                            <div className="grid grid-cols-12 items-center w-full px-5">
                                <FormLabel className='col-span-4 font-semibold'>Written Works</FormLabel>
                                <FormField
                                    name={`written`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    placeholder="Percent" 
                                                    {...field}
                                                    className='w-20' 
                                                    
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-12 items-center w-full px-5">
                                <FormLabel className='col-span-4 font-semibold'>Performance Task</FormLabel>
                                <FormField
                                    name={`performance`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    placeholder="Percent" 
                                                    {...field} 
                                                    className='w-20' 
                                                    // defaultValue={Number(appliedGradeWeights.performance)}
                                                />
                                        
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className={cn('grid grid-cols-12 items-center w-full px-5', learningMode === "Alternative Learning Module" && "hidden") }>
                                <FormLabel className='col-span-4 font-semibold'>Major Exam</FormLabel>
                                <FormField
                                    name={`exam`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem  >
                                           
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    placeholder="Percent" 
                                                    {...field} 
                                                    className={cn('w-20')} 
                                                    // defaultValue={appliedGradeWeights ? Number(appliedGradeWeights.exam) : subject.gradeWeights?.exam}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='button' variant="ghost" onClick={() => setIsDialogOpen(false)} className="text-primary">
                                Close
                            </Button>
                            <Button type="submit" variant={'default'} className="text-white">Save</Button>
                        </DialogFooter>

                    </form>
                </Form>
            </div>
        </DialogContent>
    </Dialog>
  
  )
}

export default GradeWeightsForm