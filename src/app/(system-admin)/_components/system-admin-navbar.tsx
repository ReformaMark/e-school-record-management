'use client'
import React from 'react'
import { FaRegMessage } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { usePathname } from 'next/navigation';

export const SystemAdminNavbar = () => {
    const pathname = usePathname()
    const formattedPathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;

    return (
        <nav className='w-full z-50 shadow-md py-5 flex justify-between items-center px-5  sm:px-12  md:px-16 lg:px-10 bg-white'>
            <h1 className='uppercase text-lg tracking-widest'>{formattedPathname}</h1>

            <div className="flex items-center gap-x-5">
                <FaRegMessage className='size-4' />
                <IoMdNotificationsOutline className='size-6' />
                <div className="flex items-center gap-x-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h3 className='text-sm'>Surname, Firstname MI.</h3>
                        <h6 className='text-xs text-left text-primary-foreground'>System Administrator</h6>
                    </div>

                </div>
            </div>

        </nav>
    )
}