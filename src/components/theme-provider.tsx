"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = {
    textColor: string
    setTextColor: (color: string) => void
    navigationColor: string
    setNavigationColor: (color: string) => void
}

const ThemeContext = createContext<Theme | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [textColor, setTextColor] = useState("#000000")
    const [navigationColor, setNavigationColor] = useState("#1e293b") // Default slate-800

    // Load saved theme from localStorage on initial render
    useEffect(() => {
        const savedTextColor = localStorage.getItem("textColor")
        if (savedTextColor) {
            setTextColor(savedTextColor)
        }

        const savedNavigationColor = localStorage.getItem("navigationColor")
        if (savedNavigationColor) {
            setNavigationColor(savedNavigationColor)
        }
    }, [])

    // Save theme changes to localStorage and apply them
    useEffect(() => {
        // Save to localStorage
        localStorage.setItem("textColor", textColor)
        localStorage.setItem("navigationColor", navigationColor)

        // Apply styles
        document.body.style.color = textColor

        // Set CSS variables
        document.documentElement.style.setProperty("--theme-text", textColor)
        document.documentElement.style.setProperty("--theme-navigation", navigationColor)
        document.documentElement.style.setProperty("--foreground", textColor)

        // Update navigation-specific variables
        const navBrightness = getBrightness(navigationColor)
        const isNavDark = navBrightness < 128

        // Set navigation colors
        document.documentElement.style.setProperty("--nav-background", navigationColor)
        document.documentElement.style.setProperty("--nav-foreground", isNavDark ? "#ffffff" : "#000000")
        document.documentElement.style.setProperty(
            "--nav-border",
            isNavDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        )
        document.documentElement.style.setProperty(
            "--nav-muted",
            isNavDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        )
        document.documentElement.style.setProperty(
            "--nav-muted-foreground",
            isNavDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)",
        )
    }, [textColor, navigationColor])

    return (
        <ThemeContext.Provider
            value={{
                textColor,
                setTextColor,
                navigationColor,
                setNavigationColor,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

// Helper function to determine brightness of a color
function getBrightness(hexColor: string) {
    // Remove # if present
    hexColor = hexColor.replace("#", "")

    // Convert to RGB
    const r = Number.parseInt(hexColor.substr(0, 2), 16)
    const g = Number.parseInt(hexColor.substr(2, 2), 16)
    const b = Number.parseInt(hexColor.substr(4, 2), 16)

    // Calculate brightness (perceived luminance)
    return (r * 299 + g * 587 + b * 114) / 1000
}

