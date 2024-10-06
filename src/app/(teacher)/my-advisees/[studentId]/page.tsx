'use client'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { File } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Student({
    params
}:{
    params: {
        studentId: string
    }
}) {
  return (
    <div className='p-10'>
        <div className="bg-white w-full-full min-h-screen h-fit p-5 shadow-md">
            <div className="w-full flex item-center justify-between mb-5">
                <h1 className=' text-xl font-semibold '>Student Profile</h1>
                <Button size="default" variant="outline" className="h-7 gap-1 bg-gray-100 py-2 ml-auto">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Generate Report Card
                    </span>
                </Button>
            </div>
            <div className="grid grid-cols-4 mb-5">
                <h1 className='col-span-2 text-sm text-text'>Student Number: <span className='text-lg font-semibold'> {params.studentId} </span></h1>
                <h1 className='col-span-2 text-sm text-text'>Learning Reference Number: <span className='text-lg font-semibold'> LRN123456 </span></h1>
                <h1 className='col-span-2 text-sm text-text'>Full Name: <span className='text-lg font-semibold'> Doe, John Smith </span></h1>      
                <h1 className='col-span-2 text-sm text-text'>Grade Level: <span className='text-lg font-semibold'> 8 </span></h1>           
                <h1 className='col-span-2 text-sm text-text'>Adviser: <span className='text-lg font-semibold'> Micheal Smith </span></h1>           
                <h1 className='col-span-2 text-sm text-text'>Section: <span className='text-lg font-semibold'> Matikas </span></h1>        
            </div>
            <Tabs defaultValue="grades" className="w-full">
                <TabsList>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                    <TabsTrigger value="values">Values</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>
                {/* Grades Content */}
                <TabsContent value="grades" className='w-full gap-x-10'>
                    <h1 className='text-sm font-semibold text-center mb-4'>REPORT ON LEARNING PROGRESS AND ACHIEVEMENT</h1>
                   
                    <div className="grid grid-cols-12 w-full bg-gray-200 items-center text-center font-semibold text-sm border border-black">
                        <h1 className='col-span-4 h-full border border-black flex items-center justify-center'>Learning Areas</h1>
                        <div className="col-span-4 grid grid-cols-4 border border-black text-center items-center">
                            <h1 className='col-span-4 border border-black'>Quarter</h1>
                            <h1 className='col-span-1 border-l border-r border-black'>1st</h1>
                            <h1 className='col-span-1 border-l border-r border-black'>2nd</h1>
                            <h1 className='col-span-1 border-l border-r border-black'>3rd</h1>
                            <h1 className='col-span-1 border-l border-r border-black'>4th</h1>
                        </div>
                        <h1 className='col-span-2 flex items-center justify-center h-full border border-black'>Final Rating</h1>
                        <h1 className='col-span-2 flex items-center justify-center h-full border border-black'>Remarks</h1>
                    </div>
                    
                    {/* Grades Data */}
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>English</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>85</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>87</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>88</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>86</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>87</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>Mathematics</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>82</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>84</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>85</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>83</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>84</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>Science</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>89</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>91</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>90</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>88</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>90</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>Filipino</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>90</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>89</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>92</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>91</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>91</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>Araling Panlipunan</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>88</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>87</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>89</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>90</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>89</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>Edukasyon sa Pagpapakatao (EsP)</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>91</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>90</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>92</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>91</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>91</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>MAPEH</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>93</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>95</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>94</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>92</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>94</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                    <div className="grid grid-cols-12 w-full bg-gray-100 items-center text-center font-medium text-sm">
                        <div className='col-span-4 border-b border-black border-x p-2'>TLE</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>88</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>87</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>89</div>
                        <div className='col-span-1 border-b border-black border-r p-2'>90</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>89</div>
                        <div className='col-span-2 border-b border-black border-r p-2'>Passed</div>
                    </div>
                </TabsContent>
                {/* {Values} */}
                <TabsContent value='values'>
                    <div className="flex justify-end">
                        <Button size="default" variant="outline" className="h-7 gap-1 bg-gray-100 py-2 ml-auto">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                               Edit
                            </span>
                        </Button>
                    </div>
                   
                    <h1 className='text-sm font-semibold text-center'>REPORT ON LEARNER&apos;S OBSERVANCE OF VALUES</h1>
                    
                    <div className="grid grid-cols-12 w-full bg-gray-200 items-center text-center font-semibold text-sm">
                        <h1 className='col-span-4 h-full border-2 flex items-center justify-center border-black'>Core Values</h1>
                        <h1 className='col-span-4 flex items-center justify-center h-full border-2 border-black'>Behavior Statements</h1>
                        <div className="col-span-4 grid grid-cols-4 border text-center border-black items-center">
                            <h1 className='col-span-4 border border-black'>Quarter</h1>
                            <h1 className='col-span-1 border border-black'>1</h1>
                            <h1 className='col-span-1 border border-black'>2</h1>
                            <h1 className='col-span-1 border border-black'>3</h1>
                            <h1 className='col-span-1 border border-black'>4</h1>
                        </div>
                    </div>

                    {/* Core Values and Behavior Statements Section */}
                    <div className="">
                        {/* Maka-Diyos */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm">
                            <div className='col-span-4 h-full flex justify-center items-center border border-black p-2'>Maka-Diyos</div>
                            <div className='col-span-4 border border-black h-full'>
                                <p className="border-b border-b-black p-2">Expresses one’s spiritual beliefs while respecting the spiritual beliefs of others.</p>
                                <p className="p-2">Shows adherence to ethical principles by upholding truth in all undertakings.</p>
                            </div>
                            <div className="col-span-4 border border-black h-full">
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center border border-black'>1</h1>
                                    <h1 className='flex justify-center items-center border border-black'>2</h1>
                                    <h1 className='flex justify-center items-center border border-black'>3</h1>
                                    <h1 className='flex justify-center items-center border border-black'>4</h1>
                                </div>
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center border border-black'>1</h1>
                                    <h1 className='flex justify-center items-center border border-black'>2</h1>
                                    <h1 className='flex justify-center items-center border border-black'>3</h1>
                                    <h1 className='flex justify-center items-center border border-black'>4</h1>
                                </div>
                            </div>
                        </div>

                        {/* Makatao */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm">
                            <div className='col-span-4 flex items-center justify-center border h-full border-black'>Makatao</div>
                            <div className='col-span-4 border border-black h-full'>
                                <p className="border-b border-b-black p-2">Is sensitive to individual, social, and cultural differences.</p>
                                <p className="p-2">Demonstrates contributions towards solidarity.</p>
                            </div>
                            <div className="col-span-4 border border-black h-full">
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center border border-black'>1</h1>
                                    <h1 className='flex justify-center items-center border border-black'>2</h1>
                                    <h1 className='flex justify-center items-center border border-black'>3</h1>
                                    <h1 className='flex justify-center items-center border border-black'>4</h1>
                                </div>
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center border border-black'>1</h1>
                                    <h1 className='flex justify-center items-center border border-black'>2</h1>
                                    <h1 className='flex justify-center items-center border border-black'>3</h1>
                                    <h1 className='flex justify-center items-center border border-black'>4</h1>
                                </div>
                            </div>
                        </div>

                        {/* Maka-Kalikasan */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm">
                            <div className='col-span-4 flex items-center justify-center border h-full border-black'>Maka-Kalikasan</div>
                            <div className='col-span-4 border border-black h-full'>
                                <p className="border-b border-b-black p-2">Cares for the environment and utilizes resources wisely, judiciously, and economically.</p>
                            </div>
                            <div className="col-span-4 border border-black h-full">
                                <div className="grid grid-cols-4 h-full">
                                    <h1 className='flex justify-center items-center border border-black'>1</h1>
                                    <h1 className='flex justify-center items-center border border-black'>2</h1>
                                    <h1 className='flex justify-center items-center border border-black'>3</h1>
                                    <h1 className='flex justify-center items-center border border-black'>4</h1>
                                </div>
                            </div>
                        </div>

                        {/* Maka-Bansa */}
                        <div className="grid grid-cols-12 items-center text-center font-medium text-sm">
                            <div className='col-span-4 flex items-center justify-center border h-full border-black'>Maka-Bansa</div>
                            <div className='col-span-4 border border-black h-full'>
                                <p className="border-b border-b-black p-2">Demonstrates pride in being a Filipino; exercises the rights and responsibilities of a Filipino citizen.</p>
                                <p className="p-2">Demonstrates appropriate behavior in carrying out activities in school, community, and country.</p>
                            </div>
                            <div className="col-span-4 border border-black h-full">
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                </div>
                                <div className="grid grid-cols-4 h-1/2">
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                    <h1 className='flex justify-center items-center border border-black'></h1>
                                    <h1 className='flex justify-center items-center border border-black'></h1>
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
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Edit
                        </span>
                    </Button>
                </div>
                
                <h1 className='text-lg font-bold text-center mb-4'>ATTENDANCE RECORD</h1>
                    <div className="overflow-x-auto">
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