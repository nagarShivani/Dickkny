const mongoose = require("mongoose");
const enquiry = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  quantity: { type: String, required: true },
  product: { type: String, required: true },
  message: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model("enquiry", enquiry);
