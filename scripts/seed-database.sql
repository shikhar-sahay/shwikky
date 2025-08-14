-- Create and seed restaurants and menu_items tables with sample data
-- Clear existing data
DELETE FROM menu_items;
DELETE FROM restaurants;

-- Insert restaurants
INSERT INTO restaurants (id, name, image_url, rating, rating_count, cost_for_two, cuisine, address, city, subcity, license_no) VALUES
('mcdonalds', 'McDonald''s', '/placeholder.svg?height=200&width=300', 4.2, '10K+', 400, 'Burgers, Fast Food, American', 'Gandhi Road, Vellore', 'Vellore', 'Gandhi Road', 'LIC001'),
('kfc', 'KFC', '/placeholder.svg?height=200&width=300', 4.1, '8K+', 450, 'Chicken, Fast Food, American', 'CMC Road, Vellore', 'Vellore', 'CMC Road', 'LIC002'),
('pizza-hut', 'Pizza Hut', '/placeholder.svg?height=200&width=300', 4.3, '12K+', 600, 'Pizza, Italian, Fast Food', 'Katpadi Road, Vellore', 'Vellore', 'Katpadi Road', 'LIC003'),
('dominos', 'Domino''s Pizza', '/placeholder.svg?height=200&width=300', 4.2, '15K+', 500, 'Pizza, Italian, Fast Food', 'Officer''s Line, Vellore', 'Vellore', 'Officer''s Line', 'LIC004'),
('subway', 'Subway', '/placeholder.svg?height=200&width=300', 4.0, '6K+', 350, 'Sandwiches, Healthy, Fast Food', 'Thorapadi, Vellore', 'Vellore', 'Thorapadi', 'LIC005'),
('starbucks', 'Starbucks', '/placeholder.svg?height=200&width=300', 4.4, '9K+', 800, 'Coffee, Beverages, Desserts', 'VIT University, Vellore', 'Vellore', 'VIT University', 'LIC006');

