const mongoose = require("mongoose");
const Banner = new mongoose.Schema({
  image: { type: String},
},{timestamps:true});

module.exports = mongoose.model("Banner", Banner);
