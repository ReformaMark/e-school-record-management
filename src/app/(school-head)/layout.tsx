import "@/lib/globals.css";
import { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "../components/convex-client-provider";
import { SchoolHeadNavbar } from "./_components/school-head-navbar";
import { SchoolHeadSideNav } from "./_components/school-head-sidenav";
import { SchoolHeadGuard } from "@/components/guards/sh-guard";

export const metadata: Metadata = {
    title: "ERMS-school head",
    description: "System Admin Page",
};

const SchoolHeadLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
                <html className="h-full" lang="en">
                    <body className="bg-[#E0E7E9] relative">
                        <SchoolHeadGuard>
                            <Toaster />

                            <SchoolHeadNavbar />

                            <SchoolHeadSideNav />

                            <div className="w-full pt-[15%] md:pt-0  md:absolute z-30 md:right-0 md:top-[80px] md:w-[80%]">
                                {children}
                            </div>
                        </SchoolHeadGuard>
                    </body>
                </html>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
    )
}

export default SchoolHeadLayout;