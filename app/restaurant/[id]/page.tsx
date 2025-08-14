import Header from "@/components/header"
import RestaurantDetail from "@/components/restaurant-detail"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <RestaurantDetail restaurantId={params.id} />
    </div>
  )
}
