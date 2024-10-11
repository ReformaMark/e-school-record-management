'use client'
import Image from 'next/image'
import React from 'react'
import Logo from '@/../public/images/black-logo.svg'
import Link from 'next/link'
import { MdOutlineDashboard, MdOutlineSettings } from 'react-icons/md'
import { usePathname } from 'next/navigation'
import { PiStudent } from 'react-icons/pi'
import { TbListNumbers } from "react-icons/tb";
import { FaRegUser } from 'react-icons/fa6'
import { BiHelpCircle } from 'react-icons/bi'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { RxCaretDown } from 'react-icons/rx'

function Sidenav() {
    const pathname = usePathname()
  return (
    <main className='fixed inset-0 w-[20%] bg-primary py-5 text-white'>
         <div className="flex items-center gap-x-1 border-b border-b-white px-3 pb-5">
            <Image src={Logo} alt='' className='w-16 h-10 object-contain invert' />
            <h1 className='text-white text-center text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
        </div>

        {/* for teachers navigation */}
        <div className="px-2 py-5 space-y-2">
            <Link href={'/dashboard'} className={`${pathname === '/dashboard' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <MdOutlineDashboard className='size-5 w-10' />
                <h1 className='tracking-wider'>Dashboard</h1>
            </Link>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className={`${pathname === '/' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium `}>
                        <div className="flex items-center ">
                            <PiStudent className='size-5 w-10' />
                            <h1 className='tracking-wider ml-3'>Students</h1>
                        </div>
                       
                        <RxCaretDown className='size-7' />
                    </AccordionTrigger>
                    <AccordionContent className='pl-10'>
                        <div className="flex flex-col">
                            <Link href={'/my-advisees'} className={`${pathname === '/my-advisees' ? "bg-[#0087ba]": "bg-transparent"} hover:underline flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                My students
                            </Link>
                            <Link href={'/section'} className={`${pathname === '/section' ? "bg-[#0087ba]": "bg-transparent"} hover:underline  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                               Classes
                            </Link>
                        </div>
                   
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Link href={'/assessments'} className={`${pathname === '/assessments' ? "bg-[#0087ba]": "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                <TbListNumbers className='size-4 w-10' />
                <h1 className='tracking-wider'>Assessments</h1>
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