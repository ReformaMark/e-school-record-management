import { Metadata } from "next";
import "@/lib/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SchoolHeadNavbar } from "./_components/school-head-navbar";
import { SchoolHeadSideNav } from "./_components/school-head-sidenav";

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
                    <SchoolHeadNavbar />
                </div>
                <SchoolHeadSideNav />

                <div className="absolute right-0 top-[90px] w-[80%] z-0">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default SchoolHeadLayout;