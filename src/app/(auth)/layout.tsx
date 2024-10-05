import { Metadata } from "next";
import "@/lib/globals.css";

export const metadata: Metadata = {
    title: "ERMS-Authentication",
    description: "Authentication Page",
}

const AuthLayout = ({
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

export default AuthLayout;