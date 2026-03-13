require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'UltraWide 34-inch Monitor',
    description: 'Immersive curved monitor with sharp color accuracy and multiple connectivity options.',
    price: 329.99,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    stock: 28,
    category: 'Electronics',
  },
  {
    name: 'Wireless Ergonomic Mouse',
    description: 'Comfort-first wireless mouse with adjustable DPI and long battery life.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    stock: 72,
    category: 'Electronics',
  },
  {
    name: 'Smart Home Hub Speaker',
    description: 'Voice-enabled smart speaker that connects your home devices in one place.',
    price: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?w=400',
    stock: 40,
    category: 'Electronics',
  },
  {
    name: 'Compact 4K Action Camera',
    description: 'Rugged waterproof camera with 4K capture and stabilization for every adventure.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1519183071298-a2962eadc8c2?w=400',
    stock: 33,
    category: 'Electronics',
  },
  {
    name: 'USB-C Charging Station',
    description: 'Multi-port charging station for laptops, phones, and accessories with fast charging.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
    stock: 55,
    category: 'Electronics',
  },
  {
    name: 'Classic Oxford Shirt',
    description: 'Crisp cotton button-down designed for office days and smart casual weekends.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 60,
    category: 'Clothing',
  },
  {
    name: 'Cozy Knit Cardigan',
    description: 'Soft knit cardigan with a relaxed fit and warm layered style.',
    price: 42.5,
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    stock: 48,
    category: 'Clothing',
  },
  {
    name: 'Everyday Essentials Hoodie',
    description: 'Plush fleece hoodie with a roomy fit and reinforced stitching.',
    price: 49.0,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400',
    stock: 70,
    category: 'Clothing',
  },
  {
    name: 'Performance Running Shorts',
    description: 'Lightweight, breathable shorts with moisture-wicking fabric and secure pockets.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=400',
    stock: 80,
    category: 'Clothing',
  },
  {
    name: 'Designing Data-Intensive Applications',
    description: 'A practical guide to building reliable, scalable, and maintainable data systems.',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1455885666463-215d0f63b31c?w=400',
    stock: 35,
    category: 'Books',
  },
  {
    name: 'Deep Work',
    description: 'Learn strategies for focused success in a distracted world.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=400',
    stock: 50,
    category: 'Books',
  },
  {
    name: 'The Lean Startup',
    description: 'A modern framework for building products faster with validated learning.',
    price: 21.5,
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400',
    stock: 44,
    category: 'Books',
  },
  {
    name: 'Adjustable Dumbbell Set',
    description: 'Space-saving dumbbells with quick-change weight settings for full-body workouts.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1517964603305-11c0f6f66012?w=400',
    stock: 18,
    category: 'Sports',
  },
  {
    name: 'Premium Yoga Mat',
    description: 'Non-slip, cushioned yoga mat for stability, comfort, and easy cleaning.',
    price: 32.99,
    imageUrl: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400',
    stock: 65,
    category: 'Sports',
  },
  {
    name: 'Modern LED Floor Lamp',
    description: 'Slim, energy-efficient floor lamp with warm ambient lighting.',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=400',
    stock: 27,
    category: 'Home',
  },
  {
    name: 'Ceramic Dinnerware Set',
    description: 'Durable 16-piece ceramic dinnerware set for everyday dining.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    stock: 36,
    category: 'Home',
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    await Product.createIndexes();
    console.log('Database seeded successfully with sample products!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
