import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { MailIcon } from 'lucide-react'
import { FaFacebookMessenger } from 'react-icons/fa'
function About() {
  return (
    <div className='space-y-10'>
        {/* <h1 className='text-black font-semibold uppercase tracking-wide text-center text-lg md:text-2xl'>About Us</h1> */}
        <div className="flex flex-col items-center justify-center h-[50vh]  bg-gradient-to-b from-primary to-primary/70">
            <h1 className=' text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold text-center capitalize pt-12'>Simplify your workflow with seamless electronic records management!</h1>
            {/* <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className='text-lg md:text-2xl text-center tracking-wider uppercase font-mono'>
                    Mission 
                    </CardTitle>
                </CardHeader>
                <CardContent>
                <p>To provide schools with a centralized, digital platform that simplifies record management, minimizes paperwork, and promotes data integrity. We aim to support administrators, teachers, and students by offering a user-friendly and secure system for handling academic records, attendance, behavior reports, and more</p>
                </CardContent>

            </Card> */}
            <Card className='bg-transparent border-none text-white p-10'>
            <CardHeader>
                <CardTitle className='text-center text-lg md:text-xl lg:text-3xl uppercase'>  About Our Electronic Records Management System</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-xs md:text-sm lg:text-xl text-center'>Welcome to ERMS, an innovative Electronic Records Management System (ERMS) designed to streamline and enhance the management of student, academic, and administrative records. Our system is built to improve efficiency, accuracy, and accessibility for educational institutions, ensuring seamless record-keeping and data security.</p>
            </CardContent>
        </Card>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10">
            <Card className="">
                <CardHeader>
                    <CardTitle className='text-center text-xl lg:text-3xl uppercase text-primary'>Key Features</CardTitle>
                </CardHeader>
                <Separator className='my-3'/>
                <CardContent>
                    <div className="">
                        <ol className='space-y-5'>
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>User Management (SUM - User Access Rights Module)</h1> 
                                <p className='text-xs'>This module manages the creation, deletion, and modification of user accounts and implements role-based access control for different user groups (e.g., System Administrator, School Head, Teacher, Adviser).</p>
                            </li>
                        
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Record Management (RMM - Records Management Module)</h1> 
                                <p className='text-xs'>This module handles all the core records within the system, such as student profiles, teacher profiles, enrollment records, class records, and system maintenance data. It also includes a form generation sub-module.</p>
                            </li>
                        
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Recommendation System (RecSys - Recommender System Module)</h1> 
                                <p className='text-xs'>This module provides real-time recommendations to teachers based on student performance, suggesting interventions for students with grades below a certain threshold and ensuring accurate grade-level promotion.</p>
                            </li>
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Reporting and Analytics (ERA - Enterprise Reports and Analytics Module)</h1> 
                                <p className='text-xs'>This module generates analytical reports and visualizes student performance trends, interventions, and post-intervention data to help teachers and administrators monitor progress</p>
                            </li>
                        
                        </ol>
                    </div>
                </CardContent>

            </Card>
            <Card className="">
                <CardHeader>
                    <CardTitle className='text-center text-xl lg:text-3xl uppercase text-primary'>Why Choose Us?</CardTitle>
                </CardHeader>
                <Separator className='my-3'/>
                <CardContent>
                    <div className="">
                        <ol className='space-y-5'>
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'> Accuracy & Reliability</h1> 
                                <p className='text-xs'>Eliminate manual errors with automated calculations, data validation, and real-time updates.</p>
                            </li>
                        
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Accessibility & Convenience</h1> 
                                <p className='text-xs'>Access records anytime, anywhere through a secure online platform, allowing teachers and administrators to manage data with ease.</p>
                            </li>
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Security & Data Protection</h1> 
                                <p className='text-xs'>Our system uses advanced encryption and secure cloud storage to safeguard sensitive student and school information.</p>
                            </li>
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Compliance with DepEd Standards</h1> 
                                <p className='text-xs'>Align with DepEd guidelines and educational policies for efficient and standardized record-keeping.</p>
                            </li>
                            <li className='text-xs md:text-sm lg:text-lg'>
                                <h1 className='font-semibold italic'>Automated Reports & Analytics</h1> 
                                <p className='text-xs'>Generate detailed reports, track academic performance, and analyze student progress with data-driven insights.</p>
                            </li>
                        </ol>
                    </div>
                </CardContent>

            </Card>
        </div>
        <div className="px-10">

            <h1 className='text-center font-semibold text-lg md:text-xl lg:text-2xl  text-primary'>Join the Digital Transformation</h1>
            <p className='text-xs md:text-sm lg:text-lg xl:text-xl text-gray-500'>Our Electronic Records Management System is designed to help educational institutions transition into a paperless and more efficient record-keeping environment. Whether you&apos;re a teacher, school administrator, or student, our system is here to make academic management simpler, smarter, and more effective.</p>
            <p className='text-right text-xs md:text-lg font-semibold italic mt-10 text-primary'>Let&apos;s build a future-ready education system together!</p>
        </div>
        <div className="px-10 pb-20">
            
                <h1 className='text-center font-semibold text-lg md:text-xl lg:text-2xl  text-primary'>Contacts</h1>
                <Separator className='my-3'/>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 ">
                <Card >
                    <CardHeader>

                    </CardHeader>
                    <CardContent className=" flex flex-col items-center justify-center">

                    <Avatar className='size-32'>  
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='font-semibold text-lg capitalize text-primary'>Example Name</h1>
                    <div className="flex flex-col  gap-x-10  text-xs">
                        <h1 className='flex items-center'><MailIcon className='size-5'/> : example@gmail.com</h1>
                        <h1 className='flex items-center'><FaFacebookMessenger className='size-5'/> : example@gmail.com</h1>
                    </div>
                    </CardContent>
                </Card>
                <Card >
                <CardHeader>
                        
                        </CardHeader>
                    <CardContent className=" flex flex-col items-center justify-center">

                    <Avatar className='size-32'>  
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='font-semibold text-lg capitalize text-primary'>Example Name</h1>
                    <div className="flex flex-col  gap-x-10 text-xs">
                        <h1 className='flex items-center'><MailIcon className='size-5'/> : example@gmail.com</h1>
                        <h1 className='flex items-center'><FaFacebookMessenger className='size-5'/> : example@gmail.com</h1>
                    </div>
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader>
                        
                    </CardHeader>
                    <CardContent className=" flex flex-col items-center justify-center">

                    <Avatar className='size-32'>  
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='font-semibold text-lg capitalize text-primary'>Example Name</h1>
                    <div className="flex flex-col  text-xs">
                        <h1 className='flex items-center'><MailIcon className='size-5'/> : example@gmail.com</h1>
                        <h1 className='flex items-center'><FaFacebookMessenger className='size-5'/> : example@gmail.com</h1>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default About