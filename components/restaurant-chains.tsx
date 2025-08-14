"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLocation } from "@/contexts/location-context"
import { restaurantsData } from "@/data/restaurants"

export default function RestaurantChains() {
  const { selectedCity } = useLocation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4
  const topRestaurants = restaurantsData.filter((restaurant) => restaurant.city === selectedCity)
  const maxIndex = Math.ceil(topRestaurants.length / itemsPerPage) - 1
  const visibleRestaurants = topRestaurants.slice(currentIndex, currentIndex + itemsPerPage)

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

  const nextSlide = () => {
    if (currentIndex < maxIndex * itemsPerPage) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  return (
    <section className="py-12 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground font-poppins animate-fade-in-up">
            Top restaurant chains in {selectedCity}
          </h2>
          <div className="flex space-x-2 animate-slide-in-right">
            <Button
              variant="outline"
              size="sm"
              className="p-2 bg-card hover:bg-accent border-border hover:border-teal-300 text-foreground transition-all duration-200 hover-lift disabled:opacity-50"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-2 bg-card hover:bg-accent border-border hover:border-teal-300 text-foreground transition-all duration-200 hover-lift disabled:opacity-50"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex * itemsPerPage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleRestaurants.map((restaurant, index) => (
            <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
              <Card
                className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border-0 shadow-xl bg-card text-card-foreground animate-fade-in-up stagger-${index + 1}`}
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
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3 font-poppins group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-200">
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
                    <span className="text-xs text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900 px-2 py-1 rounded-full">
                      Free delivery
                    </span>
                    <span className="text-xs text-muted-foreground">{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(topRestaurants.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? "bg-teal-500 w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
