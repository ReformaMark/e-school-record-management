'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { add, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

type StudentProfile = {

//Enrollment info
    schoolYear: string,
    gradeLevel: string, 
    withLrn: string,
    returning: string,

//Studnet Pesonal Info
    PSABirthCert: string,
    lrn: string,
    indigenous:string,
    indigenousCummunity: string,
    fourpsBenef: string,
    fourpsIdNum:string,
    firstName: string,
    lastName: string,
    middleName: string,
    extentionName: string,
    birthday: Date | undefined,
    birthPlace: string,
    age: number,
    sex: SexType,

//Current address info
    province: string,
    municipality: string,
    barangay: string,
    street: string,
    houseNum: string,
    fullAddress: string,

//Permanent address Info
    sameAsCurrent: string,
    permanentProvince: string,
    permanentMunicipality: string,
    permanentBarangay: string,
    permanentStreet: string,
    permanentHouseNum: string,
    permanentFullAddress: string,

//Parent information 
    fatherFirstName: string,
    fatherLastName: string,
    fatherMiddleName: string,
    fatherContact: string,

    motherFirstName: string,
    motherLastName: string,
    motherMiddleName: string,
    motherContact: string,

    guardianFirstName: string,
    guardianLastName: string,
    guardianMiddleName: string,
    guardianContact: string,


//Returning enrollee
    lastGradeLevel: string,
    lastSYAttended: string,
    lastSchoolAttended: string
    schoolId: string,

//Senior high enrollee
    semister: string,
    strand: string,
    track: string,
}

type SexType = 'Male' |'Female' |'Others'

const sex = ['Male', 'Female', "Others"]

const initialShipppinginfo: StudentProfile = {

    //Enrollment info
    schoolYear: '',
    gradeLevel: '', 
    withLrn:'',
    returning: '',

//Studnet Pesonal Info
    PSABirthCert: '',
    lrn: '',
    indigenous:'',
    indigenousCummunity: '',
    fourpsBenef: '',
    fourpsIdNum:'',
    firstName: '',
    lastName: '',
    middleName: '',
    extentionName: '',
    birthday: undefined,
    birthPlace: '',
    age: 0,
    sex: sex[0] as SexType,

//Current address info
    province: '',
    municipality: '',
    barangay: '',
    street: '',
    houseNum: '',
    fullAddress: '',

//Permanent address Info
    sameAsCurrent: '',
    permanentProvince: '',
    permanentMunicipality: '',
    permanentBarangay: '',
    permanentStreet: '',
    permanentHouseNum: '',
    permanentFullAddress: '',

//Parent information 
    fatherFirstName: '',
    fatherLastName: '',
    fatherMiddleName: '',
    fatherContact: '',

    motherFirstName: '',
    motherLastName: '',
    motherMiddleName: '',
    motherContact: '',

    guardianFirstName: '',
    guardianLastName: '',
    guardianMiddleName: '',
    guardianContact: '',


//Returning enrollee
    lastGradeLevel: '',
    lastSYAttended: '',
    lastSchoolAttended: '',
    schoolId: '',

//Senior high enrollee
    semister: '',
    strand: '',
    track: '',
}

