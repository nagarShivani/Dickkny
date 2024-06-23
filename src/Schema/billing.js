const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' },
      productAmount: { type: Number, required: true },
      productQty: { type: Number, required: true },
      productSize: { type: String, required: true },
      orderId: { type: String, required: true },
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
  totalAmount: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billing', billingSchema);