-- Insert McDonald's menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, veg, item_rating, item_rating_count, bestseller, customizable) VALUES
('big-mac', 'mcdonalds', 'Big Mac', 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun', 199, '/placeholder.svg?height=150&width=200', false, 4.5, 1200, true, false),
('mcchicken', 'mcdonalds', 'McChicken', 'Crispy chicken patty with lettuce and mayo in a sesame seed bun', 179, '/placeholder.svg?height=150&width=200', false, 4.3, 890, false, false),
('quarter-pounder', 'mcdonalds', 'Quarter Pounder with Cheese', 'Quarter pound beef patty with cheese, pickles, onions, ketchup and mustard', 229, '/placeholder.svg?height=150&width=200', false, 4.4, 756, false, false),
('mcveggie', 'mcdonalds', 'McVeggie', 'Delicious veggie patty with fresh lettuce and mayo', 159, '/placeholder.svg?height=150&width=200', true, 4.1, 543, false, false),
('chicken-nuggets', 'mcdonalds', 'Chicken McNuggets (6 pcs)', 'Tender chicken pieces in crispy coating', 149, '/placeholder.svg?height=150&width=200', false, 4.6, 1100, true, false),
('french-fries', 'mcdonalds', 'French Fries (Medium)', 'Golden crispy french fries', 89, '/placeholder.svg?height=150&width=200', true, 4.4, 2100, false, false),
('mcflurry-oreo', 'mcdonalds', 'McFlurry Oreo', 'Vanilla soft serve with Oreo cookie pieces', 99, '/placeholder.svg?height=150&width=200', true, 4.5, 890, false, false),
('apple-pie', 'mcdonalds', 'Apple Pie', 'Hot apple pie with flaky crust', 59, '/placeholder.svg?height=150&width=200', true, 4.2, 456, false, false),
('coca-cola', 'mcdonalds', 'Coca-Cola (Medium)', 'Refreshing Coca-Cola soft drink', 59, '/placeholder.svg?height=150&width=200', true, 4.3, 1500, false, false),
('coffee', 'mcdonalds', 'McCafé Coffee', 'Premium coffee blend', 79, '/placeholder.svg?height=150&width=200', true, 4.1, 678, false, false),
('filet-o-fish', 'mcdonalds', 'Filet-O-Fish', 'Fish fillet with tartar sauce and cheese', 189, '/placeholder.svg?height=150&width=200', false, 4.0, 234, false, false),
('hash-browns', 'mcdonalds', 'Hash Browns', 'Crispy golden hash browns', 69, '/placeholder.svg?height=150&width=200', true, 4.3, 567, false, false),
('chicken-wrap', 'mcdonalds', 'Chicken Wrap', 'Grilled chicken with fresh vegetables in a wrap', 169, '/placeholder.svg?height=150&width=200', false, 4.2, 445, false, false),
('vanilla-shake', 'mcdonalds', 'Vanilla Shake', 'Creamy vanilla milkshake', 119, '/placeholder.svg?height=150&width=200', true, 4.4, 789, false, false),
('happy-meal', 'mcdonalds', 'Happy Meal', 'Kid''s meal with burger, fries, drink and toy', 199, '/placeholder.svg?height=150&width=200', false, 4.5, 1200, true, false);

-- Insert KFC menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, veg, item_rating, item_rating_count, bestseller, customizable) VALUES
('original-recipe', 'kfc', 'Original Recipe Chicken (2 pcs)', 'Colonel''s secret recipe of 11 herbs and spices', 199, '/placeholder.svg?height=150&width=200', false, 4.5, 1500, true, false),
('zinger-burger', 'kfc', 'Zinger Burger', 'Spicy chicken fillet with lettuce and mayo', 189, '/placeholder.svg?height=150&width=200', false, 4.4, 1200, false, false),
('hot-wings', 'kfc', 'Hot Wings (4 pcs)', 'Spicy chicken wings with fiery coating', 179, '/placeholder.svg?height=150&width=200', false, 4.6, 890, true, false),
('popcorn-chicken', 'kfc', 'Popcorn Chicken', 'Bite-sized chicken pieces in crispy coating', 149, '/placeholder.svg?height=150&width=200', false, 4.3, 756, false, false),
('chicken-bucket', 'kfc', 'Family Feast Bucket', '8 pieces of chicken with sides', 699, '/placeholder.svg?height=150&width=200', false, 4.7, 543, true, false),
('coleslaw', 'kfc', 'Coleslaw', 'Fresh cabbage and carrot salad', 79, '/placeholder.svg?height=150&width=200', true, 4.1, 234, false, false),
('krushers', 'kfc', 'Krushers', 'Thick shake with cookie crumbs', 129, '/placeholder.svg?height=150&width=200', true, 4.4, 567, false, false),
('chicken-rice-bowl', 'kfc', 'Chicken Rice Bowl', 'Chicken pieces with rice and vegetables', 169, '/placeholder.svg?height=150&width=200', false, 4.2, 445, false, false),
('veggie-burger', 'kfc', 'Veggie Burger', 'Crispy veggie patty with fresh vegetables', 159, '/placeholder.svg?height=150&width=200', true, 4.0, 234, false, false),
('pepsi', 'kfc', 'Pepsi (Medium)', 'Refreshing Pepsi cola', 59, '/placeholder.svg?height=150&width=200', true, 4.2, 1200, false, false),
('chicken-strips', 'kfc', 'Chicken Strips (3 pcs)', 'Tender chicken strips with dipping sauce', 159, '/placeholder.svg?height=150&width=200', false, 4.3, 678, false, false),
('gravy', 'kfc', 'Gravy', 'Rich and creamy chicken gravy', 49, '/placeholder.svg?height=150&width=200', false, 4.1, 345, false, false),
('biscuit', 'kfc', 'Biscuit', 'Warm and buttery biscuit', 39, '/placeholder.svg?height=150&width=200', true, 4.0, 234, false, false),
('twister', 'kfc', 'Twister Wrap', 'Chicken strips wrapped with vegetables', 179, '/placeholder.svg?height=150&width=200', false, 4.3, 567, false, false),
('chocolate-cake', 'kfc', 'Chocolate Cake', 'Rich chocolate cake slice', 89, '/placeholder.svg?height=150&width=200', true, 4.4, 445, false, false);

