const mongoose = require('mongoose')

var Clip = mongoose.model('Clip', {
  key: {
    type: String, // e.g. abc34xz
    required: true,
    minlength: 3
  },
  text: {
    type: String,
    required: false,
    minlength: 1
  },
  createdAt: {
    type: Date,
    required: true
  }
})

module.exports = { Clip }
