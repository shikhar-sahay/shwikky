"use client"

import { useState } from "react"
import { X, Copy, Check, Percent, Gift, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const offers = [
  {
    id: 1,
    code: "WELCOME50",
    title: "Welcome Offer",
    description: "Get 50% off on your first order",
    discount: "50% OFF",
    minOrder: 199,
    maxDiscount: 100,
    validTill: "31 Dec 2024",
    type: "percentage",
    icon: Gift,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    code: "FLAT75",
    title: "Flat Discount",
    description: "Flat ₹75 off on orders above ₹299",
    discount: "₹75 OFF",
    minOrder: 299,
    maxDiscount: 75,
    validTill: "15 Jan 2025",
    type: "flat",
    icon: Percent,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    code: "FASTFOOD",
    title: "Fast Food Special",
    description: "30% off on Burger King, KFC orders",
    discount: "30% OFF",
    minOrder: 149,
    maxDiscount: 150,
    validTill: "28 Dec 2024",
    type: "percentage",
    icon: Zap,
    color: "bg-red-100 text-red-600",
  },
  {
    id: 4,
    code: "PIZZA20",
    title: "Pizza Lover",
    description: "20% off on all pizza orders",
    discount: "20% OFF",
    minOrder: 199,
    maxDiscount: 200,
    validTill: "31 Dec 2024",
    type: "percentage",
    icon: Percent,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 5,
    code: "DESSERT15",
    title: "Sweet Treats",
    description: "15% off on desserts and ice cream",
    discount: "15% OFF",
    minOrder: 99,
    maxDiscount: 50,
    validTill: "31 Jan 2025",
    type: "percentage",
    icon: Gift,
    color: "bg-pink-100 text-pink-600",
  },
]

interface OffersModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OffersModal({ isOpen, onClose }: OffersModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <div>
              <h2 className="text-2xl font-bold font-poppins">Available Offers</h2>
              <p className="text-teal-100 mt-1">Save more on your orders</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Offers List */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            <div className="space-y-4">
              {offers.map((offer) => {
                const IconComponent = offer.icon
                return (
                  <Card key={offer.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${offer.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-900 font-poppins">{offer.title}</h3>
                            <Badge className="bg-green-100 text-green-700 text-xs">{offer.discount}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{offer.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>Min order: ₹{offer.minOrder}</span>
                            <span>Max discount: ₹{offer.maxDiscount}</span>
                            <span>Valid till: {offer.validTill}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Button
                          onClick={() => copyCode(offer.code)}
                          variant="outline"
                          className="flex items-center space-x-2 border-2 border-dashed border-teal-300 hover:bg-teal-50"
                        >
                          {copiedCode === offer.code ? (
                            <>
                              <Check className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-mono font-bold">COPIED</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span className="font-mono font-bold">{offer.code}</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              Terms and conditions apply. Offers cannot be combined with other promotions.
            </p>
          </div>
        </Card>
      </div>
    </>
  )
}
