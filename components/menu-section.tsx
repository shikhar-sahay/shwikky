"use client"

import { useState } from "react"
import { Star, ChevronUp, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  rating: number
  ratingCount: number
  image: string
  veg: boolean
  customizable: boolean
  bestseller: boolean
}

interface MenuSectionProps {
  section: {
    category: string
    itemCount: number
    items: MenuItem[]
  }
  restaurantId: string
  restaurantName: string
}

export default function MenuSection({ section, restaurantId, restaurantName }: MenuSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { dispatch } = useCart()

  const addToCart = (item: MenuItem) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        restaurantId,
        restaurantName,
        name: item.name,
        price: item.price,
        image: item.image,
        veg: item.veg,
      },
    })
  }

  return (
    <div className="mb-8">
      <div
        className="flex items-center justify-between p-6 bg-white rounded-t-xl cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-2xl font-bold text-gray-900 font-poppins">
          {section.category} ({section.itemCount})
        </h3>
        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {isExpanded && (
        <div className="bg-white rounded-b-xl shadow-xl border-x border-b border-gray-100">
          {section.items.map((item, index) => (
            <div
              key={item.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                index !== section.items.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-5 h-5 border-2 flex items-center justify-center ${
                        item.veg ? "border-green-500" : "border-red-500"
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${item.veg ? "bg-green-500" : "bg-red-500"}`} />
                    </div>
                    {item.bestseller && (
                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1">
                        🏆 Bestseller
                      </Badge>
                    )}
                  </div>

                  <h4 className="font-bold text-xl text-gray-900 mb-3 font-poppins">{item.name}</h4>

                  <p className="text-2xl font-bold text-gray-900 mb-3">₹{item.price}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current text-green-500" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-gray-500">({item.ratingCount})</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{item.description}</p>

                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-2 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      ADD
                    </Button>
                    {item.customizable && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Customisable</span>
                    )}
                  </div>
                </div>

                <div className="ml-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-36 h-36 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
