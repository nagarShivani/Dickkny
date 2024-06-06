const mongoose = require("mongoose");
const category = new mongoose.Schema({
  name: { type: String, required: true },
  image : { type: String},
},{timestamps:true});

module.exports = mongoose.model("Category", category);
