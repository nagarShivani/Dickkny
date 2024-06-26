const mongoose = require("mongoose");

const product = new mongoose.Schema({
  
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId ,ref:"Users"},
  categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  brandId: { type: mongoose.Schema.Types.ObjectId ,ref:"brand"},
  price:{type:String},
  salePrice:{type:String,required:true},
  description: { type: String },
  tag: { type: String },
  productInformation: { type: String },
  additionalInformation: { type: String },
  image: { type: String },
  multipleimage: { type: Array },
  size:  [{ type: mongoose.Schema.Types.ObjectId, ref: "size" }],
  color:[{ type: mongoose.Schema.Types.ObjectId, ref: "color" }],

},{timestamps:true});

module.exports = mongoose.model("product", product);
