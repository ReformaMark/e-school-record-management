'use client'
import React from 'react'
import { FaRegMessage } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/../public/images/tanjayLogo.png'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { GiHamburgerMenu } from 'react-icons/gi';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { MdOutlineDashboard, MdOutlineSupportAgent } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';
import { SidebarSection } from './sidebar-section';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { School2Icon } from 'lucide-react'
import { FaUserTie } from 'react-icons/fa6'

export const SystemAdminNavbar = () => {
    const pathname = usePathname()
    const formattedPathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;

    return (
        <nav className='w-full z-50 shadow-md py-5 flex justify-between items-center pr-3 sm:pr-5 md:pr-10 lg:pr-10 bg-primary'>
            <div className="flex items-center gap-x-1 px-3 w-[20%] text-text">
                <Image src={Logo} alt='' className='w-16 h-10 object-contain' />
            <h1 className='hidden md:block text-text  text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
            </div>
            <h1 className='uppercase text-lg tracking-widest text-text'>{formattedPathname}</h1>

            <div className="flex items-center gap-x-5 text-text">
                <FaRegMessage className='size-4' />
                <IoMdNotificationsOutline className='size-6' />
                <div className="hidden md:flex items-center gap-x-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h3 className='text-sm'>Surname, Firstname MI.</h3>
                        <h6 className='text-xs text-left text-primary-foreground'>System Administrator</h6>
                    </div>

                </div>
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger><GiHamburgerMenu className="text-text"/></SheetTrigger>
                        <SheetContent className='block md:hidden bg-primary text-text'>
                            <SheetHeader className='py-5'>
                            <SheetTitle >
                            <div className="flex items-center gap-x-3">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className='text-text'>CN</AvatarFallback>
                                </Avatar>
                                <div className="text-center text-text">
                                    <h3 className='text-sm '>Surname, Firstname MI.</h3>
                                    <h6 className='text-xs text-left text-primary-foreground'>Teacher</h6>
                                </div>
                            </div>

                            </SheetTitle>
                            <Separator/>
                            <SheetDescription>
                                <div className="px-2 py-5 space-y-2">
                                    <Link href={'/sysadmin'} className={`${pathname === '/sysadmin' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <MdOutlineDashboard className='size-5 w-10' />
                                        <h1 className='tracking-wider'>Dashboard</h1>
                                    </Link>
                                    <Link href={'/sysadmin-admins'} className={`${pathname === '/sysadmin-admins' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <PiStudent className='size-5 w-10' />
                                        <h1 className='tracking-wider'>System Administrators</h1>
                                    </Link>

                                    <SidebarSection
                                        label="Principal"
                                        icon={FaUserTie}
                                    >
                                        <Link
                                            href="/sysadmin-principal"
                                            className={`${pathname === '/sysadmin-principal' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Current Principal
                                        </Link>

                                        <Link
                                            href="/sysadmin-principal/list"
                                            className={`${pathname === '/sysadmin-principal/list' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            List of All Principal
                                        </Link>

                                    </SidebarSection>

                                    <Link href={'/sysadmin-teachers'} className={`${pathname === '/sysadmin-teachers' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <FaChalkboardTeacher className='size-4 w-10' />
                                        <h1 className='tracking-wider'>Teachers</h1>
                                    </Link>
                                    <Link href={'/sysadmin-registrar'} className={`${pathname === '/sysadmin-registrar' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <MdOutlineSupportAgent className='size-5 w-10' />
                                        <h1 className='tracking-wider'>Registrar</h1>
                                    </Link>
                                    {/* <Link href={'/sysadmin-principal'} className={`${pathname === '/sysadmin-principal' ? "bg-background/50" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <FaUserTie className='size-5 w-10' />
                                        <h1 className='tracking-wider'>Principal</h1>
                                    </Link> */}

                                    <Link href={'/sysadmin-students'} className={`${pathname === '/sysadmin-students' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <PiStudent className='size-5 w-10' />
                                        <h1 className='tracking-wider'>Students</h1>
                                    </Link>

                                    <SidebarSection
                                        label="School"
                                        icon={School2Icon}
                                    >
                                        <Link
                                            href="/sysadmin-school-year"
                                            className={`${pathname === '/sysadmin-school-year' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            School Years
                                        </Link>

                                        <Link
                                            href="/sysadmin-school-period"
                                            className={`${pathname === '/sysadmin-school-period' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            School Periods
                                        </Link>

                                        <Link
                                            href="/sysadmin-classroom"
                                            className={`${pathname === '/sysadmin-classroom' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Classrooms
                                        </Link>

                                        <Link
                                            href="/sysadmin-sections"
                                            className={`${pathname === '/sysadmin-sections' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Sections
                                        </Link>

                                        <Link
                                            href="/sysadmin-grade-levels"
                                            className={`${pathname === '/sysadmin-grade-levels' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Grade Levels
                                        </Link>

                                        {/* <Link
                                            href="/sysadmin-time-period"
                                            className={`${pathname === '/sysadmin-time-period' ? "bg-background/50" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Time Periods
                                        </Link> */}

                                        <Link
                                            href="/sysadmin-subjects"
                                            className={`${pathname === '/sysadmin-subjects' ? "bg-background/50 text-white" : "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Subjects
                                        </Link>

                                    </SidebarSection>
                                </div>
                            </SheetDescription>
                            </SheetHeader>
                            <SheetFooter className='mt-auto'>
                                <Link href={'/assessments'} className={`${pathname === '/asda' ? "bg-background/50 text-white": "bg-transparent"} text-text  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <BiLogOut
                                    className='size-4 w-10' />
                                    <h1 className='tracking-wider'>Logout</h1>
                                </Link>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </nav>
    )
}