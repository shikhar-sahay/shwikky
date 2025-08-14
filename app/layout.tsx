  import type React from "react"
  import type { Metadata } from "next"
  import { Inter, Poppins } from "next/font/google"
  import { CartProvider } from "@/contexts/cart-context"
  import { LocationProvider } from "@/contexts/location-context"
  import { ThemeProvider as NextThemesProvider } from "next-themes" // <-- updated
  import "./globals.css"

  const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-poppins",
  })

  export const metadata: Metadata = {
    title: "Shwikky - Food Delivery App",
    description: "Order your favorite food online with Shwikky",
    generator: 'v0.app'
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
          <NextThemesProvider attribute="class" defaultTheme="system">
            <LocationProvider>
              <CartProvider>{children}</CartProvider>
            </LocationProvider>
          </NextThemesProvider>
        </body>
      </html>
    )
  }
