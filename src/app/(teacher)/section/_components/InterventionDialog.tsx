'use client'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import { Textarea } from '@/components/ui/textarea'
import { QuarterlyGrades } from '@/lib/types'
import { useMutation, useQuery } from 'convex/react'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { api } from '../../../../../convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Id } from '../../../../../convex/_generated/dataModel'
interface InterventionDialogProp {
    open: boolean,
    setOpen: (value: boolean) => void,
    quarterlyGrade: QuarterlyGrades | undefined
    usedIntervention: string[]
}
function InterventionDialog({quarterlyGrade, open, setOpen, usedIntervention}: InterventionDialogProp) {
    const interventions = useQuery(api.interventions.get)
    const saveInterventionStats = useMutation(api.quarterlyGrades.saveRemarks)
    
    const interventionNames = interventions ? interventions.map(i => {
      return{
        label: i.name, 
        value: i.name,
        
      }
    }) : []
    const [selectedInterventions, setSelectedInterventions] = useState<string[]>(usedIntervention);
    const remarksValue = quarterlyGrade?.interventionRemarks ?? ""
    const [inputRemarks, setInputRemarks] = useState<string>(remarksValue);
    const modifiedG = quarterlyGrade?.interventionGrade?.toString() ?? ""
    const [modifiedGrade, setModifiedGrade] = useState<string>(modifiedG);
    const handleSaveRemarks = () =>{
        toast.promise(saveInterventionStats({
          id: quarterlyGrade?._id,
          remarks: inputRemarks,
          interventionUsed: selectedInterventions as Id<'interventions'>[],
          interventionGrade: Number(modifiedGrade)

        }),{
            loading: "Saving Interventions details",
            success: "Interventions details save successfully. :)",
            error: "Failed to save Interventions details. :(",
        })

        setOpen(false)
    }
  return (
    <Dialog open={open}>
    <DialogTrigger onClick={() =>setOpen(true)}>
      <Pencil/>
    </DialogTrigger>
    <DialogContent className=' max-h-screen max-w-4xl overflow-auto text-primary'>
    <DialogHeader>
        <DialogTitle>
          Student Intervention Information
        </DialogTitle>
    </DialogHeader>
       <div className="">
        <Label className={"font-semibold"}>Intervention Used</Label>
          <MultiSelect
            options={interventionNames}
            onValueChange={setSelectedInterventions}
            defaultValue={selectedInterventions}
            placeholder="Select Interventions"
            variant="default"
            className='bg-white'
          />
       </div>
       <div className="">
            <Label className={"font-semibold"} htmlFor="remarks">Remarks</Label>
            <Textarea 
                id="remarks"
                placeholder="Type your remarks here." 
                value={inputRemarks} 
                onChange={(e) => setInputRemarks(e.target.value)} 
                required
                className='bg-white h-36'
            />
        </div>
         <div className="">
            <Label className={"font-semibold"} htmlFor="modifiedGrade">Modified Grade</Label>
            <Input 
                type='number'
                id="modifiedGrade"
                onChange={(e)=>{setModifiedGrade(e.target.value)}}
                min={quarterlyGrade?.quarterlyGrade}
                value={modifiedGrade}
                required
                className='bg-white '
            />
        </div>
    <DialogFooter>
        <Button onClick={()=> setOpen(false)} variant={'outline'} className='text-primary'>Cancel</Button>
        <Button onClick={handleSaveRemarks} className='text-white w-32'>Save</Button>
    </DialogFooter>
    </DialogContent>
  
  </Dialog>
  )
}

export default InterventionDialog