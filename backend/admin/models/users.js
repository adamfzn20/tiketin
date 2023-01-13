const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: false
  },
  passwordHash: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    unique: true,
    uniqueCaseInsensitive: true,
    required: false
  },
  age: {
    type: String,
    required: false
  }
})

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
})

userSchema.set('toJSON', {
  virtuals: true
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