-- Insert Pizza Hut menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, veg, item_rating, item_rating_count, bestseller, customizable) VALUES
('margherita-pizza', 'pizza-hut', 'Margherita Pizza (Medium)', 'Classic pizza with tomato sauce, mozzarella and basil', 299, '/placeholder.svg?height=150&width=200', true, 4.4, 1800, true, false),
('pepperoni-pizza', 'pizza-hut', 'Pepperoni Pizza (Medium)', 'Pepperoni slices with mozzarella cheese', 399, '/placeholder.svg?height=150&width=200', false, 4.5, 1500, false, false),
('chicken-supreme', 'pizza-hut', 'Chicken Supreme Pizza', 'Chicken, bell peppers, onions and mushrooms', 449, '/placeholder.svg?height=150&width=200', false, 4.6, 1200, true, false),
('veggie-lovers', 'pizza-hut', 'Veggie Lovers Pizza', 'Bell peppers, onions, mushrooms, tomatoes and olives', 349, '/placeholder.svg?height=150&width=200', true, 4.3, 890, false, false),
('meat-lovers', 'pizza-hut', 'Meat Lovers Pizza', 'Pepperoni, sausage, ham and bacon', 499, '/placeholder.svg?height=150&width=200', false, 4.7, 756, true, false),
('garlic-bread', 'pizza-hut', 'Garlic Bread', 'Freshly baked bread with garlic butter', 129, '/placeholder.svg?height=150&width=200', true, 4.2, 543, false, false),
('chicken-wings', 'pizza-hut', 'Buffalo Wings (6 pcs)', 'Spicy chicken wings with buffalo sauce', 199, '/placeholder.svg?height=150&width=200', false, 4.4, 678, false, false),
('pasta-alfredo', 'pizza-hut', 'Chicken Alfredo Pasta', 'Creamy alfredo pasta with grilled chicken', 249, '/placeholder.svg?height=150&width=200', false, 4.3, 445, false, false),
('caesar-salad', 'pizza-hut', 'Caesar Salad', 'Fresh romaine lettuce with caesar dressing', 179, '/placeholder.svg?height=150&width=200', true, 4.1, 234, false, false),
('chocolate-brownie', 'pizza-hut', 'Chocolate Brownie', 'Warm chocolate brownie with ice cream', 149, '/placeholder.svg?height=150&width=200', true, 4.5, 567, false, false),
('hawaiian-pizza', 'pizza-hut', 'Hawaiian Pizza', 'Ham and pineapple with mozzarella', 379, '/placeholder.svg?height=150&width=200', false, 4.2, 345, false, false),
('stuffed-crust', 'pizza-hut', 'Stuffed Crust Margherita', 'Margherita pizza with cheese-stuffed crust', 399, '/placeholder.svg?height=150&width=200', true, 4.6, 789, false, false),
('breadsticks', 'pizza-hut', 'Breadsticks (4 pcs)', 'Soft breadsticks with marinara sauce', 99, '/placeholder.svg?height=150&width=200', true, 4.0, 234, false, false),
('pepsi-pizza', 'pizza-hut', 'Pepsi (Large)', 'Large Pepsi cola', 89, '/placeholder.svg?height=150&width=200', true, 4.1, 456, false, false),
('cheesy-bites', 'pizza-hut', 'Cheesy Bites Pizza', 'Pizza with cheese-filled crust bites', 429, '/placeholder.svg?height=150&width=200', true, 4.4, 678, false, false);

