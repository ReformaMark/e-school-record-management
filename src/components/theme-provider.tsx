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
    const [mounted, setMounted] = useState(false)
    const [textColor, setTextColor] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('textColor') || '#000000'
        }
        return '#000000'
    })
    const [navigationColor, setNavigationColor] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('navigationColor') || '#1e293b'
        }
        return '#1e293b'
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    const updateTextColor = (color: string) => {
        setTextColor(color)
        localStorage.setItem('textColor', color)
    }

    const updateNavigationColor = (color: string) => {
        setNavigationColor(color)
        localStorage.setItem('navigationColor', color)
    }

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

    useEffect(() => {
        if (!mounted) return

        // Apply styles
        document.documentElement.style.setProperty('--theme-text', textColor)
        document.documentElement.style.setProperty('--theme-navigation', navigationColor)
        document.documentElement.style.setProperty('--nav-background', navigationColor)
        document.documentElement.style.setProperty('--foreground', textColor)

        // Update navigation-specific variables
        const navBrightness = getBrightness(navigationColor)
        const isNavDark = navBrightness < 128

        document.documentElement.style.setProperty('--nav-foreground', isNavDark ? '#ffffff' : '#000000')
        document.documentElement.style.setProperty(
            '--nav-border',
            isNavDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        )
        document.documentElement.style.setProperty(
            '--nav-muted',
            isNavDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
        )
        document.documentElement.style.setProperty(
            '--nav-muted-foreground',
            isNavDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'
        )
    }, [textColor, navigationColor, mounted])

    return (
        <ThemeContext.Provider
            value={{
                textColor,
                setTextColor: updateTextColor,
                navigationColor,
                setNavigationColor: updateNavigationColor,
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

