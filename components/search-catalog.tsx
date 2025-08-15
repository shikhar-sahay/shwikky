"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Filter, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { restaurantsData, MenuItem } from "@/data/restaurants"

interface SearchResultItem extends MenuItem {
  restaurantId: string
  restaurantName: string
  restaurantRating: number
  restaurantTime: string
}

interface SearchResultRestaurant {
  id: string
  name: string
  rating: number
  time: string
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
  const { dispatch } = useCart()

  useEffect(() => {
    if (!query) {
      setCatalogData(null)
      return
    }

    const matchedItems: SearchResultItem[] = []

    restaurantsData.forEach((restaurant) => {
      restaurant.menu.forEach((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          matchedItems.push({
            ...item,
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantRating: restaurant.rating,
            restaurantTime: restaurant.deliveryTime,
          })
        }
      })
    })

    const restaurantsMap = new Map<string, SearchResultRestaurant>()
    matchedItems.forEach((item) => {
      if (!restaurantsMap.has(item.restaurantId)) {
        restaurantsMap.set(item.restaurantId, {
          id: item.restaurantId,
          name: item.restaurantName,
          rating: item.restaurantRating,
          time: item.restaurantTime,
          items: [],
        })
      }
      restaurantsMap.get(item.restaurantId)!.items.push(item)
    })

    setCatalogData({
      title: `Search results for "${query}"`,
      description: `Found ${matchedItems.length} items matching your search`,
      restaurants: Array.from(restaurantsMap.values()),
    })
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
    setActiveFilters((prev) =>
      prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]
    )
  }

  const getFilteredAndSortedItems = () => {
    if (!catalogData) return []

    let allItems: SearchResultItem[] = []
    catalogData.restaurants.forEach((restaurant) => {
      allItems = allItems.concat(restaurant.items)
    })

    let filtered = [...allItems]

    activeFilters.forEach((filter) => {
      const option = filters.find((f) => f.id === filter)
      if (!option) return

      switch (option.type) {
        case "dietary":
          filtered = filter === "veg" ? filtered.filter((i) => i.veg) : filtered.filter((i) => !i.veg)
          break
        case "tag":
          filtered = filter === "bestseller" ? filtered.filter((i) => i.bestseller) : filtered.filter((i) => i.customizable)
          break
        case "price":
          if (filter === "under-200") filtered = filtered.filter((i) => i.price < 200)
          if (filter === "200-400") filtered = filtered.filter((i) => i.price >= 200 && i.price <= 400)
          break
      }
    })

    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price)
        break
    }

    return filtered
  }

  const displayedItems = getFilteredAndSortedItems()

  if (!query)
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-300">
        Enter a search query to see results.
      </div>
    )

  if (!catalogData || displayedItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold mb-4">No results found</h1>
          <p className="mb-6">We couldn't find anything for "{query}"</p>
          <Link href="/">
            <Button className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-poppins">{catalogData.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{catalogData.description}</p>
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          variant="outline"
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span>Sort By: {sortOptions.find((o) => o.id === sortBy)?.label}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
            />
          </Button>

          {showSortDropdown && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSortBy(option.id)
                    setShowSortDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    sortBy === option.id
                      ? "bg-teal-50 dark:bg-teal-800 text-teal-700 dark:text-teal-200"
                      : "text-gray-900 dark:text-gray-100"
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
                : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:border-gray-700 hover:text-teal-700 dark:text-gray-100"
            }`}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedItems.map((item) => (
          <Card
            key={item.id}
            className="p-6 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-4 h-4 border-2 flex items-center justify-center ${
                      item.veg ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`}
                    />
                  </div>
                  {item.bestseller && (
                    <Badge className="bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-200 text-xs">
                      🏆 Bestseller
                    </Badge>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-2 font-poppins">{item.name}</h3>
                {item.restaurantName && (
                  <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
                    From {item.restaurantName}
                  </p>
                )}
                <p className="text-xl font-bold mb-2 dark:text-gray-100">₹{item.price}</p>

                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-4 h-4 fill-current text-green-500" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({item.ratingCount})</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{item.description}</p>

                <div className="flex items-center space-x-4">
                  <Button
                    className="bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white px-6"
                    onClick={() => addToCart(item)}
                  >
                    ADD
                  </Button>
                  {item.customizable && (
                    <span className="text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      Customizable
                    </span>
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
  )
}
