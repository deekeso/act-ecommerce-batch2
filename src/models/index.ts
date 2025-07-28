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
  { name: 'Baby & Kids', subcategories: ['Baby Gear', 'Kids’ Clothing', 'Educational Toys'] },
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
    image: 'https://m.media-amazon.com/images/I/711+1ySE4BL._AC_SL1500_.jpg',
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
]

export const banner = []
