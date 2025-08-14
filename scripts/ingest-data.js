import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import { parse } from "csv-parse"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL and Anon Key must be set in .env file")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const csvFilePath = "./restaurants_data.csv" // Make sure your CSV file is here

async function ingestData() {
  console.log("Starting data ingestion...")

  const restaurantsMap = new Map() // To store unique restaurants
  const menuItems = []

  let rowCount = 0
  let processedCount = 0

  const parser = fs.createReadStream(csvFilePath).pipe(
    parse({
      columns: true, // Treat the first row as column headers
      skip_empty_lines: true,
      trim: true,
    }),
  )

  parser.on("data", (row) => {
    rowCount++
    // Process restaurant data
    const restaurantId = row["restaurant code"]
    if (!restaurantsMap.has(restaurantId)) {
      const rating = Number.parseFloat(row["restaurant rating"]) || 0
      const costForTwo = Number.parseInt(row["cost"].replace(/[^0-9]/g, "")) || 0 // Clean cost string

      restaurantsMap.set(restaurantId, {
        id: restaurantId,
        name: row["restaurant"],
        rating: rating,
        rating_count: row["rating count"] || "0",
        cost_for_two: costForTwo,
        address: row["address"],
        cuisine: row["cuisine"],
        license_no: row["licension no"],
        image_url: `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(row["restaurant"])}`, // Placeholder image
        city: row["city"],
        subcity: row["subcity"],
      })
    }

    // Process menu item data
    menuItems.push({
      id: uuidv4(), // Generate a unique ID for each menu item
      restaurant_id: restaurantId,
      name: row["item"],
      description: "", // Not available in CSV
      price: Number.parseFloat(row["price"]) || 0,
      veg: row["veg_or_non_veg"] === "Veg",
      image_url: `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(row["item"])}`, // Placeholder image
      item_rating: null, // Not available in CSV
      item_rating_count: null, // Not available in CSV
      customizable: false, // Not available in CSV
      bestseller: false, // Not available in CSV
    })

    processedCount++
    if (processedCount % 1000 === 0) {
      console.log(`Processed ${processedCount} rows...`)
    }
  })

  parser.on("end", async () => {
    console.log(`Finished parsing CSV. Total rows: ${rowCount}`)
    console.log(`Unique restaurants found: ${restaurantsMap.size}`)
    console.log(`Menu items found: ${menuItems.length}`)

    // Convert map to array for insertion
    const restaurants = Array.from(restaurantsMap.values())

    // Batch insert restaurants
    console.log("Inserting restaurants into Supabase...")
    const { error: restaurantError } = await supabase.from("restaurants").insert(restaurants)
    if (restaurantError) {
      console.error("Error inserting restaurants:", restaurantError)
    } else {
      console.log("Restaurants inserted successfully.")
    }

    // Batch insert menu items
    console.log("Inserting menu items into Supabase...")
    const { error: menuItemsError } = await supabase.from("menu_items").insert(menuItems)
    if (menuItemsError) {
      console.error("Error inserting menu items:", menuItemsError)
    } else {
      console.log("Menu items inserted successfully.")
    }

    console.log("Data ingestion complete.")
  })

  parser.on("error", (err) => {
    console.error("Error parsing CSV:", err)
  })
}

ingestData()
