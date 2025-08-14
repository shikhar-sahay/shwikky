"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/contexts/theme-context"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`relative w-12 h-6 rounded-full p-0 border transition-all duration-300 hover:shadow-md hover:scale-105
        ${theme === "dark" 
          ? "bg-gray-700 border-gray-600" 
          : "bg-white border-gray-200"}`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 transform
          ${theme === "dark" 
            ? "translate-x-6 bg-gray-500" 
            : "translate-x-0 bg-gray-100"}`}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 text-gray-200" />
        ) : (
          <Sun className="w-3 h-3 text-gray-800" />
        )}
      </div>
    </Button>
  )
}
