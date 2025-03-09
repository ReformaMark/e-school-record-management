'use client'
import { DataTable } from "@/components/data-table";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
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
import { StudentWithSem } from "@/lib/types";
import { getAge } from "@/lib/utils";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from "@/components/ui/label";
import EnrollmentStatus from "./EnrollmentStatus";

export const StudentTable = () =>{
    const sy = useQuery(api.schoolYear.get)
    const latestSY = sy ? sy[0]._id : undefined
    const [selectedSY, setSelectedSY] = useState<Id<'schoolYears'> | undefined>(undefined)

    
    const [selectedSem , setSelectedSem] = useState<string | undefined>('1st')
    const students = useQuery(api.students.getStudentByTeacher,{
        sy: selectedSY,
        sem: selectedSem
    })

    const section = useQuery(api.sections.getSectionsByTeacher, {
        sy: latestSY
    })

    const gradeLevel = section?.gradeLevel?.level

    const isSHS = gradeLevel === "Grade 11" || gradeLevel === "Grade 12"
   
    useEffect(() => {
        if (latestSY) {
            setSelectedSY(latestSY)
        }
        if(gradeLevel){
            setSelectedSem(isSHS ? "1st" : undefined)
        }
    }, [isSHS, latestSY, gradeLevel])
   

    const sortedStudents = students?.sort((a, b) => a.lastName.localeCompare(b.lastName)) ?? [];

    return (
        <>
            <div className="flex items-center justify-between gap-x-1 text-primary ">
                <div className='flex items-center '>
                    <Label >School Year : </Label>
                    <Select defaultValue={selectedSY} onValueChange={(value)=>{setSelectedSY(value as Id<'schoolYears'>)}}>
                        <SelectTrigger className='w-40 bg-white'>
                            <SelectValue placeholder="Select school year" />
                        </SelectTrigger>
                        <SelectContent>
                        {sy && sy.map((sy) =>(
                            <SelectItem key={sy._id} value={sy._id}>{sy.sy}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                {isSHS && (
                    <div className='flex items-center '>
                      <Label >Semester : </Label>
                      <Select defaultValue={selectedSem} onValueChange={(value)=>{setSelectedSem(value)}}>
                          <SelectTrigger className='w-40 bg-white'>
                              <SelectValue placeholder="Select school year" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value={"1st"}>1st</SelectItem>
                              <SelectItem value={"2nd"}>2nd</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                )}
              
            </div>
            <DataTable
                columns={StudentColumn}
                data={sortedStudents}
                filter="fullName"
                placeholder="students by name"
            />
        </>
    )
}


export const StudentColumn: ColumnDef<StudentWithSem>[]  = [
    {
        id: "fullName",
        accessorFn: (row) => {
            const { firstName, middleName, lastName } = row;
            return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`;
          },
        header: "Info",
        cell: ({ row }) => {
    
          const firstName = row.original.firstName
          const lastName = row.original.lastName
          const middleNameInitial =  row.original.middleName ? `${row.original.middleName.charAt(0)}.` : '';
     
          return (
            <div className="flex items-start gap-x-2 ">
                <User className="hidden  size-10 bg-gray-200 p-1 rounded-full"/>
                <div className="">
                  <h1 className="text-sm whitespace-nowrap">{lastName}, {firstName} {middleNameInitial}</h1>
                </div>
            </div>
          )
        },
      },
   
    {
        accessorKey: "sex",
        header: "Gender",
        cell: ({ row }) => {
            return <h1 className="text-sm">{row.original.sex}</h1>
        }
    },
    {   
        accessorKey: 'guardianName',
        header: "Parent/Guardian",
        cell: ({ row }) => {
            const firstName = row.original.guardianFirstName
            const lastName = row.original.guardianLastName
            const middleNameInitial =  row.original.guardianMiddleName ? `${row.original.guardianMiddleName.charAt(0)}.` : '';
            const guardianName = lastName ? `${lastName}, ${firstName} ${middleNameInitial}` : " - "
            return <h1 className="text-sm whitespace-nowrap">{guardianName}</h1>
        }
    },
    {
        accessorKey: "parentGuardianContact",
        header: "Contact",
        cell: ({ row }) => {
            return <h1 className="text-sm whitespace-nowrap">{row.original.guardianContact ? row.original.guardianContact : "-"}</h1>
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const student = row.original
            const birthDate = new Date(student.birthDate);
            const isSHS = student.isSHS
            const sem = student.sem
            const enrollmentStatus = student.enrollmentStatus
            //full address
            const fulladdress = `${student.currentAddress.houseNum ? student.currentAddress.houseNum : ""} ${student.currentAddress.street ? student.currentAddress.street : ""} ${student.currentAddress.barangay ? `${student.currentAddress.barangay},` : ""} ${student.currentAddress.municipality ? `${student.currentAddress.municipality},`: ""} ${student.currentAddress.province ? student.currentAddress.province: ""}`
          return (
            <div className="flex items-center gap-x-2 ">
                <Link href={`/my-advisees/${student._id}?isSHS=${isSHS}&sem=${sem}`} className="">
                    <FaUserEdit className="size-4 md:size-6 text-gray-400 hover:text-orange-500"/>
                </Link>
                <Dialog>
                    <DialogTrigger >
                        <FaInfoCircle className="size-4 md:size-6 text-gray-400 hover:text-blue-500"/>
                    </DialogTrigger>
                    <DialogContent className='max-w-6xl max-h-screen overflow-auto text-primary'>
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                            <div className="">
                                Student Profile
                            </div>
                            <div className="">
                            <EnrollmentStatus enrollmentStatus={enrollmentStatus as string} student={student} />
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="">
                        <h1 className="w-full bg-foreground py-1 px-2 font-semibold" >Personal Details</h1>
                        <div className="block md:flex w-full gap-x-10">
                            <User className="size-20 mx-auto md:mx-0"/>
                            <div className="w-full space-y-4 md:space-y-5">
                                <div className="grid grid-cols-2 font-bold text-xs md:text-sm md:grid-cols-4 w-full">
                                    <h1>LRN: <span className="font-normal">{student.lrn ? student.lrn : " - "}</span></h1>
                                    <h1>PSA Birth Cert No.: <span className="font-normal">{student.birthCertificateNo ? student.birthCertificateNo : " - "}</span></h1>

                                </div>
                                <div className="grid grid-cols-2 font-bold gap-y-2 text-xs md:text-sm md:grid-cols-4 w-full">
                                    <h1>Last Name: <span className="font-normal">{student.lastName}</span></h1>
                                    <h1>First Name: <span className="font-normal">{student.firstName}</span></h1>
                                    <h1>Middle Name: <span className="font-normal">{student.middleName ? student.middleName : " - "}</span></h1>
                                    <h1>Extention Name: <span className="font-normal">{student.extensionName ? student.extensionName : " - "}</span></h1>
                                </div>
                                <div className="grid font-bold grid-cols-2 gap-y-2 text-xs md:text-sm md:grid-cols-4">
                                    <h1>Age: <span className="font-normal">{getAge(student.birthDate)}</span></h1>
                                    <h1>Birthday: <span className="font-normal">{birthDate.toDateString()}</span></h1>
                                    <h1>Gender: <span className="font-normal">{student.sex}</span></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-x-5 grid-cols-1 md:grid-cols-2">
                    <div className="">
                        <h1 className="w-full bg-foreground py-1 px-2 font-semibold" >Current Address</h1>
                        <div className="w-full space-y-1 px-2">
                            <div className="grid font-bold text-xs md:text-sm gap-y-2 grid-cols-2">
                                <h1>Province: <span className="font-normal">{student.currentAddress.province ? student.currentAddress.province: " - "}</span></h1>
                                <h1>Municipality: <span className="font-normal">{student.currentAddress.municipality ? student.currentAddress.municipality: " - "}</span></h1>
                                <h1>Barangay: <span className="font-normal">{student.currentAddress.barangay ? student.currentAddress.barangay : " - "}</span></h1>
                                <h1>Street: <span className="font-normal">{student.currentAddress.street ? student.currentAddress.street : " - "}</span></h1>
                                <h1>House No.: <span className="font-normal">{student.currentAddress.houseNum ? student.currentAddress.houseNum : " - "}</span></h1>
                            </div>
                            <h1 className="font-bold text-xs md:text-sm ">Full Address: <span className="font-normal">{fulladdress}</span></h1>
                        </div>
                        </div>
                        <div className="">
                            <h1 className="w-full bg-foreground py-1 px-2 font-semibold" >Parent/Guardian information</h1>
                            <div className="w-full space-y-5 px-2">
                                <div className="grid font-bold text-xs gap-y-2 md:text-sm md:grid-cols-2 gap-5">
                                <h1>Fathers Fullname: <span className="font-normal">{`${student.fatherFirstName} ${student.fatherMiddleName ? `${student.fatherMiddleName?.charAt(0)}.` : ""} ${student.fatherLastName}`}</span></h1>
                                <h1>Fathers Contact: <span className="font-normal">{student.fatherContact}</span></h1>
                                <h1>Mothers Fullname: <span className="font-normal">{`${student.motherFirstName} ${student.motherMiddleName ? `${student.motherMiddleName?.charAt(0)}.` : ""} ${student.motherLastName}`}</span></h1>
                                <h1>Mothers Contact: <span className="font-normal">{student.motherContact}</span></h1>
                                <h1>Guardian Fullname: <span className="font-normal">{`${student.guardianFirstName} ${student.guardianMiddleName ? `${student.guardianMiddleName?.charAt(0)}.` : ""} ${student.motherLastName}`}</span></h1>
                                <h1>Guardian Contact: <span className="font-normal">{student.guardianContact}</span></h1>
                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Link href={'#'} className="py-1 text-center shadow-sm bg-primary-foreground rounded-md text-xs md:text-sm text-textWhite">Show more details</Link> */}
                    </DialogContent>
                </Dialog>
               
            </div>
          )
        },
      },
];