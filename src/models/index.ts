import banner1 from '@/assets/banners/banner-1.png'
import banner2 from '@/assets/banners/banner-2.png'
import banner3 from '@/assets/banners/banner-3.png'
import banner4 from '@/assets/banners/banner-4.png'
import banner5 from '@/assets/banners/banner-5.png'

export const categories = [
  { name: 'Electronics', subcategories: ['Computers', 'Phones', 'Gadgets', 'Accessories'] },
  {
    name: 'Clothing & Apparel',
    subcategories: ["Men's Clothing", "Women's Clothing", "Children's Clothing", 'Shoes', 'Accessories'],
  },
  {
    name: 'Home & Living',
    subcategories: ['Furniture', 'Home Décor', 'Kitchenware', 'Appliances'],
  },
  // {
  //   name: 'Health & Beauty',
  //   subcategories: ['Skincare', 'Makeup', 'Health Supplements', 'Personal Care'],
  // },
  {
    name: 'Toys & Games',
    subcategories: ["Children's Toys", 'Board Games', 'Video Games', 'Educational Toys'],
  },
  {
    name: 'Groceries & Food',
    subcategories: ['Fresh Produce', 'Packaged Goods', 'Beverages', 'Snacks'],
  },
  {
    name: 'Sports & Outdoors',
    subcategories: ['Sports Equipment', 'Outdoor Gear', 'Fitness Accessories'],
  },
  // {
  //   name: 'Books & Stationery',
  //   subcategories: ['Books', 'Office Supplies', 'Art Materials', 'School Stationery'],
  // },
  // {
  //   name: 'Automotive',
  //   subcategories: ['Car Parts', 'Accessories', 'Tools', 'Vehicle Maintenance'],
  // },
  {
    name: 'Pet Supplies',
    subcategories: ['Pet Food', 'Toys', 'Grooming Products', 'Pet Accessories'],
  },
  { name: 'Jewelry & Watches', subcategories: ['Rings', 'Necklaces', 'Earrings', 'Watches'] },
  {
    name: 'Office & Business Supplies',
    subcategories: ['Office Furniture', 'Office Equipment', 'Business Supplies'],
  },
  { name: 'Entertainment', subcategories: ['Movies', 'Music', 'Tickets', 'Events'] },
  {
    name: 'Arts & Crafts',
    subcategories: ['Painting Supplies', 'Knitting', 'Scrapbooking', 'Hobby Supplies'],
  },
  {
    name: 'Technology & Gadgets',
    subcategories: ['Tech Accessories', 'Smart Devices', 'Smart Home Devices'],
  },
  { name: 'Travel & Leisure', subcategories: ['Luggage', 'Travel Accessories', 'Camping Gear'] },
  { name: 'Food & Beverages', subcategories: ['Specialty Foods', 'Beverages', 'Condiments'] },
  { name: 'Baby & Kids', subcategories: ['Baby Gear', 'Kids Clothing', 'Educational Toys'] },
]

