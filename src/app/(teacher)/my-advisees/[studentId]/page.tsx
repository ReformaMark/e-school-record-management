'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Edit, File } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { FaLevelUpAlt } from 'react-icons/fa'
import { studentsData } from '../../../../../data/students-data'
import JrGradesTemplate from '../_components/JrGradesTemplate'
import SrGradesTemplate from '../_components/SrGradesTemplate'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

function Student({
    params
}:{
    params: {
        studentId: string
    }
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const student = studentsData.find( student => student.id === params.studentId)

  return (
    <div className='p-3 md:p-10 text-primary'>
    
        <div className="bg-white w-full-full min-h-screen h-fit p-5 shadow-md">
            <Link
                href="/my-advisees"
                className={cn("h-7 w-7", buttonVariants({
                    variant: "outline",
                    size: "icon",
                }))}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Link>
            <div className="w-full flex item-start justify-between mb-5 gap-x-2">
                
                <h1 className='text-lg md:text-xl text-primary font-semibold flex items-center'>Student Report Card</h1>
                <div className="space-y-3">
                    <Button size="default" onClick={()=> setIsOpen(!isOpen)} className="s self-end h-7 gap-1 bg-blue-600 text-white py-2 ml-auto">
                        <FaLevelUpAlt className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Promotion
                        </span>
                    </Button>
                    {/* <div className="text-xs text-primary">
                        <div className="flex items-center gap-x-2">
                            <div className="bg-blue-600 p-1 rounded-full size-2"></div>
                            <h1 className=''>Ready for promotion</h1>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <div className="bg-red-600 p-1 rounded-full size-2"></div>
                            <h1 className=''>Failed</h1>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <div className="bg-text p-1 rounded-full size-2"></div>
                            <h1 className=''>Pending</h1>
                        </div>

                    </div> */}
                </div>
            </div>
            <Dialog open={isOpen}>
                <DialogContent className=' max-h-screen overflow-auto text-primary'>
                <DialogHeader>
                    <DialogTitle className='text-lg'>
                        Promote to the next grade level? 
                    </DialogTitle>
                    
                </DialogHeader>
                <div className="space-y-3">
                    <p>{student?.lastName} has <strong>failed (1)</strong> of his subjects.</p>
                    <h1>Failed Subject(s):</h1>
                    <h1 className='pl-5'>- <strong>Pre-Calculus - (74)</strong></h1>
                    <p className='text-sm text-justify'>* Must pass remedial classes for failed competencies in the subjects or learning areas to be allowed to enroll in the next semester. Otherwise the learner must retake the subjects failed.</p>
                </div>
                <DialogFooter>
                    <Button variant={'default'} onClick={()=> setIsOpen(!isOpen)} className=" text-white">Conditionally Promote</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-4 mb-5 text-sm md:text-sm">
                <h1 className='col-span-4 md:col-span-2  text-text'>Student Number: <span className='text-sm md:text-lg font-semibold'> {student?.id} </span></h1>
                <h1 className='col-span-4 md:col-span-2  text-text'>LRN: <span className='text-sm md:text-lg font-semibold'> {student?.lrn} </span></h1>
                <h1 className='col-span-4 md:col-span-2  text-text'>Full Name: <span className='text-sm md:text-lg font-semibold'>{student?.lastName}, {student?.firstName} {student?.middleName} </span></h1>      
                <h1 className='col-span-4 md:col-span-2  text-text'>Grade Level: <span className='text-sm md:text-lg font-semibold'> {student?.yearLevel} </span></h1>           
                <h1 className='col-span-4 md:col-span-2  text-text'>Adviser: <span className='text-sm md:text-lg font-semibold'> Micheal Reyes </span></h1>           
                <h1 className='col-span-4 md:col-span-2  text-text'>Section: 11-A</h1> 
                {student?.yearLevel === "Grade 11"  && (
                    <>
                        <h1 className='col-span-4 md:col-span-2  text-text'>Strand: <span className='text-sm md:text-lg font-semibold'> {student?.strand} </span></h1>
                        <h1 className='col-span-4 md:col-span-2  text-text'>Semister: <span className='text-sm md:text-lg font-semibold'> 1st </span></h1>
                    </>
                )}       
                {student?.yearLevel === "Grade 12"  && (
                    <>
                        <h1 className='col-span-4 md:col-span-2  text-text'>Strand: <span className='text-sm md:text-lg font-semibold'> {student?.strand} </span></h1>
                        <h1 className='col-span-4 md:col-span-2  text-text'>Semister: <span className='text-sm md:text-lg font-semibold'> 1st </span></h1>
                    </>
                )}       
            </div> 
       
                <div className="flex  w-full my-4">
                    <Button size="default" variant="outline" className="h-7 gap-1 bg-gray-100 py-2 ">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Generate SF9
                        </span>
                    </Button>
                    <Button size="default" variant="outline" className="h-7 gap-1 bg-gray-100 py-2 ml-auto">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Generate SF10
                        </span>
                    </Button>

                </div>
             
            <Tabs defaultValue="grades" className="w-full">
                <TabsList>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                    <TabsTrigger value="values">Values</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>
                {/* Grades Content */}
                
                {student?.yearLevel === "Grade 11" || student?.yearLevel === "Grade 12" ? (
                    <TabsContent value="grades" className='text-xs md:text-sm w-full gap-x-10'>
                        <Tabs defaultValue="1st">
                            <TabsList>
                                <TabsTrigger value="1st">1st Semester</TabsTrigger>
                                <TabsTrigger value="2nd">2nd Semester</TabsTrigger>
                            </TabsList>
                            <TabsContent value='1st'>
                                <SrGradesTemplate sem='1st' strand={student.strand? student.strand : ''}/>
                            </TabsContent>
                            <TabsContent value='2nd'>
                                <SrGradesTemplate sem='2nd' strand={student.strand? student.strand : ''}/>
                            </TabsContent>
                        </Tabs>
                       
                    </TabsContent>
                ) :(
                    <TabsContent value="grades" className='text-xs md:text-sm w-full gap-x-10'>
                        <JrGradesTemplate/>
                    </TabsContent>
                )}
                {/* {Values} */}
                <TabsContent value='values'>
                    <div className="flex justify-end">
                        <Button size="default" variant="outline" className="h-7 gap-1 bg-gray-100 py-2 ml-auto">
                            <Edit className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Edit
                            </span>
                        </Button>
                    </div>
                    
                    <h1 className='text-sm font-semibold text-center'>REPORT ON LEARNER&apos;S OBSERVANCE OF VALUES</h1>
                    
                    <div className="grid grid-cols-12 w-full border-collapse border border-black  border-b-0 bg-gray-200 items-center text-center font-semibold text-sm">
                        <h1 className='col-span-4 h-full  flex items-center justify-center border-r border-r-black'>Core Values</h1>
                        <h1 className='col-span-4 flex items-center justify-center h-full border-r border-r-black'>Behavior Statements</h1>
                        <div className="col-span-4 grid grid-cols-4  text-center  items-center">
                            <h1 className='col-span-4 border-b border-b-black'>Quarter</h1>
                            <h1 className='col-span-1 '>1</h1>
                            <h1 className='col-span-1 border-l border-l-black'>2</h1>
                            <h1 className='col-span-1 border-l border-l-black'>3</h1>
                            <h1 className='col-span-1 border-l border-l-black'>4</h1>
                        </div>
                    </div>

                    {/* Core Values and Behavior Statements Section */}
                    <div className="">
                        {/* Maka-Diyos */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-xs md:text-sm">
                            <div className='col-span-4 h-full flex justify-center items-center border border-black p-2'>Maka-Diyos</div>
                            <div className='col-span-4 border-r border-r-black border-y border-y-black  h-full'>
                                <p className=" p-2 border-b border-black">Expresses one’s spiritual beliefs while respecting the spiritual beliefs of others.</p>
                                <p className="p-2">Shows adherence to ethical principles by upholding truth in all undertakings.</p>
                            </div>
                            <div className="col-span-4 border border-black border-l-0 h-full">
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center '>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black '>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                </div>
                                <div className="grid grid-cols-4 h-1/2 border-t border-t-black">
                                    <h1 className='flex justify-center items-center '>AO</h1>
                                    <h1 className='flex justify-center items-center  border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center  border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center  border-l border-l-black'>AO</h1>
                                </div>
                            </div>
                        </div>

                        {/* Makatao */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm">
                            <div className='col-span-4 flex items-center justify-center border-x border-x-black  h-full '>Makatao</div>
                            <div className='col-span-4  h-full border-r border-r-black'>
                                <p className=" p-2 border-b border-b-black">Is sensitive to individual, social, and cultural differences.</p>
                                <p className="p-2">Demonstrates contributions towards solidarity.</p>
                            </div>
                            <div className="col-span-4  h-full border-r border-r-black">
                                <div className="grid grid-cols-4 h-1/2 ">
                                    <h1 className='flex justify-center items-center '>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                </div>
                                <div className="grid grid-cols-4 h-1/2  border-t border-t-black">
                                    <h1 className='flex justify-center items-center '>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black '>AO</h1>
                                </div>
                            </div>
                        </div>

                        {/* Maka-Kalikasan */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm border-t border-t-black border-x border-x-black">
                            <div className='col-span-4 flex items-center justify-center border-r border-r-black h-full'>Maka-Kalikasan</div>
                            <div className='col-span-4 h-full'>
                                <p className=" p-2 border-r border-r-black">Cares for the environment and utilizes resources wisely, judiciously, and economically.</p>
                            </div>
                            <div className="col-span-4 h-full">
                                <div className="grid grid-cols-4 h-full">
                                    <h1 className='flex justify-center items-center '>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'>AO</h1>
                                </div>
                            </div>
                        </div>

                        {/* Maka-Bansa */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm border border-black">
                            <div className='col-span-4 flex items-center justify-center  h-full border-r border-r-black '>Maka-Bansa</div>
                            <div className='col-span-4 h-full border-r border-r-black'>
                                <p className="border-b border-b-black p-2">Demonstrates pride in being a Filipino; exercises the rights and responsibilities of a Filipino citizen.</p>
                                <p className="p-2 ">Demonstrates appropriate behavior in carrying out activities in school, community, and country.</p>
                            </div>
                            <div className="col-span-4 h-full ">
                                <div className="grid grid-cols-4 h-1/2 border-b border-b-black">
                                    <h1 className='flex justify-center items-center '></h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'></h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'></h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'></h1>
                                </div>
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center '></h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'></h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'></h1>
                                    <h1 className='flex justify-center items-center border-l border-l-black'></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-5">
                        <div className="flex flex-col justify-start items-center">
                            <h1 className='text-sm font-semibold'>Marking</h1>
                            <h2 className='text-sm text-left'>AO</h2>
                            <h2 className='text-sm text-left'>SO</h2>
                            <h2 className='text-sm text-left'>RO</h2>
                            <h2 className='text-sm text-left'>NO</h2>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <h1 className='text-sm font-semibold'>Non-Numerical Rating</h1>
                            <h2 className='text-sm text-left'>Always observed</h2>
                            <h2 className='text-sm text-left'>Sometimes Observed</h2>
                            <h2 className='text-sm text-left'>Rarely Observed</h2>
                            <h2 className='text-sm text-left'>Not Observed</h2>
                        </div>
                    </div>
                </TabsContent>
                {/* Attendance Content */}
                <TabsContent value="attendance">
                <div className="flex justify-end">
                    <Button size="default" variant="outline" className="h-7 gap-1 bg-gray-100 py-2 ml-auto">
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Edit
                        </span>
                    </Button>
                </div>
                
                <h1 className=' text-sm md:text-lg font-bold text-center mb-4'>ATTENDANCE RECORD</h1>
                    <div className="overflow-x-auto text-xs md:text-sm">
                        <table className="table-auto w-full text-left border-collapse border border-black">
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='border border-black p-2'>Month</th>
                                    <th className='border border-black p-2'>Days Present</th>
                                    <th className='border border-black p-2'>Days Absent</th>
                                    <th className='border border-black p-2'>Total School Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border border-black p-2'>June</td>
                                    <td className='border border-black p-2'>20</td>
                                    <td className='border border-black p-2'>0</td>
                                    <td className='border border-black p-2'>20</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>July</td>
                                    <td className='border border-black p-2'>22</td>
                                    <td className='border border-black p-2'>1</td>
                                    <td className='border border-black p-2'>23</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>August</td>
                                    <td className='border border-black p-2'>20</td>
                                    <td className='border border-black p-2'>0</td>
                                    <td className='border border-black p-2'>20</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>September</td>
                                    <td className='border border-black p-2'>21</td>
                                    <td className='border border-black p-2'>2</td>
                                    <td className='border border-black p-2'>23</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>October</td>
                                    <td className='border border-black p-2'>19</td>
                                    <td className='border border-black p-2'>1</td>
                                    <td className='border border-black p-2'>20</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>November</td>
                                    <td className='border border-black p-2'>22</td>
                                    <td className='border border-black p-2'>0</td>
                                    <td className='border border-black p-2'>22</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>December</td>
                                    <td className='border border-black p-2'>18</td>
                                    <td className='border border-black p-2'>0</td>
                                    <td className='border border-black p-2'>18</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>January</td>
                                    <td className='border border-black p-2'>22</td>
                                    <td className='border border-black p-2'>1</td>
                                    <td className='border border-black p-2'>23</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>February</td>
                                    <td className='border border-black p-2'>20</td>
                                    <td className='border border-black p-2'>0</td>
                                    <td className='border border-black p-2'>20</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>March</td>
                                    <td className='border border-black p-2'>23</td>
                                    <td className='border border-black p-2'>0</td>
                                    <td className='border border-black p-2'>23</td>
                                </tr>
                                <tr>
                                    <td className='border border-black p-2'>April</td>
                                    <td className='border border-black p-2'>N/A</td>
                                    <td className='border border-black p-2'>N/A</td>
                                    <td className='border border-black p-2'>N/A</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabsContent>
            </Tabs>

        </div>
     
    </div>
  )
}

export default Student