import { Toaster } from "@/components/ui/sonner";
import "@/lib/globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Metadata } from "next";
import { ConvexClientProvider } from "../components/convex-client-provider";
import { SystemAdminNavbar } from "./_components/system-admin-navbar";
import { SystemAdminSidenav } from "./_components/system-admin-sidenav";
import { SystemAdminGuard } from "@/components/guards/admin-guard";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeWidget } from "@/components/theme-widget";

export const metadata: Metadata = {
    title: "ERMS-admin",
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
                        <SystemAdminGuard>
                            <ThemeProvider>
                                <Toaster richColors />

                                <SystemAdminNavbar />

                                <SystemAdminSidenav />

                                <div className="w-full md:absolute md:right-0 md:top-[80px] md:w-[80%] z-0 pb-4 pt-[96px] md:pt-4">
                                    {children}
                                    <ThemeWidget />
                                </div>
                            </ThemeProvider>
                        </SystemAdminGuard>
                    </body>
                </html>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
    )
}

export default SystemAdminLayout;