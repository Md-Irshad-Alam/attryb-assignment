const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isDealer:{
    type:Boolean,
    default:false
  }
  },
  {
    versionKey: false,
    timestamps : true
  }
);


dealerSchema.pre('save', function (next) {
  if (!this.isModified("password")) return next();
  let hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;
  return next();
})


dealerSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}
const Dealer = mongoose.model('Dealer', dealerSchema);

module.exports = Dealer;
