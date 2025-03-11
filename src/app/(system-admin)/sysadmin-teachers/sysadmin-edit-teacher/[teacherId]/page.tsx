"use client";

import { UserAvatarUpload } from "@/components/shared/user-avatar-upload";
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
import { Barangay, City, Province, Region, fetchBarangays, fetchCities, fetchProvinces, fetchRegions } from "@/lib/address-api";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { schoolSubjects } from "../../../../../../data/teachers-data";

interface TeacherFormData {
    email: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    contactNumber: string;
    employeeId: string;
    position: string;
    specialization: string;
    yearsOfExperience: number;
    birthDate: string;
    gender: string;
    region?: string;
    province?: string;
    city?: string;
    barangay?: string;
    street?: string;
    advisoryClass?: string;
    subjects: string[];
}

const SystemAdminEditTeacherPage = ({ params }: { params: { teacherId: string } }) => {
    const { register, handleSubmit, setValue, watch } = useForm<TeacherFormData>();
    const updateTeacher = useMutation(api.users.updateTeacher);
    const teacher = useQuery(api.users.getTeacher, { teacherId: params.teacherId as Id<"users"> });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [imageStorageId, setImageStorageId] = useState<string>();
    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [isNCR, setIsNCR] = useState(false);
    // const [selectedSubjects, setSelectedSubjects] = useState<SchoolSubjects[]>([]);
    // const [subjects, setSubjects] = useState<SchoolSubjects[]>([])
    const subjectIds = teacher?.subjectId || []
    const subjects = useQuery(api.users.getSubjects, { subjectIds })

    useEffect(() => {
        if (teacher) {
            // Basic Info
            setValue('email', teacher.email);
            setValue('firstName', teacher.firstName);
            setValue('middleName', teacher.middleName || '');
            setValue('lastName', teacher.lastName);
            setValue('contactNumber', teacher.contactNumber || '');
            setValue('employeeId', teacher.employeeId || '');
            setValue('birthDate', teacher.birthDate || '');
            setValue('gender', teacher.gender || '');

            // Academic Info
            setValue('position', teacher.position || '');
            setValue('specialization', teacher.specialization || '');
            setValue('yearsOfExperience', teacher.yearsOfExperience || 0);
            setValue('advisoryClass', teacher.advisoryClass || '');
            setValue('subjects', subjects?.map((s) => s.name) || []);

            // Address Info
            setValue('region', teacher.region || '');
            setValue('province', teacher.province || '');
            setValue('city', teacher.city || '');
            setValue('barangay', teacher.barangay || '');
            setValue('street', teacher.street || '');

            // Image
            if (teacher.imageStorageId) {
                setImageStorageId(teacher.imageStorageId);
            }

            // If address data exists, fetch the corresponding options
            if (teacher.region) {
                handleRegionChange(teacher.region);
            }
        }
    }, [teacher, setValue]);

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

    const onSubmit = async (data: TeacherFormData) => {
        // console.log("Form data before submit:", data);
        setIsLoading(true);

        // console.log(data, "Honlulu:" ,data.subjects.map((subject) => subject.value));

        try {
            await updateTeacher({
                id: params.teacherId as Id<"users">,
                email: data.email,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                employeeId: data.employeeId,
                // position: data.position,
                specialization: data.specialization,
                yearsOfExperience: Number(data.yearsOfExperience),
                birthDate: data.birthDate,
                gender: data.gender,
                region: watch('region'),
                province: watch('province'),
                city: watch('city'),
                barangay: watch('barangay'),
                street: data.street,
                // advisoryClass: data.advisoryClass,
                // subjectId: subjects?.map((s) => s._id),
                imageStorageId,
            });

            toast.success("Teacher updated successfully");
            router.push("/sysadmin-teachers");
        } catch (error) {
            toast.error("Failed to update teacher: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!teacher) {
        return <div>Loading...</div>;
    }

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
                        <BreadcrumbPage>Edit Teacher</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="space-y-4 mt-8">
                <form id="teacher-form" onSubmit={handleSubmit(onSubmit)}>
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
                                Edit Teacher
                            </h1>

                            {/* Button for desktop/laptop users */}
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Save"}
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                {/* Teacher Details Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Teacher Details</CardTitle>
                                        <CardDescription>Edit teacher details</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                                <Input
                                                    {...register('email')}
                                                    type="email"
                                                    required
                                                    placeholder="email@example.com"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        {...register('firstName')}
                                                        type="text"
                                                        required
                                                        placeholder="John"
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        {...register('lastName')}
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
                                                        {...register('middleName')}
                                                        type="text"
                                                        placeholder="Middle Name"
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="empId">Employee ID <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        {...register('employeeId')}
                                                        type="text"
                                                        required
                                                        placeholder="2023-002"
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
                                                    {...register('birthDate')}
                                                    type="date"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                                                    <Select
                                                        onValueChange={(value) => setValue('gender', value)}
                                                        value={watch("gender")}
                                                        defaultValue={teacher.gender}
                                                        required
                                                    >
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
                                                        {...register('contactNumber')}
                                                        type="tel"
                                                        required
                                                        placeholder="09123456789"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="specialization">Specialization <span className="text-red-500">*</span></Label>
                                                    <Select
                                                        onValueChange={(value) => setValue('specialization', value)}
                                                        value={watch('specialization')}
                                                        defaultValue={teacher.specialization}
                                                        required
                                                    >
                                                        <SelectTrigger className="w-[276px]">
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
                                                        {...register('yearsOfExperience')}
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
                                {/* <Card>
                                    <CardHeader>
                                        <CardTitle>Academic Details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="position">Position <span className="text-red-500">*</span></Label>
                                                <Select
                                                    onValueChange={(value) => setValue('position', value)}
                                                    value={watch('position')}
                                                    defaultValue={teacher.position}
                                                    required
                                                >
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
                                                <Select
                                                    onValueChange={(value) => setValue('advisoryClass', value)}
                                                    value={watch('advisoryClass')}
                                                    defaultValue={teacher.advisoryClass}
                                                >
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
                                                    //@ts-expect-error this is correctly typed
                                                    value={watch('subjects') as SchoolSubjects[]}
                                                    //@ts-expect-error this is correctly typed
                                                    onChange={(subjects) => setValue('subjects', subjects as SchoolSubjects[])}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card> */}

                                {/* Address Details Card */}
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
                                                            {...register("province")}
                                                        />
                                                    ) : (
                                                        <Select
                                                            onValueChange={handleProvinceChange}
                                                            disabled={!regions.length}
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
                                                    {...register("street")}
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
                                            currentImageId={teacher.imageStorageId}
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
                                {isLoading ? "Updating..." : "Save"}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default SystemAdminEditTeacherPage; 