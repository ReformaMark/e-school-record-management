'use client'
import Logo from '@/../public/images/tanjayLogo.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { School2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiLogOut } from 'react-icons/bi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaRegMessage, FaUserTie } from "react-icons/fa6";
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineDashboard, MdOutlineSupportAgent } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';
import { SidebarSection } from './sidebar-section';
import { useCurrentUser } from '@/features/current/api/use-current-user';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthActions } from '@convex-dev/auth/react';

export const SystemAdminNavbar = () => {
    const pathname = usePathname()
    const { user, isLoading } = useCurrentUser()
    const { signOut } = useAuthActions()

    if (isLoading) {
        return null;
    }

    return (
        <nav className='w-full h-fit z-50 shadow-md py-5 fixed flex justify-between items-center pr-3 sm:pr-5 md:pr-10 bg-primary text-white'>
            <div className="flex items-center gap-x-1 px-3 md:w-[20%] ">
                <Image src={Logo} alt='' className='w-16 h-10 object-contain' />
                <h1 className='hidden md:block text-textWhite  text-center  md:text-sm uppercase font-medium leading-relaxed'>Tanjay National High School</h1>
            </div>  

            <div className="flex items-center gap-x-5">
                <FaRegMessage className='size-4' />
                <IoMdNotificationsOutline className='size-6' />

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
                                    <h6 className='text-xs text-left text-white/70'>System Administrator</h6>
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
                        <SheetTrigger asChild><GiHamburgerMenu /></SheetTrigger>
                        <SheetContent className='block md:hidden bg-primary' >
                            <SheetHeader className='py-5'>
                                <SheetTitle >
                                    <div className="flex items-center gap-x-3">
                                        <Avatar
                                            className=''
                                        >
                                            <AvatarImage src={user?.image || ""} />
                                            <AvatarFallback
                                                className='bg-sky-500 text-white'
                                            >{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center ">
                                            <h3 className='text-sm '>{user?.lastName}, {user?.firstName}</h3>
                                            <h6 className='text-xs text-left text-white/70'>System Administrator</h6>
                                        </div>
                                    </div>

                                </SheetTitle>
                                <Separator />
                            </SheetHeader>

                            <div className="px-2 py-5 space-y-2">
                                <Link href={'/sysadmin'} className={`${pathname === '/sysadmin' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <MdOutlineDashboard className='size-5 w-10' />
                                    <h1 className='tracking-wider'>Dashboard</h1>
                                </Link>
                                <Link href={'/sysadmin-admins'} className={`${pathname === '/sysadmin-admins' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <PiStudent className='size-5 w-10' />
                                    <h1 className='tracking-wider'>System Administrators</h1>
                                </Link>

                                <SidebarSection
                                    label="Principal"
                                    icon={FaUserTie}
                                >
                                    <Link
                                        href="/sysadmin-principal"
                                        className={`${pathname === '/sysadmin-principal' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        Current Principal
                                    </Link>

                                    <Link
                                        href="/sysadmin-principal/list"
                                        className={`${pathname === '/sysadmin-principal/list' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        List of All Principal
                                    </Link>

                                </SidebarSection>

                                <Link href={'/sysadmin-teachers'} className={`${pathname === '/sysadmin-teachers' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <FaChalkboardTeacher className='size-4 w-10' />
                                    <h1 className='tracking-wider'>Teachers</h1>
                                </Link>
                                <Link href={'/sysadmin-registrar'} className={`${pathname === '/sysadmin-registrar' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <MdOutlineSupportAgent className='size-5 w-10' />
                                    <h1 className='tracking-wider'>Registrar</h1>
                                </Link>
                                {/* <Link href={'/sysadmin-principal'} className={`${pathname === '/sysadmin-principal' ? "bg-background/50" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                        <FaUserTie className='size-5 w-10' />
                                        <h1 className='tracking-wider'>Principal</h1>
                                    </Link> */}

                                <Link href={'/sysadmin-students'} className={`${pathname === '/sysadmin-students' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}>
                                    <PiStudent className='size-5 w-10' />
                                    <h1 className='tracking-wider'>Students</h1>
                                </Link>

                                <SidebarSection
                                    label="School"
                                    icon={School2Icon}
                                >
                                    <Link
                                        href="/sysadmin-school-year"
                                        className={`${pathname === '/sysadmin-school-year' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        School Years
                                    </Link>

                                    <Link
                                        href="/sysadmin-school-period"
                                        className={`${pathname === '/sysadmin-school-period' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        School Periods
                                    </Link>

                                    <Link
                                        href="/sysadmin-classroom"
                                        className={`${pathname === '/sysadmin-classroom' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        Classrooms
                                    </Link>

                                    <Link
                                        href="/sysadmin-sections"
                                        className={`${pathname === '/sysadmin-sections' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        Sections
                                    </Link>

                                    <Link
                                        href="/sysadmin-grade-levels"
                                        className={`${pathname === '/sysadmin-grade-levels' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        Grade Levels
                                    </Link>

                                    {/* <Link
                                            href="/sysadmin-time-period"
                                            className={`${pathname === '/sysadmin-time-period' ? "bg-background/50" : "bg-transparent"}  flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                        >
                                            Time Periods
                                        </Link> */}

                                    <Link
                                        href="/sysadmin-subjects"
                                        className={`${pathname === '/sysadmin-subjects' ? "bg-background/50 text-white" : "bg-transparent"}  text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium  text-center`}
                                    >
                                        Subjects
                                    </Link>

                                </SidebarSection>
                            </div>

                            <SheetFooter className='mt-auto'>
                                <button
                                    onClick={() => signOut()}
                                    className="text-white flex items-center py-2 px-3 rounded-xl gap-x-3 text-sm font-medium text-center hover:bg-background/50">
                                    <BiLogOut className='size-4 w-10' />
                                    <span className='tracking-wider'>Logout</span>
                                </button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

        </nav>
    )
}