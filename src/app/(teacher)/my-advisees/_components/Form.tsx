'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn, getSchoolYear } from '@/lib/utils'
import { EnrollmentFormSchema } from '@/lib/validation/enrollment-form'
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarRaw } from '@/app/components/DatePicker'
import { useMutation } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
import Loading from '@/app/components/Loading'

const sex = ['Male', 'Female']

function EnrollmentForm({onClose}: {onClose: () => void}) {
    const [formStep, setFormStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [withLrn, setWithLrn] = useState<string>('');
    const [sameAsCurrent, setSameAsCurrent] = useState<boolean>(true);
    const createStudent = useMutation(api.students.createStudent)
    const form = useForm<z.infer<typeof EnrollmentFormSchema>>({
        resolver: zodResolver(EnrollmentFormSchema),
        defaultValues:{
            //formstep 1
            schoolYear: getSchoolYear(),
            gradeLevelToEnroll: "",
            withLrn: "Yes",
            returning: "No",
            als: "No",
            birthCertificateNo: "",
            lrn: "",
            lastName: "",
            firstName: "",
            middleName: "",
            extensionName: "",
            birthDate: new Date(),
            birthPlace: "",
            age: 0,
            sex: "",
            motherTounge: "",
            indigenous: "No",
            indigenousCommunity: "",
            fourPS: "No",
            fourPSIdNumber: "",
            enrollmentStatus: "Can Enroll",

            //formstep 2
            currentAddress:{
                province: "",
                municipality: "",
                barangay: "",
                street: "",
                houseNum: "",
                completeAddress: "",
            },
            sameAsCurrentAddress: "",
            permanentAddress:{
                province: "",
                municipality: "",
                barangay: "",
                street: "",
                houseNum: "",
                completeAddress: "",
            },
            
            //formstep 3
            fatherFirstName: "",
            fatherLastName: "",
            fatherMiddleName: "",
            fatherContact: "",
            motherFirstName: "",
            motherLastName: "",
            motherMiddleName: "",
            motherContact: "",
            guardianFirstName: "",
            guardianLastName: "",
            guardianMiddleName: "",
            guardianContact: "",

            //formstep 4
            lastGradeLevelCompleted: "",
            lastSYCompleted: "",
            lastSchoolAttended: "",
            schoolId: "",
            semester: "",
            strand: "",
            track: "",

        }

      
      })
      const { trigger, getValues, setValue, reset }= form


      //Validate the form for each step
      const handleNextClick = async () => {
        if(formStep === 0){
            const isStepOneValid = await trigger([
                'schoolYear', 
                'gradeLevelToEnroll', 
                'withLrn', 
                'returning', 
                'als', 
                'birthCertificateNo', 
                'lrn',
                'lastName',
                'firstName',
                'middleName',
                'extensionName',
                'birthDate',
                'birthPlace',
                'age',
                'sex',
                'motherTounge',
                'indigenous',
                'indigenousCommunity',
                'fourPS',
                'fourPSIdNumber',
            ]);
            if (isStepOneValid) {
                setFormStep(1);
                
            }
            return
        } 

        if(formStep === 1){
            const isStepTwoValid = await trigger([
                'currentAddress.province',
                'currentAddress.municipality',
                'currentAddress.barangay',
                'currentAddress.street',
                'currentAddress.houseNum',
                'currentAddress.completeAddress',
                'permanentAddress.province',
                'permanentAddress.municipality',
                'permanentAddress.barangay',
                'permanentAddress.street',
                'permanentAddress.houseNum',
                'permanentAddress.completeAddress',
                'sameAsCurrentAddress',
            ]);
            if (isStepTwoValid) {
                setFormStep(2);
            }
            return
        }

        if(formStep === 2){
            const isStepThreeValid = await trigger([
                'fatherFirstName',
                'fatherLastName',
                'fatherMiddleName',
                'fatherContact',
                'motherFirstName',
                'motherLastName',
                'motherMiddleName',
                'motherContact',
                'guardianFirstName',
                'guardianLastName',
                'guardianMiddleName',
                'guardianContact',
            ]);
            if (isStepThreeValid) {
                setFormStep(3);
            }
            return
        }

        if(formStep === 3){
            const isStepFourValid = await trigger([
                'lastGradeLevelCompleted',
                'lastSYCompleted',
                'lastSchoolAttended',
                'schoolId',

                'semester',
                'strand',
                'track',
            ]);
            if (isStepFourValid) {
            }
            return
        }
        
    };

    function onSubmit(data: z.infer<typeof EnrollmentFormSchema>) {
        setIsLoading(true)
        toast.promise(createStudent({
            ...data,
            birthDate: data.birthDate.toISOString()
        }), {
            loading: 'Adding student data...',
            success: () => {
                 onClose()
                 setIsLoading(false)
                 reset()
                return 'Student data added successfully'
            },
            error: 'Failed to add student data'
        })
    }

  return (
    <div className='bg-white p-5 rounded-lg shadow-md text-primary'>
        <h1 className='font-semibold tracking-widest text-xl text-center'>Student Enrollment Form</h1>
        <div className="">

        </div>
        <Form {...form}> 
            <form onSubmit={form.handleSubmit(onSubmit)}>

            {/* {Step One} */}
       
            <div className={`${formStep !== 0 ? 'hidden': 'block'} grid grid-cols-2 gap-x-10 mt-10`}>
                <div className="space-y-2">
                    <FormField
                        name="schoolYear"
                        control={form.control}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>School Year</FormLabel>
                            <FormControl>
                            <Input 
                                placeholder="Enter farm name" 
                                {...field} 
                                name='schoolYear'
                                value={getSchoolYear()}
                                disabled
                            />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                        )}
                    />
                    <div className="space-y-2 ">
                        <FormField
                            name="gradeLevelToEnroll"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Grade level to enroll <span className='text-red-700'>*</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Grade Level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="7">Grade 7</SelectItem>
                                            <SelectItem value="8">Grade 8</SelectItem>
                                            <SelectItem value="9">Grade 9</SelectItem>
                                            <SelectItem value="10">Grade 10</SelectItem>
                                            <SelectItem value="11">Grade 11</SelectItem>
                                            <SelectItem value="12">Grade 12</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="border border-black p-5">
                    <h1 className=' text-text text-lg font-medium'>Check the appropriate box only</h1>
                    <div className="flex justify-start gap-x-10">
                    <FormField
                        name="withLrn"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='mt-3 text-text text-xs'>With LRN?</FormLabel>
                                <FormControl>
                                    <RadioGroup 
                                        defaultValue="Yes" 
                                        className='pl-5 flex gap-x-5'
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem  className="space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="Yes" 
                                                    id="yes" 
                                                    onClick={() => {
                                                        setWithLrn('Yes')
                                                    }}
                                                    className='rounded-none' />
                                                
                                            </FormControl>
                                            <Label htmlFor="Yes">Yes</Label>
                                        </FormItem >
                                        <FormItem  className="space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="No" 
                                                    id="no" 
                                                    onClick={() => {
                                                        setWithLrn('No')
                                                        setValue('lrn', '')
                                                    }}
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="No">No</Label>
                                        </FormItem >
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="returning"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='mt-3 text-text text-xs'>Returning (Balik Aral)</FormLabel>
                                <FormControl>
                                    <RadioGroup 
                                        defaultValue="No" 
                                        className='pl-5 flex gap-x-5'
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem  className=" space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="Yes" 
                                                    id="yes" 
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="Yes">Yes</Label>
                                        </FormItem >
                                        <FormItem  className=" space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="No" 
                                                    id="no" 
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="No">No</Label>
                                        </FormItem >
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="als"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel className='mt-3 text-text text-xs'>ALS</FormLabel>
                                <FormControl>
                                    <RadioGroup 
                                        defaultValue="No" 
                                        className='pl-5 flex gap-x-5'
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem  className=" space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="Yes" 
                                                    id="yes" 
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="Yes">Yes</Label>
                                        </FormItem >
                                        <FormItem  className=" space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="No" 
                                                    id="no" 
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="No">No</Label>
                                        </FormItem >
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    </div>
                </div>
            </div>
            <div className={`${formStep !== 0 ? 'hidden': 'block'} border border-gray-500 mt-5 p-5`}>
                <h1 className='uppercase py-1 text-center w-full text-sm font-semibold bg-gray-100 mb-5'>Learner Information</h1>
                <div className="grid grid-cols-2 gap-x-10 px-5 mb-5">
                    <div className="space-y-1">
                        <FormField
                            name="birthCertificateNo"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>PSA Birth Certificate No. (if available upon registration)</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="e.g., 123456/1970" 
                                    {...field} 
                                    value={field.value}
                                    name='birthCertificateNo'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-1">
                    <FormField
                            name="lrn"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Learning Reference Number</FormLabel>
                                <FormControl>
                                <Input 
                                    type='number'
                                    placeholder="" 
                                    {...field} 
                                    value={withLrn === "No" ? "" : field.value}
                                    name='lrn'
                                    disabled={withLrn === 'No'}
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <div className=" mb-5 px-5">
                        <div className="space-y-1 mb-2">
                            <FormField
                                name="lastName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name <span className='text-red-700'>*</span></FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter Last Name" 
                                        {...field} 
                                        name='lastName'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1 mb-2">
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name <span className='text-red-700'>*</span></FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter First Name" 
                                        {...field} 
                                        name='firstName'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1 mb-2">
                            <FormField
                                name="middleName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Middle Name</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter Middle Name" 
                                        {...field} 
                                        name='middleName'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1 mb-2">
                            <FormField
                                name="extensionName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Extension Name</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter Middle Name" 
                                        {...field} 
                                        name='extensionName'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-x-5 px-5">
                        <div className="space-y-1 col-span-2">                
                            <FormField
                            control={form.control}
                            name="birthDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth <span className='text-red-700'>*</span></FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <CalendarRaw
                                                mode="single"
                                                captionLayout="dropdown-buttons"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={field.onChange}
                                                fromYear={1960}
                                                toYear={2030}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <FormField
                                name="birthPlace"
                                control={form.control}
                            
                                render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Birth Place <span className='text-red-700'>*</span></FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your birth place" 
                                        {...field} 
                                        name='birthPlace'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1 col-span-1">
                        <FormField
                            name="sex"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sex <span className='text-red-700'>*</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} >
                                        <SelectTrigger>
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
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                        </div>
                        <div className="space-y-1 col-span-1">
                            <FormField
                                name="age"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Age<span className='text-red-700'>*</span></FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Age" 
                                        {...field} 
                                        name='age'
                                        type='number'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-1 col-span-2">
                            <FormField
                                name="motherTounge"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mother Tongue </FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="" 
                                        {...field} 
                                        name='motherTounge'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-4 ">                  
                            <h4 className=' text-xs font-semibold '> Belonging to any Indigenous Peoples (IP) Community/Indigenous Cultural Community?</h4>
                            <div className="grid grid-cols-4 gap-x-2">
                                <FormField
                                    name="indigenous"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <RadioGroup
                                                    defaultValue="No" 
                                                    className='flex items-center h-full gap-x-2 col-span-1'
                                                    onValueChange={field.onChange}
                                                >
                                                    <FormItem  className="space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem 
                                                                value="Yes" 
                                                                id="yes" 
                                                                className='rounded-none' />
                                                        </FormControl>
                                                        <Label className='text-xs' htmlFor="yes">Yes</Label>
                                                    </FormItem >
                                                    <FormItem  className="space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem 
                                                                value="No" 
                                                                id="no" 
                                                                className='rounded-none' />
                                                        </FormControl>
                                                        <Label className='text-xs' htmlFor="no">No</Label>
                                                    </FormItem >
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-1 flex items-center col-span-3">
                                    <Label htmlFor="motherTongue" className="text-xs font-semibold text-text">
                                       If yes, Please specify :
                                    </Label>
                                    <FormField
                                        name="indigenousCommunity"
                                        control={form.control}
                                        render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                            <Input 
                                                placeholder="" 
                                                {...field} 
                                                name='motherTounge'
                                            />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 "> 
                                <FormField
                                    name="fourPS"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="grid grid-cols-2 items-center">
                                            <FormLabel className=' text-xs font-semibold '> Is your family a beneficiary of 4Ps?</FormLabel>
                                            <FormControl>
                                                <RadioGroup 
                                                    defaultValue="No" 
                                                    className='pl-5 flex gap-x-5'
                                                    onValueChange={field.onChange}
                                                >
                                                    <FormItem  className=" space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem 
                                                                value="Yes" 
                                                                id="yes" 
                                                                className='rounded-none' />
                                                        </FormControl>
                                                        <Label htmlFor="Yes">Yes</Label>
                                                    </FormItem >
                                                    <FormItem  className="space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem 
                                                                value="No" 
                                                                id="no" 
                                                                className='rounded-none' />
                                                        </FormControl>
                                                        <Label htmlFor="No">No</Label>
                                                    </FormItem >
                                                </RadioGroup>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />    
                            <div className="grid grid-cols-4 gap-x-2">
    
                                <div className="space-y-1  col-span-4 mt-3">
                                    <Label htmlFor="motherTongue" className="text-xs font-semibold text-text">
                                    If Yes, write the 4Ps Household ID Number below
                                    </Label>
                                    <div className="relative">
                                        <FormField
                                            name="fourPSIdNumber"
                                            control={form.control}
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                <Input 
                                                    placeholder="" 
                                                    {...field} 
                                                    name='fourPSIdNumber'
                                                />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-10">
                   
                    <Button type='button'  variant={'default'} onClick={handleNextClick} className='text-white ml-auto'>Next</Button>
                </div>
            </div>

            {/* {Second Step} */}
            <div className={`${formStep !== 1 ? "hidden": "block"} border-black border p-5`}>
                <div >
                    <h1 className='font-semibold text-lg w-full bg-gray-100 px-5'>Current Address</h1>
                    <div className="grid grid-cols-5 gap-x-5 mb-5 px-5" >
                        <div className="space-y-2">
                            <FormField
                                name="currentAddress.province"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Province</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your province" 
                                        {...field} 
                                        value={field.value}
                                        name='currentAddress.province'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                    
                        <div className="space-y-2">
                            <FormField
                                name="currentAddress.municipality"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Municipality/City</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your Municipality/City" 
                                        {...field} 
                                        value={field.value}
                                        name='currentAddress.municipality'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                name="currentAddress.barangay"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Barangay</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your barangay" 
                                        {...field} 
                                        value={field.value}
                                        name='currentAddress.barangay'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                name="currentAddress.street"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street/Subd.</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your street or subdivision" 
                                        {...field} 
                                        value={field.value}
                                        name='currentAddress.street'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                name="currentAddress.houseNum"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>House No.</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your house number" 
                                        {...field} 
                                        value={field.value}
                                        name='currentAddress.houseNum'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="space-y-2 px-5">
                        <FormField
                            name="currentAddress.completeAddress"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Complete Address</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Enter your complete address" 
                                    {...field} 
                                    value={field.value}
                                    name='currentAddress.completeAddress'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className={``}>
                    <div className="flex items-center gap-x-10 bg-gray-100 mt-5 px-5 py-1">
                        <h1 className='font-semibold text-lg'>Permanent Address</h1>
                        <div className="flex text-xs gap-x-5">
                            <h3 >Same with your current address?</h3>
                            <FormField
                            name="sameAsCurrentAddress"
                            control={form.control}
                            render={({ field }) => (
                            <FormControl>
                                    <RadioGroup 
                                      
                                        className='pl-5 flex gap-x-5'
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem  className=" space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="Yes" 
                                                    id="yes" 
                                                    onClick={() => {
                                                        setSameAsCurrent(true)
                                                        setValue('permanentAddress.province', getValues('currentAddress.province'))
                                                        setValue('permanentAddress.municipality', getValues('currentAddress.municipality'))
                                                        setValue('permanentAddress.barangay', getValues('currentAddress.barangay'))
                                                        setValue('permanentAddress.street', getValues('currentAddress.street'))
                                                        setValue('permanentAddress.houseNum', getValues('currentAddress.houseNum'))
                                                        setValue('permanentAddress.completeAddress', getValues('currentAddress.completeAddress'))
                                                    }}
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="Yes">Yes</Label>
                                        </FormItem >
                                        <FormItem  className="space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="No" 
                                                    id="no" 
                                                    onClick={() => {
                                                        setSameAsCurrent(false)
                                                        setValue('permanentAddress.province', '')
                                                        setValue('permanentAddress.municipality', '')
                                                        setValue('permanentAddress.barangay', '')
                                                        setValue('permanentAddress.street', '')
                                                        setValue('permanentAddress.houseNum', '')
                                                        setValue('permanentAddress.completeAddress', '')
                                                    }}
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="No">No</Label>
                                        </FormItem >
                                        <FormMessage/>
                                    </RadioGroup>
                                </FormControl>
                             )}
                             />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-x-5 mb-5 px-5">
                        <div className="space-y-2">
                            <FormField
                                name="permanentAddress.province"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Province</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your province" 
                                        {...field} 
                                        value={!sameAsCurrent ?  field.value : getValues('currentAddress.province')}
                                        disabled={sameAsCurrent}
                                        name='permanentAddress.province'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                    
                        <div className="space-y-2 px-5">
                            <FormField
                                name="permanentAddress.municipality"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Municipality/City</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your municipality/city" 
                                        {...field} 
                                        value={!sameAsCurrent ?  field.value : getValues('currentAddress.municipality')}
                                        name='permanentAddress.municipality'
                                        disabled={sameAsCurrent}
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                name="permanentAddress.barangay"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Barangay</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your barangay" 
                                        {...field} 
                                        value={!sameAsCurrent ?  field.value : getValues('currentAddress.barangay')}
                                        name='permanentAddress.barangay'
                                        disabled={sameAsCurrent}
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                name="permanentAddress.street"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street/Subd.</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your street or subdivision" 
                                        {...field} 
                                        value={!sameAsCurrent ?  field.value : getValues('currentAddress.street')}
                                        name='permanentAddress.street'
                                        disabled={sameAsCurrent}
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                           
                            <FormField
                                name="permanentAddress.houseNum"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>House No.</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your house number" 
                                        {...field} 
                                        value={!sameAsCurrent ?  field.value : getValues('currentAddress.houseNum')}
                                        disabled={sameAsCurrent}
                                        name='permanentAddress.houseNum'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="space-y-2 px-2">
                        <FormField
                                name="permanentAddress.completeAddress"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Complete Address</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Enter your house number" 
                                        {...field} 
                                        value={!sameAsCurrent ?  field.value : getValues('currentAddress.completeAddress')}
                                        disabled={sameAsCurrent}
                                        name='permanentAddress.completeAddress'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                    </div>
                    <div className="flex justify-end mt-5">
                        <Button type='button' variant={'default'} onClick={()=> setFormStep(0)} className='text-white'>Back</Button>
                        <Button type='button' variant={'default'} onClick={handleNextClick} className='text-white ml-10'>Next</Button>

                    </div>
                </div>
            </div>

           {/* Third Step */}
           <div className={`${formStep !== 2 ? "hidden": "block"} border-black border p-5`}>
                <h1 className="bg-gray-100 py-1 px-5 text-lg font-semibold">Parent&apos;s/Guardian Information</h1>
                <h3 className='text-sm px-5'>Father&apos;s Name</h3>
                <div className="grid grid-cols-4 gap-x-5 px-10">
                    <div className="space-y-2 px-2">
                        <FormField
                                name="fatherLastName"
                                control={form.control}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                    <Input 
                                        placeholder="Father's Last name"
                                        {...field} 
                                        value={field.value}
                                        name='fatherLastName'
                                    />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="fatherFirstName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Father's First name"
                                    {...field} 
                                    value={field.value}
                                    name='fatherFirstName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="fatherMiddleName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Father's Middle name"
                                    {...field} 
                                    value={field.value}
                                    name='fatherMiddleName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="fatherContact"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="(+63) xxx-xxx-xxxx"
                                    {...field} 
                                    value={field.value}
                                    name='fatherContact'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <h3 className='text-sm px-5 mt-5'>Mother&apos;s Name</h3>
                <div className="grid grid-cols-4 gap-x-5 px-10">
                    <div className="space-y-2 ">
                        <FormField
                            name="motherLastName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Mother's Last name"
                                    {...field} 
                                    value={field.value}
                                    name='motherLastName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="motherFirstName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Mother's First name"
                                    {...field} 
                                    value={field.value}
                                    name='motherFirstName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="motherMiddleName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Mother's Middle name"
                                    {...field} 
                                    value={field.value}
                                    name='motherMiddleName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="motherContact"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="(+63) xxx-xxx-xxxx"
                                    {...field} 
                                    value={field.value}
                                    name='motherContact'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <h3 className='text-sm px-5 mt-5'>Legal Guarduan&apos;s Name</h3>
                <div className="grid grid-cols-4 gap-x-5 px-10">
                    <div className="space-y-2 ">
                        <FormField
                            name="guardianLastName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Guarduan's Last name"
                                    {...field} 
                                    value={field.value}
                                    name='guardianLastName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="guardianFirstName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Guarduan's First name"
                                    {...field} 
                                    value={field.value}
                                    name='guardianFirstName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="guardianMiddleName"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="Guarduan's Middle name"
                                    {...field} 
                                    value={field.value}
                                    name='guardianMiddleName'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="guardianContact"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder="(+63) xxx-xxx-xxxx"
                                    {...field} 
                                    value={field.value}
                                    name='guardianContact'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <Button type='button' variant={'default'} onClick={()=> setFormStep(1)} className='text-white'>Back</Button>
                    <Button type='button' variant={'default'} onClick={handleNextClick} className='text-white ml-10'>Next</Button>

                </div>
            </div>
            {/* {Fourth Step} */}
            <div className={`${formStep !== 3 ? "hidden": "block"} border-black border p-5`}>
                <h1 className="bg-gray-100 py-1 px-5 text-lg font-semibold">For Returning Learner (Balik-Aral) and Those Who will Transfer/Move In</h1>
                <div className="grid grid-cols-2 gap-5 px-10">
         
                    <div className="space-y-2 ">
                        <FormField
                            name="lastGradeLevelCompleted"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Grade Level Completed</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder=""
                                    {...field} 
                                    value={field.value}
                                    name='lastGradeLevelCompleted'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2 ">
                        <FormField
                            name="lastSYCompleted"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last School Year Completed</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder=""
                                    {...field} 
                                    value={field.value}
                                    name='lastSYCompleted'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            name="lastSchoolAttended"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last School Attended</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder=""
                                    {...field} 
                                    value={field.value}
                                    name='lastSchoolAttended'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            name="schoolId"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>School ID</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder=""
                                    {...field} 
                                    value={field.value}
                                    name='schoolId'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <h1 className="bg-gray-100 py-1 px-5 text-lg font-semibold">For Learners in Senior High School</h1>
                <div className="grid grid-cols-2 gap-5 px-10">
                    <div className="flex text-xs gap-x-5 items-center">
                        <h3 >Semester?</h3>
                        <FormField
                            name="semester"
                            control={form.control}
                            render={({ field }) => (
                            <FormControl>
                                    <RadioGroup 
                                        defaultValue="" 
                                        className='pl-5 flex gap-x-5'
                                        onValueChange={field.onChange}
                                    >
                                        <FormItem  className=" space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="1st" 
                                                    id="yes" 
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="Yes">1st</Label>
                                        </FormItem >
                                        <FormItem  className="space-x-2">
                                            <FormControl>
                                                <RadioGroupItem 
                                                    value="2nd" 
                                                    id="no" 
                                                    className='rounded-none' />
                                            </FormControl>
                                            <Label htmlFor="No">2nd</Label>
                                        </FormItem >
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>
                
                    <div className="space-y-2">
                        <FormField
                            name="strand"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Strand</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder=""
                                    {...field} 
                                    value={field.value}
                                    name='strand'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2"></div>
                    <div className="space-y-2">
                        <FormField
                            name="track"
                            control={form.control}
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Track</FormLabel>
                                <FormControl>
                                <Input 
                                    placeholder=""
                                    {...field} 
                                    value={field.value}
                                    name='track'
                                />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <Button type='button' variant={'default'} onClick={()=> setFormStep(2)} className='text-white'>Back</Button>
                    <Button variant={'default'} disabled={isLoading} type='submit' className='text-white ml-10'>{isLoading ? <Loading/> : <span>Save</span>}</Button>

                </div>
            </div>
            </form>
        </Form>
    </div>
  )
}

export default EnrollmentForm