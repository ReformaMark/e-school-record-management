export interface AdminFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    contactNumber: string;
    department?: string;
    specialization?: string;
    yearsOfExperience?: number;
    role?: "admin" | "teacher" | "school-head" | "staff";
    isActive?: boolean;
    emailVerified?: boolean;
    birthDate?: string;
    region: string;
    province: string;
    city: string;
    barangay: string;
    street: string;
    houseNumber: string;
    postalCode: string;
}