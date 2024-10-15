'use client'

import { School2Icon } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChalkboardTeacher } from "react-icons/fa"
import { FaUserTie } from 'react-icons/fa6'
import { MdOutlineDashboard, MdOutlineSupportAgent } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'
import { SidebarSection } from './sidebar-section'

export const SystemAdminSidenav = () => {
    const pathname = usePathname()

    return (
        <main className='hidden md:block fixed inset-0 w-[20%] bg-[#354649] pt-24 py-5 text-white shadow-lg'>
            <div className="px-2 py-5 space-y-2">
                <Link href={'/sysadmin'} className={`${pathname === '/sysadmin' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineDashboard className='size-5 w-10' />
                    <h1 className='tracking-wider'>Dashboard</h1>
                </Link>
                <Link href={'/sysadmin-admins'} className={`${pathname === '/sysadmin-admins' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <PiStudent className='size-5 w-10' />
                    <h1 className='tracking-wider'>System Administrators</h1>
                </Link>

                <SidebarSection
                    label="Principal"
                    icon={FaUserTie}
                >
                    <Link
                        href="/sysadmin-principal"
                        className={`${pathname === '/sysadmin-principal' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Current Principal
                    </Link>

                    <Link
                        href="/sysadmin-principal/list"
                        className={`${pathname === '/sysadmin-principal/list' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        List of All Principal
                    </Link>

                </SidebarSection>

                <Link href={'/sysadmin-teachers'} className={`${pathname === '/sysadmin-teachers' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaChalkboardTeacher className='size-4 w-10' />
                    <h1 className='tracking-wider'>Teachers</h1>
                </Link>
                <Link href={'/sysadmin-registrar'} className={`${pathname === '/sysadmin-registrar' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineSupportAgent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Registrar</h1>
                </Link>
                {/* <Link href={'/sysadmin-principal'} className={`${pathname === '/sysadmin-principal' ? "bg-background/50" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaUserTie className='size-5 w-10' />
                    <h1 className='tracking-wider'>Principal</h1>
                </Link> */}

                <Link href={'/sysadmin-students'} className={`${pathname === '/sysadmin-students' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <PiStudent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Students</h1>
                </Link>

                <SidebarSection
                    label="School"
                    icon={School2Icon}
                >
                    <Link
                        href="/sysadmin-school-year"
                        className={`${pathname === '/sysadmin-school-year' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        School Years
                    </Link>

                    <Link
                        href="/sysadmin-school-period"
                        className={`${pathname === '/sysadmin-school-period' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        School Periods
                    </Link>

                    <Link
                        href="/sysadmin-classroom"
                        className={`${pathname === '/sysadmin-classroom' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Classrooms
                    </Link>

                    <Link
                        href="/sysadmin-sections"
                        className={`${pathname === '/sysadmin-sections' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Sections
                    </Link>

                    <Link
                        href="/sysadmin-grade-levels"
                        className={`${pathname === '/sysadmin-grade-levels' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
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
                        className={`${pathname === '/sysadmin-subjects' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Subjects
                    </Link>

                </SidebarSection>
            </div>
        </main>
    )
}