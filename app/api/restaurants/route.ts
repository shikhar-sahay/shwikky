import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city") || "Vellore" // Default to Vellore
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
  const offset = Number.parseInt(searchParams.get("offset") || "0", 10)
  const sortBy = searchParams.get("sortBy") || "rating"
  const sortOrder = searchParams.get("sortOrder") || "desc"

  let query = supabase.from("restaurants").select("*")

  if (city) {
    query = query.eq("city", city)
  }

  query = query.order(sortBy, { ascending: sortOrder === "asc" }).range(offset, offset + limit - 1)

  const { data, error } = await query

  if (error) {
    console.error("Supabase query error in /api/restaurants:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log(`Fetched ${data?.length || 0} restaurants for city: ${city}`)
  return NextResponse.json(data)
}
