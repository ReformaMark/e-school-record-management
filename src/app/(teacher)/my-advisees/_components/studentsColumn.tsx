'use client'
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import Link from "next/link";
import { FaInfoCircle, FaUserEdit } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export type StudentType = {
    id: string;
    lrn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    birthDate: string; // Use `Date` if you plan to work with date objects instead of strings
    gender: 'male' | 'female' | 'other'; // if you're including more gender options
    address: string;
    yearLevel: string;
    parentGuardianName: string;
    parentGuardianContact: string;
};
export const studentColumn: ColumnDef<StudentType>[]  = [
    {
        id: "id",
        header: "Info",
        cell: ({ row }) => {
    
          const firstName = row.original.firstName
          const lastName = row.original.lastName
          const middleNameInitial = row.original.middleName ? row.original.middleName.charAt(0) : '';
     
          return (
            <div className="flex items-start gap-x-2 ">
                <User className="hidden  size-10 bg-gray-200 p-1 rounded-full"/>
                <div className="">
                  <h1 className="text-xs">{lastName}, {firstName} {middleNameInitial}.</h1>
                  <h1 className="text-xs">{}</h1>

                </div>
            </div>
          )
        },
      },
   
    {
        accessorKey: "gender",
        header: "Gender"
    },
    {
        accessorKey: "parentGuardianName",
        header: "Parent/Guardian"
    },
    {
        accessorKey: "parentGuardianContact",
        header: "Contact"
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const student = row.original
          return (
            <div className="flex items-center gap-x-2 ">
                <Dialog>
                    <DialogTrigger >
                      <FaUserEdit className="size-4 md:size-6 text-gray-400 hover:text-orange-500"/>
                    </DialogTrigger>
                    <DialogContent className='max-w-6xl max-h-screen overflow-auto text-primary'>
                    <DialogHeader>
                        <DialogTitle>
                          Student Profile
                        </DialogTitle>
                    </DialogHeader>
                    <div className="">
                      <h1 className="w-full bg-foreground py-1 px-2 font-semibold" >Personal Details</h1>
                      <div className="flex w-full gap-x-10">
                          <User className="size-20"/>
                          <div className="w-full space-y-5">
                            <div className="grid grid-cols-4 w-full">
                              <h1>LRN: 1234512345</h1>
                              <h1>PSA Birth Cert No.: 1234567890</h1>

                            </div>
                            <div className="grid grid-cols-4 w-full">
                              <h1>Last Name: Doe</h1>
                              <h1>Firts Name: John</h1>
                              <h1>Middle Name: Smith</h1>
                              <h1>Extention Name: </h1>
                            </div>
                            <div className="grid grid-cols-4">
                              <h1>Age: 16</h1>
                              <h1>Birthday: 2008-01-15</h1>
                              <h1>Gender: Male</h1>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div className="grid gap-x-5 grid-cols-2">
                    <div className="">
                        <h1 className="w-full bg-foreground py-1 px-2 font-semibold" >Current Address</h1>
                        <div className="w-full space-y-5">
                          <div className="">
                            <h1>Province: Metro Manila</h1>
                            <h1>Municipality: Quezon City</h1>
                            <h1>Barangay: Commonwealth</h1>
                            <h1>Street: Luzon Ave</h1>
                            <h1>House No.: 45</h1>
                            <h1 className="col-span-3">Full Address: 45 Luzon Ave, Commonwealth, Quezon City, Metro Manila</h1>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <h1 className="w-full bg-foreground py-1 px-2 font-semibold" >Parent/Guardian information</h1>
                        <div className="w-full space-y-5">
                          <div className="grid grid-cols-2 gap-5">
                            <h1>Fathers Fullname: Michael J. Doe</h1>
                            <h1>Fathers Contact: 09123456789</h1>
                            <h1>Mothers Fullname: Maria F. Doe</h1>
                            <h1>Mothers Contact: 09198765432</h1>
                            <h1>Guardian Fullname: </h1>
                            <h1>Guardian Contact: </h1>
              
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="py-1 text-center shadow-sm bg-primary-foreground rounded-md text-textWhite">Show more details</h1>
                    </DialogContent>
                </Dialog>
              <Link href={`/my-advisees/${student.id}`} className="">
                  <FaInfoCircle className="size-4 md:size-6 text-gray-400 hover:text-blue-500"/>
              </Link>
            </div>
          )
        },
      },
];