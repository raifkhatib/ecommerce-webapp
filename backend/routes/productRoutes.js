const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

const SYNONYM_MAP = {
  clothes: 'clothing', clothing: 'clothing', apparel: 'clothing',
  fashion: 'clothing', wear: 'clothing', garment: 'clothing',
  phone: 'phone', smartphone: 'phone', mobile: 'phone', cellphone: 'phone',
  laptop: 'laptop', notebook: 'laptop', computer: 'laptop', pc: 'laptop',
  keyboard: 'keyboard', keys: 'keyboard',
  book: 'book', novel: 'book', reading: 'book',
  sport: 'sport', fitness: 'sport', exercise: 'sport', gym: 'sport', workout: 'sport',
  home: 'home', house: 'home', decor: 'home', furniture: 'home', living: 'home',
  tee: 'shirt', tshirt: 'shirt', 't-shirt': 'shirt',
  sneakers: 'shoes', trainers: 'shoes', footwear: 'shoes',
  headphone: 'headphone', earphone: 'headphone', earbuds: 'headphone', headset: 'headphone',
  monitor: 'monitor', screen: 'monitor', display: 'monitor',
  camera: 'camera', cam: 'camera',
  mouse: 'mouse', mice: 'mouse',
  speaker: 'speaker', audio: 'speaker',
  lamp: 'lamp', light: 'lamp', lighting: 'lamp',
  dumbbell: 'dumbbell', weight: 'dumbbell',
  yoga: 'yoga',
};

function generateSearchVariants(rawTerm) {
  const variants = new Set();
  const term = rawTerm.toLowerCase().trim();
  variants.add(term);

  const suffixes = [
    { suffix: 'ies', replacement: 'y' },
    { suffix: 'ves', replacement: 'f' },
    { suffix: 'ses', replacement: 's' },
    { suffix: 'xes', replacement: 'x' },
    { suffix: 'zes', replacement: 'z' },
    { suffix: 'ches', replacement: 'ch' },
    { suffix: 'shes', replacement: 'sh' },
    { suffix: 'es', replacement: '' },
    { suffix: 's', replacement: '' },
    { suffix: 'ing', replacement: '' },
    { suffix: 'ed', replacement: '' },
    { suffix: 'er', replacement: '' },
  ];

  for (const { suffix, replacement } of suffixes) {
    if (term.endsWith(suffix)) {
      const stem = term.slice(0, term.length - suffix.length) + replacement;
      if (stem.length >= 2) variants.add(stem);
    }
  }

  for (const variant of Array.from(variants)) {
    if (SYNONYM_MAP[variant]) variants.add(SYNONYM_MAP[variant]);
  }

  return Array.from(variants);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      const variants = generateSearchVariants(search);
      const orConditions = [];
      for (const variant of variants) {
        orConditions.push({ name: { $regex: escapeRegex(variant), $options: 'i' } });
        orConditions.push({ category: { $regex: escapeRegex(variant), $options: 'i' } });
        orConditions.push({ description: { $regex: escapeRegex(variant), $options: 'i' } });
      }
      filter.$or = orConditions;
    }

    if (category) {
      filter.category = { $regex: `^${escapeRegex(category)}$`, $options: 'i' };
    }

    const regexResults = await Product.find(filter);

    let textResults = [];
    if (search) {
      try {
        textResults = await Product.find(
          { $text: { $search: search } },
          { score: { $meta: 'textScore' } }
        );
      } catch (e) {}
    }

    const seen = new Set();
    const products = [];
    for (const p of [...regexResults, ...textResults]) {
      const id = p._id.toString();
      if (!seen.has(id)) {
        seen.add(id);
        products.push(p);
      }
    }
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
      return res.status(400).json({ message: 'Please provide name, description, imageUrl, price, stock and category' });
    }
    const product = await Product.create({ name, description, price, imageUrl, stock, category });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
