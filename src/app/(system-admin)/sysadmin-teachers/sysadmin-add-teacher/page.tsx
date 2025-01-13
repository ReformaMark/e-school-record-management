"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import {
    ChevronLeft
} from "lucide-react";

import { UserAvatarUpload } from "@/components/shared/user-avatar-upload";
import { Barangay, City, Province, Region, fetchBarangays, fetchCities, fetchProvinces, fetchRegions } from "@/lib/address-api";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../convex/_generated/api";
import { SchoolSubjects, schoolSubjects } from "../../../../../data/teachers-data";
import { MultiSelectSubject } from "../../_components/multi-select-subject";
import { Id } from "../../../../../convex/_generated/dataModel";

const SystemAdminAddTeacherPage = () => {
    const createTeacher = useMutation(api.users.createTeacher);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [imageStorageId, setImageStorageId] = useState<string | undefined>();
    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [isNCR, setIsNCR] = useState(false);
    const { setValue, watch } = useForm();
    const [selectedSubjects, setSelectedSubjects] = useState<SchoolSubjects[]>([])

    console.log(selectedSubjects)

    useEffect(() => {
        fetchRegions().then(data => {
            setRegions(data);
        });
    }, []);

    const handleRegionChange = async (regionCode: string) => {
        setCities([]);
        setBarangays([]);
        
        const isNCRSelected = regionCode === '130000000';
        setIsNCR(isNCRSelected);
        
        const selectedRegion = regions.find(r => r.code === regionCode);
        if (selectedRegion) {
            setValue('region', selectedRegion.name);
        }
        
        if (isNCRSelected) {
            setValue('province', 'Metro Manila');
            const cityData = await fetchCities('130000000');
            setCities(cityData);
        } else {
            const provinceData = await fetchProvinces(regionCode);
            setProvinces(provinceData);
        }
    };

    const handleProvinceChange = async (provinceCode: string) => {
        setValue('city', '');
        setValue('barangay', '');
        setBarangays([]);
        
        const selectedProvince = provinces.find(p => p.code === provinceCode);
        if (selectedProvince) {
            setValue('province', selectedProvince.name);
        }
        
        const cityData = await fetchCities(provinceCode);
        setCities(cityData);
    };

    const handleCityChange = async (cityCode: string) => {
        setValue('barangay', '');
        
        const selectedCity = cities.find(c => c.code === cityCode);
        if (selectedCity) {
            setValue('city', selectedCity.name);
        }
        
        try {
            const barangayData = await fetchBarangays(cityCode);
            setBarangays(barangayData);
        } catch (error) {
            toast.error('Failed to fetch barangays: ' + (error as Error).message);
        }
    };

    const handleBarangayChange = (barangayCode: string) => {
        const selectedBarangay = barangays.find(b => b.code === barangayCode);
        if (selectedBarangay) {
            setValue('barangay', selectedBarangay.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            
            // Validate required fields
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const confirmPassword = formData.get('cpassword') as string;
            
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }

            await createTeacher({
                email,
                password,
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                middleName: (formData.get('middleName') as string) || undefined,
                employeeId: formData.get('empId') as string,
                contactNumber: formData.get('contact') as string,
                birthDate: formData.get('bday') as string,
                gender: formData.get('gender') as string,
                specialization: formData.get('specialization') as string,
                yearsOfExperience: parseInt(formData.get('yrsOfExp') as string),
                position: formData.get('position') as string,
                advisoryClass: (formData.get('advisoryClass') as string) || undefined,
                subjectId: formData.getAll('subjects') as Id<'subjects'>[],
                // Use watch to get the address values
                region: watch('region'),
                province: watch('province'),
                city: watch('city'),
                barangay: watch('barangay'),
                street: formData.get('street') as string,
                ...(imageStorageId && { imageStorageId }),
            });

            toast.success("Teacher created successfully");
            router.push("/sysadmin-teachers");
        } catch (error) {
            toast.error("Failed to create teacher: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/sysadmin">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/sysadmin-teachers">Teachers</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add a Teacher</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="space-y-4 mt-8">
                <form id="teacher-form" onSubmit={handleSubmit}>
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/sysadmin-teachers"
                                className={cn("h-7 w-7", buttonVariants({
                                    variant: "outline",
                                    size: "icon",
                                }))}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Add a Teacher
                            </h1>

                            {/* Button for desktop/laptop users */}
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button
                                    type="submit"
                                    form="teacher-form"
                                    size="sm"
                                    className="text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creating..." : "Save"}
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                {/* Teacher Details Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Teacher Details</CardTitle>
                                        <CardDescription>Add teacher details</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="email@example.com"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="firstName"
                                                        name="firstName"
                                                        type="text"
                                                        required
                                                        placeholder="John"
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="lastName"
                                                        name="lastName"
                                                        type="text"
                                                        required
                                                        placeholder="Doe"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="middleName">Middle Name</Label>
                                                    <Input
                                                        id="middleName"
                                                        name="middleName"
                                                        type="text"
                                                        placeholder="Middle Name"
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="empId">Employee ID <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="empId"
                                                        name="empId"
                                                        type="text"
                                                        required
                                                        placeholder="2023-002"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        required
                                                        placeholder="********"
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="cpassword">Confirm Password <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="cpassword"
                                                        name="cpassword"
                                                        type="password"
                                                        required
                                                        placeholder="********"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Other Details Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Other Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="bday">Birth Date <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="bday"
                                                    name="bday"
                                                    type="date"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                                                    <Select name="gender" required>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="contact">Contact Number <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="contact"
                                                        name="contact"
                                                        type="tel"
                                                        required
                                                        placeholder="09123456789"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="specialization">Specialization <span className="text-red-500">*</span></Label>
                                                    <Select name="specialization" required>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select specialization" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {schoolSubjects.map((subject) => (
                                                                <SelectItem key={subject.value} value={subject.value}>
                                                                    {subject.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="yrsOfExp">Years of Experience <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="yrsOfExp"
                                                        name="yrsOfExp"
                                                        type="number"
                                                        required
                                                        min="0"
                                                        placeholder="Years of experience"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Academic Details Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Academic Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
                                                <Select name="position" required>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select position" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="adviser">Adviser</SelectItem>
                                                        <SelectItem value="subject-teacher">Subject Teacher</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="advisoryClass">Advisory Class</Label>
                                                <Select name="advisoryClass">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select advisory class" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="section-1">Section 1 (Oxygen)</SelectItem>
                                                        <SelectItem value="section-2">Section 2 (Phosphorus)</SelectItem>
                                                        <SelectItem value="section-3">Section 3 (Hydrogen)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label>Subjects <span className="text-red-500">*</span></Label>
                                                <MultiSelectSubject
                                                    value={selectedSubjects}
                                                    onChange={setSelectedSubjects}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Address Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="region">Region (Optional)</Label>
                                                    <Select 
                                                        onValueChange={handleRegionChange}
                                                        name="region"
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select region" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Region</SelectLabel>
                                                                {regions.map(region => (
                                                                    <SelectItem key={region.code} value={region.code}>
                                                                        {region.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid gap-3">
                                                    <Label htmlFor="province">Province (Optional)</Label>
                                                    {isNCR ? (
                                                        <Input 
                                                            value="Metro Manila" 
                                                            disabled 
                                                            className="bg-muted"
                                                            name="province"
                                                        />
                                                    ) : (
                                                        <Select
                                                            onValueChange={handleProvinceChange}
                                                            disabled={!regions.length}
                                                            name="province"
                                                        >
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select province" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Province</SelectLabel>
                                                                    {provinces.map(province => (
                                                                        <SelectItem key={province.code} value={province.code}>
                                                                            {province.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="city">City/Municipality (Optional)</Label>
                                                    <Select
                                                        onValueChange={handleCityChange}
                                                        disabled={!provinces.length && !isNCR}
                                                        name="city"
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select city" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>City</SelectLabel>
                                                                {cities.map(city => (
                                                                    <SelectItem key={city.code} value={city.code}>
                                                                        {city.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <div className="grid gap-3">
                                                    <Label htmlFor="barangay">Barangay (Optional)</Label>
                                                    <Select
                                                        onValueChange={handleBarangayChange}
                                                        disabled={!cities.length}
                                                        name="barangay"
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select barangay" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Barangay</SelectLabel>
                                                                {barangays.map(barangay => (
                                                                    <SelectItem key={barangay.code} value={barangay.code}>
                                                                        {barangay.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="street">Street (Optional)</Label>
                                                <Input
                                                    id="street"
                                                    name="street"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Enter street"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column */}
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                {/* Teacher Image Card */}
                                <Card className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Teacher Image</CardTitle>
                                        <CardDescription>Upload teacher image (Optional)</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <UserAvatarUpload
                                            onImageUpload={(storageId) => setImageStorageId(storageId)}
                                            onImageRemove={() => setImageStorageId(undefined)}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Mobile Save Button */}
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button
                                type="submit"
                                size="sm"
                                className="text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Save"}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default SystemAdminAddTeacherPage;