export const bannerImages = [
  {
    source: banner1,
    heading: 'Transform Your Home with Our Stylish Furniture',
    subheading: 'From cozy living rooms to elegant dining spaces find the perfect pieces for every room.',
    cta: 'Shop Now & Redefine Your Space',
  },
  {
    source: banner2,
    heading: 'Big Tech Sale Up!',
    subheading: `Whether you're working, gaming, or streaming, we have the perfect device for you.`,
    cta: "Grab the Best Deals Before They're Gone",
  },
  {
    source: banner3,
    heading: 'Gear Up with the Best Tools',
    subheading: `Whether you're working, gaming, or streaming, we have the perfect device for you.`,
    cta: 'Shop Tools & Upgrade Your Setup',
  },
  {
    source: banner4,
    heading: `Back to School Supplies!`,
    subheading: `"Get everything you need for a successful school year – pens, notebooks, backpacks, and more!”`,
    cta: 'Shop School Essentials Today',
  },
  {
    source: banner5,
    heading: `Fun for Every Kid Explore Our Toy Collection`,
    subheading: `From educational toys to the latest action figures, we've got something for every age.`,
    cta: 'Find the Perfect Toy for Your Little One',
  },
]
export const popularProducts = [
  {
    id: 'a1b2c3d4-1111-2222-3333-444455556666',
    label: 'Comfy Chair',
    value: 'Comfy Chair',
    price: 12500,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81LP-6IXVXL._AC_SL1500_.jpg',
    description: 'Ergonomic chair with lumbar support for all-day comfort.',
    link: '/products/a1b2c3d4-1111-2222-3333-444455556666',
    category: 'Home & Living',
    subcategory: 'Furniture',
  },
  {
    id: 'b2c3d4e5-2222-3333-4444-555566667777',
    label: 'Bluetooth Speaker',
    value: 'Bluetooth Speaker',
    price: 3499,
    image:
      'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Portable speaker with deep bass and 12-hour battery life.',
    link: '/products/b2c3d4e5-2222-3333-4444-555566667777',
    category: 'Electronics',
    subcategory: 'Gadgets',
  },
  {
    id: 'c3d4e5f6-3333-4444-5555-666677778888',
    price: 8900,
    image:
      'https://images.unsplash.com/photo-1740679953649-2b30f3fa0314?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Multi-speed mixer for all your baking and cooking needs.',
    link: '/products/c3d4e5f6-3333-4444-5555-666677778888',
    label: 'Kitchen Mixer',
    value: 'Kitchen Mixer',
    category: 'Home & Living',
    subcategory: 'Kitchenware',
  },
  {
    id: 'd4e5f607-4444-5555-6666-777788889999',
    price: 1999,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Ergonomic wireless mouse with adjustable DPI settings.',
    link: '/products/d4e5f607-4444-5555-6666-777788889999',
    label: 'Wireless Mouse',
    value: 'Wireless Mouse',
    category: 'Electronics',
    subcategory: 'Accessories',
  },
]

