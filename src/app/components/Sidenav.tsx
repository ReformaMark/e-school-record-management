'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/images/tanjayLogo.png'
import Link from 'next/link'
import { MdOutlineClass, MdOutlineDashboard } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { PiStudent } from 'react-icons/pi'
import { TbListNumbers } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";

function Sidenav() {
    const pathname = usePathname()
  return (
    <main className='fixed inset-0 w-[20%] z-50 bg-white py-5 text-white shadow-lg'>
         <div className="flex items-center gap-x-1 border-b border-b-text px-3 pb-5">
            <Image src={Logo} alt='' className='w-16 h-10 object-contain' />
            <h1 className='text-text  text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
        </div>

        {/* for teachers navigation */}
        <div className="px-2 py-5 space-y-2">
            <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? "bg-[#0087ba] text-white": "bg-transparent"} text-text  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <MdOutlineDashboard className='size-5 w-10' />
                <h1 className='tracking-wider'>Dashboard</h1>
            </Link>

            <Link href={'/students'} className={`${pathname === '/students' ? "bg-[#0087ba] text-white": "bg-transparent"} text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <PiStudent  className='size-5 w-10'/> 
                <h1 className='tracking-wider'>Enrollment</h1>
            </Link>
            <Link href={'/my-advisees'} className={`${pathname === '/my-advisees' ? "bg-[#0087ba] text-white": "bg-transparent"}  text-text flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <GiTeacher  className='size-5 w-10 '/>  
                
                <h1 className='tracking-wider '>Advisees</h1>
            </Link>
           
            <Link href={'/section'} className={`${pathname === '/section' ? "bg-[#0087ba] text-white": "bg-transparent"} text-text  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <MdOutlineClass className='size-5 w-10 '/>
                <h1 className='tracking-wider '>Classes</h1>
            </Link>
            <Link href={'/assessments'} className={`${pathname === '/assessments' ? "bg-[#0087ba] text-white": "bg-transparent"} text-text  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <TbListNumbers className='size-4 w-10' />
                <h1 className='tracking-wider'>Assessments</h1>
            </Link>
           
        </div>
    </main>
  )
}

export default Sidenav