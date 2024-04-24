const mongoose = require("mongoose");

const department = new mongoose.Schema({
  
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId ,ref:"Users"},

},{timestamps:true});

module.exports = mongoose.model("Department", department);
