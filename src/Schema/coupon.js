const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    discountValue: { type: String  },
    discountValuePercentage: { type: String},

    expiryDate: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("coupon", couponSchema);
