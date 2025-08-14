"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useLocation } from "@/contexts/location-context"

type LocationDropdownProps = {
  className?: string
}

const locations = [
  { city: "Vellore", state: "Tamil Nadu", popular: true },
  { city: "Chennai", state: "Tamil Nadu", popular: true },
  { city: "Bangalore", state: "Karnataka", popular: true },
  { city: "Mumbai", state: "Maharashtra", popular: true },
  { city: "Delhi", state: "Delhi", popular: true },
  { city: "Hyderabad", state: "Telangana", popular: true },
  { city: "Pune", state: "Maharashtra", popular: false },
  { city: "Kolkata", state: "West Bengal", popular: false },
  { city: "Ahmedabad", state: "Gujarat", popular: false },
  { city: "Jaipur", state: "Rajasthan", popular: false },
]

export default function LocationDropdown({ className }: LocationDropdownProps) {
  const { selectedCity, setSelectedCity } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(locations)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = locations.filter(
        (location) =>
          location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.state.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(locations)
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLocationSelect = (city: string) => {
    setSelectedCity(city)
    setIsOpen(false)
    setSearchQuery("")
  }

  const popularLocations = filteredLocations.filter((loc) => loc.popular)
  const otherLocations = filteredLocations.filter((loc) => !loc.popular)

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 transition-colors duration-200 ${
          className ?? "text-gray-700 hover:text-[#25c2af] dark:text-gray-300 dark:hover:text-[#25c2af]"
        }`}
      >
        <MapPin className="w-4 h-4" />
        <span className="font-medium font-poppins">{selectedCity}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-2xl border-0 rounded-xl z-50 max-h-96 overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <Input
                placeholder="Search for area, street name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:border-teal-500 focus:ring-teal-200"
              />
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {searchQuery.trim() === "" && (
              <>
                {/* Popular Cities */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Popular Cities</h3>
                  <div className="space-y-2">
                    {popularLocations.map((location) => (
                      <button
                        key={location.city}
                        onClick={() => handleLocationSelect(location.city)}
                        className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-3"
                      >
                        <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{location.city}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{location.state}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Other Cities */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Other Cities</h3>
                  <div className="space-y-2">
                    {otherLocations.map((location) => (
                      <button
                        key={location.city}
                        onClick={() => handleLocationSelect(location.city)}
                        className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-3"
                      >
                        <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{location.city}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{location.state}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Search results */}
            {searchQuery.trim() && (
              <div className="p-4">
                <div className="space-y-2">
                  {filteredLocations.map((location) => (
                    <button
                      key={location.city}
                      onClick={() => handleLocationSelect(location.city)}
                      className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center space-x-3"
                    >
                      <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{location.city}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{location.state}</p>
                      </div>
                    </button>
                  ))}

                  {filteredLocations.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>No locations found for "{searchQuery}"</p>
                      <p className="text-sm mt-1">Try searching for a different city</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
