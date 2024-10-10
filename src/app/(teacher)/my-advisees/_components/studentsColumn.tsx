'use client'
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";
import Link from "next/link";
import { FaInfoCircle, FaUserEdit } from "react-icons/fa";

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
                <User className="size-10 bg-gray-200 p-1 rounded-full"/>
                <div className="">
                  <h1 className="text-xs">{lastName}, {firstName} {middleNameInitial}.</h1>
                  <h1 className="text-xs">{}</h1>

                </div>
            </div>
          )
        },
      },
   
    {
        accessorKey: "yearLevel",
        header: "Year Level"
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
              <Link href={`/my-advisees/${student.id}`} className="">
                  <FaUserEdit className="size-6 text-gray-400 hover:text-orange-500"/>
              </Link>
              <Link href={`/my-advisees/${student.id}`} className="">
                  <FaInfoCircle className="size-6 text-gray-400 hover:text-blue-500"/>
              </Link>
            </div>
          )
        },
      },
];