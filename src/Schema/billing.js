// const mongoose = require('mongoose');

// const billingSchema = new mongoose.Schema({
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' },
//       productAmount: { type: Number, required: true },
//       productQty: { type: Number, required: true },
//       productSize: { type: String, required: true },
//       orderId: { type: String, required: true },
//     }
//   ],
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Users' },
//   totalAmount: { type: String, required: true },
//   addressId: { type: String },
//   status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Billing', billingSchema);
const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productAmount: { type: Number, required: true },
    productQty: { type: Number, required: true },
    productSize: { type: String, required: true }
  }],
  totalAmount: { type: Number, required: true },
  orderId: { type: String, unique: true, required: true }, // Ensure orderId is unique and required
  status: { type: String, required: true },
  paymentId: { type: String },
  addressId: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
