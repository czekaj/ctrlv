var mongoose = require('mongoose')

var Clip = mongoose.model('Clip', {
  url: {
    type: String, // e.g. abc34xz
    required: true,
    minlength: 7 // about 78 billion possibilities
  },
  text: {
    type: String,
    required: true,
    minlength: 1
  },
  createdAt: {
    type: Date,
    required: true
  }
})

module.exports = { Clip }
