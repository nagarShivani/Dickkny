const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: { type: String, required: true },
  streetAddress: { type: String, required: true },
  houseNumber: { type: String, required: true },
  apartment: { type: String }, // Optional field
  city: { type: String, required: true },
  state: { type: String, required: true },
  postcode: { type: String, required: true }
});

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String },
  address: { type: addressSchema, required: true },
  phone: { type: String, required: true },
},{timestamps:true} );

module.exports = mongoose.model('Users', UsersSchema);
