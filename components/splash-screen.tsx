"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#25c2af] animate-slideUp">
          <div className="w-80 h-80 md:w-96 md:h-96 relative animate-spinLogo">
            <Image src="/logo.png" alt="Shwikky Logo" fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
