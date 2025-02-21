import { Metadata } from "next";
import "@/lib/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { SchoolRegistrarNavbar } from "./_components/school-registrar-navbar";
import { SchoolRegistrarSideNav } from "./_components/school-registrar-sidenav";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "../components/convex-client-provider";

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
        <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
                <html className="h-full" lang="en">
                    <body className="bg-background relative">
                        <Toaster />

                        <SchoolRegistrarNavbar />

                        <SchoolRegistrarSideNav />

                        <div className="w-full pt-[15%] md:pt-0  md:absolute z-30 md:right-0 md:top-[80px] md:w-[80%]">
                            {children}
                        </div>
                    </body>
                </html>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
    )
}

export default SchoolHeadLayout;