"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import SearchCatalog from "@/components/search-catalog"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
        <SearchCatalog />
      </Suspense>
    </div>
  )
}
