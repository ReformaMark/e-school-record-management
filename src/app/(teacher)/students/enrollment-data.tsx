'use client'
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "lucide-react";

interface StudentData {
  schoolYear: string;
  gradeLevel: string;
  withLrn: "Yes" | "No";
  returning: "Yes" | "No";
  PSABirthCert: string;
  lrn: string;
  indigenous: "Yes" | "No";
  indigenousCommunity: string;
  fourpsBenef: "Yes" | "No";
  fourpsIdNum: string;
  firstName: string;
  lastName: string;
  middleName: string;
  extensionName: string;
  birthday: Date;
  birthPlace: string;
  age: number;
  sex: "Male" | "Female" | "Other"; // Adjust as needed for inclusivity
  province: string;
  municipality: string;
  barangay: string;
  street: string;
  houseNum: string;
  fullAddress: string;
  sameAsCurrent: "Yes" | "No";
  permanentProvince: string;
  permanentMunicipality: string;
  permanentBarangay: string;
  permanentStreet: string;
  permanentHouseNum: string;
  permanentFullAddress: string;
  fatherFirstName: string;
  fatherLastName: string;
  fatherMiddleName: string;
  fatherContact: string;
  motherFirstName: string;
  motherLastName: string;
  motherMiddleName: string;
  motherContact: string;
  guardianFirstName: string;
  guardianLastName: string;
  guardianMiddleName: string;
  guardianContact: string;
  lastGradeLevel: string;
  lastSYAttended: string;
  lastSchoolAttended: string;
  schoolId: string;
  semester: string;
  strand: string;
  track: string;
}


