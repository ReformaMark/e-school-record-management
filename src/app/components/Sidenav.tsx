'use client'
import React from 'react'

import Link from 'next/link'
import { MdOutlineClass, MdOutlineDashboard } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { PiStudent } from 'react-icons/pi'
import { TbListNumbers } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { FaQuestion } from 'react-icons/fa'

function Sidenav() {
    const pathname = usePathname()
    return (
        <main
            className='hidden md:block fixed inset-0 w-[20%] pt-24 py-5 shadow-lg'
            style={{
                backgroundColor: "var(--nav-background, #1e293b)",
                color: "var(--nav-foreground, white)",
                borderColor: "var(--nav-border, rgba(255, 255, 255, 0.1))",
            }}
        >
            {/* for teachers navigation */}
            <div className="px-2 py-5 space-y-2">
                <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? "bg-background/50 text-white" : "bg-transparent"} text-textWhite  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineDashboard className='size-5 w-10' />
                    <h1 className='tracking-wider'>Dashboard</h1>
                </Link>

                <Link href={'/students'} className={`${pathname === '/students' ? "bg-background/50 text-white" : "bg-transparent"} text-textWhite flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <PiStudent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Enrollment</h1>
                </Link>
                <Link href={'/my-advisees'} className={`${pathname === '/my-advisees' ? "bg-background/50 text-white" : "bg-transparent"}  text-textWhite flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <GiTeacher className='size-5 w-10 ' />

                    <h1 className='tracking-wider '>Advisees</h1>
                </Link>

                <Link href={'/section'} className={`${pathname === '/section' ? "bg-background/50 text-white" : "bg-transparent"} text-textWhite  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineClass className='size-5 w-10 ' />
                    <h1 className='tracking-wider '>Classes</h1>
                </Link>
                <Link href={'/assessments'} className={`${pathname === '/assessments' ? "bg-background/50 text-white" : "bg-transparent"} text-textWhite  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <TbListNumbers className='size-4 w-10' />
                    <h1 className='tracking-wider'>Assessments</h1>
                </Link>
                <Link href={'/about'} className={`${pathname === '/about' ? "bg-background/50 text-white" : "bg-transparent"} text-textWhite  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaQuestion className='size-4 w-10' />
                    <h1 className='tracking-wider'>About</h1>
                </Link>

            </div>
        </main>
    )
}

export default Sidenav