const mongoose = require("mongoose");
const color = new mongoose.Schema({
  color: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model("color", color);
