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

interface PerformanceTaskDialogProp {
    sortedPerformanceTasks: {
        _id: Id<'classRecords'>,
        performance: {
            score?: number | undefined;
            assessmentNo: number;
            highestScore: number;
        };
    }[];
    isPTOpen: boolean;
    setIsPTOpen: (value: boolean) => void;
    name: string;
}

const PerformanceTaskDialog: React.FC<PerformanceTaskDialogProp> = ({ 
    sortedPerformanceTasks, 
    isPTOpen, 
    setIsPTOpen, 
    name,
}) => {

    const saveScore = useMutation(api.classRecords.saveScores)
    const form = useForm<z.infer<typeof InputGradesFormSchema>>({
        resolver: zodResolver(InputGradesFormSchema),
        defaultValues: {
            classRecordId: "",
            scores: sortedPerformanceTasks.map(pt => ({
                assessmentNo: pt.performance.assessmentNo,
                score: pt.performance.score || undefined
            }))
        }
    });

    

    const onSubmit = async (data: z.infer<typeof InputGradesFormSchema>) => {
        toast.promise(saveScore({
            scores: data.scores,
            classRecordId: sortedPerformanceTasks[0]._id,
            type: "Performance Tasks",
        }),{
            loading: `Saving ${name} assessment scores...`,
            success:() => {
                return `${name} assessment scores saved successfully.`
            },
            error: () =>{
                return 'Failed to add new assessment.'
            }
        })

        setIsPTOpen(false)
    };


    return (
       
        <Dialog open={isPTOpen} onOpenChange={setIsPTOpen}>
            <DialogContent className="max-h-screen overflow-auto text-primary">
                <DialogHeader>
                    <DialogTitle className='capitalize'>{name} Performance Tasks Scores</DialogTitle>
                    <DialogDescription className='text-xs'></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="text-primary space-y-2 mx-auto w-full">
                            {sortedPerformanceTasks.map((pt, index) => (
                                <div key={`${pt._id}-${index}`} className="flex gap-x-3 items-center">
                                    <h1 className="text-sm font-semibold">Performance Task {index + 1} :</h1>
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
                                                        max={pt.performance.highestScore}
                                                        {...field} 
                                                        className='w-20' 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <h1 className="text-sm font-semibold">out of {pt.performance.highestScore}</h1>
                                </div>
                            ))}
                        
                        </div>
                        <DialogFooter>
                            <Button type='button' variant="ghost" onClick={() => setIsPTOpen(false)} className="text-primary">
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

export default PerformanceTaskDialog;
