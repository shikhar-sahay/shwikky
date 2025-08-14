"use client"
import { ChevronDown, Tag, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderDropdownProps {
  onOffersClick: () => void
  onHelpClick: () => void
}

export default function HeaderDropdown({ onOffersClick, onHelpClick }: HeaderDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-all duration-200 group"
        >
          <span>More</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 animate-in slide-in-from-top-2 duration-200">
        <DropdownMenuItem onClick={onOffersClick} className="flex items-center space-x-2 cursor-pointer">
          <Tag className="w-4 h-4 text-yellow-600" />
          <span>Offers</span>
          <Badge className="bg-yellow-400 text-yellow-900 text-xs ml-auto animate-pulse">NEW</Badge>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onHelpClick} className="flex items-center space-x-2 cursor-pointer">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          <span>Help</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
