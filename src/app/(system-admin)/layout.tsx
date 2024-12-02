import { Metadata } from "next";
import "@/lib/globals.css";
import { SystemAdminSidenav } from "./_components/system-admin-sidenav";
import { SystemAdminNavbar } from "./_components/system-admin-navbar";
import { Toaster } from "@/components/ui/sonner";
import { ConvexClientProvider } from "../components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

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
        <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
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
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
    )
}

export default SystemAdminLayout;