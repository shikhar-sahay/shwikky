-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rating NUMERIC,
    rating_count TEXT,
    cost_for_two NUMERIC,
    address TEXT,
    cuisine TEXT,
    license_no TEXT,
    image_url TEXT,
    city TEXT,
    subcity TEXT
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT REFERENCES restaurants(id),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    veg BOOLEAN NOT NULL,
    image_url TEXT,
    item_rating NUMERIC,
    item_rating_count NUMERIC,
    customizable BOOLEAN DEFAULT FALSE,
    bestseller BOOLEAN DEFAULT FALSE
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_restaurants_city ON restaurants (city);
CREATE INDEX IF NOT EXISTS idx_restaurants_subcity ON restaurants (subcity);
CREATE INDEX IF NOT EXISTS idx_menu_items_restaurant_id ON menu_items (restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_name ON menu_items (name);
CREATE INDEX IF NOT EXISTS idx_menu_items_veg ON menu_items (veg);
