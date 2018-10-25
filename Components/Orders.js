const mongoose = require('mongoose'),
  path = require('path'),
  Order = require('../Models/Orders'),
  express = require('express'),
  app = express()

exports.create = (req, res) => {
  const { products, totalPrices, user, status } = req.body,
    newOrder = new Order({ products, totalPrices, user, status })
  newOrder.save((err, order) => {
    if (err) {
      return res.status(500).send({
        message: err
      })
    } else {
      return res.send('Commande créée')
    }
  })
}

exports.list = (req, res) => {
  Order.find({ status: 'Nouvelle' }, (err, orders) => {
    console.log(orders)
    res.render('orders', { orders })
  })
}

exports.update = (req, res) => {
  console.log(req.body)
  Order.findOneAndUpdate((err, order) => {
    console.log(orders)
    res.render('orders', { orders })
  })
}

exports.remove = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId, (err, order) => {
    if (err) return res.status(500).send(err)
    const response = {
      message: 'Commande supprimée',
      id: order._id
    }
    return res.status(200).send(response)
  })
}

exports.getStatusFinish = id => {
  return Order.findByIdAndUpdate({ _id: id }, { status: 'Fait' })
}
