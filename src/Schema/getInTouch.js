const mongoose = require("mongoose");
const getintouch = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  subject: { type: String},
},{timestamps:true});

module.exports = mongoose.model("getintouch", getintouch);
