const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
