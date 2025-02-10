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
import { PrincipalFormData, SchoolHeadType } from "@/lib/types";
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
import { Textarea } from "@/components/ui/textarea";
import { UserAvatarUpload } from "@/components/shared/user-avatar-upload";

const SystemAdminEditPrincipalPage = () => {
    const params = useParams();
    const principalId = params.principalId as Id<"users">;
    const router = useRouter();

    const principal = useQuery(api.users.getUser, { id: principalId });
    const updatePrincipal = useMutation(api.users.updateUser);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset
    } = useForm<PrincipalFormData>();

    const [regions, setRegions] = useState<Region[]>([]);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [barangays, setBarangays] = useState<Barangay[]>([]);
    const [isNCR, setIsNCR] = useState(false);
    const [imageStorageId, setImageStorageId] = useState<string | undefined>();

    useEffect(() => {
        if (principal) {
            setImageStorageId(principal.imageStorageId);
            reset({
                email: principal.email,
                firstName: principal.firstName,
                middleName: principal.middleName || "",
                lastName: principal.lastName,
                contactNumber: principal.contactNumber,
                description: principal.description || "",
                gender: principal.gender || "",
                birthDate: principal.birthDate,
                region: principal.region || "",
                province: principal.province || "",
                city: principal.city || "",
                barangay: principal.barangay || "",
                street: principal.street || "",
                houseNumber: principal.houseNumber || "",
                postalCode: principal.postalCode || "",
                schoolHeadType: principal.schoolHeadType || "junior-high",
            });
        }
    }, [principal, reset]);

    useEffect(() => {
        fetchRegions().then(data => {
            setRegions(data);
        });
    }, []);

    // Address handling functions
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

        const regionCode = regions.find(r =>
            r.name === watch('region')
        )?.code;

        if (regionCode) {
            const cityData = await fetchCities(regionCode);
            setCities(cityData);
        }
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

    const onSubmit = async (data: PrincipalFormData) => {
        setIsLoading(true);
        try {
            await updatePrincipal({
                id: principalId,
                email: data.email,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                department: data.description,
                gender: data.gender,
                birthDate: data.birthDate as string,
                region: data.region,
                province: data.province,
                city: data.city,
                barangay: data.barangay,
                street: data.street,
                houseNumber: data.houseNumber,
                postalCode: data.postalCode,
                imageStorageId: imageStorageId,
                isActive: true,
                schoolHeadType: data.schoolHeadType,
            });

            toast.success("School Head updated successfully");
            router.push("/sysadmin-principal/list");
        } catch (error) {
            toast.error("Failed to update school head: " + (error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!principal) {
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
                            <Link href="/sysadmin-principal/list">School Principals</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit Principal</BreadcrumbPage>
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
                                Edit Principal
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
                                {/* Principal Details Card */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Principal Details</CardTitle>
                                        <CardDescription>
                                            Edit principal details
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
                                                <Label htmlFor="birthDate">Birth Date <span className="text-red-500">*</span></Label>
                                                <Input
                                                    id="birthDate"
                                                    type="date"
                                                    className="w-full"
                                                    {...register("birthDate", { required: "Birth date is required" })}
                                                />
                                                {errors.birthDate && <p className="text-red-500">{errors.birthDate.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                                                    <Select
                                                        defaultValue={principal.gender}
                                                        onValueChange={(value) => setValue("gender", value)}
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
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="description">Description (Optional)</Label>
                                                <Textarea
                                                    id="description"
                                                    className="min-h-32"
                                                    {...register("description")}
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="schoolHeadType">School Head Type <span className="text-red-500">*</span></Label>
                                                <Select
                                                    defaultValue={principal.schoolHeadType}
                                                    onValueChange={(value: SchoolHeadType) => setValue("schoolHeadType", value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select school head type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>School Head Type</SelectLabel>
                                                            <SelectItem value="junior-high">Junior High School Head</SelectItem>
                                                            <SelectItem value="senior-high">Senior High School Head</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                {errors.schoolHeadType && (
                                                    <p className="text-red-500">{errors.schoolHeadType.message}</p>
                                                )}
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
                                {/* Principal Image Card */}
                                <Card className="overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>Principal Image</CardTitle>
                                        <CardDescription>
                                            Update principal image (Optional)
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <UserAvatarUpload
                                            currentImageId={principal.imageStorageId}
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
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default SystemAdminEditPrincipalPage; 