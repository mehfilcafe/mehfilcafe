/**
 * ============================================================================
 * MEHFIL CAFE - AUTHENTIC EDITORIAL MENU DATA
 * Official menu items matching the PDF menu strictly with exact naming,
 * authentic ingredients, and standard dietary flags.
 * ============================================================================
 */

// Categories definition with authentic menu images from assets/menu/
const MEHFIL_CATEGORIES = [
  {
    id: "all",
    label: "All Items",
    icon: "ri-apps-2-line",
    tagline: "The Complete Mehfil Gallery",
    description: "Explore all 8 handcrafted corners of Mehfil Cafe — freshly brewed teas & coffee, crispy appetizers, flaky frankies, pressed sandwiches, thick milkshakes & cold drinks, cooling mojitos, viral UFO burgers, and combo offers.",
    featuredImage: "assets/menu/tea.jpg"
  },
  {
    id: "tea-coffee",
    label: "Hot & Classic",
    icon: "ri-cup-line",
    tagline: "Hot & Classic",
    description: "Handcrafted Indian milk teas brewed with crushed spices, authentic coffee, rich hot chocolate, Sulaimani, and soothing lemon & green teas.",
    featuredImage: "assets/menu/tea.jpg"
  },
  {
    id: "appetizers",
    label: "Appetizers",
    icon: "ri-restaurant-line",
    tagline: "To Start Things Off",
    description: "Freshly cut golden fries tossed in artisanal seasonings, hot spring rolls, loaded chicken platters, crunchy nuggets, popcorn, and Mexican street corn.",
    featuredImage: "assets/menu/classic fries.jpg"
  },
  {
    id: "frankie",
    label: "Frankies",
    icon: "ri-fire-line",
    tagline: "Rolled Ready",
    description: "Warm buttered flatbreads rolled with spiced paneer, roasted chicken chunks, crispy tenders, fresh slaws, and signature chaat seasoning.",
    featuredImage: "assets/menu/frankie.jpg"
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    icon: "ri-bread-line",
    tagline: "Pressed & Simple",
    description: "Golden-grilled toasts loaded with tender herb-roasted chicken, spiced veggies, melted cheese, and signature house spreads.",
    featuredImage: "assets/menu/sandwich.jpg"
  },
  {
    id: "milkshakes",
    label: "Milkshakes & Cold Drinks",
    icon: "ri-goblet-line",
    tagline: "Thick, Cold, Blended",
    description: "Thick gelato milkshakes, ripe avocado blends, crunchy Oreo crush, cold Milo, and slow-whipped iced coffee.",
    featuredImage: "assets/menu/milkshakes.jpg"
  },
  {
    id: "mojitos",
    label: "Mojitos",
    icon: "ri-drinks-line",
    tagline: "Fresh Fizzy",
    description: "Hand-muddled garden spearmint, tart citrus cordial, and bubbly club soda charged over cracked crystal ice.",
    featuredImage: "assets/menu/mojito.jpg"
  },
  {
    id: "burgers",
    label: "UFO Burgers",
    icon: "ri-disc-line",
    tagline: "Taste of the House",
    description: "Viral saucer-sealed UFO burgers pressed hot to lock in savory crispy zinger chicken, spiced vegetables, melted cheese, and sweet dessert fillings.",
    featuredImage: "assets/menu/UFP burger.jpg"
  },
  {
    id: "combo-offers",
    label: "Combo Offers",
    icon: "ri-percent-line",
    tagline: "Any mojito, paired with fries",
    description: "The ultimate hunger pairing: pair your favorite chilled fizzy craft mojito with our golden classic, peri-peri, cheesy, or chicken loaded fries.",
    featuredImage: "assets/menu/combo-offers-opt.jpg"
  }
];

