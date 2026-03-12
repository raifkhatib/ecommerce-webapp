const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

// POST /api/orders
router.post('/', protect, async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }
    if (totalPrice === undefined || totalPrice === null || totalPrice < 0) {
      return res.status(400).json({ message: 'Please provide a valid totalPrice' });
    }
    for (const item of orderItems) {
      if (!item.product || !item.qty || !item.price) {
        return res.status(400).json({ message: 'Each order item must have product, qty and price' });
      }
    }
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/myorders — must be before /:id
router.get('/myorders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      'orderItems.product',
      'name price'
    );
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'orderItems.product',
      'name price'
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
