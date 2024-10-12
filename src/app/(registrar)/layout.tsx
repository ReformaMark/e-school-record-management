import { Metadata } from "next";
import "@/lib/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SchoolRegistrarNavbar } from "./_components/school-registrar-navbar";
import { SchoolRegistrarSideNav } from "./_components/school-registrar-sidenav";

export const metadata: Metadata = {
    title: "System Admin",
    description: "System Admin Page",
};

const SchoolHeadLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html className="h-full" lang="en">
            <body className="bg-[#f0f8f3] relative">
                <Toaster />
                <div className="fixed top-0 right-0 w-[80%] ml-auto z-50">
                    <SchoolRegistrarNavbar />
                </div>
                <SchoolRegistrarSideNav />

                <div className="absolute right-0 top-[90px] w-[80%] z-0">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default SchoolHeadLayout;