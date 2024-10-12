'use client'
import Logo from '@/../public/images/black-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdOutlineDashboard, MdOutlineReport } from 'react-icons/md'
import { PiStudent } from 'react-icons/pi'

export const SchoolRegistrarSideNav = () => {
    const pathname = usePathname()

    return (
        <main className='fixed inset-0 w-[20%] bg-primary py-5 text-white'>
            <div className="flex items-center gap-x-1 border-b border-b-white px-3 pb-5">
                <Image src={Logo} alt='' className='w-16 h-10 object-contain invert' />
                <h1 className='text-white text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
            </div>

            <div className="px-2 py-5 space-y-2">
                <Link href={'/sr-dashboard'} className={`${pathname === '/sr-dashboard' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineDashboard className='size-5 w-10' />
                    <h1 className='tracking-wider'>Dashboard</h1>
                </Link>

                <Link href={'/sr-students'} className={`${pathname === '/sr-students' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <PiStudent className='size-5 w-10' />
                    <h1 className='tracking-wider'>Students</h1>
                </Link>

                <Link href={'/sr-documents'} className={`${pathname === '/sr-documents' ? "bg-[#0087ba]" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                    <MdOutlineReport className='size-5 w-10' />
                    <h1 className='tracking-wider'>Documents</h1>
                </Link>
            </div>
        </main>
    )
}