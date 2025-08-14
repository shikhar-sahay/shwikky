"use client"

import { ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useLocation } from "@/contexts/location-context"
import { useState } from "react"
import CartSidebar from "@/components/cart-sidebar"
import SearchDropdown from "@/components/search-dropdown"
import LocationDropdown from "@/components/location-dropdown"
import OffersModal from "@/components/offers-modal"
import HelpModal from "@/components/help-modal"
import AuthModal from "@/components/auth-modal"
import HeaderDropdown from "@/components/header-dropdown"
import ThemeToggle from "@/components/theme-toggle"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const { state, isLoaded } = useCart()
  const { selectedCity } = useLocation()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOffersOpen, setIsOffersOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo and Location */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center group ml-2">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-[2deg]">
                  <Image
                    src="/logo.png"
                    alt="Shwikky Logo"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="hidden md:block">
                <LocationDropdown />
              </div>
            </div>

            <div className="flex-1 max-w-md mx-6">
              <SearchDropdown />
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-3 mr-2">
              <ThemeToggle />

              <HeaderDropdown
                onOffersClick={() => setIsOffersOpen(true)}
                onHelpClick={() => setIsHelpOpen(true)}
              />

              <Button
                variant="ghost"
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-green-400 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:block">Sign In</span>
              </Button>

              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 dark:text-gray-300 dark:hover:text-green-400 relative transition-colors duration-200"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:block">Cart</span>
                {isLoaded && state.itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-teal-500 dark:bg-green-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                    {state.itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}
