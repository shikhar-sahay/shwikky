"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import RestaurantChains from "@/components/restaurant-chains"
import RestaurantList from "@/components/restaurant-list"
import SplashScreen from "@/components/splash-screen"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 relative">
      {showSplash && <SplashScreen />}
      <Header />
      <main>
        <RestaurantChains />
        <RestaurantList />
      </main>
    </div>
  )
}
