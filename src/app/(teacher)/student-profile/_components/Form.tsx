'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { add, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'

type StudentProfile = {
    firstName: string,
    lastName: string,
    middleName: string,
    extentionName: string,
    birthday: Date | undefined,
    birthPlace: string,
    age: number,
    province: string,
    municipality: string,
    barangay: string,
    street: string,
    houseNum: string,
    fullAddress: string,
    sex: SexType,
}

type SexType = 'Male' |'Female' |'Others'

const sex = ['Male', 'Female', "Others"]

const initialShipppinginfo: StudentProfile = {
    firstName: '',
    lastName: '',
    middleName: '',
    extentionName: '',
    birthday: undefined,
    birthPlace: '',
    age: 0,
    province: '',
    municipality: '',
    barangay: '',
    street: '',
    houseNum: '',
    fullAddress: '',
    sex: sex[0] as SexType,
}

function Form() {
    const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialShipppinginfo)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
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
    <div className='bg-white p-5 rounded-lg'>
        <h1 className='font-semibold tracking-widest text-xl text-center'>Student Profile Form</h1>
        <form
            id="create-shipping-form"
           
            >
            <h1 className='font-semibold text-lg'>Personal Information</h1>
            <div className="grid grid-cols-3 gap-x-5 mb-5">
                <div className="space-y-2">
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
               
                <div className="space-y-2">
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
                <div className="space-y-2">
                    <Label htmlFor="extentionName" className="text-sm font-medium text-text">
                        Ext. <span className='text-red-700'>*</span>
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
            <div className="grid grid-cols-4 gap-x-5 mb-5">
                <div className="space-y-2">
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
                <div className="space-y-2">
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
                <div className="space-y-2">
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
                <div className="space-y-2">
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
            </div>
            <h1 className='font-semibold text-lg'>Permanent Address</h1>
            <div className="grid grid-cols-5 gap-x-5 mb-5">
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
            <div className="space-y-2">
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
           
        </form>
        <div className="text-right mt-5">
            <Button variant={'default'} className='text-white'>Save</Button>
        </div>
    </div>
  )
}

export default Form