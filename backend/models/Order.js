const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: {
      type: [orderItemSchema],
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: 'Order must contain at least one item.',
      },
      required: true,
    },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paypalOrderId: { type: String, default: null },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
