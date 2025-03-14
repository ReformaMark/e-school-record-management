"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { useQuery } from "convex/react"
import { Loader2, Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "../../../../../convex/_generated/api"

export function SchoolSettingsForm() {
    const [schoolName, setSchoolName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [logoStorageId, setLogoStorageId] = useState<string | undefined>("")
    // const [logoFile, setLogoFile] = useState<File | null>(null)
    // const [logoPreview, setLogoPreview] = useState<string | null>(null)

    // Fetch current school settings
    // const updateSchoolSettings = useAction(api.school.updateSchoolSettings)
    const generateUploadUrl = useConvexMutation(api.files.generateUploadUrl)
    const { mutate: updateSchoolSettings, isPending } = useMutation({
        mutationFn: useConvexMutation(api.systemSettings.create),
    })

    const logoUrl = useQuery(api.files.getStorageUrl,
        logoStorageId ? { storageId: logoStorageId } : "skip"
    )

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB")
            return
        }

        setIsLoading(true)
        try {
            const postUrl = await generateUploadUrl()

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            })

            const { storageId } = await result.json()
            setLogoStorageId(storageId)
            toast.success("Logo uploaded successfully")
        } catch (error) {
            toast.error("Failed to upload logo")
            console.error("Upload error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await updateSchoolSettings({
                schoolImage: logoStorageId,
                schoolName,
            })
            toast.success("School settings updated successfully")
        } catch (error) {
            toast.error("Failed to update school settings")
            console.error("Error updating school settings:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>School Information</CardTitle>
                    <CardDescription>
                        Update your school's name and logo. These will be displayed throughout the application.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="school-name">School Name</Label>
                        <Input
                            id="school-name"
                            placeholder="Enter school name"
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="school-logo">School Logo</Label>
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border bg-muted">
                                {logoUrl ? (
                                    <Image
                                        src={logoUrl}
                                        alt="School logo preview"
                                        fill
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <div className="text-center text-sm text-muted-foreground">
                                        No logo selected
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="relative">
                                    <Input id="school-logo" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => document.getElementById("school-logo")?.click()}
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Logo
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Recommended: Circle image, at least 64x64px. PNG or JPG format.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        disabled={isLoading || isPending}
                        className="ml-auto"
                    >
                        {(isLoading || isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

