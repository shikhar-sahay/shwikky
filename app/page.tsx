import Header from "@/components/header"
import RestaurantChains from "@/components/restaurant-chains"
import RestaurantList from "@/components/restaurant-list"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <main>
        <RestaurantChains />
        <RestaurantList />
      </main>
    </div>
  )
}