function Form() {
    const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialShipppinginfo);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [formStep, setFormStep] = useState(0);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setStudentProfile((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSexChange = (value: SexType) => {
        setStudentProfile((prevData) => ({
            ...prevData,
            sex: value,
        }))
    }
  return (
    <div className='bg-white p-5 rounded-lg shadow-md'>
        <h1 className='font-semibold tracking-widest text-xl text-center'>Student Enrollment Form</h1>
        <div className="">

        </div>
        <form
            id="create-shipping-form"
           
            >

            {/* {Step One} */}
       
            <div className={`${formStep !== 0 ? 'hidden': 'block'} grid grid-cols-2 gap-x-10 mt-10`}>
                <div className="">
                    <div className="space-y-2 ">
                        <Label htmlFor="firstName" className="text-sm font-medium text-text">
                            School Year <span className='text-red-700'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="firstName"
                                name="firstName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="2025-2026"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="firstName" className="text-sm font-medium text-text">
                            Grade level to enroll <span className='text-red-700'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="firstName"
                                name="firstName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Grade 7"
                            
                            />
                        </div>
                    </div>
                </div>
                <div className="border border-black p-5">
                    <h1 className=' text-text text-lg font-medium'>Check the appropriate box only</h1>
                    <div className="flex justify-start gap-x-10">
                        <div className="">
                            <h1 className='mt-3 text-text text-sm'>With LRN?</h1>
                            <RadioGroup defaultValue="Yes" className='pl-5 flex gap-x-5'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Yes" id="yes" className='rounded-none' />
                                    <Label htmlFor="Yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="no" className='rounded-none' />
                                    <Label htmlFor="no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="">
                            <h1  className='mt-3 text-text text-sm'>Returning (Balik Aral)</h1>
                            <RadioGroup defaultValue="no" className='pl-5 flex gap-x-5'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Yes" id="yes" className='rounded-none'/>
                                    <Label htmlFor="Yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="no" className='rounded-none'/>
                                    <Label htmlFor="no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${formStep !== 0 ? 'hidden': 'block'} border border-gray-500 mt-5 p-5`}>
                <h1 className='uppercase py-1 text-center w-full text-sm font-semibold bg-gray-100 mb-5'>Learner Information</h1>
                <div className="grid grid-cols-2 gap-x-10 px-5 mb-5">
                    <div className="space-y-1">
                        <Label htmlFor="bcn" className="text-xs font-thin text-text">
                            PSA Birth Certificate No. (if available upon registration) <span className='text-red-700'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="bcn"
                                name="bcn"
                                value={studentProfile.lastName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder=""
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="lrn" className="text-xs font-thin text-text">
                            Learning Reference Number 
                        </Label>
                        <div className="relative">
                            <Input
                                id="lrn"
                                name="lrn"
                                value={studentProfile.lastName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder=""
                            
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className=" mb-5 px-5">
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-text">
                                Last Name <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={studentProfile.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder="Last Name"
                                
                                />
                            </div>
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-text">
                                First Name <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={studentProfile.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder="First Name"
                                
                                />
                            </div>
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="middleName" className="text-sm font-medium text-text">
                                Middle Name <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="middleName"
                                    name="middleName"
                                    value={studentProfile.middleName}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder="Middle Name"
                                
                                />
                            </div>
                        </div>
                        <div className="space-y-1 mb-2">
                            <Label htmlFor="extentionName" className="text-sm font-medium text-text">
                                Extension Name
                            </Label>
                            <div className="relative">
                                <Input
                                    id="extentionName"
                                    name="extentionName"
                                    value={studentProfile.extentionName}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder="ex: Sr./ Jr. / II "
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-x-5 px-5">
                        <div className="space-y-1 col-span-2">
                            <Label htmlFor="extentionName" className="text-sm font-medium text-text">
                            Birth Date <span className='text-red-700'>*</span>
                            </Label>
                            <div className="">
                                <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                        "pl-3 w-full text-left font-normal",
                                        !studentProfile.birthday && "text-muted-foreground"
                                        )}
                                    >
                                        {studentProfile.birthday ? (
                                        format(studentProfile.birthday, "PPP")
                                        ) : (
                                        <span>Birth Date </span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                            
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => {
                                        setSelectedDate(date);
                                        setStudentProfile((prevData) => ({
                                        ...prevData,
                                        birthday: date,
                                        }));
                                    }}
                                    disabled={(date) =>
                                        date < new Date() || date > add(new Date(), { days: 7 })
                                    }
                                    initialFocus
                                    /> 
                                </PopoverContent>
                                </Popover>
                            </div>
                        
                        </div>
                        <div className="space-y-1 col-span-2">
                            <Label htmlFor="birthPlace" className="text-sm font-medium text-text">
                                Birth Place <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="birthPlace"
                                    name="birthPlace"
                                    value={studentProfile.birthPlace}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder="Birth Place"
                                />
                            </div>
                        </div>
                        <div className="space-y-1 col-span-1">
                        <Label htmlFor="category" className="text-sm font-medium text-text">
                            Sex
                        </Label>
                        <Select
                            onValueChange={handleSexChange}
                            value={studentProfile.sex}
                        
                        >
                            <SelectTrigger className="">
                                <SelectValue placeholder="Sex" />
                            </SelectTrigger>
                            <SelectContent>
                                {sex.map((sex) => (
                                    <SelectItem key={sex} value={sex}>
                                        {sex}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-1 col-span-1">
                            <Label htmlFor="age" className="text-sm font-medium text-text">
                                Age<span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="age"
                                    name="age"
                                    value={studentProfile.age}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder="ex: Sr./ Jr. / II "
                                    type='number'
                                />
                            </div>
                        </div>
                        <div className="space-y-1 col-span-2">
                            <Label htmlFor="motherTongue" className="text-sm font-medium text-text">
                                Mother Tongue 
                            </Label>
                            <div className="relative">
                                <Input
                                    id="motherTongue"
                                    name="motherTongue"
                                    value={studentProfile.birthPlace}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="col-span-4 ">                  
                            <h4 className=' text-xs font-semibold '> Belonging to any Indigenous Peoples (IP) Community/Indigenous Cultural Community?</h4>
                            <div className="grid grid-cols-4 gap-x-2">
                                <RadioGroup defaultValue="Yes" className=' flex gap-x-2 col-span-1'>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yes" id="yes" className='rounded-none' />
                                        <Label className='text-xs' htmlFor="Yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no" className='rounded-none' />
                                        <Label className='text-xs' htmlFor="no">No</Label>
                                    </div>
                                </RadioGroup>
                                <div className="space-y-1 flex items-center col-span-3">
                                    <Label htmlFor="motherTongue" className="text-xs font-semibold text-text">
                                       If yes, Please specify :
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="motherTongue"
                                            name="motherTongue"
                                            value={studentProfile.birthPlace}
                                            onChange={handleInputChange}
                                            required
                                            className=""
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 "> 
                            <div className="grid grid-cols-2">
                                <h4 className=' text-xs font-semibold '> Is your family a beneficiary of 4Ps?</h4>
                                <RadioGroup defaultValue="Yes" className=' flex gap-x-2 col-span-1'>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yes" id="yes" className='rounded-none' />
                                        <Label className='text-xs' htmlFor="Yes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="no" className='rounded-none' />
                                        <Label className='text-xs' htmlFor="no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>                 
                           
                            <div className="grid grid-cols-4 gap-x-2">
    
                                <div className="space-y-1  col-span-4 mt-3">
                                    <Label htmlFor="motherTongue" className="text-xs font-semibold text-text">
                                    If Yes, write the 4Ps Household ID Number below
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="motherTongue"
                                            name="motherTongue"
                                            value={studentProfile.birthPlace}
                                            onChange={handleInputChange}
                                            required
                                            className=""
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-10">
                   
                    <Button variant={'default'} onClick={()=> setFormStep(1)} className='text-white ml-auto'>Next</Button>
                </div>
            </div>

            {/* {Second Step} */}
            <div className={`${formStep !== 1 ? "hidden": "block"} border-black border p-5`}>
                <div >
                    <h1 className='font-semibold text-lg w-full bg-gray-100 px-5'>Current Address</h1>
                    <div className="grid grid-cols-5 gap-x-5 mb-5 px-5" >
                        <div className="space-y-2">
                            <Label htmlFor="province" className="text-sm font-medium text-text">
                                Province
                            </Label>
                            <Select
                                onValueChange={handleSexChange}
                                value={studentProfile.province}
                            
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Negros Oriental" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sex.map((sex) => (
                                        <SelectItem key={sex} value={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium text-text">
                                Municipality/City
                            </Label>
                            <Select
                                onValueChange={handleSexChange}
                                value={studentProfile.municipality}
                            
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Opao Tanjay" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sex.map((sex) => (
                                        <SelectItem key={sex} value={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium text-text">
                                Barangay
                            </Label>
                            <Select
                                onValueChange={handleSexChange}
                                value={studentProfile.barangay}
                            
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Barangay 9" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sex.map((sex) => (
                                        <SelectItem key={sex} value={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="street" className="text-sm font-medium text-text">
                                Street/Subd. <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="street"
                                    name="street"
                                    value={studentProfile.street}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder=""
                                
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="houseNum" className="text-sm font-medium text-text">
                                House No. <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="houseNum"
                                    name="houseNum"
                                    value={studentProfile.houseNum}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder=""
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 px-5">
                        <Label htmlFor="fullAddress" className="text-sm font-medium text-text">
                        Complete Address <span className='text-red-700'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="fullAddress"
                                name="fullAddress"
                                value={studentProfile.fullAddress}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder=""
                            
                            />
                        </div>
                    </div>
                </div>
                <div className={``}>
                    <div className="flex items-center gap-x-10 bg-gray-100 mt-5 px-5 py-1">
                        <h1 className='font-semibold text-lg'>Permanent Address</h1>
                        <div className="flex text-xs gap-x-5">
                            <h3 >Same with your current address?</h3>
                            <RadioGroup defaultValue="Yes" className=' flex gap-x-2 col-span-1'>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Yes" id="yes" className='rounded-none' />
                                    <Label className='text-xs' htmlFor="Yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="no" className='rounded-none' />
                                    <Label className='text-xs' htmlFor="no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-x-5 mb-5 px-5">
                        <div className="space-y-2">
                            <Label htmlFor="province" className="text-sm font-medium text-text">
                                Province
                            </Label>
                            <Select
                                onValueChange={handleSexChange}
                                value={studentProfile.province}
                            
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Negros Oriental" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sex.map((sex) => (
                                        <SelectItem key={sex} value={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    
                        <div className="space-y-2 px-5">
                            <Label htmlFor="category" className="text-sm font-medium text-text">
                                Municipality/City
                            </Label>
                            <Select
                                onValueChange={handleSexChange}
                                value={studentProfile.municipality}
                            
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Opao Tanjay" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sex.map((sex) => (
                                        <SelectItem key={sex} value={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium text-text">
                                Barangay
                            </Label>
                            <Select
                                onValueChange={handleSexChange}
                                value={studentProfile.barangay}
                            
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Barangay 9" />
                                </SelectTrigger>
                                <SelectContent>
                                    {sex.map((sex) => (
                                        <SelectItem key={sex} value={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="street" className="text-sm font-medium text-text">
                                Street/Subd. <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="street"
                                    name="street"
                                    value={studentProfile.street}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder=""
                                
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="houseNum" className="text-sm font-medium text-text">
                                House No. <span className='text-red-700'>*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="houseNum"
                                    name="houseNum"
                                    value={studentProfile.houseNum}
                                    onChange={handleInputChange}
                                    required
                                    className=""
                                    placeholder=""
                                
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 px-2">
                        <Label htmlFor="fullAddress" className="text-sm font-medium text-text">
                        Complete Address <span className='text-red-700'>*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="fullAddress"
                                name="fullAddress"
                                value={studentProfile.fullAddress}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder=""
                            
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <Button variant={'default'} onClick={()=> setFormStep(0)} className='text-white'>Back</Button>
                        <Button variant={'default'} onClick={()=> setFormStep(2)} className='text-white ml-10'>Next</Button>

                    </div>
                </div>
            </div>

            {/* {Third Step} */}
            <div className={`${formStep !== 2 ? "hidden": "block"} border-black border p-5`}>
                <h1 className="bg-gray-100 py-1 px-5 text-lg font-semibold">Parent&apos;s/Guardian Information</h1>
                <h3 className='text-sm px-5'>Father&apos;s Name</h3>
                <div className="grid grid-cols-4 gap-x-5 px-10">
                    <div className="space-y-2 ">
                        <Label htmlFor="FLastName" className="text-sm font-medium text-text">
                            Last Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FLastName"
                                name="FLastName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Father's Last name"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="firstName" className="text-sm font-medium text-text">
                            First Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="firstName"
                                name="firstName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="FirstName"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="FMiddleName" className="text-sm font-medium text-text">
                           Middle Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FMiddleName"
                                name="FmiddleName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Grade 7"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                            Contact Number
                        </Label>
                        <div className="relative">
                            <Input
                                id="FContactNumber"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                </div>
                <h3 className='text-sm px-5 mt-5'>Mother&apos;s Name</h3>
                <div className="grid grid-cols-4 gap-x-5 px-10">
                    <div className="space-y-2 ">
                        <Label htmlFor="FLastName" className="text-sm font-medium text-text">
                            Last Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FLastName"
                                name="FLastName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Father's Last name"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="firstName" className="text-sm font-medium text-text">
                            First Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="firstName"
                                name="firstName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="FirstName"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="FMiddleName" className="text-sm font-medium text-text">
                           Middle Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FMiddleName"
                                name="FmiddleName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Grade 7"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                            Contact Number 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FContactNumber"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                </div>
                <h3 className='text-sm px-5 mt-5'>Legal Guarduan&apos;s Name</h3>
                <div className="grid grid-cols-4 gap-x-5 px-10">
                    <div className="space-y-2 ">
                        <Label htmlFor="FLastName" className="text-sm font-medium text-text">
                            Last Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FLastName"
                                name="FLastName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Father's Last name"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="firstName" className="text-sm font-medium text-text">
                            First Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="firstName"
                                name="firstName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="FirstName"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="FMiddleName" className="text-sm font-medium text-text">
                           Middle Name 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FMiddleName"
                                name="FmiddleName"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="Grade 7"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                            Contact Number 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FContactNumber"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <Button variant={'default'} onClick={()=> setFormStep(1)} className='text-white'>Back</Button>
                    <Button variant={'default'} onClick={()=> setFormStep(3)} className='text-white ml-10'>Next</Button>

                </div>
            </div>
            {/* {Fourth Step} */}
            <div className={`${formStep !== 3 ? "hidden": "block"} border-black border p-5`}>
                <h1 className="bg-gray-100 py-1 px-5 text-lg font-semibold">For Returning Learner (Balik-Aral) and Those Who will Transfer/Move In</h1>
                <div className="grid grid-cols-2 gap-5 px-10">
         
                    <div className="space-y-2 ">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                        Last Grade Level Completed 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FContactNumber"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder=""
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                        Last School Year Completed 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FContactNumber"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                        Last School Attended 
                        </Label>
                        <div className="relative">
                            <Input
                                id="FContactNumber"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                        School ID
                        </Label>
                        <div className="relative">
                            <Input
                                id="asd"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                       
                </div>
                <h1 className="bg-gray-100 py-1 px-5 text-lg font-semibold">For Learners in Senior High School</h1>
                <div className="grid grid-cols-2 gap-5 px-10">
                    <div className="flex text-xs gap-x-5 items-center">
                        <h3 >Semester?</h3>
                        <RadioGroup defaultValue="Yes" className=' flex gap-x-2 col-span-1'>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Yes" id="yes" className='rounded-none' />
                                <Label className='text-xs' htmlFor="Yes">1st</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" className='rounded-none' />
                                <Label className='text-xs' htmlFor="no">2nd</Label>
                            </div>
                        </RadioGroup>
                    </div>
                
                    <div className="space-y-2">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                        Strand
                        </Label>
                        <div className="relative">
                            <Input
                                id="asd"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                    <div className="space-y-2"></div>
                    <div className="space-y-2">
                        <Label htmlFor="contact" className="text-sm font-medium text-text">
                        Strand
                        </Label>
                        <div className="relative">
                            <Input
                                id="asd"
                                name="FContactNumber"
                                value={studentProfile.firstName}
                                onChange={handleInputChange}
                                required
                                className=""
                                placeholder="09123476751"
                            
                            />
                        </div>
                    </div>
                       
                </div>
                <div className="flex justify-end mt-5">
                    <Button variant={'default'} onClick={()=> setFormStep(2)} className='text-white'>Back</Button>
                    <Button variant={'default'} onClick={()=> console.log('Save')} className='text-white ml-10'>Save</Button>

                </div>
            </div>
        </form>
      
    </div>
  )
}

export default Form