const MEHFIL_MENU_DATA = [
  // ==========================================================================
  // 1. HOT & CLASSIC (6 Items) - Page 1
  // ==========================================================================
  {
    id: "tea",
    name: "Tea",
    category: "tea-coffee",
    badge: "Bestseller",
    diet: "veg",
    ingredients: "Handcrafted Assam tea leaves, freshly crushed ginger, green cardamom pods, and creamy fresh milk."
  },
  {
    id: "coffee",
    name: "Coffee",
    category: "tea-coffee",
    badge: "Signature",
    diet: "veg",
    ingredients: "Slow-dripped South Indian dark roast Arabica-Robusta decoction, aerated with foamed farm-fresh milk."
  },
  {
    id: "sulaimani",
    name: "Sulaimani",
    category: "tea-coffee",
    badge: "Traditional",
    diet: "veg",
    ingredients: "Fragrant spiced black tea liquor brewed with cracked green cardamom, cinnamon, cloves, fresh mint leaves, and a squeeze of lime."
  },
  {
    id: "lemon-tea",
    name: "Lemon Tea",
    category: "tea-coffee",
    badge: "Refreshing",
    diet: "veg",
    ingredients: "Golden steeped black tea liquor, freshly squeezed Meyer lemon juice, organic wild honey, and garden mint."
  },
  {
    id: "green-tea",
    name: "Green Tea",
    category: "tea-coffee",
    badge: "Antioxidant Rich",
    diet: "veg",
    ingredients: "Pure steamed whole green tea leaves rich in natural antioxidants, gently infused with fresh spearmint."
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    category: "tea-coffee",
    badge: "Decadent",
    diet: "veg",
    ingredients: "Rich velvety melted dark chocolate whisked with steamed whole dairy milk, topped with fine Dutch cocoa dusting."
  },

  // ==========================================================================
  // 2. APPETIZERS (10 Items) - Page 1
  // ==========================================================================
  {
    id: "classic-fries",
    name: "Classic Fries",
    category: "appetizers",
    badge: "Classic",
    diet: "veg",
    ingredients: "Hand-cut Russet potatoes fried to a golden crunch, dusted with crushed Himalayan pink rock salt."
  },
  {
    id: "peri-peri-fries",
    name: "Peri Peri Fries",
    category: "appetizers",
    badge: "Bestseller",
    diet: "veg",
    ingredients: "Golden crispy french fries tossed generously in our fiery house-blended African peri-peri chili dust."
  },
  {
    id: "peri-peri-cheese-fries",
    name: "Peri Peri Fries with Cheese Sauce",
    category: "appetizers",
    badge: "Popular",
    diet: "veg",
    ingredients: "Crispy peri-peri fries smothered in hot molten cheddar cheese sauce and aromatic dried herbs."
  },
  {
    id: "chicken-loaded-fries",
    name: "Chicken Loaded Fries",
    category: "appetizers",
    badge: "Chef's Special",
    diet: "non-veg",
    ingredients: "Crispy golden fries loaded with spiced shredded chicken, pickled jalapeños, melted mozzarella, and house garlic aioli."
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    category: "appetizers",
    badge: "Kids Fav",
    diet: "non-veg",
    ingredients: "Succulent minced chicken breast patties seasoned with aromatic herbs, breaded, and fried to golden crispness."
  },
  {
    id: "chicken-strips",
    name: "Chicken Strips",
    category: "appetizers",
    badge: "Popular",
    diet: "non-veg",
    ingredients: "Fresh chicken breast tenders marinated in herbs, dredged in seasoned panko crumbs, and fried extra crisp."
  },
  {
    id: "veg-spring-roll",
    name: "Veg Spring Roll",
    category: "appetizers",
    badge: "Crispy",
    diet: "veg",
    ingredients: "Crispy golden rolls filled with wok-tossed shredded cabbage, carrots, bell peppers, scallions, and soy-garlic seasoning."
  },
  {
    id: "honey-chilli-potato",
    name: "Honey Chilli Potato",
    category: "appetizers",
    badge: "Special",
    diet: "veg",
    ingredients: "Crispy fried potato batons wok-glazed in sweet-spicy chili reduction, organic honey, spring onions, and toasted sesame seeds."
  },
  {
    id: "chicken-popcorn",
    name: "Chicken Popcorn",
    category: "appetizers",
    badge: "Bestseller",
    diet: "non-veg",
    ingredients: "Tender bite-sized boneless chicken cubes marinated in herb buttermilk, coated in crunchy spiced batter."
  },
  {
    id: "classic-mexican-corn",
    name: "Classic Mexican Corn",
    category: "appetizers",
    badge: "New Arrival",
    diet: "veg",
    ingredients: "Sweet golden corn kernels tossed in churned butter, Mexican spices, tangy lime zest, smoked paprika, and cotija cheese herbs."
  },

  // ==========================================================================
  // 3. FRANKIES (3 Items) - Page 1
  // ==========================================================================
  {
    id: "chicken-frankie",
    name: "Chicken Frankie",
    category: "frankie",
    badge: "Bestseller",
    diet: "non-veg",
    ingredients: "Griddled flaky paratha layered with beaten egg, tandoori spiced roasted chicken chunks, sliced onions, and tangy mint chutney."
  },
  {
    id: "paneer-frankie",
    name: "Paneer Frankie",
    category: "frankie",
    badge: "Popular",
    diet: "veg",
    ingredients: "Char-grilled soft malai paneer cubes tossed with crunchy bell peppers, house chaat spices, and pickled onions inside a warm paratha."
  },
  {
    id: "crispy-chicken-frankie",
    name: "Crispy Chicken Frankie",
    category: "frankie",
    badge: "Chef's Special",
    diet: "non-veg",
    ingredients: "Golden fried crunchy chicken tenders, shredded cabbage slaw, garlic mayonnaise, and tangy spice blend wrapped in flatbread."
  },

  // ==========================================================================
  // 4. COMBO OFFERS (4 Items) - Page 1
  // ==========================================================================
  {
    id: "combo-mojito-classic-fries",
    name: "Mojito + Classic Fries",
    category: "combo-offers",
    badge: "Value Combo",
    diet: "veg",
    ingredients: "Your choice of any craft chilled mojito paired with a piping-hot basket of golden Himalayan-salted classic french fries."
  },
  {
    id: "combo-mojito-peri-peri",
    name: "Mojito + Peri Peri Fries",
    category: "combo-offers",
    badge: "Spicy Pair",
    diet: "veg",
    ingredients: "Your choice of any sparkling fizzy mojito served alongside hot golden fries tossed in fiery African peri-peri seasoning."
  },
  {
    id: "combo-mojito-cheese-fries",
    name: "Mojito + Peri Peri Fries with Cheese Sauce",
    category: "combo-offers",
    badge: "Loaded Favorite",
    diet: "veg",
    ingredients: "Your choice of any refreshing craft mojito paired with hot peri-peri seasoned fries drenched in velvety molten cheddar cheese sauce."
  },
  {
    id: "combo-mojito-chicken-fries",
    name: "Mojito + Chicken Loaded Fries",
    category: "combo-offers",
    badge: "Feast Combo",
    diet: "non-veg",
    ingredients: "Your choice of any signature bubbly mojito paired with an indulgent platter of crispy fries topped with spiced shredded chicken, cheese, and aioli."
  },

  // ==========================================================================
  // 5. UFO BURGERS (4 Items) - Page 2 (Taste of the House)
  // ==========================================================================
  {
    id: "classic-chicken-zinger",
    name: "Classic Chicken Zinger",
    category: "burgers",
    badge: "Signature UFO",
    diet: "non-veg",
    ingredients: "Crispy double-crunch zinger chicken fillet, melted cheddar cheese, shredded iceberg lettuce, and tangy garlic herb mayo pressed inside a toasted UFO saucer bun."
  },
  {
    id: "classic-veg-zinger",
    name: "Classic Veg Zinger",
    category: "burgers",
    badge: "Crispy Favorite",
    diet: "veg",
    ingredients: "Spiced golden vegetable patty, melted cheese slice, crisp greens, sliced pickles, and spicy zinger sauce sealed tight in a hot pressed UFO bun."
  },
  {
    id: "chocolate-ice-cream-ufo",
    name: "Chocolate with Ice Cream",
    category: "burgers",
    badge: "Sweet UFO",
    diet: "veg",
    ingredients: "Decadent dessert burger: warm UFO toasted bun sealing molten Belgian chocolate fudge, a cold scoop of vanilla bean ice cream, and roasted almond flakes."
  },
  {
    id: "chocolate-banana-ufo",
    name: "Chocolate with Banana",
    category: "burgers",
    badge: "Dessert Special",
    diet: "veg",
    ingredients: "Sweet UFO pressed bun oozing with warm dark chocolate hazelnut spread, caramelized fresh banana slices, and a touch of cinnamon."
  },

  // ==========================================================================
  // 6. SANDWICHES (3 Items) - Page 2
  // ==========================================================================
  {
    id: "veg-sandwich",
    name: "Veg Sandwich",
    category: "sandwiches",
    badge: "Healthy",
    diet: "veg",
    ingredients: "Crisp multi-grain toast layered with farm cucumbers, ripe tomatoes, sliced onions, cheese, and spicy coriander-mint chutney."
  },
  {
    id: "chicken-sandwich",
    name: "Chicken Sandwich",
    category: "sandwiches",
    badge: "Bestseller",
    diet: "non-veg",
    ingredients: "Golden grilled crusty bread stuffed with herb-roasted shredded chicken breast, cracked black pepper, and garlic mayonnaise."
  },
  {
    id: "club-sandwich",
    name: "Club Sandwich",
    category: "sandwiches",
    badge: "Chef's Special",
    diet: "non-veg",
    ingredients: "Double-decker toasted bread filled with spiced chicken, fried egg, cheddar cheese slice, fresh lettuce, and house sauce."
  },

  // ==========================================================================
  // 7. MILKSHAKES & COLD DRINKS (7 Items) - Page 2
  // ==========================================================================
  {
    id: "vanilla-milkshake",
    name: "Vanilla Milkshake",
    category: "milkshakes",
    badge: "Classic",
    diet: "veg",
    ingredients: "Madagascar vanilla bean gelato, whole dairy cream, and chilled full-fat milk whipped thick."
  },
  {
    id: "strawberry-milkshake",
    name: "Strawberry Milkshake",
    category: "milkshakes",
    badge: "Popular",
    diet: "veg",
    ingredients: "Fresh ripe strawberry coulis, strawberry ice cream, and chilled dairy crowned with whipped cream."
  },
  {
    id: "avocado-milkshake",
    name: "Avocado Milkshake",
    category: "milkshakes",
    badge: "Signature",
    diet: "veg",
    ingredients: "Fresh ripe Hass avocado butterfruit pulp, raw organic honey, sweetened condensed milk, and chilled dairy cream."
  },
  {
    id: "chocolate-milkshake",
    name: "Chocolate Milkshake",
    category: "milkshakes",
    badge: "Bestseller",
    diet: "veg",
    ingredients: "Belgian dark cocoa syrup, artisanal chocolate gelato, whole milk, and warm chocolate fudge swirl."
  },
  {
    id: "oreo-milkshake",
    name: "Oreo Milkshake",
    category: "milkshakes",
    badge: "Bestseller",
    diet: "veg",
    ingredients: "Crushed classic Oreo cookies blitzed with vanilla ice cream, rich dairy cream, and dark chocolate ganache."
  },
  {
    id: "cold-milo",
    name: "Cold Milo",
    category: "milkshakes",
    badge: "Nostalgic",
    diet: "veg",
    ingredients: "Chilled chocolate malt extract blended thick with cold milk, topped with a volcano mound of fresh Milo powder."
  },
  {
    id: "cold-coffee",
    name: "Cold Coffee",
    category: "milkshakes",
    badge: "Bestseller",
    diet: "veg",
    ingredients: "Double espresso shot blended with chilled milk, vanilla bean scoop, and rich caramel drizzle."
  },

  // ==========================================================================
  // 8. MOJITOS (9 Items)
  // ==========================================================================
  {
    id: "virgin-mojito",
    name: "Virgin Mojito",
    category: "mojitos",
    badge: "Classic",
    diet: "veg",
    ingredients: "Hand-muddled fresh spearmint leaves, juicy lime wedges, raw cane sugar syrup, and chilled sparkling club soda."
  },
  {
    id: "classic-mint-mojito",
    name: "Classic Mint Mojito",
    category: "mojitos",
    badge: "Extra Fresh",
    diet: "veg",
    ingredients: "Double crushed hill-grown mint leaves, zesty citrus cordial, ice crystals, and sparkling mountain soda."
  },
  {
    id: "blue-curacao-mojito",
    name: "Blue Curaçao Mojito",
    category: "mojitos",
    badge: "Signature",
    diet: "veg",
    ingredients: "Vibrant blue curaçao citrus syrup, fresh lemon juice, crushed mint sprigs, and effervescent lemon soda."
  },
  {
    id: "green-apple-mojito",
    name: "Green Apple Mojito",
    category: "mojitos",
    badge: "Crisp & Tangy",
    diet: "veg",
    ingredients: "Tart granny smith green apple nectar, bruised garden spearmint, lime wedges, and fizzy chilled soda."
  },
  {
    id: "watermelon-mojito",
    name: "Watermelon Mojito",
    category: "mojitos",
    badge: "Summer Cooler",
    diet: "veg",
    ingredients: "Fresh ruby watermelon crush, hand-torn mint leaves, freshly squeezed lime juice, and sparkling club soda."
  },
  {
    id: "passion-fruit-mojito",
    name: "Passion Fruit Mojito",
    category: "mojitos",
    badge: "Exotic",
    diet: "veg",
    ingredients: "Vibrant tropical passion fruit pulp, muddled citrus wheels, fresh mint sprigs, and bubbling soda on ice."
  },
  {
    id: "blueberry-mojito",
    name: "Blueberry Mojito",
    category: "mojitos",
    badge: "Berry Burst",
    diet: "veg",
    ingredients: "Wild purple blueberry coulis, crushed fresh mint leaves, tart lemon juice, and chilled sparkling soda."
  },
  {
    id: "pina-colada-mojito",
    name: "Piña Colada Mojito",
    category: "mojitos",
    badge: "Tropical",
    diet: "veg",
    ingredients: "Sweet pineapple nectar, velvety coconut cream, crushed spearmint sprigs, lime, and chilled sparkling soda."
  },
  {
    id: "bubble-gum-mojito",
    name: "Bubble Gum Mojito",
    category: "mojitos",
    badge: "Fun & Sweet",
    diet: "veg",
    ingredients: "Sweet nostalgic bubble gum cordial, hand-bruised garden mint, tangy lemon juice, and effervescent soda."
  }
];
