const mongoose = require("mongoose");
const Images = new mongoose.Schema({
  image: { type: String},
},{timestamps:true});

module.exports = mongoose.model("images", Images);
