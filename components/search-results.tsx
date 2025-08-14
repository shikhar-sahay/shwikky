"use client"

import { ArrowLeft, X, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const searchResults = [
  {
    id: 1,
    restaurant: "Burger King",
    rating: 4.4,
    time: "25-30 MINS",
    item: "Crispy Chicken Burger",
    price: "₹99",
    image: "/images/chicken-burger.png",
    customizable: true,
    veg: false,
  },
  {
    id: 2,
    restaurant: "Domino's Pizza",
    rating: 4.3,
    time: "25-30 MINS",
    item: "Burger Pizza - Premium Veg",
    price: "₹155",
    image: "/images/pizza-slice.png",
    customizable: false,
    veg: true,
  },
  {
    id: 3,
    restaurant: "Domino's Pizza",
    rating: 4.3,
    time: "25-30 MINS",
    item: "Margherita Pizza",
    price: "₹129",
    image: "/images/dominos-pizza.png",
    customizable: true,
    veg: true,
  },
  {
    id: 4,
    restaurant: "Crispy delight",
    rating: 3.8,
    time: "40-50 MINS",
    item: "Chicken Burger Combo",
    price: "₹199",
    image: "/images/burger-king.png",
    customizable: false,
    veg: false,
  },
]

const filters = ["Fast Delivery", "Veg", "Non-Veg", "Rated 4+", "Rs 100-Rs 250", "Rs 250+"]

export default function SearchResults() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="sm" className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>

        <div className="flex-1 relative">
          <Input defaultValue="burger" className="pr-10 border-gray-300 focus:border-teal-500 focus:ring-teal-500" />
          <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Tabs */}
      <div className="flex space-x-4 mb-6">
        <Badge variant="outline" className="px-4 py-2 cursor-pointer">
          Restaurants
        </Badge>
        <Badge className="px-4 py-2 bg-gray-900 text-white cursor-pointer">Dishes</Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <span>Sort by</span>
        </Button>

        {filters.map((filter) => (
          <Badge
            key={filter}
            variant="outline"
            className="px-3 py-2 cursor-pointer hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700"
          >
            {filter}
          </Badge>
        ))}
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {searchResults.map((result) => (
          <Card
            key={result.id}
            className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up border-0 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">By {result.restaurant}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-green-500" />
                    <span>{result.rating}</span>
                  </div>
                  <span>• {result.time}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-4 h-4 border-2 flex items-center justify-center ${
                      result.veg ? "border-green-500" : "border-red-500"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${result.veg ? "bg-green-500" : "bg-red-500"}`} />
                  </div>
                  <h4 className="font-medium text-gray-900">{result.item}</h4>
                </div>

                <p className="text-lg font-bold text-gray-900 mb-2">{result.price}</p>

                <Button variant="ghost" className="text-gray-600 text-sm p-0 h-auto mb-4">
                  More Details →
                </Button>

                <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8">ADD</Button>

                {result.customizable && <p className="text-xs text-gray-500 mt-2">Customisable</p>}
              </div>

              <div className="ml-4">
                <img
                  src={result.image || "/placeholder.svg"}
                  alt={result.item}
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
