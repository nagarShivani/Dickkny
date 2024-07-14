const mongoose = require('mongoose');

// Define the schema for the cart item
const wishListItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true
  },
  size: {
    type: String,
    // required: true,
  }

});

// Define the schema for the cart
const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  items: [wishListItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Define model for the cart schema
const Cart = mongoose.model('WishList', wishlistSchema);

module.exports = Cart;
