'use client'
import Logo from '@/../public/images/tanjayLogo.png';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { useCurrentUser } from '@/features/current/api/use-current-user';
import { useAuthActions } from '@convex-dev/auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiLogOut } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineDashboard, MdOutlineReport } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';

export const SchoolRegistrarNavbar = () => {
    const pathname = usePathname()
    const { user, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()

    if (isLoading) {
        return null;
    }

    return (
        <nav className='w-full h-fit z-50 shadow-md py-5 fixed flex justify-between items-center pr-3 sm:pr-5 md:pr-10 lg:pr-10 bg-primary text-white'>
            <div className="flex items-center gap-x-1 px-3 md:w-[20%] ">
                <Image src={Logo} alt='' className='w-16 h-10 object-contain' />
                <h1 className='hidden md:block text-textWhite  text-center  md:text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
            </div>

            <div className='flex items-center gap-x-5'>
                {/* <FaRegMessage className='size-4' /> */}
                {/* <IoMdNotificationsOutline className='size-6' /> */}
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
                                    <h6 className='text-xs text-left text-white/70'>Registrar</h6>
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

                <div className='md:hidden'>
                    <Sheet>
                        <SheetTrigger asChild><GiHamburgerMenu /></SheetTrigger>
                        <SheetContent className='block md:hidden bg-primary' >
                            <SheetHeader className='py-5'>
                                <SheetTitle >
                                    <div className="flex items-center gap-x-3">
                                        <Avatar>
                                            <AvatarImage src={user?.image || ""} />
                                            <AvatarFallback
                                                className='bg-sky-500 text-white'
                                            >{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center">
                                            <h3 className='text-sm'>{user?.lastName}, {user?.firstName} {user?.middleName}</h3>
                                            <h6 className='text-xs text-left text-white/70'>Registrar</h6>
                                        </div>
                                    </div>

                                </SheetTitle>
                                <Separator />
                            </SheetHeader>

                            <div className="px-2 py-5 space-y-2">
                                <Link href={'/sr-dashboard'} className={`${pathname === '/sr-dashboard' ? "bg-background/50 text-white" : "bg-transparent"} text-white  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <MdOutlineDashboard className='size-5 w-10' />
                                    <h1 className='tracking-wider'>Dashboard</h1>
                                </Link>

                                <Link href={'/sr-students'} className={`${pathname === '/sr-students' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <PiStudent className='size-5 w-10' />
                                    <h1 className='tracking-wider'>Students</h1>
                                </Link>

                                <Link href={'/sr-documents'} className={`${pathname === '/sr-documents' ? "bg-background/50 text-white" : "bg-transparent"} text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <MdOutlineReport className='size-5 w-10' />
                                    <h1 className='tracking-wider'>Documents</h1>
                                </Link>
                            </div>

                            <SheetFooter className='mt-auto flex flex-row items-center'>
                                <BiLogOut
                                    className='size-4 w-10'
                                    onClick={() => signOut()}
                                />
                                <h1 className='tracking-wider'>Logout</h1>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* <div className="flex items-center gap-x-5">
                <FaRegMessage className='size-4' />
                <IoMdNotificationsOutline className='size-6' />

                <div className="flex items-center gap-x-3">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <h3 className='text-sm'>Surname, Firstname MI.</h3>
                        <h6 className='text-xs text-left text-primary-foreground'>Registrar</h6>
                    </div>
                </div>
            </div> */}
        </nav>
    )
}