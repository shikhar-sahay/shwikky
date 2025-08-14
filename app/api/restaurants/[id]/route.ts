import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params

  // Fetch restaurant details
  const { data: restaurant, error: restaurantError } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single()

  if (restaurantError) {
    console.error(`Supabase query error in /api/restaurants/${id} (restaurant):`, restaurantError)
    return NextResponse.json({ error: restaurantError.message }, { status: 500 })
  }

  if (!restaurant) {
    console.log(`Restaurant with ID ${id} not found.`)
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
  }

  // Fetch menu items for the restaurant
  const { data: menuItems, error: menuItemsError } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", id)
    .order("name", { ascending: true }) // Order menu items alphabetically

  if (menuItemsError) {
    console.error(`Supabase query error in /api/restaurants/${id} (menu items):`, menuItemsError)
    return NextResponse.json({ error: menuItemsError.message }, { status: 500 })
  }

  console.log(`Fetched restaurant ${restaurant.name} with ${menuItems?.length || 0} menu items.`)

  // Group menu items by category (if categories are available, otherwise use a default)
  const menu = menuItems.reduce((acc: any[], item: any) => {
    // For now, we don't have categories in the CSV, so we'll group by a dummy category or infer from item name
    // For simplicity, let's just put all items under a "Menu" category for now.
    // In a real scenario, you'd have a 'category' column in your menu_items table.
    const categoryName = "All Items" // Or infer from item.name if possible
    let category = acc.find((c) => c.category === categoryName)

    if (!category) {
      category = { category: categoryName, itemCount: 0, items: [] }
      acc.push(category)
    }

    category.items.push({
      id: item.id,
      name: item.name,
      description: item.description || "No description available.",
      price: item.price,
      rating: item.item_rating || 0, // Use item_rating from DB
      ratingCount: item.item_rating_count || 0, // Use item_rating_count from DB
      image: item.image_url,
      veg: item.veg,
      customizable: item.customizable,
      bestseller: item.bestseller,
    })
    category.itemCount++
    return acc
  }, [])

  return NextResponse.json({ ...restaurant, menu })
}
