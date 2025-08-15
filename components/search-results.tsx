"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { restaurantsData } from "@/data/restaurants"

interface MenuItemWithRestaurant {
  id: string
  name: string
  price: number
  veg: boolean
  customizable: boolean
  image: string
  restaurantId: string
  restaurantName: string
  restaurantImage: string
  rating?: number
  ratingCount?: number
  bestseller?: boolean
}

const filters = [
  { id: "veg", label: "Veg", type: "dietary" },
  { id: "non-veg", label: "Non-Veg", type: "dietary" },
  { id: "bestseller", label: "Bestseller", type: "tag" },
  { id: "customizable", label: "Customizable", type: "tag" },
  { id: "under-200", label: "Under ₹200", type: "price" },
  { id: "250-plus", label: "₹250+", type: "price" },
]

export default function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"dishes" | "restaurants">("dishes")
  const { dispatch } = useCart()

  const allMenuItems: MenuItemWithRestaurant[] = useMemo(() => {
    return restaurantsData.flatMap((restaurant) =>
      restaurant.menu.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        veg: item.veg,
        customizable: item.customizable || false,
        image: item.image || restaurant.image,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantImage: restaurant.image,
        rating: item.rating,
        ratingCount: item.ratingCount,
        bestseller: item.bestseller,
      }))
    )
  }, [])

  const filteredResults = useMemo(() => {
    let items = allMenuItems

    if (searchQuery) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    activeFilters.forEach((filter) => {
      switch (filter) {
        case "veg":
          items = items.filter((item) => item.veg)
          break
        case "non-veg":
          items = items.filter((item) => !item.veg)
          break
        case "bestseller":
          items = items.filter((item) => item.bestseller)
          break
        case "customizable":
          items = items.filter((item) => item.customizable)
          break
        case "under-200":
          items = items.filter((item) => item.price < 200)
          break
        case "250-plus":
          items = items.filter((item) => item.price >= 250)
          break
      }
    })

    return items
  }, [searchQuery, activeFilters, allMenuItems])

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery) return []
    const uniqueNames = Array.from(
      new Set(
        allMenuItems
          .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((item) => item.name)
      )
    )
    return uniqueNames.slice(0, 5)
  }, [searchQuery, allMenuItems])

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    )
  }

  const addToCart = (item: MenuItemWithRestaurant) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="sm" className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1 relative">
          <Input
            placeholder="Search for dishes or restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-teal-400 dark:focus:ring-teal-400"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {/* Autocomplete */}
          {autocompleteSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 z-10 shadow-md">
              {autocompleteSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <Badge
          variant={activeTab === "restaurants" ? "default" : "outline"}
          className="px-4 py-2 cursor-pointer"
          onClick={() => setActiveTab("restaurants")}
        >
          Restaurants
        </Badge>
        <Badge
          variant={activeTab === "dishes" ? "default" : "outline"}
          className="px-4 py-2 cursor-pointer"
          onClick={() => setActiveTab("dishes")}
        >
          Dishes
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {filters.map((filter) => (
          <Badge
            key={filter.id}
            variant="outline"
            className={`px-3 py-2 cursor-pointer transition ${
              activeFilters.includes(filter.id)
                ? "bg-teal-500 text-white border-teal-500"
                : "hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 dark:hover:bg-gray-700 dark:hover:text-teal-400"
            }`}
            onClick={() => toggleFilter(filter.id)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResults.map((item) => (
          <Card
            key={`${item.restaurantId}-${item.id}`}
            className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-lg dark:bg-gray-800 dark:text-white"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  By {item.restaurantName}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-green-500" />
                    <span>{item.rating || 4.0}</span>
                  </div>
                  <span>
                    • {restaurantsData.find((r) => r.id === item.restaurantId)?.deliveryTime || "25-30 MINS"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-4 h-4 border-2 flex items-center justify-center ${
                      item.veg ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">₹{item.price}</p>
                <Button onClick={() => addToCart(item)} className="bg-teal-500 hover:bg-teal-600 text-white px-8">
                  ADD
                </Button>
                {item.customizable && <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">Customisable</p>}
              </div>
              <div className="ml-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
