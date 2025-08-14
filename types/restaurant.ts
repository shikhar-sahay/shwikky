export interface MenuItem {
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

export interface MenuSection {
  category: string
  itemCount: number
  items: MenuItem[]
}

export interface Deal {
  id: number
  title: string
  subtitle: string
  icon: string
  color: string
}

export interface TopPick {
  id: string
  name: string
  description: string
  price: number
  image: string
  veg: boolean
}

export interface RestaurantData {
  id: string
  name: string
  rating: number
  totalRatings: string
  priceForTwo: string
  cuisine: string
  outlet: string
  deliveryTime: string
  image: string
  deals: Deal[]
  topPicks: TopPick[]
  menu: MenuSection[]
}
