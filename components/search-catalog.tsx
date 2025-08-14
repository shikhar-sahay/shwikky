"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Filter, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface SearchResultItem {
  id: string
  name: string
  description: string
  price: number
  veg: boolean
  image: string
  restaurantId: string
  restaurantName: string
  restaurantRating: number
  restaurantTime: string // Placeholder
  rating: number
  ratingCount: number
  customizable: boolean
  bestseller: boolean
}

interface SearchResultRestaurant {
  id: string
  name: string
  rating: number
  time: string // Placeholder
  items: SearchResultItem[]
}

interface SearchCatalogData {
  title: string
  description: string
  restaurants: SearchResultRestaurant[]
}

const filters = [
  { id: "veg", label: "Veg", type: "dietary" },
  { id: "non-veg", label: "Non-Veg", type: "dietary" },
  { id: "bestseller", label: "Bestseller", type: "tag" },
  { id: "customizable", label: "Customizable", type: "tag" },
  { id: "under-200", label: "Under ₹200", type: "price" },
  { id: "200-400", label: "₹200-₹400", type: "price" },
]

const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "rating", label: "Rating" },
  { id: "price-low-high", label: "Price: Low to High" },
  { id: "price-high-low", label: "Price: High to Low" },
]

export default function SearchCatalog() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [catalogData, setCatalogData] = useState<SearchCatalogData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { dispatch } = useCart()

  useEffect(() => {
    async function fetchCatalogData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=dish`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Group items by restaurant
        const restaurantsMap = new Map<string, SearchResultRestaurant>()
        data.results.forEach((item: any) => {
          if (item.type === "dish") {
            if (!restaurantsMap.has(item.restaurantId)) {
              restaurantsMap.set(item.restaurantId, {
                id: item.restaurantId,
                name: item.restaurant,
                rating: item.restaurantRating || 0,
                time: "25-30 mins", // Placeholder
                items: [],
              })
            }
            restaurantsMap.get(item.restaurantId)?.items.push({
              id: item.id,
              name: item.name,
              description: item.description || "No description available.",
              price: item.price,
              veg: item.veg,
              image: item.image,
              restaurantId: item.restaurantId,
              restaurantName: item.restaurant,
              restaurantRating: item.restaurantRating || 0,
              restaurantTime: "25-30 mins", // Placeholder
              rating: item.rating || 0,
              ratingCount: item.ratingCount || 0,
              customizable: item.customizable || false,
              bestseller: item.bestseller || false,
            })
          }
        })

        setCatalogData({
          title: `Search results for "${query}"`,
          description: `Found ${data.results.length} items matching your search`,
          restaurants: Array.from(restaurantsMap.values()),
        })
      } catch (e: any) {
        setError(e.message)
        console.error("Failed to fetch search catalog data:", e)
      } finally {
        setLoading(false)
      }
    }
    if (query) {
      fetchCatalogData()
    } else {
      setLoading(false)
      setCatalogData(null)
    }
  }, [query])

  const addToCart = (item: SearchResultItem) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        restaurantId: item.restaurantId,
        restaurantName: item.restaurantName,
        name: item.name,
        price: item.price,
        image: item.image,
        veg: item.veg,
      },
    })
  }

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((f) => f !== filterId)
      : [...activeFilters, filterId]
    setActiveFilters(newFilters)
  }

  const getFilteredAndSortedItems = () => {
    if (!catalogData) return []

    let allItems: SearchResultItem[] = []
    catalogData.restaurants.forEach((restaurant) => {
      allItems = allItems.concat(restaurant.items)
    })

    let filtered = [...allItems]

    activeFilters.forEach((filter) => {
      const filterOption = filters.find((opt) => opt.id === filter)
      if (!filterOption) return

      switch (filterOption.type) {
        case "dietary":
          if (filter === "veg") filtered = filtered.filter((item) => item.veg)
          if (filter === "non-veg") filtered = filtered.filter((item) => !item.veg)
          break
        case "tag":
          if (filter === "bestseller") filtered = filtered.filter((item) => item.bestseller)
          if (filter === "customizable") filtered = filtered.filter((item) => item.customizable)
          break
        case "price":
          if (filter === "under-200") filtered = filtered.filter((item) => item.price < 200)
          if (filter === "200-400") filtered = filtered.filter((item) => item.price >= 200 && item.price <= 400)
          break
      }
    })

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        // Keep original order for relevance
        break
    }
    return filtered
  }

  const displayedItems = getFilteredAndSortedItems()

  if (loading) return <div className="text-center py-12">Loading search results...</div>
  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-500 font-bold">
        Error loading search results: {error}. Please check your Supabase connection and data.
      </div>
    )
  if (!catalogData || displayedItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No results found</h1>
          <p className="text-gray-600 mb-6">We couldn't find anything for "{query}"</p>
          <Link href="/">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">{catalogData.title}</h1>
          <p className="text-gray-600 mt-1">{catalogData.description}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          variant="outline"
          className="flex items-center space-x-2 bg-white hover:bg-teal-50 hover:border-teal-300"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 bg-white hover:bg-teal-50 hover:border-teal-300"
          >
            <span>Sort By: {sortOptions.find((opt) => opt.id === sortBy)?.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
          </Button>

          {showSortDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortBy(option.id)
                    setShowSortDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                    sortBy === option.id ? "bg-teal-50 text-teal-700" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {filters.map((filter) => (
          <Badge
            key={filter.id}
            variant="outline"
            onClick={() => toggleFilter(filter.id)}
            className={`px-4 py-2 cursor-pointer transition-all duration-200 ${
              activeFilters.includes(filter.id)
                ? "bg-teal-500 text-white border-teal-500"
                : "hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedItems.map((item: any) => (
            <Card key={item.id} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className={`w-4 h-4 border-2 flex items-center justify-center ${
                        item.veg ? "border-green-500" : "border-red-500"
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                    </div>
                    {item.bestseller && <Badge className="bg-red-100 text-red-600 text-xs">🏆 Bestseller</Badge>}
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2 font-poppins">{item.name}</h3>

                  {item.restaurantName && <p className="text-sm text-gray-500 mb-2">From {item.restaurantName}</p>}

                  <p className="text-xl font-bold text-gray-900 mb-2">₹{item.price}</p>

                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-4 h-4 fill-current text-green-500" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-sm text-gray-500">({item.ratingCount})</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                  <div className="flex items-center space-x-4">
                    <Button onClick={() => addToCart(item)} className="bg-teal-500 hover:bg-teal-600 text-white px-6">
                      ADD
                    </Button>
                    {item.customizable && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Customizable</span>
                    )}
                  </div>
                </div>

                <div className="ml-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-xl shadow-md"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
