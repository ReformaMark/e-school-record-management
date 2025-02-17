import React, { useMemo, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StudentWithDetails } from '@/lib/types'
import { FaLevelUpAlt } from 'react-icons/fa'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import { Id } from '../../../../../convex/_generated/dataModel'
import { cn } from '@/lib/utils'

interface FinalizeGradesDialogProps {
    student:StudentWithDetails,
    averages: {
        classId: Id<'classes'> | undefined,
        subjectName: string,
        finalGrade: number | string
    }[] | null,
    generalAverage: number | string
}

function FinalizeGradesDialog({student, averages, generalAverage}:FinalizeGradesDialogProps ) {
    const [isOpen, setIsOpen ] = useState(false)
    const [isLoading, setIsLoading ] = useState(false)
    const [isDisabled, setIsDisabled ] = useState(false)
    const promoteStudent = useMutation(api.finalGrades.create)

    const isPromoted = useQuery(api.finalGrades.isStudentPromoted,{
        studentId: student._id as Id<'students'>,
        sectionId: student.sectionDoc?._id as Id<'sections'>,
        schoolYearId: student.sectionDoc?.schoolYearId as Id<'schoolYears'>,
        semester: student.cLass?.semester
    })

    const isShs = Number(student.sectionDoc?.gradeLevel?.level ?? 0) > 10

    const alreadyPromoted = useMemo(() => isPromoted === undefined ? true : isPromoted ,[isPromoted])

    const studentGradeLevel = student.gradeLevelToEnroll
    const sectionGradeLevel = student.sectionDoc?.gradeLevel?.level

    const isRetained = useMemo(() => isPromoted ? studentGradeLevel === sectionGradeLevel ? true : false : false ,[isPromoted, sectionGradeLevel])

    const failedAverages = useMemo(() => {
        if (averages === null) {
            setIsDisabled(true);
            return null;
        }
     
        const allNumberAverages = averages.filter((item) => (typeof item.finalGrade === "number"))
    
        // Filter averages less than or equal to 74
        const filteredAverages = allNumberAverages.filter(
            (item) => (item.finalGrade as number) <= 74
        );
 
        // If all averages are valid numbers, ensure `disabled` is false
        setIsDisabled(false);
    
        return filteredAverages;
    }, [averages, setIsDisabled]);

    const convertedTypesAve = averages?.map(a => {
        return {
            classId: a.classId as Id<'classes'>,
            subjectName: a.subjectName,
            forRemedial: typeof a.finalGrade === 'string' ? false : a.finalGrade <= 74 ? true : false,
            finalGrade: typeof a.finalGrade === 'string' ? 0 : a.finalGrade 
        }
    })
    const removeClassIdUndefined = convertedTypesAve?.filter(a=> a.classId !== undefined) ?? []
    
    const studentName = `${student.firstName} ${student.middleName ? student.middleName: ""} ${student.lastName}`

    const handlePromote = () =>{
        setIsLoading(true)
        toast.promise(promoteStudent({
            sectionId: student.sectionDoc?._id as Id<'sections'>,
            advisorId: student.cLass?.teacherId as Id<'users'>,
            studentId: student._id,
            subjects: removeClassIdUndefined ?? [],
            schoolYearId: student.cLass?.schoolYearId,
            generalAverage: typeof generalAverage === 'string' ? 0 : generalAverage,
            semester: student.cLass?.semester
        }),{
            loading: "Promoting student...",
            success: "Student promoted successfully.",
            error: "Failed to promote student."
        })
        setIsOpen(!isOpen)
        setIsLoading(false)
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger disabled={ alreadyPromoted || isDisabled === true || isLoading} onClick={()=> setIsOpen(!isOpen)}>
                        <Button size="default" disabled={ alreadyPromoted || isDisabled === true || isLoading}  className={cn(isRetained && "bg-red-500 disabled:bg-red-500" ," self-end h-7 gap-1 bg-blue-600 text-white py-2 ml-auto")}>
                            <FaLevelUpAlt className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                {isPromoted ? isRetained ? "Retained" :"Promoted" : "Promotion"}
                            </span>
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className=' bg-white p-5 space-y-2 shadow-md'>
                    <p>To promote the student, you must complete and finalize the final rating for all subjects.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider> 
        <DialogContent className=' max-h-screen overflow-auto text-primary'>
        <DialogHeader>
            <DialogTitle className='text-lg'>
                Promote to the next grade level? 
            </DialogTitle>
            
        </DialogHeader>
        
        { failedAverages && failedAverages?.length >= 1 ? failedAverages.length  >= 3 && isShs ? (
            <>
                <div className="space-y-3">
                    <p>{studentName} has <strong>failed ({ failedAverages?.length})</strong> of his subjects.</p>
                    <h1>Failed Subject(s):</h1>
                    { failedAverages?.map((fs)=>(
                        <div key={fs.subjectName} className="">
                            <h1 className='pl-5'>- <strong>{fs.subjectName} - ({fs.finalGrade})</strong></h1>
                        </div>
                    ))}

                    <p className='text-sm text-justify'>* Must pass remedial classes for failed competencies in the subjects or learning areas to be allowed to enroll in the next semester. Otherwise the learner must retake the subjects failed.</p>
                </div>
              
                <DialogFooter>
                    <Button variant={'default'} onClick={handlePromote} className=" text-white">Conditionally Promote</Button>
                </DialogFooter>
            </>
        ) :(
            <>
                <div className="space-y-3">
                    <p>{studentName} has <strong>failed ({ failedAverages?.length})</strong> of his subjects.</p>
                    <h1>Failed Subject(s):</h1>
                    { failedAverages?.map((fs)=>(
                        <div key={fs.subjectName} className="">
                            <h1 className='pl-5'>- <strong>{fs.subjectName} - ({fs.finalGrade})</strong></h1>
                        </div>
                    ))}
                    <p className='text-sm text-justify'>* Did not meet expectations in three or more learning areas. Retained in the same grade level.</p>
                </div>
                <DialogFooter>
                    <Button variant={'destructive'} onClick={handlePromote} className=" text-white">Retain</Button>
                </DialogFooter>
            </>
        ): (
            <>
                <p className='capitalize'>{studentName} has passed all his subjects.</p>
                <DialogFooter>
                    <Button variant={'default'} onClick={handlePromote} className=" text-white">Promote</Button>
                </DialogFooter>
            </>
        )}
        </DialogContent>
    </Dialog>
  )
}

export default FinalizeGradesDialog