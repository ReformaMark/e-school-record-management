'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/images/logo.png'
import Link from 'next/link'
import { MdOutlineDashboard, MdOutlineSettings } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { PiStudent } from 'react-icons/pi'
import { FaRegHandPaper } from 'react-icons/fa'
import { FaMagnifyingGlass, FaRegUser } from 'react-icons/fa6'
import { TbReportAnalytics } from 'react-icons/tb'
import { BiHelpCircle } from 'react-icons/bi'

function Sidenav() {
    const pathname = usePathname()
  return (
    <main className='fixed inset-0 w-[20%] bg-primary py-5 text-white'>
        <div className="flex items-center gap-x-1 border-b border-b-white px-3 pb-5">
            <div className="w-12 h-10 mx-auto bg-white rounded-full p-1">
                <Image src={Logo} alt='' className='size-full object-contain '/>
            </div>
            <h1 className='text-white text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
        </div>

        {/* for teachers navigation */}
        <div className="px-2 py-5 space-y-2">
            <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <MdOutlineDashboard className='size-5 w-10' />
                <h1 className='tracking-wider'>Dashboard</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <PiStudent className='size-5 w-10' />
                <h1 className='tracking-wider'>Students</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <FaRegHandPaper className='size-4 w-10' />
                <h1 className='tracking-wider'>Interventions</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
            <   FaMagnifyingGlass className='size-4 w-10'/>
                <h1 className='tracking-wider'>Tracker Module</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <TbReportAnalytics className='size-5 w-10' />
                <h1 className='tracking-wider'>Reports</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <MdOutlineSettings className='size-5 w-10' />
                <h1 className='tracking-wider'>Settings</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <BiHelpCircle className='size-5 w-10' />
                <h1 className='tracking-wider'>Help & Support</h1>
            </Link>
            <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <FaRegUser className='size-5 w-10' />
                <h1 className='tracking-wider'>User Profile</h1>
            </Link>
        </div>
    </main>
  )
}

export default Sidenav