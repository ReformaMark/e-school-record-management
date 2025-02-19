'use client'
import { SidebarSection } from '@/app/(system-admin)/_components/sidebar-section'
import { School2Icon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChalkboardTeacher } from "react-icons/fa"
import { MdOutlineDashboard, MdOutlineReport, MdOutlineSupportAgent } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'

export const SchoolHeadSideNav = () => {
    const pathname = usePathname()

    return (
        <main className='hidden md:block fixed inset-0 w-[20%] bg-[#354649] pt-24 py-5 text-white shadow-lg'>
            {/* <div className="flex items-center text-white gap-x-1 border-b border-b-white px-3 pb-5">
                <Image src={Logo} alt='' className='w-16 h-10 object-contain invert' />
                <h1 className='text-white text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
            </div> */}

            {/* for school-head navigation */}
            <div className="px-2 py-5 space-y-2">
                <Link href={'/school-head'} className={`${pathname === '/school-head' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineDashboard className='size-5 w-10' />
                    <h1 className='tracking-wider'>Dashboard</h1>
                </Link>

                <Link href={'/sh-teachers'} className={`${pathname === '/sh-teachers' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaChalkboardTeacher className='size-4 w-10' />
                    <h1 className='tracking-wider'>Teachers</h1>
                </Link>
                <Link href={'/sh-registrar'} className={`${pathname === '/sh-registrar' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineSupportAgent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Registrar</h1>
                </Link>

                <Link href={'/sh-students'} className={`${pathname === '/sh-students' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <PiStudent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Students</h1>
                </Link>

                <SidebarSection
                    label="School"
                    icon={School2Icon}
                >
                    <Link
                        href="/sh-school-year"
                        className={`${pathname === '/sh-school-year' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        School Years
                    </Link>

                    <Link
                        href="/sh-school-periods"
                        className={`${pathname === '/sh-school-periods' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        School Periods
                    </Link>

                    <Link
                        href="/sh-schedule"
                        className={`${pathname === '/sh-schedule' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Schedules
                    </Link>

                    <Link
                        href="/sh-classrooms"
                        className={`${pathname === '/sh-classrooms' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Classrooms
                    </Link>

                    <Link
                        href="/sh-sections"
                        className={`${pathname === '/sh-sections' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Sections
                    </Link>

                    <Link
                        href="/sh-grade-levels"
                        className={`${pathname === '/sh-grade-levels' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Grade Levels
                    </Link>

                    <Link
                        href="/sh-subjects"
                        className={`${pathname === '/sh-subjects' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Subjects
                    </Link>

                    <Link
                        href="/sh-interventions"
                        className={`${pathname === '/sh-interventions' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                    >
                        Interventions
                    </Link>


                </SidebarSection>

                <Link href={'/sh-complaints'} className={`${pathname === '/sh-complaints' ? "bg-background/50 text-white" : "bg-transparent"}  flex items-center text-white py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineReport className='size-5 w-10' />
                    <h1 className='tracking-wider'>Complaints</h1>
                </Link>
            </div>
        </main>
    )
}