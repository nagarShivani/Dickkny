const mongoose = require("mongoose");
const Rating = new mongoose.Schema({
  rating: { type: Number, required: true },
  comments: { type: String},
  productId: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true,},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Users',required:true},
},{timestamps:true});

module.exports = mongoose.model("Rating", Rating);
