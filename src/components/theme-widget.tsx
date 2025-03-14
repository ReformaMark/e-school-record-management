"use client"

import { ColorPicker } from "@/components/color-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"

export function ThemeWidget() {
    const [isOpen, setIsOpen] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { textColor, setTextColor, navigationColor, setNavigationColor } = useTheme()

    return (
        <div className="fixed bottom-4 left-4 sm:left-auto sm:right-4 z-50">
            {isOpen ? (
                <Card className="w-[280px] absolute bottom-full mb-2 left-0 sm:left-auto sm:right-0 border-border bg-white">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Theme Settings</CardTitle>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 focus:ring-primary focus-visible:ring-primary"
                            >
                                <span className="sr-only">Close</span>
                                <span aria-hidden="true">×</span>
                            </Button>
                        </div>
                        <CardDescription>Customize your application theme</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="space-y-6">
                            {/* <div>
                                <h3 className="text-sm font-medium mb-2">Text Color</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2 mr-2">
                                        <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: textColor }} />
                                        <span className="text-xs text-muted-foreground">Current</span>
                                    </div>
                                    <div className="ml-auto">
                                        <ColorPicker color={textColor} onChange={setTextColor} label="Text Colors" side="left" />
                                    </div>
                                </div>
                            </div> */}

                            <div>
                                <h3 className="text-sm font-medium mb-2">Navigation Color</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2 mr-2">
                                        <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: navigationColor }} />
                                        <span className="text-xs text-muted-foreground">Current</span>
                                    </div>
                                    <div className="ml-auto">
                                        <ColorPicker
                                            color={navigationColor}
                                            onChange={setNavigationColor}
                                            label="Navigation Colors"
                                            side="left"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Button size="icon" onClick={() => setIsOpen(true)} className="h-12 w-12 rounded-full shadow-lg">
                    <Settings className="h-6 w-6" />
                    <span className="sr-only">Open theme settings</span>
                </Button>
            )}
        </div>
    )
}

