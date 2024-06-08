const mongoose = require("mongoose");
const size = new mongoose.Schema({
  size: { type: String, required: true },
},{timestamps:true});

module.exports = mongoose.model("size", size);
