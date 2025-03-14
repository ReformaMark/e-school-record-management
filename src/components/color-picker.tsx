"use client"

import type React from "react"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Paintbrush } from "lucide-react"

type ColorPickerProps = {
    color: string
    onChange: (color: string) => void
    label: string
    side?: "top" | "right" | "bottom" | "left"
}

export function ColorPicker({ color, onChange, label, side = "left" }: ColorPickerProps) {
    const [customColor, setCustomColor] = useState(color)

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomColor(e.target.value)
    }

    const applyCustomColor = () => {
        onChange(customColor)
    }

    // Simplified color palette to reduce overflow issues
    const colorGroups = [
        ["#000000", "#1e293b", "#334155", "#475569", "#64748b"], // Dark Grays
        ["#0c4a6e", "#0369a1", "#0284c7", "#0ea5e9", "#38bdf8"], // Blues
        ["#701a75", "#86198f", "#a21caf", "#c026d3", "#d946ef"], // Purples
        ["#166534", "#15803d", "#16a34a", "#22c55e", "#4ade80"], // Greens
        ["#BD3B1B", "#FCDCA4", "#D3E6A5", "#D3D0D0", "#fb7185"], // Reds
    ]

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 border-border focus:ring-primary focus-visible:ring-primary"
                >
                    <Paintbrush className="h-3.5 w-3.5" />
                    <span>Change</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-3 border-border bg-white" side={side} align="center" sideOffset={10}>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <div>
                        <h4 className="text-xs font-medium mb-1.5">{label}</h4>
                        <div className="grid gap-1.5">
                            {colorGroups.map((group, groupIndex) => (
                                <div key={groupIndex} className="flex gap-1.5">
                                    {group.map((colorOption) => (
                                        <button
                                            key={colorOption}
                                            className="h-5 w-5 rounded-md border cursor-pointer ring-offset-background transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                            style={{ backgroundColor: colorOption }}
                                            onClick={() => onChange(colorOption)}
                                            title={colorOption}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <h4 className="text-xs font-medium">Custom Color</h4>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="color"
                                    value={customColor}
                                    onChange={handleColorChange}
                                    className="h-7 w-7 cursor-pointer appearance-none rounded-md border bg-transparent p-0"
                                />
                                <input
                                    type="text"
                                    value={customColor}
                                    onChange={(e) => setCustomColor(e.target.value)}
                                    className="h-7 flex-1 rounded-md border px-1.5 text-xs bg-white"
                                    maxLength={7}
                                />
                            </div>
                            <Button size="sm" onClick={applyCustomColor} className="w-full h-6 text-xs py-0">
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

