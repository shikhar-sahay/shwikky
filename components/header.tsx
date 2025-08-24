"use client"

import { ShoppingCart, User, Menu } from "lucide-react"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center group ml-2">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-lg transition-all duration-300 transform hover:animate-breathe">
                  <Image
                    src="/logo.png"
                    alt="Shwikky Logo"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>
              <div className="md:hidden">
                <LocationDropdown className="text-gray-700 hover:text-[#25c2af] dark:text-gray-300 dark:hover:text-[#25c2af] transition-colors duration-200" />
              </div>
              <div className="hidden md:block">
                <LocationDropdown className="text-gray-700 hover:text-[#25c2af] dark:text-gray-300 dark:hover:text-[#25c2af] transition-colors duration-200" />
              </div>
            </div>
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <SearchDropdown />
            </div>
            <div className="flex items-center space-x-3 mr-2">
              <div className="hidden md:flex items-center space-x-3">
                <ThemeToggle />
                <HeaderDropdown
                  onOffersClick={() => setIsOffersOpen(true)}
                  onHelpClick={() => setIsHelpOpen(true)}
                />
                <Button
                  variant="ghost"
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#25c2af] dark:text-gray-300 dark:hover:text-[#25c2af] transition-colors duration-200"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">Sign In</span>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#25c2af] dark:text-gray-300 dark:hover:text-[#25c2af] relative transition-colors duration-200"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden sm:block">Cart</span>
                  {isLoaded && state.itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#25c2af] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </div>
              <div className="md:hidden flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="p-2"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </Button>
                <Button
                  variant="ghost"
                  className="p-2 relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  {isLoaded && state.itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-[#25c2af] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="md:hidden mt-2 pb-2">
            <SearchDropdown />
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-lg p-6 flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" onClick={() => setIsAuthOpen(true)} className="justify-start">
              <User className="w-5 h-5 mr-2" /> Sign In
            </Button>
            <Button variant="ghost" onClick={() => setIsOffersOpen(true)} className="justify-start">
              Offers
            </Button>
            <Button variant="ghost" onClick={() => setIsHelpOpen(true)} className="justify-start">
              Help
            </Button>
            <ThemeToggle />
          </div>
        </div>
      )}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <OffersModal isOpen={isOffersOpen} onClose={() => setIsOffersOpen(false)} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}
