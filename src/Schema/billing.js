const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true,ref:'product'},
  userId: { type: mongoose.Schema.Types.ObjectId, required: true ,ref: 'Users'},
  orderId: { type: String,},
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billing', billingSchema);
