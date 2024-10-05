import { Metadata } from "next";
import "@/lib/globals.css";

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
            <body>
                {children}
            </body>
        </html>
    )
}

export default SystemAdminLayout;