-- Insert Domino's menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, veg, item_rating, item_rating_count, bestseller, customizable) VALUES
('farmhouse-pizza', 'dominos', 'Farmhouse Pizza (Medium)', 'Delightfully topped with onion, capsicum, tomato & grilled mushroom', 319, '/placeholder.svg?height=150&width=200', true, 4.4, 2100, true, false),
('chicken-dominator', 'dominos', 'Chicken Dominator', 'Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers', 549, '/placeholder.svg?height=150&width=200', false, 4.6, 1800, true, false),
('peppy-paneer', 'dominos', 'Peppy Paneer', 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika', 399, '/placeholder.svg?height=150&width=200', true, 4.3, 1500, false, false),
('mexican-green-wave', 'dominos', 'Mexican Green Wave', 'Mexican herbs sprinkled on onion, capsicum, tomato & jalapeno', 359, '/placeholder.svg?height=150&width=200', true, 4.2, 890, false, false),
('chicken-golden-delight', 'dominos', 'Chicken Golden Delight', 'Double pepper barbecue chicken, golden corn and extra cheese', 479, '/placeholder.svg?height=150&width=200', false, 4.5, 1200, false, false),
('garlic-breadsticks', 'dominos', 'Garlic Breadsticks', 'Freshly baked garlic seasoned breadsticks', 109, '/placeholder.svg?height=150&width=200', true, 4.1, 756, false, false),
('choco-lava-cake', 'dominos', 'Choco Lava Cake', 'Chocolate cake with molten chocolate center', 99, '/placeholder.svg?height=150&width=200', true, 4.7, 2500, true, false),
('pasta-italiana', 'dominos', 'Pasta Italiana White', 'Penne pasta in white sauce with herbs', 189, '/placeholder.svg?height=150&width=200', true, 4.0, 543, false, false),
('chicken-wings-dominos', 'dominos', 'Peri Peri Chicken Wings', 'Spicy peri peri flavored chicken wings', 219, '/placeholder.svg?height=150&width=200', false, 4.4, 678, false, false),
('coke-dominos', 'dominos', 'Coca-Cola (600ml)', 'Refreshing Coca-Cola', 57, '/placeholder.svg?height=150&width=200', true, 4.2, 1200, false, false),
('veg-extravaganza', 'dominos', 'Veg Extravaganza', 'Black olives, capsicum, onion, grilled mushroom, corn, tomato, jalapeno & extra cheese', 449, '/placeholder.svg?height=150&width=200', true, 4.5, 1100, false, false),
('cheese-burst', 'dominos', 'Margherita Cheese Burst', 'Cheese burst crust with classic margherita toppings', 379, '/placeholder.svg?height=150&width=200', true, 4.6, 1800, false, false),
('taco-mexicana', 'dominos', 'Taco Mexicana', 'Mexican herbs, onion, capsicum, tomato, jalapeno & cheese', 389, '/placeholder.svg?height=150&width=200', true, 4.3, 567, false, false),
('chicken-pepperoni', 'dominos', 'Chicken Pepperoni', 'Chicken pepperoni with cheese and herbs', 429, '/placeholder.svg?height=150&width=200', false, 4.4, 890, false, false),
('stuffed-garlic-bread', 'dominos', 'Stuffed Garlic Bread', 'Garlic bread stuffed with cheese and herbs', 149, '/placeholder.svg?height=150&width=200', true, 4.3, 445, false, false);

-- Insert Subway menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, veg, item_rating, item_rating_count, bestseller, customizable) VALUES
('chicken-teriyaki', 'subway', 'Chicken Teriyaki (6 inch)', 'Tender chicken strips with teriyaki sauce and vegetables', 189, '/placeholder.svg?height=150&width=200', false, 4.3, 890, true, false),
('veggie-delite', 'subway', 'Veggie Delite (6 inch)', 'Fresh vegetables with your choice of sauce', 129, '/placeholder.svg?height=150&width=200', true, 4.1, 756, false, false),
('italian-bmt', 'subway', 'Italian B.M.T. (6 inch)', 'Pepperoni, salami and ham with vegetables', 219, '/placeholder.svg?height=150&width=200', false, 4.4, 1200, false, false),
('tuna-sub', 'subway', 'Tuna Sub (6 inch)', 'Tuna with mayo and fresh vegetables', 199, '/placeholder.svg?height=150&width=200', false, 4.0, 543, false, false),
('chicken-breast', 'subway', 'Roast Chicken Breast (6 inch)', 'Tender roasted chicken breast with vegetables', 179, '/placeholder.svg?height=150&width=200', false, 4.2, 678, false, false),
('paneer-tikka', 'subway', 'Paneer Tikka (6 inch)', 'Spiced paneer tikka with fresh vegetables', 169, '/placeholder.svg?height=150&width=200', true, 4.3, 445, true, false),
('turkey-breast', 'subway', 'Turkey Breast (6 inch)', 'Sliced turkey breast with vegetables', 209, '/placeholder.svg?height=150&width=200', false, 4.1, 234, false, false),
('subway-melt', 'subway', 'Subway Melt (6 inch)', 'Turkey breast, ham and bacon with cheese', 229, '/placeholder.svg?height=150&width=200', false, 4.4, 567, false, false),
('aloo-patty', 'subway', 'Aloo Patty (6 inch)', 'Spiced potato patty with vegetables', 139, '/placeholder.svg?height=150&width=200', true, 4.0, 345, false, false),
('cookies', 'subway', 'Chocolate Chip Cookies (3 pcs)', 'Freshly baked chocolate chip cookies', 89, '/placeholder.svg?height=150&width=200', true, 4.5, 789, false, false),
('chicken-ham', 'subway', 'Chicken Ham (6 inch)', 'Chicken ham with cheese and vegetables', 199, '/placeholder.svg?height=150&width=200', false, 4.2, 456, false, false),
('veggie-patty', 'subway', 'Veggie Patty (6 inch)', 'Mixed vegetable patty with fresh vegetables', 149, '/placeholder.svg?height=150&width=200', true, 4.1, 234, false, false),
('sprite', 'subway', 'Sprite (Medium)', 'Refreshing lemon-lime soda', 59, '/placeholder.svg?height=150&width=200', true, 4.0, 567, false, false),
('chicken-slice', 'subway', 'Chicken Slice (6 inch)', 'Sliced chicken with vegetables and sauce', 189, '/placeholder.svg?height=150&width=200', false, 4.3, 678, false, false),
('footlong-veggie', 'subway', 'Veggie Delite (Footlong)', '12 inch veggie sandwich with fresh vegetables', 219, '/placeholder.svg?height=150&width=200', true, 4.2, 445, false, false);

