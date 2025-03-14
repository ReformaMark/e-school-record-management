'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentUser } from '@/features/current/api/use-current-user';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiLogOut } from "react-icons/bi";
import { FaRegMessage } from "react-icons/fa6";
import { GiHamburgerMenu, GiTeacher } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineClass, MdOutlineDashboard } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';
import { TbListNumbers } from 'react-icons/tb';
import { api } from '../../../convex/_generated/api';

function Navbar() {
    const pathname = usePathname()
    const { user, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()
    const school = useQuery(api.systemSettings.get)

    if (isLoading) {
        return null;
    }
    return (
        <nav className='w-full h-fit z-50 shadow-md py-5 fixed flex justify-between items-center pr-3 sm:pr-5 md:pr-10 lg:pr-10 bg-primary'>
            <div className="flex items-center gap-x-1 px-3 md:w-[20%] ">
                <Image src={school?.schoolImage as string} alt={school?.schoolName as string} className='w-16 h-10 object-contain' width={120} height={120} />
                <h1 className='hidden md:block text-textWhite  text-center  md:text-sm uppercase font-medium leading-relaxed'>{school?.schoolName}</h1>
            </div>

            <div className="flex items-center gap-x-5">
                <FaRegMessage className='size-4 text-textWhite' />
                <IoMdNotificationsOutline className='size-6 text-textWhite' />

                <div className="hidden md:flex items-center gap-x-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex items-center gap-x-3">
                                <Avatar>
                                    <AvatarImage src={user?.image || ""} />
                                    <AvatarFallback
                                        className='bg-sky-500 text-white'
                                    >{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="text-center">
                                    <h3 className='text-sm'>{user?.lastName}, {user?.firstName} {user?.middleName}</h3>
                                    <h6 className='text-xs text-left text-white/70'>Teacher</h6>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => signOut()}
                                className="cursor-pointer"
                            >
                                <BiLogOut className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger><GiHamburgerMenu className="text-textWhite" /></SheetTrigger>
                        <SheetContent className='block md:hidden bg-primary text-textWhite'>
                            <SheetHeader className='py-5'>
                                <SheetTitle >
                                    <div className="flex items-center gap-x-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback className='text-text'>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center text-textWhite">
                                            <h3 className='text-sm '>Surname, Firstname MI.</h3>
                                            <h6 className='text-xs text-left text-primary-foreground'>Teacher</h6>
                                        </div>
                                    </div>

                                </SheetTitle>
                                <Separator />
                                <SheetDescription>
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

                                    </div>
                                </SheetDescription>
                            </SheetHeader>
                            <SheetFooter className='mt-auto'>
                                <Link href={'/assessments'} className={`${pathname === '/assessments' ? "bg-[#0087ba] text-white" : "bg-transparent"} text-textWhite  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
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

export default Navbar