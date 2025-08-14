"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface LocationContextType {
  selectedCity: string
  setSelectedCity: (city: string) => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [selectedCity, setSelectedCity] = useState("Vellore")

  // Load saved city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem("shwikky-selected-city")
    if (savedCity) {
      setSelectedCity(savedCity)
    }
  }, [])

  // Save city to localStorage when it changes
  const handleSetSelectedCity = (city: string) => {
    setSelectedCity(city)
    localStorage.setItem("shwikky-selected-city", city)
  }

  return (
    <LocationContext.Provider value={{ selectedCity, setSelectedCity: handleSetSelectedCity }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}
