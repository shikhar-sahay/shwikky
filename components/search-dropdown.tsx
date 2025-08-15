"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Search, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { restaurantsData } from "@/data/restaurants"

const recentSearchesKey = "recentSearches"
const trendingSearches = ["Whopper", "Margherita", "Sundae", "Zinger"]

interface SearchDropdownProps {
  onSearch?: (query: string) => void
}

export default function SearchDropdown({ onSearch }: SearchDropdownProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Prevent SSR/client mismatch
  useEffect(() => setMounted(true), [])

  // Load recent searches from localStorage (client only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem(recentSearchesKey) || "[]")
      setRecentSearches(stored)
    }
  }, [])

  // Prepare search suggestions
  const searchSuggestions = useMemo(() => {
    const restaurants = restaurantsData.map(r => ({
      type: "restaurant" as const,
      id: r.id,
      name: r.name,
      cuisine: r.cuisine,
    }))

    const dishes = restaurantsData.flatMap(r =>
      r.menu.map(item => ({
        type: "dish" as const,
        id: item.id,
        name: item.name,
        restaurant: r.name,
        category: item.category,
      }))
    )

    const categories = Array.from(
      new Set(restaurantsData.flatMap(r => r.menu.map(item => item.category)))
    ).map(cat => ({
      type: "category" as const,
      name: cat,
      description: `All ${cat} items`,
      category: cat,
    }))

    return [...restaurants, ...dishes, ...categories]
  }, [])

  // Filter suggestions safely
  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return searchSuggestions
    const q = query.toLowerCase()
    return searchSuggestions.filter(item => {
      if (item.type === "restaurant")
        return (item.name || "").toLowerCase().includes(q) || String(item.cuisine || "").toLowerCase().includes(q)
      if (item.type === "dish")
        return (item.name || "").toLowerCase().includes(q) || String(item.restaurant || "").toLowerCase().includes(q)
      if (item.type === "category")
        return (item.name || "").toLowerCase().includes(q) || String(item.description || "").toLowerCase().includes(q)
      return false
    })
  }, [query, searchSuggestions])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle clicking a suggestion
  const handleItemClick = (item: any) => {
    setQuery(item.name)
    setIsOpen(false)
    onSearch?.(item.name)

    // Update recent searches safely
    const updatedRecent = [item.name, ...recentSearches.filter(s => s !== item.name)].slice(0, 5)
    if (typeof window !== "undefined") {
      localStorage.setItem(recentSearchesKey, JSON.stringify(updatedRecent))
    }
    setRecentSearches(updatedRecent)

    if (item.type === "restaurant") router.push(`/restaurant/${item.id}`)
    else router.push(`/search?q=${encodeURIComponent(item.category || item.name)}`)
  }

  // Quick search from buttons
  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm)
    setIsOpen(false)
    onSearch?.(searchTerm)

    const restaurant = searchSuggestions.find(
      s => s.type === "restaurant" && String(s.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (restaurant) router.push(`/restaurant/${restaurant.id}`)
    else router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) handleQuickSearch(query.trim())
  }

  if (!mounted) return null

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search for restaurants and food"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyPress={handleKeyPress}
          className="pl-10 h-11 border rounded-lg focus:border-teal-500 focus:ring-1 focus:ring-teal-200"
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-2xl border rounded-xl z-50 max-h-[600px] overflow-y-auto
                   bg-white dark:bg-[#1A1823] text-gray-900 dark:text-gray-200">
          <div className="p-6">
            {!query.trim() && (
              <>
                {/* Recent Searches */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-4 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />Recent Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(search => (
                      <button
                        key={search}
                        onClick={() => handleQuickSearch(search)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-full text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />Trending
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map(search => (
                      <button
                        key={search}
                        onClick={() => handleQuickSearch(search)}
                        className="px-4 py-2 bg-teal-100 dark:bg-teal-800 text-teal-700 dark:text-teal-200 rounded-full text-sm"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Suggestions */}
            <div className="space-y-1">
              {filteredSuggestions.slice(0, 8).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-700 rounded-xl flex items-center justify-center text-lg">
                    {item.type === "restaurant" && "🏪"}
                    {item.type === "dish" && "🍽️"}
                    {item.type === "category" && "📂"}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                      {item.type === "restaurant" && item.cuisine}
                      {item.type === "dish" && `Available at ${item.restaurant}`}
                      {item.type === "category" && item.description}
                    </p>
                  </div>
                  {item.type === "restaurant" && <div className="text-xs text-teal-600 dark:text-teal-200 bg-teal-50 dark:bg-teal-800 px-3 py-1.5 rounded-full">Restaurant</div>}
                  {item.type === "category" && <div className="text-xs text-blue-600 dark:text-blue-200 bg-blue-50 dark:bg-blue-800 px-3 py-1.5 rounded-full">Category</div>}
                </button>
              ))}
            </div>

            {/* Empty state */}
            {query.trim() && filteredSuggestions.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <p className="text-lg">No results found for "{query}"</p>
                <p className="text-sm mt-2">Try searching for restaurants or dishes</p>
                <button
                  onClick={() => handleQuickSearch(query)}
                  className="mt-6 px-6 py-3 bg-teal-500 dark:bg-teal-700 text-white rounded-xl hover:bg-teal-600 dark:hover:bg-teal-600 transition"
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
