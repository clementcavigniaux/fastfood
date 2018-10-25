const mongoose = require('mongoose')

module.exports = mongoose.model(
  'Products',
  mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  })
)
