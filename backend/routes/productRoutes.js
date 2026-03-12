const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const products = await Product.find(filter);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// POST /api/products (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, description, price, imageUrl, stock, category } = req.body;
    if (!name || !description || !imageUrl || price === undefined || stock === undefined || !category) {
      return res
        .status(400)
        .json({ message: 'Please provide name, description, imageUrl, price, stock and category' });
    }
    const product = await Product.create({ name, description, price, imageUrl, stock, category });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
