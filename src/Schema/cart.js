const mongoose = require('mongoose');

// Define the schema for the cart item
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define model for the cart schema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
