require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 25,
    category: 'Electronics',
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches, perfect for gaming and typing.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400',
    stock: 40,
    category: 'Electronics',
  },
  {
    name: 'Running Sneakers',
    description: 'Lightweight and breathable running shoes with cushioned sole for maximum comfort.',
    price: 64.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 60,
    category: 'Clothing',
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with a slim fit, suitable for all seasons.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=400',
    stock: 30,
    category: 'Clothing',
  },
  {
    name: 'The Pragmatic Programmer',
    description: 'A must-read book for software developers covering best practices and career tips.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    stock: 50,
    category: 'Books',
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour playtime.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    stock: 35,
    category: 'Electronics',
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Database seeded successfully with sample products!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
