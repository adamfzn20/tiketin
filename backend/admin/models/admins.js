const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  superadmin: {
    type: Boolean,
    required: true
  },
  concert_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    default: ''
  }
})

adminSchema.virtual('id').get(function() {
  return this._id.toHexString();
})

adminSchema.set('toJSON', {
  virtuals: true
})

module.exports = mongoose.model('Admin', adminSchema)
