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
  const { dispatch, state: { items: cartItems } } = useCart()

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
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-6 bg-card rounded-t-xl cursor-pointer hover:bg-card/90 transition-colors border border-border"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-2xl font-bold font-poppins text-foreground">
          {section.category} ({section.itemCount})
        </h3>
        <div className="p-2 rounded-full hover:bg-popover transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-foreground" />
          )}
        </div>
      </div>

      {/* Section Items */}
      {isExpanded && (
        <div className="bg-card rounded-b-xl shadow-xl border-x border-b border-border">
          {section.items.map((item, index) => {
            const cartItem = cartItems.find((i) => i.id === item.id)
            const quantity = cartItem?.quantity || 0

            return (
              <div
                key={item.id}
                className={`p-6 hover:bg-card/90 transition-colors ${
                  index !== section.items.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Veg / Bestseller */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-5 h-5 border-2 flex items-center justify-center ${
                          item.veg ? "border-green-400" : "border-red-400"
                        }`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.veg ? "bg-green-400" : "bg-red-400"
                          }`}
                        />
                      </div>
                      {item.bestseller && (
                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1">
                          🏆 Bestseller
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-bold text-xl mb-3 font-poppins text-foreground">{item.name}</h4>

                    <p className="text-2xl font-bold mb-3 text-yellow-400">₹{item.price}</p>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-green-400" />
                        <span className="text-sm font-medium text-foreground">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.ratingCount})</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{item.description}</p>

                    <div className="flex items-center space-x-4">
                      {quantity === 0 ? (
                        <Button
                          onClick={() => addToCart(item)}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          ADD
                        </Button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                            className="bg-popover hover:bg-popover/90 px-3 py-1 rounded-lg"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="px-3 py-1 font-semibold bg-card rounded-lg transition-transform animate-pulse">
                            {quantity}
                          </span>
                          <Button
                            onClick={() => addToCart(item)}
                            className="bg-popover hover:bg-popover/90 px-3 py-1 rounded-lg"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {item.customizable && (
                        <span className="text-xs text-muted-foreground bg-popover px-3 py-1 rounded-full">
                          Customisable
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Item Image */}
                  <div className="ml-6">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-36 h-36 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
