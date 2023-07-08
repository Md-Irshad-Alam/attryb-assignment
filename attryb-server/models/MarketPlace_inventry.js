const mongoose = require('mongoose');

const marketplaceInventorySchema = new mongoose.Schema({
  
  'dealer': {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dealer',
    required: true
  },

  "name":{
    type:String,
    required:true
  },
  "image":{
    type:String,
    required:true
  },

  "mileage": {
    type: String,
    required: true
  },
  "previous_owners": {
    type: Number,
    required: true
  },
  "maintenance_history": {
    type: String,
    required: true
  },
  "accident_history": {
    type: String,
    required: true
  },
  "condition": {
    type: String,
    required: true
  },
  "kms_on_odometer": {
    type: Number,
    required: true
  },
  "major_scratches": {
    type: String,
    default: false
  },
  "original_paint": {
    type: String,
    default: true
  },
  "accidents_reported": {
    type: Number,
    default: 0
  },
  "previous_buyers": {
    type: Number,
    default: 0
  },
  "registration_place": {
    type: String,
    required: true
  },
  
});

const MarketplaceInventory = mongoose.model('MarketPlaceInventory', marketplaceInventorySchema);

module.exports = MarketplaceInventory;
