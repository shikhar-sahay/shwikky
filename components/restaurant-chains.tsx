"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import RestaurantCard from "@/components/restaurant-card"
import { restaurantsData } from "@/data/restaurants"

export default function RestaurantChains() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  // Take first 12 restaurants as top chains
  const topRestaurants = restaurantsData.slice(0, 12)
  const maxIndex = Math.ceil(topRestaurants.length / itemsPerPage) - 1
  const visibleRestaurants = topRestaurants.slice(currentIndex, currentIndex + itemsPerPage)

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - itemsPerPage)
  }

  const nextSlide = () => {
    if (currentIndex < maxIndex * itemsPerPage) setCurrentIndex(currentIndex + itemsPerPage)
  }

  return (
    <section className="py-12 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black dark:text-[#25c2af] mb-8 font-poppins animate-fade-in-up">
            Top restaurant chains
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
            <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
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
