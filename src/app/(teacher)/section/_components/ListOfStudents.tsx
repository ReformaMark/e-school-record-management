
import React from 'react'
import { studentsData } from './studentData';
import { FaCircleInfo } from 'react-icons/fa6';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';


function ListOfStudents() {
    const males = studentsData
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className='w-full'>
        <table className='w-full '>
            <thead className='bg-gray-300 px-2 py-1 w-full'>
                <tr className='px-2 border border-black'>
                    <td className='px-2 py-1 text-sm font-semibold border-r border-black'></td>
                    <td className='px-2 py-1 text-sm font-semibold border-r border-black'>LRN</td>
                    <td className='px-2 text-sm font-semibold border-r border-black'>Last Name</td>
                    <td className='px-2 text-sm font-semibold border-r border-black'>First Name </td>
                    <td className='px-2 text-sm font-semibold border-r border-black'>Middle Name </td>
                    <td className='px-2 text-sm font-semibold border-r border-black'>Date Enrolled</td>
                    <td className='px-2 text-sm font-semibold border-r border-black'>Actions</td>
                </tr>
            </thead>
            <tbody>
                {males && males.map((student, index)=>(
                    <tr key={student.id} className='px-2 py-2 text-xs border even:bg-gray-100 shadow-md'>
                        <td className='px-2 py-1 text-sm '>{index + 1}</td>
                        <td className='px-2 py-1 text-sm '>{student.lrn}</td>
                        <td className='px-2 font-semibold'>{student.lastName}</td>
                        <td className='px-2 font-semibold '>{student.firstName}</td>
                        <td className='px-2 font-semibold '>{student.middleName}</td>
                        <td className='px-2 font-semibold'>{student.dateEnrolled}</td>
                        <td className='px-2 font-semibold '>
                            <div className="flex justify-center text-gray-400 gap-x-2">
                               
                                <Dialog>
                                    <DialogTrigger className='border shadow-md flex justify-center items-center gap-x-3 bg-gray-400 text-white border-gray-100 rounded-md px-2 py-1'>
                                        <FaCircleInfo className='size-4 hover:text-blue-600 cursor-pointer'/>
                                    </DialogTrigger>
                                    <DialogContent className=''>
                                    <DialogHeader>
                                        <DialogTitle>{student.lastName}, {student.firstName} {student.middleName}</DialogTitle>
                                        <DialogDescription>
                                            <div className="">
                                                <p>{student.lastName} is doing a great job!</p>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button variant={'ghost'}>Cancel</Button>
                                        <Button  variant={'default'} className='text-white'>Okay</Button>
                                    </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </td>
                    </tr>
                ))}
               
            </tbody>
        </table>
    </div>
  )
}

export default ListOfStudents