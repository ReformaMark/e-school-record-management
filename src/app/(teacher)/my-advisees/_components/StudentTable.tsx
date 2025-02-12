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
import { StudentTypes } from "@/lib/types";
import { getAge } from "@/lib/utils";


// export const studentsData = [
//     {
//         id: "1",
//         lrn: "100123456789",
//         firstName: "Juan",
//         middleName: "Miguel",
//         lastName: "Dela Cruz",
//         birthDate: "2005-05-15",
//         gender: "Male",
//         address: "123 Rizal St, Quezon City, Philippines",
//         yearLevel: "Grade 10",
//         parentGuardianName: "Maria Dela Cruz",
//         parentGuardianContact: "+639123456789"
//     },
//     {
//         id: "2",
//         lrn: "100223456789",
//         firstName: "Maria",
//         middleName: "Santos",
//         lastName: "Reyes",
//         birthDate: "2006-02-20",
//         gender: "Female",
//         address: "456 Mabini St, Makati City, Philippines",
//         yearLevel: "Grade 11",
//         strand: "STEM", // Added strand
//         parentGuardianName: "Jose Reyes",
//         parentGuardianContact: "+639198765432"
//     },
//     {
//         id: "3",
//         lrn: "100323456789",
//         firstName: "Michael",
//         middleName: "James",
//         lastName: "Garcia",
//         birthDate: "2005-11-10",
//         gender: "Male",
//         address: "789 Quezon Ave, Manila, Philippines",
//         yearLevel: "Grade 9",
//         strand:'',
//         parentGuardianName: "Anna Garcia",
//         parentGuardianContact: "+639112233445"
//     },
//     {
//         id: "4",
//         lrn: "100423456789",
//         firstName: "Sofia",
//         middleName: "Rose",
//         lastName: "Domingo",
//         birthDate: "2006-08-05",
//         gender: "Female",
//         address: "101 Bonifacio Rd, Marikina, Philippines",
//         yearLevel: "Grade 10",
//         strand:'',
//         parentGuardianName: "David Domingo",
//         parentGuardianContact: "+639155566677"
//     },
//     {
//         id: "5",
//         lrn: "100523456789",
//         firstName: "Daniel",
//         middleName: "",
//         lastName: "Santos",
//         birthDate: "2005-04-30",
//         gender: "Male",
//         address: "202 Aguinaldo Ln, Pasig City, Philippines",
//         yearLevel: "Grade 7",
//         strand:'',
//         parentGuardianName: "Jennifer Santos",
//         parentGuardianContact: "+639199988877"
//     },
//     {
//         id: "6",
//         lrn: "100623456789",
//         firstName: "Olivia",
//         middleName: "Kate",
//         lastName: "Dela Rosa",
//         birthDate: "2006-01-12",
//         gender: "Female",
//         address: "303 Mabuhay St, Quezon City, Philippines",
//         yearLevel: "Grade 8",
//         strand:'',
//         parentGuardianName: "Kevin Dela Rosa",
//         parentGuardianContact: "+639166666666"
//     },
//     {
//         id: "7",
//         lrn: "100723456789",
//         firstName: "Benjamin",
//         middleName: "",
//         lastName: "Cruz",
//         birthDate: "2005-09-25",
//         gender: "Male",
//         address: "404 P. Burgos St, San Juan, Philippines",
//         yearLevel: "Grade 9",
//         strand:'',
//         parentGuardianName: "Lisa Cruz",
//         parentGuardianContact: "+639177777777"
//     },
//     {
//         id: "8",
//         lrn: "100823456789",
//         firstName: "Ava",
//         middleName: "May",
//         lastName: "Lazaro",
//         birthDate: "2006-05-18",
//         gender: "Female",
//         address: "505 Panganiban Rd, Caloocan City, Philippines",
//         yearLevel: "Grade 10",
//         strand:'',
//         parentGuardianName: "Brian Lazaro",
//         parentGuardianContact: "+639188888888"
//     },
//     {
//         id: "9",
//         lrn: "100923456789",
//         firstName: "Ethan",
//         middleName: "Alexander",
//         lastName: "Mendoza",
//         birthDate: "2005-07-22",
//         gender: "Male",
//         address: "606 Nicanor St, Las Piñas, Philippines",
//         yearLevel: "Grade 7",
//         strand:'',
//         parentGuardianName: "Karen Mendoza",
//         parentGuardianContact: "+639199999999"
//     },
//     {
//         id: "10",
//         lrn: "101023456789",
//         firstName: "Isabella",
//         middleName: "Rose",
//         lastName: "Gonzales",
//         birthDate: "2006-03-15",
//         gender: "Female",
//         address: "707 Katipunan Ave, Quezon City, Philippines",
//         yearLevel: "Grade 8",
//         strand:'',
//         parentGuardianName: "Richard Gonzales",
//         parentGuardianContact: "+639122222222"
//     },
//     {
//         id: "11",
//         lrn: "101123456789",
//         firstName: "Logan",
//         middleName: "",
//         lastName: "White",
//         birthDate: "2005-06-17",
//         gender: "Male",
//         address: "808 Taft Ave, Pasay City, Philippines",
//         yearLevel: "Grade 9",
//         strand:'',
//         parentGuardianName: "Carol White",
//         parentGuardianContact: "+639133333333"
//     },
//     {
//         id: "12",
//         lrn: "101223456789",
//         firstName: "Liam",
//         middleName: "Christopher",
//         lastName: "Martin",
//         birthDate: "2006-04-02",
//         gender: "Male",
//         address: "909 Araneta Ave, Mandaluyong, Philippines",
//         yearLevel: "Grade 10",
//         strand:'',
//         parentGuardianName: "Susan Martin",
//         parentGuardianContact: "+639144444444"
//     },
//     {
//         id: "13",
//         lrn: "101323456789",
//         firstName: "Gabriella",
//         middleName: "Marie",
//         lastName: "Harris",
//         birthDate: "2005-10-28",
//         gender: "Female",
//         address: "1010 Ortigas Ave, Mandaluyong, Philippines",
//         yearLevel: "Grade 7",
//         strand:'',
//         parentGuardianName: "James Harris",
//         parentGuardianContact: "+639155555555"
//     },
//     {
//         id: "14",
//         lrn: "101423456789",
//         firstName: "Alexander",
//         middleName: "James",
//         lastName: "Taylor",
//         birthDate: "2006-01-05",
//         gender: "Male",
//         address: "1111 Ayala Ave, Makati City, Philippines",
//         yearLevel: "Grade 8",
//         strand:'',
//         parentGuardianName: "Laura Taylor",
//         parentGuardianContact: "+639166666666"
//     },
//     {
//         id: "15",
//         lrn: "101523456789",
//         firstName: "Charlotte",
//         middleName: "Elizabeth",
//         lastName: "Lewis",
//         birthDate: "2005-09-01",
//         gender: "Female",
//         address: "1212 Roxas Blvd, Manila, Philippines",
//         yearLevel: "Grade 9",
//         strand:'',
//         parentGuardianName: "Michael Lewis",
//         parentGuardianContact: "+639177777777"
//     },
//     {
//         id: "16",
//         lrn: "101623456789",
//         firstName: "Julian",
//         middleName: "Thomas",
//         lastName: "Walker",
//         birthDate: "2006-06-01",
//         gender: "Male",
//         address: "1313 Commonwealth Ave, Quezon City, Philippines",
//         yearLevel: "Grade 10",
//         strand:'',
//         parentGuardianName: "Rebecca Walker",
//         parentGuardianContact: "+639188888888"
//     }
// ];