export const products = [
  {
    id: 'a1b2c3d4-1111-2222-3333-444455556666',
    label: 'Comfy Chair',
    value: 'Comfy Chair',
    price: 12500,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81LP-6IXVXL._AC_SL1500_.jpg',
    description: 'Ergonomic chair with lumbar support for all-day comfort.',
    link: '/products/a1b2c3d4-1111-2222-3333-444455556666',
    category: 'Home & Living',
    subcategory: 'Furniture',
  },
  {
    id: 'b2c3d4e5-2222-3333-4444-555566667777',
    label: 'Bluetooth Speaker',
    value: 'Bluetooth Speaker',
    price: 3499,
    image:
      'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Portable speaker with deep bass and 12-hour battery life.',
    link: '/products/b2c3d4e5-2222-3333-4444-555566667777',
    category: 'Electronics',
    subcategory: 'Gadgets',
  },
  {
    id: 'c3d4e5f6-3333-4444-5555-666677778888',
    price: 8900,
    image:
      'https://images.unsplash.com/photo-1740679953649-2b30f3fa0314?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Multi-speed mixer for all your baking and cooking needs.',
    link: '/products/c3d4e5f6-3333-4444-5555-666677778888',
    label: 'Kitchen Mixer',
    value: 'Kitchen Mixer',
    category: 'Home & Living',
    subcategory: 'Kitchenware',
  },
  {
    id: 'd4e5f607-4444-5555-6666-777788889999',
    price: 1999,
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Ergonomic wireless mouse with adjustable DPI settings.',
    link: '/products/d4e5f607-4444-5555-6666-777788889999',
    label: 'Wireless Mouse',
    value: 'Wireless Mouse',
    category: 'Electronics',
    subcategory: 'Accessories',
  },
  {
    id: 'e5f60718-5555-6666-7777-888899990000',
    price: 15999,
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Feature-rich smart watch with health tracking and GPS.',
    link: '/products/e5f60718-5555-6666-7777-888899990000',
    label: 'Smart Watch',
    value: 'Smart Watch',
    category: 'Technology & Gadgets',
    subcategory: 'Smart Devices',
  },
  {
    id: 'f6071829-6666-7777-8888-999900001111',
    price: 3200,
    image: 'https://m.media-amazon.com/images/I/71RBlpE8s1L._AC_SL1500_.jpg',
    description: 'Energy-efficient LED lamp with adjustable brightness.',
    link: '/products/f6071829-6666-7777-8888-999900001111',
    label: 'LED Desk Lamp',
    value: 'LED Desk Lamp',
    category: 'Home & Living',
    subcategory: 'Appliances',
  },
  {
    id: '0718293a-7777-8888-9999-000011112222',
    price: 7999,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Over-ear headphones with premium noise cancellation.',
    link: '/products/0718293a-7777-8888-9999-000011112222',
    label: 'Noise Cancelling Headphones',
    value: 'Noise Cancelling Headphones',
    category: 'Electronics',
    subcategory: 'Accessories',
  },
  {
    id: '18293a4b-8888-9999-0000-111122223333',
    price: 2500,
    image:
      'https://images.unsplash.com/photo-1706275399494-fb26bbc5da63?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Compact 10,000mAh power bank with fast charging.',
    link: '/products/18293a4b-8888-9999-0000-111122223333',
    label: 'Portable Charger',
    value: 'Portable Charger',
    category: 'Electronics',
    subcategory: 'Accessories',
  },
  {
    id: '293a4b5c-9999-0000-1111-222233334444',
    price: 5999,
    image:
      'https://images.unsplash.com/photo-1626155399627-86488538895d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Mechanical keyboard with customizable RGB lighting.',
    link: '/products/293a4b5c-9999-0000-1111-222233334444',
    label: 'Gaming Keyboard',
    value: 'Gaming Keyboard',
    category: 'Electronics',
    subcategory: 'Gadgets',
  },
  {
    id: '3a4b5c6d-0000-1111-2222-333344445555',
    price: 12999,
    image:
      'https://images.unsplash.com/photo-1636569608385-58efc32690ea?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'WiFi thermostat with learning capabilities and app control.',
    link: '/products/3a4b5c6d-0000-1111-2222-333344445555',
    label: 'Smart Thermostat',
    value: 'Smart Thermostat',
    category: 'Technology & Gadgets',
    subcategory: 'Smart Home Devices',
  },
  {
    id: '4b5c6d7e-1111-2222-3333-444455556666',
    price: 4300,
    image:
      'https://images.unsplash.com/photo-1738520420652-0c47cea3922b?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fast boiling kettle with automatic shut-off feature.',
    link: '/products/4b5c6d7e-1111-2222-3333-444455556666',
    label: 'Electric Kettle',
    value: 'Electric Kettle',
    category: 'Home & Living',
    subcategory: 'Appliances',
  },
  {
    id: '5c6d7e8f-2222-3333-4444-555566667777',
    price: 2200,
    image:
      'https://images.unsplash.com/photo-1601925268030-e734cf5bdc52?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Non-slip yoga mat with extra cushioning for comfort.',
    link: '/products/5c6d7e8f-2222-3333-4444-555566667777',
    label: 'Yoga Mat',
    value: 'Yoga Mat',
    category: 'Sports & Outdoors',
    subcategory: 'Fitness Accessories',
  },
  {
    id: '6d7e8f90-3333-4444-5555-666677778888',
    price: 3999,
    image:
      'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fast wireless charger compatible with most smartphones.',
    link: '/products/6d7e8f90-3333-4444-5555-666677778888',
    label: 'Wireless Charger',
    value: 'Wireless Charger',
    category: 'Electronics',
    subcategory: 'Accessories',
  },
  {
    id: '7e8f9011-4444-5555-6666-777788889999',
    price: 5400,
    image:
      'https://images.unsplash.com/photo-1461988279488-1dac181a78f9?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Electric burr grinder for fresh coffee grounds every time.',
    link: '/products/7e8f9011-4444-5555-6666-777788889999',
    label: 'Coffee Grinder',
    value: 'Coffee Grinder',
    category: 'Home & Living',
    subcategory: 'Appliances',
  },
  {
    id: '8f901122-5555-6666-7777-888899990000',
    price: 1800,
    image:
      'https://images.unsplash.com/photo-1622574372197-b8e9fe9f522c?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Color-changing bulb controllable via smartphone app.',
    link: '/products/8f901122-5555-6666-7777-888899990000',
    label: 'Smart Light Bulb',
    value: 'Smart Light Bulb',
    category: 'Home & Living',
    subcategory: 'Appliances',
  },
  {
    id: '90112233-6666-7777-8888-999900001111',
    price: 8999,
    image:
      'https://images.unsplash.com/photo-1665860455423-166cab57c383?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Track your daily activity and sleep patterns.',
    link: '/products/90112233-6666-7777-8888-999900001111',
    label: 'Fitness Tracker',
    value: 'Fitness Tracker',
    category: 'Technology & Gadgets',
    subcategory: 'Smart Devices',
  },
  {
    id: '01122334-7777-8888-9999-000011112222',
    price: 35000,
    image:
      'https://images.unsplash.com/photo-1648204834832-78e68052c04f?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Compact scooter with 20-mile range and foldable design.',
    link: '/products/01122334-7777-8888-9999-000011112222',
    label: 'Electric Scooter',
    value: 'Electric Scooter',
    category: 'Sports & Outdoors',
    subcategory: 'Outdoor Gear',
  },
  {
    id: '11223345-8888-9999-0000-111122223333',
    price: 14999,
    image:
      'https://images.unsplash.com/photo-1603720913661-76d1053714e2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Waterproof camera perfect for outdoor adventures.',
    link: '/products/11223345-8888-9999-0000-111122223333',
    label: 'Action Camera',
    value: 'Action Camera',
    category: 'Electronics',
    subcategory: 'Gadgets',
  },
  {
    id: '22334456-9999-0000-1111-222233334444',
    price: 4999,
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'True wireless earbuds with noise cancellation.',
    link: '/products/22334456-9999-0000-1111-222233334444',
    label: 'Bluetooth Earbuds',
    value: 'Bluetooth Earbuds',
    category: 'Electronics',
    subcategory: 'Accessories',
  },
  {
    id: '33445567-0000-1111-2222-333344445555',
    price: 18500,
    image:
      'https://images.unsplash.com/photo-1670946839270-cc4febd43b09?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Comfortable chair designed for long gaming sessions.',
    link: '/products/33445567-0000-1111-2222-333344445555',
    label: 'Gaming Chair',
    value: 'Gaming Chair',
    category: 'Electronics',
    subcategory: 'Gadgets',
  },
  {
    id: 'fb004-1111-2222-3333-444455556666',
    label: 'Oreo Chocolate Sandwich Cookies',
    value: 'Oreo Chocolate Sandwich Cookies',
    price: 499,
    image: 'https://i5.walmartimages.com/asr/f4b2b9ae-a9d4-4c9e-8978-d5dbf8d866d1.2e7c923458a90653316559e94272a857.jpeg',
    description: 'Classic chocolate cookies with a sweet creme filling.',
    link: '/products/fb004-1111-2222-3333-444455556666',
    category: 'Food & Beverages',
    subcategory: 'Snacks',
  },
  {
    id: 'fb005-2222-3333-4444-555566667777',
    label: 'Pringles Original Potato Crisps',
    value: 'Pringles Original Potato Crisps',
    price: 299,
    image: 'https://tse2.mm.bing.net/th/id/OIP.dLKBIqzExhenOMG9obtwKgHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Crispy, stackable potato chips in the original salty flavor.',
    link: '/products/fb005-2222-3333-4444-555566667777',
    category: 'Food & Beverages',
    subcategory: 'Snacks',
  },
  {
    id: 'fb006-3333-4444-5555-666677778888',
    label: 'Coca-Cola 500ml Bottle',
    value: 'Coca-Cola 500ml Bottle',
    price: 199,
    image: 'https://www.bestwaywholesale.co.uk/img/products/1000/2/54491472.jpg',
    description: 'Refreshing cola drink with the classic Coca-Cola taste.',
    link: '/products/fb006-3333-4444-5555-666677778888',
    category: 'Food & Beverages',
    subcategory: 'Beverages',
  },

  {
    id: 'np001-1234-5678-9012-345678901234',
    label: 'ASUS ROG Strix G15',
    value: 'ASUS ROG Strix G15',
    price: 89999,
    image: 'https://www.laptopmedia.com/wp-content/uploads/2020/04/2-4-scaled-e1585829292540.jpg',
    description: 'ASUS ROG Strix G15 Gaming Laptop - AMD Ryzen 7, RTX 4060, 16GB DDR4, 512GB SSD, 15.6" 144Hz display.',
    link: '/products/np001-1234-5678-9012-345678901234',
    category: 'Electronics',
    subcategory: 'Computers',
  },
  {
    id: 'np002-2345-6789-0123-456789012345',
    label: 'Samsung Galaxy S24',
    value: 'Samsung Galaxy S24',
    price: 65999,
    image:
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Samsung Galaxy S24 5G smartphone with 128GB storage, 50MP triple camera system, and 6.2" Dynamic AMOLED display.',
    link: '/products/np002-2345-6789-0123-456789012345',
    category: 'Electronics',
    subcategory: 'Phones',
  },

  // Clothing & Apparel (completely missing from your current list)
  {
    id: 'np003-3456-7890-1234-567890123456',
    label: 'Nike Dri-FIT Tee',
    value: 'Nike Dri-FIT Tee',
    price: 1599,
    image: 'https://cf.shopee.ph/file/876b119a6d69dfc27802b15f0c2ac3ec',
    description:
      "Nike Dri-FIT men's t-shirt with moisture-wicking technology. 100% polyester, available in multiple colors.",
    link: '/products/np003-3456-7890-1234-567890123456',
    category: 'Clothing & Apparel',
    subcategory: "Men's Clothing",
  },
  {
    id: 'np004-4567-8901-2345-678901234567',
    label: 'Zara Floral Midi Dress',
    value: 'Zara Floral Midi Dress',
    price: 3999,
    image:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      "Zara women's floral midi dress with v-neck and short sleeves. Lightweight fabric perfect for summer occasions.",
    link: '/products/np004-4567-8901-2345-678901234567',
    category: 'Clothing & Apparel',
    subcategory: "Women's Clothing",
  },
  {
    id: 'np005-5678-9012-3456-789012345678',
    label: 'Nike Air Max 270',
    value: 'Nike Air Max 270',
    price: 7999,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Nike Air Max 270 running shoes featuring Max Air unit in heel, breathable mesh upper, and durable rubber outsole.',
    link: '/products/np005-5678-9012-3456-789012345678',
    category: 'Clothing & Apparel',
    subcategory: 'Shoes',
  },

  // Home & Living - Home Décor (missing)
  {
    id: 'np006-6789-0123-4567-890123456789',
    label: 'IKEA VÄXJÖ Canvas Print',
    value: 'IKEA VÄXJÖ Canvas Print',
    price: 2999,
    image:
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'IKEA VÄXJÖ abstract canvas print 50x70cm with black frame. Modern geometric design perfect for living spaces.',
    link: '/products/np006-6789-0123-4567-890123456789',
    category: 'Home & Living',
    subcategory: 'Home Décor',
  },

  // Toys & Games (completely missing)
  {
    id: 'np007-7890-1234-5678-901234567890',
    label: 'LEGO Classic Creative Bricks',
    value: 'LEGO Classic Creative Bricks',
    price: 4999,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6252/6252643ld.jpg',
    description: 'LEGO Classic Creative Bricks set (11005) with 900 pieces in 42 different colors. Ages 4+.',
    link: '/products/np007-7890-1234-5678-901234567890',
    category: 'Toys & Games',
    subcategory: "Children's Toys",
  },
  {
    id: 'np008-8901-2345-6789-012345678901',
    label: 'Staunton Tournament Chess Set',
    value: 'Staunton Tournament Chess Set',
    price: 6999,
    image: 'https://m.media-amazon.com/images/I/71oiSqoJlcL._AC_UL1500_.jpg',
    description:
      'Professional Staunton tournament chess set with weighted pieces, 3.75" king, and 20" folding wooden board.',
    link: '/products/np008-8901-2345-6789-012345678901',
    category: 'Toys & Games',
    subcategory: 'Board Games',
  },

  // Groceries & Food (completely missing)
  {
    id: 'np009-9012-3456-7890-123456789012',
    label: 'Organic Gala Apples',
    value: 'Organic Gala Apples',
    price: 599,
    image:
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Fresh organic Gala apples, 1kg pack. Sweet and crispy, USDA Organic certified, perfect for snacking.',
    link: '/products/np009-9012-3456-7890-123456789012',
    category: 'Groceries & Food',
    subcategory: 'Fresh Produce',
  },
  {
    id: 'np010-0123-4567-8901-234567890123',
    label: 'Blue Bottle Ethiopian Coffee',
    value: 'Blue Bottle Ethiopian Coffee',
    price: 1899,
    image: 'https://www.hispotion.com/wp-content/uploads/2016/10/blue_bottle_coffee.jpg',
    description:
      'Blue Bottle Ethiopian single-origin coffee beans, 250g. Medium roast with notes of blueberry and chocolate.',
    link: '/products/np010-0123-4567-8901-234567890123',
    category: 'Groceries & Food',
    subcategory: 'Beverages',
  },

  // Sports & Outdoors - Sports Equipment (missing)
  {
    id: 'np011-1234-5678-9012-345678901234',
    label: 'Wilson Pro Staff Tennis Racket',
    value: 'Wilson Pro Staff Tennis Racket',
    price: 8999,
    image: 'https://media.newitts.com/cdn/images/products/new-design/800x800/it100017a.jpg',
    description:
      'Wilson Pro Staff 97 v13 tennis racket, 315g weight, 16x19 string pattern. Preferred by professional players.',
    link: '/products/np011-1234-5678-9012-345678901234',
    category: 'Sports & Outdoors',
    subcategory: 'Sports Equipment',
  },

  // Pet Supplies (completely missing)
  {
    id: 'np012-2345-6789-0123-456789012345',
    label: 'Royal Canin Adult Dog Food',
    value: 'Royal Canin Adult Dog Food',
    price: 3999,
    image: 'https://ph-test-11.slatic.net/p/35eb13b1b05eced915b00650969567b3.jpg',
    description:
      'Royal Canin Adult dry dog food with real chicken as first ingredient. Complete nutrition for dogs 1-7 years, 5kg bag.',
    link: '/products/np012-2345-6789-0123-456789012345',
    category: 'Pet Supplies',
    subcategory: 'Pet Food',
  },
  {
    id: 'np013-3456-7890-1234-567890123456',
    label: 'KONG Feather Mouse Toy',
    value: 'KONG Feather Mouse Toy',
    price: 899,
    image: 'https://www.petmania.ie/wp-content/uploads/2024/04/88739.jpg',
    description:
      'KONG Feather Mouse cat toy with natural feathers and catnip. Interactive design stimulates hunting instincts.',
    link: '/products/np013-3456-7890-1234-567890123456',
    category: 'Pet Supplies',
    subcategory: 'Toys',
  },

  // Jewelry & Watches (completely missing)
  {
    id: 'np014-4567-8901-2345-678901234567',
    label: 'Pandora Silver Chain Necklace',
    value: 'Pandora Silver Chain Necklace',
    price: 12999,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Pandora sterling silver chain necklace, 45cm length with heart pendant. Comes with authentic Pandora gift box.',
    link: '/products/np014-4567-8901-2345-678901234567',
    category: 'Jewelry & Watches',
    subcategory: 'Necklaces',
  },
  {
    id: 'np015-5678-9012-3456-789012345678',
    label: 'Casio Classic Analog Watch',
    value: 'Casio Classic Analog Watch',
    price: 24999,
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Casio MTP-1303L classic analog watch with genuine leather strap, water resistant 30M, 3-year battery life.',
    link: '/products/np015-5678-9012-3456-789012345678',
    category: 'Jewelry & Watches',
    subcategory: 'Watches',
  },
  {
    id: '1234-5678-9012-3456-789012345678',
    label: 'Classic Wristwatch',
    value: 'Classic Wristwatch',
    price: 24999,
    image:
      'https://images.antiquesatlas.com/dealer-stock-images/thevintagewristwatch/Gents_9ct_gold_Longines_wrist__as170a5010z.jpg',
    description: 'Timeless analog wristwatch with leather strap.',
    link: '/products/1234-5678-9012-3456-789012345678',
    category: 'Jewelry & Watches',
    subcategory: 'Watches',
  },

  // Office & Business Supplies (completely missing)
  {
    id: 'np016-6789-0123-4567-890123456789',
    label: 'Herman Miller Sayl Office Desk',
    value: 'Herman Miller Sayl Office Desk',
    price: 18999,
    image: 'https://fittingchairs.com/wp-content/uploads/2021/12/3__42063.1623703788-2048x2048.jpg',
    description:
      'Herman Miller modern office desk with built-in drawers, cable management, and adjustable height. 120cm width.',
    link: '/products/np016-6789-0123-4567-890123456789',
    category: 'Office & Business Supplies',
    subcategory: 'Office Furniture',
  },
  {
    id: 'np017-7890-1234-5678-901234567890',
    label: 'Canon PIXMA All-in-One Printer',
    value: 'Canon PIXMA All-in-One Printer',
    price: 12999,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6290/6290017_sd.jpg',
    description: 'Canon PIXMA TS3320 wireless all-in-one inkjet printer with print, scan, copy, and mobile connectivity.',
    link: '/products/np017-7890-1234-5678-901234567890',
    category: 'Office & Business Supplies',
    subcategory: 'Office Equipment',
  },

  // Entertainment (completely missing)
  {
    id: 'np018-8901-2345-6789-012345678901',
    label: 'Marvel Studios Phase 4 Collection',
    value: 'Marvel Studios Phase 4 Collection',
    price: 4999,
    image: 'https://tse3.mm.bing.net/th/id/OIP.8MW_qLfPJIJKujkoNdVJ8gAAAA?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
    description:
      'Marvel Studios Phase 4 Blu-ray collection featuring 10 movies including Black Widow, Eternals, and Spider-Man.',
    link: '/products/np018-8901-2345-6789-012345678901',
    category: 'Entertainment',
    subcategory: 'Movies',
  },

  // Arts & Crafts (completely missing)
  {
    id: 'np019-9012-3456-7890-123456789012',
    label: 'Winsor & Newton Acrylic Paint Set',
    value: 'Winsor & Newton Acrylic Paint Set',
    price: 3599,
    image: 'https://tse3.mm.bing.net/th/id/OIP.lrsZquyQWcqd3VFUkaPbIgAAAA?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
    description: 'Winsor & Newton Galeria acrylic paint set with 24 colors (60ml tubes) plus brushes and palette knife.',
    link: '/products/np019-9012-3456-7890-123456789012',
    category: 'Arts & Crafts',
    subcategory: 'Painting Supplies',
  },
  {
    id: 'np020-0123-4567-8901-234567890123',
    label: 'Lion Brand Learn to Knit Kit',
    value: 'Lion Brand Learn to Knit Kit',
    price: 2999,
    image: 'https://2.bp.blogspot.com/-8Z49ofo9mLY/Uwk-b_sPSQI/AAAAAAAADbs/44kh51KuJwI/s1600/LionLearntoKnit.jpg',
    description: 'Lion Brand complete beginner knitting kit with yarn, needles, stitch markers, and instruction book.',
    link: '/products/np020-0123-4567-8901-234567890123',
    category: 'Arts & Crafts',
    subcategory: 'Knitting',
  },

  // Travel & Leisure (completely missing)
  {
    id: 'np021-1234-5678-9012-345678901234',
    label: 'Osprey Farpoint 40L Backpack',
    value: 'Osprey Farpoint 40L Backpack',
    price: 8999,
    image: 'https://tse4.mm.bing.net/th/id/OIP.8XKOXXqeXF6lvmnyiD5dRQHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3',
    description:
      'Osprey Farpoint 40L travel backpack with zip-off daypack, multiple compartments, and padded shoulder straps.',
    link: '/products/np021-1234-5678-9012-345678901234',
    category: 'Travel & Leisure',
    subcategory: 'Luggage',
  },
  {
    id: 'np022-2345-6789-0123-456789012345',
    label: 'Coleman Sundome 4-Person Tent',
    value: 'Coleman Sundome 4-Person Tent',
    price: 15999,
    image: 'https://cdn.snowys.com.au/content/images/thumbs/0028490_sundome-4-person-dome-tent.jpeg',
    description:
      'Coleman Sundome 4-person camping tent with WeatherTec system, easy 10-minute setup, and spacious interior.',
    link: '/products/np022-2345-6789-0123-456789012345',
    category: 'Travel & Leisure',
    subcategory: 'Camping Gear',
  },

  // Food & Beverages (separate from Groceries)
  {
    id: 'np023-3456-7890-1234-567890123456',
    label: "Frank's RedHot Original Sauce",
    value: "Frank's RedHot Original Sauce",
    price: 1299,
    image: 'https://img.lazcdn.com/g/p/90340324f68857f62056414e7f500859.jpg_720x720q80.jpg',
    description: "Frank's RedHot Original cayenne pepper sauce, 354ml bottle. The original Buffalo wing sauce since 1920.",
    link: '/products/np023-3456-7890-1234-567890123456',
    category: 'Food & Beverages',
    subcategory: 'Condiments',
  },

  // Baby & Kids (completely missing)
  {
    id: 'np024-4567-8901-2345-678901234567',
    label: 'Chicco Bravo LE Quick-Fold Stroller',
    value: 'Chicco Bravo LE Quick-Fold Stroller',
    price: 32999,
    image:
      'https://i5.walmartimages.com/seo/Chicco-Bravo-Quick-Fold-Stroller-Black-Black_2a5ed73a-639b-4267-bcc7-4f2c2d6b3e78.3e0c334eb0e9d4a8788a526a978c08aa.jpeg',
    description:
      'Chicco Bravo LE lightweight stroller with one-hand quick fold, adjustable handlebar, and large storage basket.',
    link: '/products/np024-4567-8901-2345-678901234567',
    category: 'Baby & Kids',
    subcategory: 'Baby Gear',
  },
  {
    id: 'np025-5678-9012-3456-789012345678',
    label: 'Melissa & Doug World Map Puzzle',
    value: 'Melissa & Doug World Map Puzzle',
    price: 1999,
    image: 'https://i.ebayimg.com/images/g/GJ8AAOSwNeJfJADy/s-l640.jpg',
    description: 'Melissa & Doug 33-piece wooden world map puzzle with country names and capital cities. Ages 6+.',
    link: '/products/np025-5678-9012-3456-789012345678',
    category: 'Baby & Kids',
    subcategory: 'Educational Toys',
  },
]

export const banner = []
