"use client"

import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  // checkout redirect
  const handleCheckout = () => {
    window.location.href = "https://dscv.it/vibecoding-blog"
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold font-poppins text-gray-900 dark:text-gray-100">
            Your Cart
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600 dark:text-gray-300">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 font-poppins">Your cart is empty</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                Add some delicious items to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 font-poppins">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.restaurantName}
                      </p>
                      <p className="text-lg font-bold text-teal-600 mt-1">₹{item.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 dark:text-gray-200"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-semibold w-8 text-center text-gray-900 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 border-gray-300 dark:border-gray-600 dark:text-gray-200"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <div className="flex items-center justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
              <span>Total:</span>
              <span className="text-teal-600">₹{state.total}</span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white h-12 text-lg font-semibold"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
