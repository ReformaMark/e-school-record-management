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
import { Barangay, City, fetchBarangays, fetchCities, fetchProvinces, fetchRegions, Province, Region } from "@/lib/address-api";
import { AdminFormData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";

const SystemAdminEditAdminPage = () => {
    const params = useParams();
    const adminId = params.adminId as Id<"users">;
    const router = useRouter();
    
    const admin = useQuery(api.users.getUser, { id: adminId });
    const updateAdmin = useMutation(api.users.updateUser);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm<AdminFormData>();

    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [isNCR, setIsNCR] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imageStorageId, setImageStorageId] = useState<string | undefined>();

    useEffect(() => {
        if (admin) {
            setImageStorageId(admin.imageStorageId);
            reset({
                email: admin.email,
                firstName: admin.firstName,
                middleName: admin.middleName || "",
                lastName: admin.lastName,
                contactNumber: admin.contactNumber,
                department: admin.department || "",
                specialization: admin.specialization || "",
                yearsOfExperience: admin.yearsOfExperience,
                birthDate: admin.birthDate,
                isActive: admin.isActive,
                region: admin.region || "",
                province: admin.province || "",
                city: admin.city || "",
                barangay: admin.barangay || "",
                street: admin.street || "",
                houseNumber: admin.houseNumber || "",
                postalCode: admin.postalCode || ""
            });
        }
    }, [admin, reset]);

    useEffect(() => {
        fetchRegions().then(data => {
            setRegions(data);
        });
    }, []);

    const handleRegionChange = async (regionCode: string) => {
        setValue('province', '');
        setValue('city', '');
        setValue('barangay', '');
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
        
        const selectedProvince = provinces.find(p => p.code === provinceCode);
        if (selectedProvince) {
            setValue('province', selectedProvince.name);
        }
        
        const cityData = await fetchCities(watch('region'));
        setCities(cityData);
    };

    const handleCityChange = async (cityCode: string) => {
        setValue('barangay', '');
        
        const selectedCity = cities.find(c => c.code === cityCode);
        if (selectedCity) {
            setValue('city', selectedCity.name);
            if (selectedCity.postalCode) {
                setValue('postalCode', selectedCity.postalCode);
            }
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

    const onSubmit = async (data: AdminFormData) => {
        setIsLoading(true);
        try {
            await updateAdmin({
                id: adminId,
                email: data.email,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                department: data.department,
                specialization: data.specialization,
                yearsOfExperience: data.yearsOfExperience,
                birthDate: data.birthDate as string,
                isActive: data.isActive || false,
                region: data.region,
                province: data.province,
                city: data.city,
                barangay: data.barangay,
                street: data.street,
                houseNumber: data.houseNumber,
                postalCode: data.postalCode
            });

            toast.success("Admin updated successfully");
            router.push("/sysadmin-admins");
        } catch (error) {
            toast.error("Failed to update admin: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!admin) {
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
                            <Link href="/sysadmin-admins">System Administrators</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit System Administrator</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="space-y-4 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/sysadmin-admins"
                                className={cn("h-7 w-7", buttonVariants({
                                    variant: "outline",
                                    size: "icon",
                                }))}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Edit System Administrator
                            </h1>

                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="text-white"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                {/* Admin Details Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Admin Details</CardTitle>
                                        <CardDescription>
                                            Edit admin details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="w-full"
                                                    placeholder="email@example.com"
                                                    {...register("email", { required: "Email is required" })}
                                                />
                                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="firstName"
                                                        type="text"
                                                        className="w-full"
                                                        {...register("firstName", { required: "First name is required" })}
                                                    />
                                                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="lastName"
                                                        type="text"
                                                        className="w-full"
                                                        {...register("lastName", { required: "Last name is required" })}
                                                    />
                                                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                                                </div>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="middleName">Middle Name (Optional)</Label>
                                                <Input
                                                    id="middleName"
                                                    type="text"
                                                    className="w-full"
                                                    {...register("middleName")}
                                                />
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
                                                <Label htmlFor="contactNumber">Contact Number <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="contactNumber"
                                                    type="text"
                                                    className="w-full"
                                                    {...register("contactNumber", { required: "Contact number is required" })}
                                                    maxLength={11}
                                                />
                                                {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="birthDate">Birth Date <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="birthDate"
                                                    type="date"
                                                    className="w-full"
                                                    {...register("birthDate", { required: "Birth date is required" })}
                                                />
                                                {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="department">Department (Optional)</Label>
                                                <Input
                                                    id="department"
                                                    type="text"
                                                    className="w-full"
                                                    {...register("department")}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="specialization">Specialization (Optional)</Label>
                                                    <Input
                                                        id="specialization"
                                                        type="text"
                                                        className="w-full"
                                                        {...register("specialization")}
                                                    />
                                                </div>

                                                <div className="grid gap-3">
                                                    <Label htmlFor="yearsOfExperience">Years of Experience (Optional)</Label>
                                                    <Input
                                                        id="yearsOfExperience"
                                                        type="number"
                                                        className="w-full"
                                                        {...register("yearsOfExperience", {
                                                            valueAsNumber: true
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

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
                                                        onValueChange={(value) => {
                                                            setValue('region', value);
                                                            handleRegionChange(value);
                                                        }}
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
                                                            onValueChange={(value) => {
                                                                setValue('province', value);
                                                                handleProvinceChange(value);
                                                            }}
                                                            disabled={!watch('region')}
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
                                                        onValueChange={(value) => {
                                                            setValue('city', value);
                                                            handleCityChange(value);
                                                        }}
                                                        disabled={!watch('region') || (!isNCR && !watch('province'))}
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
                                                        onValueChange={(value) => handleBarangayChange(value)}
                                                        disabled={!watch('city')}
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

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="street">Street (Optional)</Label>
                                                    <Input
                                                        id="street"
                                                        type="text"
                                                        className="w-full"
                                                        {...register("street")}
                                                    />
                                                </div>

                                                <div className="grid gap-3">
                                                    <Label htmlFor="houseNumber">House Number (Optional)</Label>
                                                    <Input
                                                        id="houseNumber"
                                                        type="text"
                                                        className="w-full"
                                                        {...register("houseNumber")}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                                                <Input
                                                    id="postalCode"
                                                    type="text"
                                                    className="w-full"
                                                    {...register("postalCode")}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                {/* Admin Status Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Admin Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                                                <Select 
                                                    defaultValue={admin.isActive ? "active" : "inactive"} 
                                                    onValueChange={(value) => setValue("isActive", value === "active")}
                                                >
                                                    <SelectTrigger id="status">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="inactive">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
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
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default SystemAdminEditAdminPage; 