'use client'
import Logo from '@/../public/images/black-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChalkboardTeacher } from "react-icons/fa"
import { FaUserTie } from 'react-icons/fa6'
import { MdOutlineDashboard, MdOutlineSupportAgent } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'

export const SystemAdminSidenav = () => {
    const pathname = usePathname()

    return (
        <main className='fixed inset-0 w-[20%] bg-primary py-5 text-white'>
            <div className="flex items-center gap-x-1 border-b border-b-white px-3 pb-5">
                <Image src={Logo} alt='' className='w-16 h-10 object-contain invert' />
                <h1 className='text-white text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
            </div>

            {/* for teachers navigation */}
            <div className="px-2 py-5 space-y-2">
                <Link href={'/sysadmin'} className={`${pathname === '/sysadmin' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineDashboard className='size-5 w-10' />
                    <h1 className='tracking-wider'>Dashboard</h1>
                </Link>
                <Link href={'/sys-admin-students'} className={`${pathname === '/sys-admin-students' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <PiStudent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Students</h1>
                </Link>
                <Link href={'/sys-admin-teachers'} className={`${pathname === '/sys-admin-teachers' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaChalkboardTeacher className='size-4 w-10' />
                    <h1 className='tracking-wider'>Teachers</h1>
                </Link>
                <Link href={'/sys-admin-registrar'} className={`${pathname === '/sys-admin-registrar' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineSupportAgent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Registrar</h1>
                </Link>
                <Link href={'/sys-admin-principal'} className={`${pathname === '/sys-admin-principal' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaUserTie className='size-5 w-10' />
                    <h1 className='tracking-wider'>Principal</h1>
                </Link>
                {/* <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineSettings className='size-5 w-10' />
                    <h1 className='tracking-wider'>Settings</h1>
                </Link>
                <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <BiHelpCircle className='size-5 w-10' />
                    <h1 className='tracking-wider'>Help & Support</h1>
                </Link>
                <Link href={'/dashboard'} className={`${pathname === '/' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <FaRegUser className='size-5 w-10' />
                    <h1 className='tracking-wider'>User Profile</h1>
                </Link> */}
            </div>
        </main>
    )
}