"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useConvexAuth } from "convex/react"
import { useCheckRole } from "@/features/current/api/use-check-role"

export function SystemAdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
    const { data: role, isLoading: isRoleLoading } = useCheckRole()

    useEffect(() => {
        if (!isAuthLoading && !isRoleLoading) {
            if (!isAuthenticated) {
                router.push("/")
                return
            }

            // Based on schema.ts roles: "admin", "teacher", "school-head", "staff"
            if (role !== "admin") {
                // Redirect non-admin users to appropriate routes
                switch (role) {
                    case "teacher":
                        router.push("/teacher")
                        break
                    case "school-head":
                        router.push("/school-head")
                        break
                    case "staff":
                        router.push("/staff")
                        break
                    default:
                        router.push("/auth")
                }
                return
            }
        }
    }, [isAuthenticated, isAuthLoading, isRoleLoading, role, router])

    // Show nothing while checking authentication and role
    if (isAuthLoading || isRoleLoading) {
        return null
    }

    // Only render children if authenticated and system admin
    if (isAuthenticated && role === "admin") {
        return <>{children}</>
    }

    return null
}
