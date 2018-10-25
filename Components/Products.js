const mongoose = require('mongoose')
const Product = require('../Models/Products')

exports.create = (req, res) => {
  const { name, category, price } = req.body,
    newProduct = new Product({ name: name, category, price })
  newProduct.save((err, product) => {
    if (err) {
      return res.status(500).send({
        message: err
      })
    } else {
      return res.send(product)
    }
  })
}

exports.list = (req, res) => {
  Product.find({}, (err, products) => {
    var productMap = {}

    products.forEach(product => {
      productMap[product._id] = product
    })

    res.send(productMap)
  })
}

exports.remove = (req, res) => {
  Product.findByIdAndRemove(req.params.productId, (err, product) => {
    if (err) return res.status(500).send(err)
    const response = {
      message: 'Produit supprimé',
      id: product._id
    }
    return res.status(200).send(response)
  })
}
