const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true },
    discountValue: { type: String, required: true },
    expiryDate: { type: String, required: true },
    isActive: {type: Boolean, default: true},
}, { timestamps: true });

module.exports = mongoose.model("coupon", couponSchema);
