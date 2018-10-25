const express = require('express'),
  Router = express.Router(),
  Product = require('./Components/Products'),
  Category = require('./Components/Categories'),
  Order = require('./Components/Orders'),
  TokenVerify = require('./Components/TokenVerify'),
  User = require('./Components/Users')

//products
Router.route('/products')
  .get(TokenVerify, Product.list)
  .post(Product.create)
  .delete(TokenVerify, Product.remove)

//categories
Router.route('/categories')
  .get(TokenVerify, Category.list)
  .post(TokenVerify, Category.create)
  .delete(TokenVerify, Category.remove)

//orders
Router.route('/orders')
  .get(Order.list)
  .post(Order.create)
  .delete(TokenVerify, Order.remove)

//users
Router.route('/user').post(TokenVerify, User.create)
Router.route('/login').post(User.login)
Router.route('/register').post(User.register)

module.exports = Router
