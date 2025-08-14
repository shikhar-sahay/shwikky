"use client"

import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Restaurant {
  id: string
  name: string
  rating: number
  ratingCount: string
  deliveryTime: string
  costForTwo: number
  cuisine: string[]
  address: string
  image: string
  menu?: any[]
}

interface RestaurantCardProps {
  restaurant: Restaurant
  index?: number
}

export default function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border-0 shadow-lg bg-card dark:bg-card text-card-foreground animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
      >
        <div className="relative overflow-hidden group">
          <img
            src={restaurant.image || "/placeholder.svg?height=200&width=300&query=restaurant food"}
            alt={restaurant.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
            <span className="text-xs font-semibold text-gray-900">{restaurant.deliveryTime}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 font-poppins">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Available for delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-xl text-foreground dark:text-foreground mb-3 font-poppins group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
            {restaurant.name}
          </h3>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1 hover-scale">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-sm hover-glow">
                <Star className="w-3 h-3 text-white fill-current" />
              </div>
              <span className="text-sm font-semibold font-poppins text-foreground">{restaurant.rating}</span>
              <span className="text-xs text-muted-foreground">({restaurant.ratingCount})</span>
            </div>
            <span className="text-sm text-muted-foreground font-poppins">• {restaurant.deliveryTime}</span>
          </div>

          <p className="text-sm text-muted-foreground mb-2 font-poppins">
            {Array.isArray(restaurant.cuisine) ? restaurant.cuisine.join(", ") : restaurant.cuisine}
          </p>
          <p className="text-sm text-muted-foreground font-poppins">{restaurant.address}</p>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">₹{restaurant.costForTwo} for two</span>
            {restaurant.menu && restaurant.menu.length > 0 && (
              <Badge className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors duration-200 micro-bounce">
                {restaurant.menu.length} items
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}
