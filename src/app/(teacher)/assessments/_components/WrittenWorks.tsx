'use client'
import { DataTable } from '@/components/data-table'
import React, { useState } from 'react'
import { AssessmentColumn, assessments } from './AssessmentData'
import {
  Dialog,
  DialogContent,

  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const gradesLevel = [7,8,9,10,11,12]
const assessmentNo = [1,2,3,4,5,6,7,8,9,10]
const quarter = ["1st","2nd","3rd","4th"]
const semester = ["1st", "2nd"]

type AssessmentType =  {
  gradeLevel: number, 
  quarter?: string, 
  semester?: string
  assessmentNo: number,
  score?: string
} 

const initialData = {
  gradeLevel: 7,
  assessmentNo: 1,

}

function WrittenWorks() {
  const writtenWorks = assessments.filter((assessment) => assessment.assessmentType === 'Written Work')
  const [selected, setSeleted ] = useState<AssessmentType>(initialData)

  const handleGradeLevelChange = (value: string) => {
    setSeleted((prevData) => ({
        ...prevData,
        gradeLevel: Number(value),
    }))
  }
  const handleQuarterChange = (value: string|undefined) => {
    setSeleted((prevData) => ({
        ...prevData,
        quarter: value,
    }))
  }
  const handleSemChange = (value: string|undefined) => {
    setSeleted((prevData) => ({
        ...prevData,
        semester: value,
    }))
  }
  const handleAssessmentNoChange = (value: string) => {
    setSeleted((prevData) => ({
        ...prevData,
        assessmentNo: Number(value),
    }))
  }

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    setSeleted((prevData) => ({
        ...prevData,
        [name]: value,
    }))
}
  return (
    <div className='bg-white p-10'>
      <div className="flex justify-between">
            <h1>Written Works</h1>
                <Dialog>
                    <DialogTrigger className='border shadow-md  text-xs flex justify-center items-center gap-x-3 disabled:bg-blue-200 bg-blue-600 text-white border-gray-100 rounded-md px-2 py-1'>
                        <Plus/> Assesment
                    </DialogTrigger>
                    <DialogContent className='max-w-6xl max-h-screen overflow-auto'>
                    <Card className="flex flex-col h-fit">
                        <CardHeader>
                            <CardTitle>Add assessment</CardTitle>
                            <CardDescription>
                                Fill out the form to add a new assessment
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-8 mt-7">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                            <div className="grid gap-2">
                                <Label htmlFor="gradeLevel">Grade Level</Label>
                                <Select onValueChange={handleGradeLevelChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select grade level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {gradesLevel.map((level)=>(
                                         <SelectItem key={level} value={level.toString()}>{level}</SelectItem>
                                      ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {selected && selected?.gradeLevel <= 10 && (
                            <div className="grid gap-2">
                              <Label htmlFor="gradeLevel">Quarter</Label>
                                <Select onValueChange={handleQuarterChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Quarter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {quarter.map((quarter)=>(
                                         <SelectItem key={quarter} onClick={()=>{setSeleted({...selected, quarter: quarter})}} value={quarter.toString()}>{quarter}</SelectItem>
                                      ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                            )}
                            {selected && selected?.gradeLevel > 10 && (
                            <div className="grid gap-2">
                                <Label htmlFor="gradeLevel">Semester</Label>
                                <Select onValueChange={handleSemChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {semester.map((semester)=>(
                                         <SelectItem key={semester} value={semester.toString()}>{semester}</SelectItem>
                                      ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                            )}
                            {selected && selected?.gradeLevel > 10 && (
                            <div className="grid gap-2">
                                <Label htmlFor="gradeLevel">Quarter</Label>
                                <Select onValueChange={handleSemChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Quarter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                         <SelectItem  value='1st Quarter'>1st Quarter</SelectItem>
                                         <SelectItem value='2nd Quarter'>2nd Quarter</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="gradeLevel">Subject</Label>
                                <Select onValueChange={handleGradeLevelChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {gradesLevel.map((level)=>(
                                         <SelectItem key={level} value={level.toString()}>{level}</SelectItem>
                                      ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                           <div className="grid gap-2">
                                <Label htmlFor="gradeLevel">Assessment No</Label>
                                <Select onValueChange={handleAssessmentNoChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Assessment No." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {assessmentNo.map((assessment)=>(
                                         <SelectItem key={assessment} value={assessment.toString()}>{assessment}</SelectItem>
                                      ))}
                                        
                                    </SelectContent>
                                </Select>
                            </div>
                           <div className="grid gap-2">
                           <div className="space-y-2">
                                <label className="text-sm font-medium">Highest Possible Score</label>
                                <Input type='number' placeholder='Ex. 50' onChange={handleInputChange} value={selected.score} name='score' />
                            </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="mt-auto flex flex-end">
                            <Button className="text-white">
                                Add
                            </Button> 
                        </CardFooter>
                    </Card>
                          
                    </DialogContent>
                </Dialog>
            </div>
        <DataTable 
            columns={AssessmentColumn}
            data={writtenWorks}
            filter=''
            placeholder=''
        />
    </div>
  )
}

export default WrittenWorks