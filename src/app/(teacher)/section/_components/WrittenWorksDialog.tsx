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
    sortedWrittenWorks: {
        _id: Id<'classRecords'>,
        written: {
            score?: number | undefined;
            assessmentNo: number;
            highestScore: number;
        };
    }[];
    isWWOpen: boolean;
    setIsWWOpen: (value: boolean) => void;
    name: string;
}

function WrittenWorksDialog ({ 
    sortedWrittenWorks, 
    isWWOpen, 
    setIsWWOpen, 
    name,
}: WrittenWorksDialogProp ){

    const saveScore = useMutation(api.classRecords.saveScores)
    const form = useForm<z.infer<typeof InputGradesFormSchema>>({
        resolver: zodResolver(InputGradesFormSchema),
        defaultValues: {
            classRecordId: '',
            scores: sortedWrittenWorks.map(pt => ({
                assessmentNo: pt.written.assessmentNo,
                score: pt.written.score || undefined
            }))
        }
    });

    const onSubmit = async (data: z.infer<typeof InputGradesFormSchema>) => {
        toast.promise(saveScore({
            scores: data.scores,
            classRecordId: sortedWrittenWorks[0]._id,
            type: "Written Works"
        }),{
            loading: `Saving ${name} assessment scores...`,
            success:() => {
                setIsWWOpen(false)
                return `${name} assessment scores saved successfully.`
            },
            error: () =>{
                setIsWWOpen(false)
                return 'Failed to add new assessment.'
            }
        })
    };

    return (
       
        <Dialog open={isWWOpen} onOpenChange={setIsWWOpen}>
            <DialogContent className="max-h-screen overflow-auto text-primary">
                <DialogHeader>
                    <DialogTitle className='capitalize'>{name} Written Works Scores</DialogTitle>
                    <DialogDescription className='text-xs'></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="text-primary space-y-2 mx-auto w-full">
                            {sortedWrittenWorks.map((ww, index) => (
                                <div key={`${ww._id}-${index}`} className="flex gap-x-3 items-center">
                                    <h1 className="text-sm font-semibold">Written Work {index + 1} :</h1>
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
                                                        max={ww.written.highestScore}
                                                        {...field} 
                                                        className='w-20' 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <h1 className="text-sm font-semibold">out of {ww.written.highestScore}</h1>
                                </div>
                            ))}
                        
                        </div>
                        <DialogFooter>
                            <Button type='button' variant="ghost" onClick={() => setIsWWOpen(false)} className="text-primary">
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

export default WrittenWorksDialog;
