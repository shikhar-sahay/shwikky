"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

const searchSuggestions = [
  { type: "restaurant", name: "Burger King", cuisine: "Burgers, American", id: "burger-king" },
  { type: "restaurant", name: "Domino's Pizza", cuisine: "Pizzas, Italian", id: "dominos" },
  { type: "restaurant", name: "KFC", cuisine: "Chicken, Fast Food", id: "kfc" },
  { type: "restaurant", name: "Madno", cuisine: "Ice Cream, Desserts", id: "madno" },
  { type: "restaurant", name: "Subway", cuisine: "Sandwiches, Healthy", id: "subway" },
  { type: "restaurant", name: "Pizza Hut", cuisine: "Pizzas, Italian", id: "pizza-hut" },
  { type: "restaurant", name: "McDonald's", cuisine: "Burgers, Fast Food", id: "mcdonalds" },
  { type: "restaurant", name: "Baskin Robbins", cuisine: "Ice Cream, Desserts", id: "baskin-robbins" },
  { type: "dish", name: "Whopper Burger", restaurant: "Burger King", category: "burgers" },
  { type: "dish", name: "Margherita Pizza", restaurant: "Domino's", category: "pizza" },
  { type: "dish", name: "Chicken Zinger", restaurant: "KFC", category: "chicken" },
  { type: "dish", name: "Chocolate Sundae", restaurant: "Madno", category: "desserts" },
  { type: "dish", name: "French Fries", restaurant: "Multiple", category: "sides" },
  { type: "dish", name: "Pepperoni Pizza", restaurant: "Domino's", category: "pizza" },
  { type: "dish", name: "Big Mac", restaurant: "McDonald's", category: "burgers" },
  { type: "dish", name: "Italian BMT", restaurant: "Subway", category: "sandwiches" },
  { type: "category", name: "Burgers", description: "All burger restaurants", category: "burgers" },
  { type: "category", name: "Pizza", description: "All pizza restaurants", category: "pizza" },
  { type: "category", name: "Ice Cream", description: "All dessert places", category: "desserts" },
  { type: "category", name: "Chicken", description: "All chicken restaurants", category: "chicken" },
  { type: "category", name: "Sandwiches", description: "All sandwich places", category: "sandwiches" },
]

const recentSearches = ["Burger", "Pizza", "Ice Cream", "Chicken"]
const trendingSearches = ["Whopper", "Margherita", "Sundae", "Zinger"]

interface SearchDropdownProps {
  onSearch?: (query: string) => void
}

export default function SearchDropdown({ onSearch }: SearchDropdownProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState(searchSuggestions)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchSuggestions.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          (item.type === "restaurant" && item.cuisine?.toLowerCase().includes(query.toLowerCase())) ||
          (item.type === "dish" && item.restaurant?.toLowerCase().includes(query.toLowerCase())) ||
          (item.type === "category" && item.description?.toLowerCase().includes(query.toLowerCase())) ||
          (item.category && item.category.toLowerCase().includes(query.toLowerCase())),
      )
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions(searchSuggestions)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleItemClick = (item: any) => {
    setQuery(item.name)
    setIsOpen(false)
    onSearch?.(item.name)

    // Save to recent searches
    const recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]")
    const updatedRecent = [item.name, ...recentSearches.filter((s: string) => s !== item.name)].slice(0, 5)
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent))

    // Navigate based on item type
    if (item.type === "restaurant") {
      router.push(`/restaurant/${item.id}`)
    } else if (item.type === "dish" || item.type === "category") {
      router.push(`/search?q=${encodeURIComponent(item.category || item.name)}`)
    }
  }

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm)
    setIsOpen(false)
    onSearch?.(searchTerm)

    // Check if it's a restaurant name
    const restaurant = searchSuggestions.find(
      (item) => item.type === "restaurant" && item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (restaurant) {
      router.push(`/restaurant/${restaurant.id}`)
    } else {
      // Treat as category/dish search
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      handleQuickSearch(query.trim())
    }
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4 group-focus-within:text-teal-500 transition-colors duration-200" />
        <Input
          placeholder="Search for restaurants and food"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          className="pl-10 h-11 border border-gray-200 dark:border-gray-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-200 rounded-lg transition-all duration-200 font-poppins text-sm bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-sm"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 rounded-xl z-[9999] max-h-[600px] overflow-y-auto transform-gpu animate-scale-in">
          <div className="p-6">
            {query.trim() === "" && (
              <>
                {/* Recent Searches */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center font-poppins">
                    <Clock className="w-4 h-4 mr-2" />
                    Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleQuickSearch(search)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-sm transition-all duration-200 font-poppins hover-scale"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending Searches */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center font-poppins">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((search) => (
                      <button
                        key={search}
                        onClick={() => handleQuickSearch(search)}
                        className="px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 dark:bg-teal-800 dark:hover:bg-teal-700 dark:text-teal-200 rounded-full text-sm transition-all duration-200 font-poppins hover-scale"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Search Results */}
            <div className="space-y-1">
              {filteredSuggestions.slice(0, 8).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 flex items-center space-x-4 hover-lift"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-700 rounded-xl flex items-center justify-center text-lg shadow-sm">
                    {item.type === "restaurant" && "🏪"}
                    {item.type === "dish" && "🍽️"}
                    {item.type === "category" && "📂"}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-base font-poppins">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-poppins">
                      {item.type === "restaurant" && item.cuisine}
                      {item.type === "dish" && `Available at ${item.restaurant}`}
                      {item.type === "category" && item.description}
                    </p>
                  </div>
                  {item.type === "restaurant" && (
                    <div className="text-xs text-teal-600 bg-teal-50 dark:bg-teal-900 dark:text-teal-300 px-3 py-1.5 rounded-full font-medium font-poppins">
                      Restaurant
                    </div>
                  )}
                  {item.type === "category" && (
                    <div className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300 px-3 py-1.5 rounded-full font-medium font-poppins">
                      Category
                    </div>
                  )}
                </button>
              ))}
            </div>

            {query.trim() && filteredSuggestions.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg font-poppins">No results found for "{query}"</p>
                <p className="text-sm mt-2 font-poppins">Try searching for restaurants or dishes</p>
                <button
                  onClick={() => handleQuickSearch(query)}
                  className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all duration-200 hover-lift font-poppins font-medium"
                >
                  Search for "{query}"
                </button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
