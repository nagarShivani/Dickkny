const mongoose = require("mongoose");
const department = new mongoose.Schema({
  title: { type: String, required: true },
  authorname: { type: String },
  image: { type: String},
  description: { type: String},
},{timestamps:true});

module.exports = mongoose.model("Department", department);
