"use client"

import { Button } from "@/components/ui/button"
import { useConfirm } from "@/hooks/use-confirm"
import { PlusCircleIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const HandleCurrentPrincipalLink = () => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure you want to add a new principal?",
        "Warning: by doing so, the current principal will be replaced with the new one.",
    )
    const router = useRouter()
    const handleCurrentPrincipalLink = async () => {
        const ok = await confirm()

        if (!ok) return

        router.push("/sysadmin-principal/handle-principal")
    }

    return (
        <>
            <ConfirmDialog />

            <Button
                className="text-white h-7 gap-1 w-full p-2"
                size="sm"
                onClick={handleCurrentPrincipalLink}
            >
                <PlusCircleIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add New Principal
                </span>
            </Button>
        </>
    )
}