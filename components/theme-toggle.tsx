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
      className="relative w-12 h-6 rounded-full p-0 
                 bg-white dark:bg-gray-700 
                 border border-gray-200 dark:border-gray-600
                 transition-all duration-300 
                 hover:shadow-md hover:scale-105"
    >
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full 
                    flex items-center justify-center 
                    bg-gray-100 dark:bg-gray-500 
                    transition-all duration-300 transform 
                    ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
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
