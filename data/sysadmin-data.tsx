import { Link, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export const sysadminData = [
    {
        id: "1",
        firstName: "John",
        middleName: "Michael",
        lastName: "Doe",
        email: "kennedy.joe.jackson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/margaret.jpg",
        role: "sysadmin",
        yearsOfExperience: 20
    },
    {
        id: "2",
        firstName: "Jane",
        middleName: "",
        lastName: "Doe",
        email: "jane.doe@school.edu",
        emailVerified: true,
        image: "https://example.com/images/margaret.jpg",
        role: "sysadmin",
        yearsOfExperience: 20
    },
    {
        id: "3",
        firstName: "Margaret",
        middleName: "",
        lastName: "Jackson",
        email: "margaret.jackson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/margaret.jpg",
        role: "sysadmin",
        yearsOfExperience: 20
    },
    {
        id: "4",
        firstName: "Collins",
        middleName: "",
        lastName: "Gallagher",
        email: "collins.gallagher@school.edu",
        emailVerified: true,
        image: "https://example.com/images/margaret.jpg",
        role: "sysadmin",
        yearsOfExperience: 20,
    },
]

// export const sysadminColumns = [
//     { accessorKey: "firstName", header: "First Name" },
//     { accessorKey: "lastName", header: "Last Name" },
//     { accessorKey: "email", header: "Email" },
//     { accessorKey: "yearsOfExperience", header: "Years of Experience" },
//     {
//         id: "actions",
//         cell: ({ row }) => {
//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuItem>
//                             <Link href={`/sysadmin-admins/${row.original.id}`}>View details</Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>Archive</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         }
//     }
// ]