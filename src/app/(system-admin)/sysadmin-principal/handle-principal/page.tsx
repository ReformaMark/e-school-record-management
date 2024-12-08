"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import { UserAvatarUpload } from "@/components/shared/user-avatar-upload";
import {
    Barangay,
    City,
    Province,
    Region,
    fetchBarangays,
    fetchCities,
    fetchProvinces,
    fetchRegions
} from "@/lib/address-api";
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
    CalendarIcon,
    ChevronLeft,
    Upload
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { PrincipalFormData } from "@/lib/types";

const SystemAdminHandlePrincipalPage = () => {
    const createPrincipal = useMutation(api.users.createPrincipal);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [imageStorageId, setImageStorageId] = useState<string | undefined>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm<PrincipalFormData>({
        defaultValues: {
            gender: ''
        }
    });

    const password = watch("password");

    // Address state management
    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [isNCR, setIsNCR] = useState(false);

    // Fetch regions on component mount
    useEffect(() => {
        fetchRegions().then(data => {
            setRegions(data);
        });
    }, []);

    // Address handling functions (same as in admin page)
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
        
        const barangayData = await fetchBarangays(cityCode);
        setBarangays(barangayData);
    };

    const handleBarangayChange = (barangayCode: string) => {
        const selectedBarangay = barangays.find(b => b.code === barangayCode);
        if (selectedBarangay) {
            setValue('barangay', selectedBarangay.name);
        }
    };

    const onSubmit = async (data: PrincipalFormData) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!data.gender) {
            toast.error("Please select a gender");
            return;
        }

        setIsLoading(true);
        try {
            await createPrincipal({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                birthDate: data.birthDate as string,
                gender: data.gender,
                description: data.description,
                region: data.region,
                province: data.province,
                city: data.city,
                barangay: data.barangay,
                street: data.street,
                houseNumber: data.houseNumber,
                postalCode: data.postalCode,
                imageStorageId: imageStorageId,
            });

            toast.success("Principal created successfully");
            router.push("/sysadmin-principal/list");
        } catch (error) {
            toast.error("Failed to create principal: " + (error as Error).message);
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
                            <Link href="/sysadmin-principal/list">List of Principals</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Principal</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <main className="space-y-4 mt-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/sysadmin-principal/list"
                                className={cn("h-7 w-7", buttonVariants({
                                    variant: "outline",
                                    size: "icon",
                                }))}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Back</span>
                            </Link>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Add Principal
                            </h1>

                            {/* Button for desktop/laptop users */}
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
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

                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                {/* Fname, Lname, Mname, Desc */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Principal Details</CardTitle>
                                        <CardDescription>
                                            Principal Details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Email <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="w-full"
                                                    placeholder="zKj6w@example.com"
                                                    {...register("email", { required: "Email is required" })}
                                                />
                                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">First Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        className="w-full"
                                                        placeholder="John"
                                                        {...register("firstName", { required: "First Name is required" })}
                                                    />
                                                    {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Last Name <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        className="w-full"
                                                        placeholder="Doe"
                                                        {...register("lastName", { required: "Last Name is required" })}
                                                    />
                                                    {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Middle Name (Optional)</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Kennedy"
                                                    {...register("middleName")}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* password and current password */}
                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Password <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        className="w-full"
                                                        placeholder="********"
                                                        {...register("password", { required: "Password is required" })}
                                                    />
                                                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                                                </div>

                                                <div className="grid gap-3">
                                                    <Label htmlFor="name">Confirm Password <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="cpassword"
                                                        type="password"
                                                        className="w-full"
                                                        placeholder="********"
                                                        {...register("confirmPassword", { required: "Confirm Password is required" })}
                                                    />
                                                    {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Other details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Other details</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="birthDate">Birth Date <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="birthDate"
                                                    type="date"
                                                    className="w-full"
                                                    {...register("birthDate", { 
                                                        required: "Birth date is required",
                                                        validate: (value) => {
                                                            if (!value) return "Birth date is required";
                                                            
                                                            const birthDate = new Date(value);
                                                            const today = new Date();
                                                            let age = today.getFullYear() - birthDate.getFullYear();
                                                            
                                                            if (
                                                                today.getMonth() < birthDate.getMonth() || 
                                                                (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
                                                            ) {
                                                                age--;
                                                            }

                                                            if (age < 18) return "Must be at least 18 years old";
                                                            if (age > 65) return "Must not exceed 65 years old";
                                                            return true;
                                                        }
                                                    })}
                                                />
                                                {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                                                    <Select 
                                                        onValueChange={(value) => setValue("gender", value)}
                                                        {...register("gender", { required: "Gender is required" })}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Gender</SelectLabel>
                                                                <SelectItem value="male">Male</SelectItem>
                                                                <SelectItem value="female">Female</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                                                </div>

                                                <div className="grid gap-3">
                                                    {/* contact number */}
                                                    <Label htmlFor="contact">Contact Number <span className="text-red-500">*</span></Label>
                                                    <Input
                                                        id="contact"
                                                        type="text"
                                                        className="w-full"
                                                        placeholder="Enter your contact number"
                                                        {...register("contactNumber", { required: "Contact Number is required" })}
                                                    />
                                                    {errors.contactNumber && <p className="text-red-500">{errors.contactNumber.message}</p>}
                                                </div>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="description">Description (Optional)</Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Enter something about the principal"
                                                    className="min-h-32"
                                                    {...register("description")}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Address details */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Address Details (Optional)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="region">Region</Label>
                                                    <Select onValueChange={handleRegionChange}>
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
                                                    <Label htmlFor="province">Province</Label>
                                                    {isNCR ? (
                                                        <Input 
                                                            value="Metro Manila" 
                                                            disabled 
                                                            className="bg-muted"
                                                        />
                                                    ) : (
                                                        <Select
                                                            onValueChange={handleProvinceChange}
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
                                                    <Label htmlFor="city">City/Municipality</Label>
                                                    <Select
                                                        onValueChange={handleCityChange}
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
                                                    <Label htmlFor="barangay">Barangay</Label>
                                                    <Select
                                                        onValueChange={handleBarangayChange}
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

                                            <div className="grid gap-3">
                                                <Label htmlFor="strt">Street</Label>
                                                <Input
                                                    id="strt"
                                                    type="text"
                                                    className="w-full"
                                                    placeholder="Enter street"
                                                    {...register("street")}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                {/* Admin status */}
                                {/* <Card x-chunk="dashboard-07-chunk-3">
                                    <CardHeader>
                                        <CardTitle>Admin Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="status">Status</Label>
                                                <Select>
                                                    <SelectTrigger id="status" aria-label="Select status">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="published">Active</SelectItem>
                                                        <SelectItem value="archived">Inactive</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card> */}

                                {/* Admin Image */}
                                <Card className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Principal Image</CardTitle>
                                        <CardDescription>
                                            Upload principal image (Optional)
                                        </CardDescription>
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

                        {/* Button for mobile users */}
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
    )
}

export default SystemAdminHandlePrincipalPage;