import { Metadata } from "next";
import "@/lib/globals.css";
import { SystemAdminSidenav } from "./_components/system-admin-sidenav";
import { SystemAdminNavbar } from "./_components/system-admin-navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: "System Admin",
    description: "System Admin Page",
};

const SystemAdminLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <html className="h-full" lang="en">
            <body className="bg-background relative">
                <Toaster />

                <SystemAdminNavbar />

                <SystemAdminSidenav />

                <div className="w-full md:absolute md:right-0 md:top-[80px] md:w-[80%] z-0 pb-4 pt-[96px] md:pt-4">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default SystemAdminLayout;