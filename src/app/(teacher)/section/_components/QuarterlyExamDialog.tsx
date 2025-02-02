import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGradesFormSchema } from '@/lib/validation/input-grades-form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { DialogDescription } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

interface WrittenWorksDialogProp {
    quarterExams: {
        _id: Id<'classRecords'>,
        quarterlyExam: {
            score?: number | undefined;
            assessmentNo: number;
            highestScore: number;
        };
    }[];
    isQAOpen: boolean;
    setIsQAOpen: (value: boolean) => void;
    name: string;
}

function QuarterlyAssessmentDialog ({ 
    quarterExams, 
    isQAOpen, 
    setIsQAOpen, 
    name,
}: WrittenWorksDialogProp ){

    const saveScore = useMutation(api.classRecords.saveScores)
    const form = useForm<z.infer<typeof InputGradesFormSchema>>({
        resolver: zodResolver(InputGradesFormSchema),
        defaultValues: {
            classRecordId: '',
            scores: quarterExams.map(qe => ({
                assessmentNo: qe.quarterlyExam.assessmentNo,
                score: qe.quarterlyExam.score || undefined
            }))
        }
    });

    const onSubmit = async (data: z.infer<typeof InputGradesFormSchema>) => {
        toast.promise(saveScore({
            scores: data.scores,
            classRecordId: quarterExams[0]._id,
            type: "Quarterly Assessment"
        }),{
            loading: `Saving ${name} assessment scores...`,
            success:() => {
                setIsQAOpen(false)
                return `${name} assessment scores saved successfully.`
            },
            error: () =>{
                setIsQAOpen(false)
                return 'Failed to add new assessment.'
            }
        })
    };

    return (
       
        <Dialog open={isQAOpen} onOpenChange={setIsQAOpen}>
            <DialogContent className="max-h-screen overflow-auto text-primary">
                <DialogHeader>
                    <DialogTitle className='capitalize'>{name} Quarterly Assessment Scores</DialogTitle>
                    <DialogDescription className='text-xs'></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="text-primary space-y-2 mx-auto w-full">
                            {quarterExams.map((qe, index) => (
                                <div key={`${qe._id}-${index}`} className="flex gap-x-3 items-center">
                                    <h1 className="text-sm font-semibold">Quarterly Assessment {index + 1} :</h1>
                                    <FormField
                                        name={`scores.${index}.score`} // Accessing score inside the object
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input 
                                                        type="number" 
                                                        placeholder="Score" 
                                                        min={0}
                                                        max={qe.quarterlyExam.highestScore}
                                                        {...field} 
                                                        className='w-20' 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <h1 className="text-sm font-semibold">out of {qe.quarterlyExam.highestScore}</h1>
                                </div>
                            ))}
                        
                        </div>
                        <DialogFooter>
                            <Button type='button' variant="ghost" onClick={() => setIsQAOpen(false)} className="text-primary">
                                Close
                            </Button>
                            <Button type="submit" variant={'default'} className="text-white">Save All</Button>
                        </DialogFooter>
                
                    </form>
                </Form>
                
            </DialogContent>
        </Dialog>
           
    );
};

export default QuarterlyAssessmentDialog;
