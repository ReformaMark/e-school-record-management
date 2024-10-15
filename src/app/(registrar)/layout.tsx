import { Metadata } from "next";
import "@/lib/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SchoolRegistrarNavbar } from "./_components/school-registrar-navbar";
import { SchoolRegistrarSideNav } from "./_components/school-registrar-sidenav";

export const metadata: Metadata = {
    title: "School Registrar",
    description: "School registrar page",
};

const SchoolHeadLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html className="h-full" lang="en">
            <body className="bg-background relative">
                <Toaster />

                <SchoolRegistrarNavbar />

                <SchoolRegistrarSideNav />

                <div className="w-full md:absolute md:right-0 md:top-[80px] md:w-[80%] z-0">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default SchoolHeadLayout;