export const StudentTable = () =>{
    const students = useQuery(api.students.getStudentByTeacher)
    const sortedStudents = students?.sort((a, b) => a.lastName.localeCompare(b.lastName)) ?? [];
    return (
        <>
            {students ? (
                <DataTable
                    columns={StudentColumn}
                    data={sortedStudents}
                    filter="fullName"
                    placeholder="students by name"
                />
            ): (
                <div className="text-gray-500 text-sm text-center py-4">No assigned section.</div>
            )}
        </>
    )
}


export const StudentColumn: ColumnDef<StudentTypes>[]  = [
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
            //full address
            const fulladdress = `${student.currentAddress.houseNum ? student.currentAddress.houseNum : ""} ${student.currentAddress.street ? student.currentAddress.street : ""} ${student.currentAddress.barangay ? `${student.currentAddress.barangay},` : ""} ${student.currentAddress.municipality ? `${student.currentAddress.municipality},`: ""} ${student.currentAddress.province ? student.currentAddress.province: ""}`
          return (
            <div className="flex items-center gap-x-2 ">
                <Link href={`/my-advisees/${student._id}`} className="">
                    <FaUserEdit className="size-4 md:size-6 text-gray-400 hover:text-orange-500"/>
                </Link>
                <Dialog>
                    <DialogTrigger >
                        <FaInfoCircle className="size-4 md:size-6 text-gray-400 hover:text-blue-500"/>
                    </DialogTrigger>
                    <DialogContent className='max-w-6xl max-h-screen overflow-auto text-primary'>
                    <DialogHeader>
                        <DialogTitle>
                            Student Profile
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
                    <Link href={'#'} className="py-1 text-center shadow-sm bg-primary-foreground rounded-md text-xs md:text-sm text-textWhite">Show more details</Link>
                    </DialogContent>
                </Dialog>
               
            </div>
          )
        },
      },
];