import { Metadata } from "next";
import "@/lib/globals.css";
import { SystemAdminSidenav } from "./_components/system-admin-sidenav";
import { SystemAdminNavbar } from "./_components/system-admin-navbar";

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
            <body className="bg-[#f0f8f3] relative">
                <div className="fixed top-0 right-0 w-[80%] ml-auto z-50">
                    <SystemAdminNavbar />
                </div>
                <SystemAdminSidenav />

                <div className="absolute right-0 top-[80px] w-[80%] z-0">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default SystemAdminLayout;