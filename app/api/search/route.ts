import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""
  const type = searchParams.get("type") // 'restaurant' or 'dish'

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  let results: any[] = []

  if (!type || type === "restaurant") {
    // Search restaurants by name or cuisine
    const { data: restaurants, error: restaurantError } = await supabase
      .from("restaurants")
      .select("id, name, cuisine, rating, cost_for_two, image_url, city, subcity")
      .or(`name.ilike.%${query}%,cuisine.ilike.%${query}%`)
      .limit(10)

    if (restaurantError) {
      console.error("Supabase query error in /api/search (restaurants):", restaurantError)
      return NextResponse.json({ error: restaurantError.message }, { status: 500 })
    }
    console.log(`Search for restaurants '${query}': Found ${restaurants?.length || 0} results.`)

    results = results.concat(
      restaurants.map((r) => ({
        type: "restaurant",
        id: r.id,
        name: r.name,
        cuisine: r.cuisine,
        rating: r.rating,
        cost: r.cost_for_two,
        image: r.image_url,
        location: `${r.subcity}, ${r.city}`,
      })),
    )
  }

  if (!type || type === "dish") {
    // Search menu items by name
    const { data: dishes, error: dishError } = await supabase
      .from("menu_items")
      .select("id, name, price, veg, image_url, restaurant_id, restaurants(name, rating, cost_for_two)")
      .ilike("name", `%${query}%`)
      .limit(20)

    if (dishError) {
      console.error("Supabase query error in /api/search (dishes):", dishError)
      return NextResponse.json({ error: dishError.message }, { status: 500 })
    }
    console.log(`Search for dishes '${query}': Found ${dishes?.length || 0} results.`)

    results = results.concat(
      dishes.map((d) => ({
        type: "dish",
        id: d.id,
        name: d.name,
        price: d.price,
        veg: d.veg,
        image: d.image_url,
        restaurant: d.restaurants?.name,
        restaurantId: d.restaurant_id,
        restaurantRating: d.restaurants?.rating,
      })),
    )
  }

  return NextResponse.json({ results })
}
