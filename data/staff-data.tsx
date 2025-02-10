import { Registrar } from "@/app/(system-admin)/sysadmin-registrar/_components/registrar-columns";
import { ColumnDef } from "@tanstack/react-table";

export const staffData = [
    {
        id: "6",
        firstName: "Robert",
        middleName: "James",
        lastName: "Anderson",
        email: "robert.anderson@school.edu",
        emailVerified: true,
        image: "https://example.com/images/robert.jpg",
        role: "schoolStaff",
        department: "Registrar's Office",
        yearsOfExperience: 10
    },
    {
        id: "7",
        firstName: "Jennifer",
        middleName: "",
        lastName: "Martinez",
        email: "jennifer.martinez@school.edu",
        emailVerified: true,
        image: "https://example.com/images/jennifer.jpg",
        role: "schoolStaff",
        department: "Registrar's Office",
        yearsOfExperience: 6
    },
    {
        id: "8",
        firstName: "William",
        middleName: "Thomas",
        lastName: "Lee",
        email: "william.lee@school.edu",
        emailVerified: true,
        image: "https://example.com/images/william.jpg",
        role: "schoolStaff",
        department: "Registrar's Office",
        yearsOfExperience: 4
    }
];

export const registrarColumnsInSchoolHead: ColumnDef<Registrar>[] = [
    {
        accessorKey: "firstName",
        header: "First Name"
    },
    {
        accessorKey: "lastName",
        header: "Last Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "employeeId",
        header: "Employee ID"
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
            <span className={row.original.isActive ? "text-green-600" : "text-red-600"} >
                {row.original.isActive ? "Active" : "Inactive"}
            </span>
        )
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => <ActionCell registrar={row.original} />
    // }
];