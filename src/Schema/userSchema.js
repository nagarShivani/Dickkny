const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  streetAddress: { type: String },
  houseNumber: { type: String },
  apartment: { type: String }, // Optional field
  city: { type: String },
  state: { type: String },
  postcode: { type: String },
  country: { type: String },
});

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  companyName: { type: String },
  country: { type: String },
  streetAddress: { type: String },
  houseNumber: { type: String },
  apartment: { type: String }, // Optional field
  city: { type: String },
  state: { type: String },
  postcode: { type: String },
  phone: { type: String },
  multipleAddressArray: [AddressSchema],
}, { timestamps: true });

module.exports = mongoose.model('Users', UsersSchema);
