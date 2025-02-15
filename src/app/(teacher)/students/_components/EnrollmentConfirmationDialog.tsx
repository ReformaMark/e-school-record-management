'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StudentTypes } from '@/lib/types'
import { useMutation, useQuery } from 'convex/react'
import { User } from 'lucide-react'
import React, { useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import {Doc, Id } from '../../../../../convex/_generated/dataModel'
import { toast } from 'sonner'

interface EnrollmentConfirmationDialogProps {
    isEnrolling: boolean
    student: StudentTypes
}

export default function EnrollmentConfirmationDialog({
    isEnrolling,
    student,
}: EnrollmentConfirmationDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedSection, setSelectedSection] = useState<string>()
    const [gradelevel, setGradeLevel ] = useState<string>()
    const addStudentToSection = useMutation(api.sections.addStudentToSection)
    const updateStudentGradeLevel = useMutation(api.students.updateStudentGradeLevel)
    const schoolYear = useQuery(api.schoolYear.get)
    const addEnrollment = useMutation(api.enrollments.addEnrollment)

    const latestSY = getLatestSchoolYear(schoolYear ?? [])

    function getLatestSchoolYear(schoolYears: Doc<'schoolYears'>[]) {
        if (!Array.isArray(schoolYears) || schoolYears.length === 0) {
            return undefined;
        }

        return schoolYears.reduce((latest, current) => {
            return new Date(current.endDate).getFullYear() > new Date(latest.endDate).getFullYear() ? current : latest;
        });
    }
    //get the sections of the grade level
    const sections = useQuery(api.sections.getSectionsUsingGradeLevel, {gradeLevel: gradelevel})
    const handleEnroll = () =>{
        setIsLoading(true)
        if(!student._id){
            return
        }
        if(!selectedSection){
            return
        }
        if(!latestSY){
            toast.error("Please make sure a school year has already been created.");
            setIsLoading(false)
            return
        }

   
        toast.promise(addStudentToSection({
            studentId: student._id, 
            sectionId: selectedSection as Id<'sections'>, 
            gradeLevelToEnroll: Number(gradelevel),
            semesterToEnroll: student.semesterToEnroll
        }), {
            loading: "Enrolling student...",
            success: async() => {
                setIsOpen(false)
                setOpen(false)
                setIsLoading(false)
                await updateStudentGradeLevel({studentId: student._id})
                await addEnrollment({studentId: student._id, sectionId: selectedSection as Id<'sections'>, schoolYearId: latestSY._id, dateEnrolled: new Date().toDateString(), status: "Success", sem: student.semesterToEnroll})
                return "Student enrolled successfully."
            } ,
            error: () => {
                setIsLoading(false)
                return "Unable to enroll the student." 
            }
        })

    }

  return (
    <div className="">
  
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant={'default'} onClick={()=> {
                setOpen(!open)
                setGradeLevel(student.gradeLevelToEnroll)
                }} 
                disabled={!isEnrolling} 
                className="text-white"
            >
                Enroll
            </Button>
            
            <DialogContent className=''>
                <DialogTitle className='text-primary'>
                    Enroll this student?
                </DialogTitle> 
            
                {/* <h1 className='text-text font-bold '>Student Information</h1> */}
                <div className="flex gap-x-5 items-center">
                    <User className="size-16 bg-gray-300 text-primary p-1 rounded-full"/>
                    <div className="text-text w-full">
                        <div className='text-sm space-y-2'>
                            <h3 className='w-full uppercase tracking-widest flex gap-x-1'><h4 className="font-bold  ">Name : </h4> {student?.lastName}, {student?.firstName} {student?.middleName} {student.extensionName}</h3> 
                            <h3 className='w-full uppercase tracking-widest flex gap-x-1'><h4 className="font-bold  ">LRN : </h4> {student?.lastName}, {student?.firstName} {student?.middleName} {student.extensionName}</h3> 
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={'secondary'} onClick={()=> setOpen(false)}>Cancel</Button>
                    <Button 
                        variant={'default'} 
                        onClick={() => {
                            setIsOpen(!isOpen)
                            setOpen(false)
                        }} 
                        disabled={!isEnrolling} 
                        className="text-white"
                    >
                            Yes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          
            <DialogContent className=''>
                <DialogTitle className='text-primary'>
                    Section?
                </DialogTitle> 
                <div className="text-text">
                    <Select onValueChange={(value)=> setSelectedSection(value)}>
                        <SelectTrigger className='bg-white'>
                            <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                            {sections?.map((section) => (
                                <SelectItem key={section._id} value={section._id} className='capitalize'>{section.name}</SelectItem>
                            ))}
                            
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button 
                        onClick={() =>{ 
                            setIsOpen(false)
                            setOpen(true)
                        }} 
                        variant={'secondary'}
                    >
                        Cancel
                    </Button>
                    <Button variant={'default'} disabled={!selectedSection || isLoading} onClick={handleEnroll} className='text-white'>Enroll now</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        
    </div>
  )
}