-- Insert Starbucks menu items
INSERT INTO menu_items (id, restaurant_id, name, description, price, image_url, veg, item_rating, item_rating_count, bestseller, customizable) VALUES
('caffe-latte', 'starbucks', 'Caffè Latte (Tall)', 'Rich espresso with steamed milk', 295, '/placeholder.svg?height=150&width=200', true, 4.5, 1500, true, false),
('cappuccino', 'starbucks', 'Cappuccino (Tall)', 'Espresso with steamed milk and foam', 275, '/placeholder.svg?height=150&width=200', true, 4.4, 1200, false, false),
('caramel-macchiato', 'starbucks', 'Caramel Macchiato (Tall)', 'Espresso with vanilla syrup, steamed milk and caramel', 365, '/placeholder.svg?height=150&width=200', true, 4.6, 1800, true, false),
('frappuccino-coffee', 'starbucks', 'Coffee Frappuccino (Tall)', 'Blended coffee with ice and whipped cream', 345, '/placeholder.svg?height=150&width=200', true, 4.5, 1100, false, false),
('americano', 'starbucks', 'Caffè Americano (Tall)', 'Espresso shots with hot water', 255, '/placeholder.svg?height=150&width=200', true, 4.2, 890, false, false),
('green-tea-latte', 'starbucks', 'Green Tea Latte (Tall)', 'Matcha green tea with steamed milk', 315, '/placeholder.svg?height=150&width=200', true, 4.3, 756, false, false),
('hot-chocolate', 'starbucks', 'Hot Chocolate (Tall)', 'Rich chocolate with steamed milk and whipped cream', 285, '/placeholder.svg?height=150&width=200', true, 4.4, 678, false, false),
('vanilla-latte', 'starbucks', 'Vanilla Latte (Tall)', 'Espresso with vanilla syrup and steamed milk', 315, '/placeholder.svg?height=150&width=200', true, 4.3, 543, false, false),
('croissant', 'starbucks', 'Butter Croissant', 'Flaky, buttery croissant', 195, '/placeholder.svg?height=150&width=200', true, 4.2, 445, false, false),
('blueberry-muffin', 'starbucks', 'Blueberry Muffin', 'Moist muffin with fresh blueberries', 225, '/placeholder.svg?height=150&width=200', true, 4.4, 567, false, false),
('iced-coffee', 'starbucks', 'Iced Coffee (Tall)', 'Chilled coffee served over ice', 265, '/placeholder.svg?height=150&width=200', true, 4.1, 789, false, false),
('espresso', 'starbucks', 'Espresso (Single Shot)', 'Rich, full-bodied espresso', 165, '/placeholder.svg?height=150&width=200', true, 4.5, 234, false, false),
('chai-latte', 'starbucks', 'Chai Tea Latte (Tall)', 'Spiced chai tea with steamed milk', 295, '/placeholder.svg?height=150&width=200', true, 4.3, 456, false, false);
