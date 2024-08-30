const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",

          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    orderId: {
      type: Number,
    },
    addressId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      // enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      enum: [
        "Pending",
        "Transit",
        "Out for Delivery",
        "Completed",
        "Return Requested",
        "Return Received",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
