"use client"

import { useState, useEffect } from "react"
import { Filter, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RestaurantCard from "@/components/restaurant-card"
import { useLocation } from "@/contexts/location-context"
import { restaurantsData, type Restaurant } from "@/data/restaurants"

const filterOptions = [
  { id: "fast-delivery", label: "Fast Delivery", type: "delivery" },
  { id: "new-on-shwikky", label: "New on Shwikky", type: "new" },
  { id: "ratings-4+", label: "Ratings 4.0+", type: "rating" },
  { id: "pure-veg", label: "Pure Veg", type: "veg" },
  { id: "offers", label: "Offers", type: "offers" },
  { id: "300-600", label: "Rs. 300-Rs. 600", type: "price" },
  { id: "under-300", label: "Less than Rs. 300", type: "price" },
]

const sortOptions = [
  { id: "relevance", label: "Relevance" },
  { id: "delivery-time", label: "Delivery Time" },
  { id: "rating", label: "Rating" },
  { id: "cost-low-high", label: "Cost: Low to High" },
  { id: "cost-high-low", label: "Cost: High to Low" },
]

// IDs of top restaurants that appear in the top section
const topRestaurantIds = ["burger-king", "dominos", "kfc"] // update this with all top restaurant IDs

export default function RestaurantList() {
  const { selectedCity } = useLocation()
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurantsData)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    applyFilters(activeFilters, sortBy)
  }, [activeFilters, sortBy])

  const applyFilters = async (filters: string[], currentSortBy: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filtered = [...restaurantsData]

    try {
      filters.forEach((filter) => {
        const filterOption = filterOptions.find((opt) => opt.id === filter)
        if (!filterOption) return

        switch (filterOption.type) {
          case "delivery":
            if (filter === "fast-delivery") {
              filtered = filtered.filter((restaurant) => {
                const deliveryTime = restaurant.deliveryTime.split("-")[0]
                return Number.parseInt(deliveryTime) <= 25
              })
            }
            break
          case "new":
            filtered = filtered.filter(
              (restaurant) =>
                restaurant.id === "taco-bell" ||
                restaurant.id === "thai-express" ||
                restaurant.id === "japanese-kitchen",
            )
            break
          case "rating":
            filtered = filtered.filter((restaurant) => restaurant.rating >= 4.0)
            break
          case "veg":
            filtered = filtered.filter((restaurant) =>
              restaurant.menu?.some((item) => item.veg),
            )
            break
          case "price":
            if (filter === "under-300") {
              filtered = filtered.filter((restaurant) => restaurant.costForTwo < 300)
            } else if (filter === "300-600") {
              filtered = filtered.filter(
                (restaurant) => restaurant.costForTwo >= 300 && restaurant.costForTwo <= 600,
              )
            }
            break
          case "offers":
            filtered = filtered.filter((restaurant) => restaurant.rating >= 4.2)
            break
        }
      })

      switch (currentSortBy) {
        case "delivery-time":
          filtered.sort((a, b) => {
            const timeA = Number.parseInt(a.deliveryTime.split("-")[0])
            const timeB = Number.parseInt(b.deliveryTime.split("-")[0])
            return timeA - timeB
          })
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "cost-low-high":
          filtered.sort((a, b) => a.costForTwo - b.costForTwo)
          break
        case "cost-high-low":
          filtered.sort((a, b) => b.costForTwo - a.costForTwo)
          break
        default:
          break
      }

      // Move top restaurants to the end
      const topRestaurants: Restaurant[] = []
      filtered = filtered.filter((restaurant) => {
        if (topRestaurantIds.includes(restaurant.id)) {
          topRestaurants.push(restaurant)
          return false
        }
        return true
      })
      filtered = [...filtered, ...topRestaurants]

    } catch (error) {
      console.error("Error applying filters:", error)
      filtered = restaurantsData
    }

    setFilteredRestaurants(filtered)
    setIsLoading(false)
  }

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((f) => f !== filterId)
      : [...activeFilters, filterId]

    setActiveFilters(newFilters)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    setShowSortDropdown(false)
  }

  return (
    <section className="py-8 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-black dark:text-[#25c2af] mb-8 font-poppins animate-fade-in-up">
          Restaurants with online food delivery in {selectedCity}
        </h2>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-in-right">
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-card hover:bg-accent hover:border-teal-300 dark:hover:border-green-400 border-border text-foreground transition-all duration-200 font-poppins hover-lift"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>

          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 bg-card hover:bg-accent hover:border-teal-300 dark:hover:border-green-400 border-border text-foreground transition-all duration-200 font-poppins hover-lift"
            >
              <span>Sort By: {sortOptions.find((opt) => opt.id === sortBy)?.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${showSortDropdown ? "rotate-180" : ""}`}
              />
            </Button>

            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl z-50 animate-scale-in">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={`w-full text-left px-4 py-2 hover:bg-accent text-foreground transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                      sortBy === option.id ? "bg-teal-50 dark:bg-green-900 text-teal-700 dark:text-green-300" : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filterOptions.map((filter, index) => (
            <Badge
              key={filter.id}
              variant="outline"
              onClick={() => toggleFilter(filter.id)}
              className={`px-4 py-2 cursor-pointer transition-all duration-300 font-poppins filter-bounce animate-fade-in-up ${
                activeFilters.includes(filter.id)
                  ? "bg-teal-500 dark:bg-green-600 text-white border-teal-500 dark:border-green-600 shadow-lg animate-pulse-glow"
                  : "hover:bg-teal-50 dark:hover:bg-green-900 hover:border-teal-300 dark:hover:border-green-400 hover:text-teal-700 dark:hover:text-green-300 border-border text-muted-foreground"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {filter.label}
            </Badge>
          ))}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center space-x-2 mb-6 animate-slide-in-left">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filterId) => {
              const filter = filterOptions.find((opt) => opt.id === filterId)
              return (
                <Badge
                  key={filterId}
                  className="bg-teal-100 dark:bg-green-900 text-teal-700 dark:text-green-300 cursor-pointer hover:bg-teal-200 dark:hover:bg-green-800 transition-all duration-200 flex items-center space-x-1 animate-scale-in"
                  onClick={() => toggleFilter(filterId)}
                >
                  <span>{filter?.label}</span>
                  <X className="w-3 h-3" />
                </Badge>
              )
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilters([])}
              className="text-teal-600 dark:text-green-400 hover:text-teal-700 dark:hover:text-green-300 transition-colors duration-200 hover-scale"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Restaurants Count */}
        <div className="mb-6">
          <p className="text-muted-foreground animate-fade-in-up">
            {isLoading ? (
              <span className="loading-pulse">Loading restaurants...</span>
            ) : (
              `Showing ${filteredRestaurants.length} of ${restaurantsData.length} restaurants`
            )}
          </p>
        </div>

        {/* Restaurant Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-lg"></div>
                <div className="p-5 bg-card rounded-b-lg">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
            ))}
          </div>
        )}

        {/* No Restaurants Found */}
        {!isLoading && filteredRestaurants.length === 0 && (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="text-6xl mb-4 animate-bounce-gentle">🍽️</div>
            <h3 className="text-xl font-bold text-foreground mb-2">No restaurants found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
            <Button
              onClick={() => setActiveFilters([])}
              className="bg-teal-500 dark:bg-green-600 hover:bg-teal-600 dark:hover:bg-green-700 text-white transition-all duration-200 hover-lift animate-pulse-glow"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
