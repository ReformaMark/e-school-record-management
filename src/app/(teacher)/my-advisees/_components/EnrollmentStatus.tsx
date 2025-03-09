'use client'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StudentWithSem } from "@/lib/types"
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";

interface EnrollmentStatusProps {

    enrollmentStatus: string;
    student: StudentWithSem;
}

function EnrollmentStatus({
    enrollmentStatus,
    student
}: EnrollmentStatusProps) {
    const [dialogOpen, setDialogOpen] = useState(false) 
    const [isLoading, setIsLoading] = useState(false) 
    const {firstName, middleName, lastName, extensionName } = student
    const unenrollStudent = useMutation(api.enrollments.unenrollStudent)

    const handleUnenroll = () => { 
        setIsLoading(true)
        toast.promise(
            unenrollStudent({studentId:student._id , isShs: student.isSHS, sem: student.sem as string}),
            {
                loading: 'Unenrolling student...',
                success: 'Student unenrolled',
                error: 'Failed to unenroll student'
            }
        )
        setDialogOpen(false)
        setIsLoading(false)
    }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
            <Button variant={'ghost'} size={'sm'} className="text-sm text-primary mr-2">Unenroll</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-primary">Unenroll? </DialogTitle>
            </DialogHeader>
            <div className="px-4 py-2">
                <h1 className="text-sm text-gray-700"> Student Name: {firstName} {middleName} {lastName} {extensionName}</h1>
                <h1 className="text-sm text-gray-700"> Enrollments Status: {enrollmentStatus}</h1>
            </div>
            <DialogFooter>
                <Button variant={'ghost'} onClick={()=>{setDialogOpen(false)}} className="text-primary">Cancel</Button>
                <Button variant={'default'} disabled={isLoading} onClick={handleUnenroll} className="text-white">Unenroll</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
      )
}

export default EnrollmentStatus