const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  products: {
    type: Array
  },
  totalPrices: {
    type: Number,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ['Nouvelle', 'En cours', 'Fait'],
    required: true,
    default: 'Nouvelle'
  }
})

module.exports = mongoose.model('Order', orderSchema)