export const endrollmentData = [
    {
      // Enrollment info
      schoolYear: "2023-2024",
      gradeLevel: "10",
      withLrn: "Yes",
      returning: "No",
        
      // Student Personal Info
      PSABirthCert: "1234567890",
      lrn: "LRN12345",
      indigenous: "No",
      indigenousCummunity: "",
      fourpsBenef: "Yes",
      fourpsIdNum: "4PS12345",
      firstName: "John",
      lastName: "Doe",
      middleName: "Smith",
      extentionName: "",
      birthday: new Date("2008-01-15"),
      birthPlace: "Quezon City",
      age: 16,
      sex: "Male",
  
      // Current address info
      province: "Metro Manila",
      municipality: "Quezon City",
      barangay: "Commonwealth",
      street: "Luzon Ave",
      houseNum: "45",
      fullAddress: "45 Luzon Ave, Commonwealth, Quezon City, Metro Manila",
  
      // Permanent address info
      sameAsCurrent: "Yes",
      permanentProvince: "Metro Manila",
      permanentMunicipality: "Quezon City",
      permanentBarangay: "Commonwealth",
      permanentStreet: "Luzon Ave",
      permanentHouseNum: "45",
      permanentFullAddress: "45 Luzon Ave, Commonwealth, Quezon City, Metro Manila",
  
      // Parent information
      fatherFirstName: "Michael",
      fatherLastName: "Doe",
      fatherMiddleName: "Johnson",
      fatherContact: "09123456789",
      
      motherFirstName: "Maria",
      motherLastName: "Doe",
      motherMiddleName: "Fernandez",
      motherContact: "09198765432",
  
      guardianFirstName: "",
      guardianLastName: "",
      guardianMiddleName: "",
      guardianContact: "",
  
      // Returning enrollee
      lastGradeLevel: "",
      lastSYAttended: "",
      lastSchoolAttended: "",
      schoolId: "",
  
      // Senior high enrollee
      semister: "",
      strand: "",
      track: "",
    },
  
    {
      schoolYear: "2023-2024",
      gradeLevel: "8",
      withLrn: "Yes",
      returning: "No",
      PSABirthCert: "0987654321",
      lrn: "LRN67890",
      indigenous: "Yes",
      indigenousCummunity: "Aeta",
      fourpsBenef: "No",
      fourpsIdNum: "",
      firstName: "Anna",
      lastName: "Cruz",
      middleName: "Lopez",
      extentionName: "",
      birthday: new Date("2010-05-21"),
      birthPlace: "Cebu City",
      age: 14,
      sex: "Female",
      province: "Cebu",
      municipality: "Cebu City",
      barangay: "Lahug",
      street: "Gorordo Ave",
      houseNum: "12",
      fullAddress: "12 Gorordo Ave, Lahug, Cebu City, Cebu",
      sameAsCurrent: "No",
      permanentProvince: "Cebu",
      permanentMunicipality: "Lapu-Lapu City",
      permanentBarangay: "Mactan",
      permanentStreet: "Mactan St",
      permanentHouseNum: "78",
      permanentFullAddress: "78 Mactan St, Mactan, Lapu-Lapu City, Cebu",
      fatherFirstName: "Juan",
      fatherLastName: "Cruz",
      fatherMiddleName: "Santos",
      fatherContact: "09334567890",
      motherFirstName: "Luisa",
      motherLastName: "Cruz",
      motherMiddleName: "Diaz",
      motherContact: "09211234567",
      guardianFirstName: "",
      guardianLastName: "",
      guardianMiddleName: "",
      guardianContact: "",
      lastGradeLevel: "",
      lastSYAttended: "",
      lastSchoolAttended: "",
      schoolId: "",
      semister: "",
      strand: "",
      track: "",
    },
  
    {
      // Enrollment info
      schoolYear: "2023-2024",
      gradeLevel: "9",
      withLrn: "No",
      returning: "Yes",
      
      // Student Personal Info
      PSABirthCert: "5678901234",
      lrn: "LRN45678",
      indigenous: "No",
      indigenousCummunity: "",
      fourpsBenef: "No",
      fourpsIdNum: "",
      firstName: "James",
      lastName: "Reyes",
      middleName: "Gonzalez",
      extentionName: "",
      birthday: new Date("2009-07-08"),
      birthPlace: "Davao City",
      age: 15,
      sex: "Male",
  
      // Current address info
      province: "Davao del Sur",
      municipality: "Davao City",
      barangay: "Matina",
      street: "Quirino Ave",
      houseNum: "34",
      fullAddress: "34 Quirino Ave, Matina, Davao City, Davao del Sur",
  
      // Permanent address info
      sameAsCurrent: "Yes",
      permanentProvince: "Davao del Sur",
      permanentMunicipality: "Davao City",
      permanentBarangay: "Matina",
      permanentStreet: "Quirino Ave",
      permanentHouseNum: "34",
      permanentFullAddress: "34 Quirino Ave, Matina, Davao City, Davao del Sur",
  
      // Parent information
      fatherFirstName: "Carlos",
      fatherLastName: "Reyes",
      fatherMiddleName: "Ortiz",
      fatherContact: "09567890123",
      
      motherFirstName: "Elena",
      motherLastName: "Reyes",
      motherMiddleName: "Garcia",
      motherContact: "09321234567",
  
      guardianFirstName: "",
      guardianLastName: "",
      guardianMiddleName: "",
      guardianContact: "",
  
      // Returning enrollee
      lastGradeLevel: "8",
      lastSYAttended: "2022-2023",
      lastSchoolAttended: "Matina National High School",
      schoolId: "MNHS001",
  
      // Senior high enrollee
      semister: "",
      strand: "",
      track: "",
    },
  
    {
      // Enrollment info
      schoolYear: "2023-2024",
      gradeLevel: "12",
      withLrn: "Yes",
      returning: "No",
      
      // Student Personal Info
      PSABirthCert: "3456789012",
      lrn: "LRN34567",
      indigenous: "No",
      indigenousCummunity: "",
      fourpsBenef: "Yes",
      fourpsIdNum: "4PS56789",
      firstName: "Emily",
      lastName: "Fernandez",
      middleName: "Ramos",
      extentionName: "",
      birthday: new Date("2006-09-18"),
      birthPlace: "Bacolod City",
      age: 18,
      sex: "Female",
  
      // Current address info
      province: "Negros Occidental",
      municipality: "Bacolod City",
      barangay: "Villamonte",
      street: "Burgos St",
      houseNum: "22",
      fullAddress: "22 Burgos St, Villamonte, Bacolod City, Negros Occidental",
  
      // Permanent address info
      sameAsCurrent: "Yes",
      permanentProvince: "Negros Occidental",
      permanentMunicipality: "Bacolod City",
      permanentBarangay: "Villamonte",
      permanentStreet: "Burgos St",
      permanentHouseNum: "22",
      permanentFullAddress: "22 Burgos St, Villamonte, Bacolod City, Negros Occidental",
  
      // Parent information
      fatherFirstName: "Pedro",
      fatherLastName: "Fernandez",
      fatherMiddleName: "Diaz",
      fatherContact: "09456789012",
      
      motherFirstName: "Carmen",
      motherLastName: "Fernandez",
      motherMiddleName: "Lopez",
      motherContact: "09344567890",
  
      guardianFirstName: "",
      guardianLastName: "",
      guardianMiddleName: "",
      guardianContact: "",
  
      // Returning enrollee
      lastGradeLevel: "",
      lastSYAttended: "",
      lastSchoolAttended: "",
      schoolId: "",
  
      // Senior high enrollee
      semister: "2nd Semester",
      strand: "STEM",
      track: "Academic",
    },
  
    {
      // Enrollment info
      schoolYear: "2023-2024",
      gradeLevel: "7",
      withLrn: "No",
      returning: "No",
      
      // Student Personal Info
      PSABirthCert: "6789012345",
      lrn: "LRN89012",
      indigenous: "Yes",
      indigenousCummunity: "Mangyan",
      fourpsBenef: "No",
      fourpsIdNum: "",
      firstName: "Sarah",
      lastName: "Torres",
      middleName: "Castillo",
      extentionName: "",
      birthday: new Date("2011-03-12"),
      birthPlace: "Manila",
      age: 13,
      sex: "Female",
  
      // Current address info
      province: "Mindoro",
      municipality: "Calapan",
      barangay: "Bayanan",
      street: "Rizal St",
      houseNum: "67",
      fullAddress: "67 Rizal St, Bayanan, Calapan, Mindoro",
  
      // Permanent address info
      sameAsCurrent: "Yes",
      permanentProvince: "Mindoro",
      permanentMunicipality: "Calapan",
      permanentBarangay: "Bayanan",
      permanentStreet: "Rizal St",
      permanentHouseNum: "67",
      permanentFullAddress: "67 Rizal St, Bayanan, Calapan, Mindoro",
  
      // Parent information
      fatherFirstName: "Ricardo",
      fatherLastName: "Torres",
      fatherMiddleName: "Cruz",
      fatherContact: "09678901234",
      
      motherFirstName: "Elisa",
      motherLastName: "Torres",
      motherMiddleName: "Reyes",
      motherContact: "09556789012",
  
      guardianFirstName: "",
      guardianLastName: "",
      guardianMiddleName: "",
      guardianContact: "",
  
      // Returning enrollee
      lastGradeLevel: "",
      lastSYAttended: "",
      lastSchoolAttended: "",
      schoolId: "",
  
      // Senior high enrollee
      semister: "",
      strand: "",
      track: "",
    },
  ];
  

  export const enrollmentColumn: ColumnDef<StudentData>[] = [
    {
      id: "fullName",
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
      id: "gradeLevel",
      header: "Grade level",
      cell: ({ row }) => {
  
       const gradeLevel = row.original.gradeLevel
   
        return (
          <div className=" ">
              {gradeLevel}
          </div>
        )
      },
    },
    {
      id: "parent",
      header: "Parent/Guardian",
      cell: ({ row }) => {
  
       const gradeLevel = row.original
   
        return (
          <div className="fle flex-col">
              <h1>{gradeLevel.fatherFirstName} {gradeLevel.fatherLastName}</h1>
              <h1>{gradeLevel.motherFirstName} {gradeLevel.motherLastName}</h1>
              <h1>{gradeLevel.guardianFirstName} {gradeLevel.guardianLastName}</h1>
          </div>
        )
      },
    },
    {
      id: "contact",
      header: "Parent/Guardian Contact",
      cell: ({ row }) => {
  
       const gradeLevel = row.original
   
        return (
          <div className="flex flex-col">
              <h1>{gradeLevel.fatherContact} </h1>
              <h1>{gradeLevel.motherContact} </h1>
              <h1>{gradeLevel.guardianContact}</h1>
          </div>
        )
      },
    },
{
  id: "actions",
  header: "Actions",
  cell: ({  }) => {
    
    return (
      <div className="flex items-center gap-x-2 ">
          <Button variant={'default'} className="text-white">Enroll</Button> 
      </div>
    )
  },
},
  ] 

