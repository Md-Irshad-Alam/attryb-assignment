const mongoose = require('mongoose');

const oemSpecsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  list_price: {
    type: Number,
    required: true
  },
  available_colors: {
    type: [String],
    required: true
  },
  mileage: {
    type: String,
    required: true
  },
  power: {
    type: String,
    required: true
  },
  max_speed: {
    type: String,
    required: true
  }
});

const OEM_Specs = mongoose.model('OEM_Specs', oemSpecsSchema);

module.exports = OEM_Specs;
