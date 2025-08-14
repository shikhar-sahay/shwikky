"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  // next-themes requires this to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full p-0 border transition-all duration-300 hover:shadow-md hover:scale-105
        ${isDark 
          ? "bg-gray-700 border-gray-600" 
          : "bg-white border-gray-200"}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 transform
          ${isDark 
            ? "translate-x-6 bg-gray-500" 
            : "translate-x-0 bg-gray-100"}`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-gray-200" />
        ) : (
          <Sun className="w-3 h-3 text-gray-800" />
        )}
      </div>
    </Button>
  )
}
