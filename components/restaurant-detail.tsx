"use client"

import { useState, useEffect } from "react"
import { Star, Clock, MapPin, ChevronLeft, ChevronRight, Search, Percent, ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import MenuSection from "@/components/menu-section"
import Link from "next/link"
import { restaurantsData } from "@/data/restaurants"
import type { RestaurantData } from "@/types/restaurant"
import { useCart } from "@/contexts/cart-context"

interface RestaurantDetailProps {
  restaurantId: string
}

export default function RestaurantDetail({ restaurantId }: RestaurantDetailProps) {
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { dispatch, cartItems } = useCart()

  useEffect(() => {
    setLoading(true)

    const localRestaurant = restaurantsData.find((r) => r.id === restaurantId)

    if (!localRestaurant) {
      setError("Restaurant not found")
      setLoading(false)
      return
    }

    const formattedRestaurant: RestaurantData = {
      id: localRestaurant.id,
      name: localRestaurant.name,
      rating: localRestaurant.rating,
      totalRatings: localRestaurant.ratingCount,
      priceForTwo: `₹${localRestaurant.costForTwo} for two`,
      cuisine: localRestaurant.cuisine.join(", "),
      outlet: localRestaurant.address,
      deliveryTime: localRestaurant.deliveryTime,
      image: localRestaurant.image,
      deals: [
        {
          id: 1,
          title: "Welcome Offer",
          subtitle: "GET 50% OFF",
          icon: "%",
          color: "bg-green-700 text-green-200",
        },
        {
          id: 2,
          title: "Flat ₹75 Off",
          subtitle: "USE FLAT75",
          icon: "🏷️",
          color: "bg-orange-700 text-orange-200",
        },
      ],
      topPicks: localRestaurant.menu.slice(0, 2).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        veg: item.veg,
      })),
      menu: [
        {
          category: "Menu",
          itemCount: localRestaurant.menu.length,
          items: localRestaurant.menu.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            rating: item.rating || 4.0,
            ratingCount: item.ratingCount || 100,
            image: item.image,
            veg: item.veg,
            customizable: item.customizable || false,
            bestseller: item.bestseller || false,
          })),
        },
      ],
    }

    setRestaurant(formattedRestaurant)
    setLoading(false)
  }, [restaurantId])

  const addToCart = (item: { id: string; name: string; price: number; image: string; veg: boolean }) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        restaurantId: restaurant!.id,
        restaurantName: restaurant!.name,
        name: item.name,
        price: item.price,
        image: item.image,
        veg: item.veg,
      },
    })
  }

  const removeFromCart = (itemId: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id: itemId },
    })
  }

  if (loading) return <div className="text-center py-12 text-gray-100">Loading restaurant details...</div>

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-red-500 font-bold mb-4">Error loading restaurant details: {error}</p>
          <Link href="/">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Back to Home</Button>
          </Link>
        </div>
      </div>
    )

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
          <Link href="/">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white">Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-300 hover:text-teal-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to restaurants</span>
        </Link>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
          <span>Home</span>
          <span>/</span>
          <span>{restaurant.outlet}</span>
          <span>/</span>
          <span className="text-gray-100 font-medium">{restaurant.name}</span>
        </nav>

        {/* Restaurant Header */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-xl mb-8 animate-fade-in-up border border-gray-700">
          <div className="flex items-start space-x-6 mb-6">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-24 h-24 object-cover rounded-xl shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 font-poppins text-gray-100">{restaurant.name}</h1>
              <p className="text-teal-400 font-medium text-lg">{restaurant.cuisine}</p>
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-current" />
                </div>
                <span className="font-semibold text-lg">{restaurant.rating}</span>
                <span className="text-gray-400">({restaurant.totalRatings} ratings)</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="font-semibold text-lg text-teal-400">{restaurant.priceForTwo}</span>
            </div>

            <div className="flex items-center space-x-6 text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Outlet</span>
                <span className="font-medium text-gray-100">{restaurant.outlet}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-gray-100">{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-poppins text-gray-100">Deals for you</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-200">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-200">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {restaurant.deals.map((deal) => (
              <Card
                key={deal.id}
                className={`min-w-[280px] p-6 border-2 border-dashed border-orange-700 bg-gradient-to-r from-orange-800 to-yellow-800 hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${deal.color} shadow-sm`}>
                    {deal.icon === "%" ? <Percent className="w-6 h-6" /> : <span className="text-xl">{deal.icon}</span>}
                  </div>
                  <div>
                    <h3 className="font-bold font-poppins text-gray-100">{deal.title}</h3>
                    <p className="text-sm text-gray-300">{deal.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Picks Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-poppins text-gray-100">Top Picks</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-200">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2 bg-gray-700 hover:bg-gray-600 text-gray-200">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-4">
            {restaurant.topPicks.map((item) => {
              const quantity = cartItems?.[item.id]?.quantity || 0

              return (
                <Card
                  key={item.id}
                  className="min-w-[350px] bg-gradient-to-br from-teal-900 via-gray-800 to-gray-700 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <div
                            className={`w-4 h-4 border-2 flex items-center justify-center ${
                              item.veg ? "border-green-400" : "border-red-400"
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-400" : "bg-red-400"}`} />
                          </div>
                        </div>

                        <h3 className="font-bold text-xl mb-3 font-poppins">{item.name}</h3>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{item.description}</p>
                        <p className="text-2xl font-bold mb-4 text-yellow-400">₹{item.price}</p>

                        {quantity === 0 ? (
                          <Button
                            onClick={() => addToCart(item)}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-2 rounded-lg transition-all transform hover:scale-105"
                          >
                            ADD
                          </Button>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-3 py-1 font-semibold bg-gray-800 rounded-lg transition-transform animate-pulse">
                              {quantity}
                            </span>
                            <Button
                              onClick={() => addToCart(item)}
                              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-28 h-28 object-cover rounded-xl ml-4 shadow-lg"
                      />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Menu Search */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-4 text-gray-400 mb-6">
            <div className="h-px bg-gray-600 w-20"></div>
            <span className="font-medium font-poppins tracking-wider">M E N U</span>
            <div className="h-px bg-gray-600 w-20"></div>
          </div>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for dishes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2 border-gray-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 rounded-xl font-poppins bg-gray-800 text-gray-100 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        {restaurant.menu.map((section) => (
          <MenuSection
            key={section.category}
            section={section}
            restaurantId={restaurant.id}
            restaurantName={restaurant.name}
          />
        ))}
      </div>
    </div>
  )
}
