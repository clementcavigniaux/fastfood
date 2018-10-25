const mongoose = require('mongoose')
const Category = require('../Models/Categories')

exports.create = (req, res) => {
  const { name } = req.body
  var newCategory = new Category({ name })
  newCategory.save((err, category) => {
    if (err) {
      return res.status(500).send({
        message: err
      })
    } else {
      return res.send('Catégorie créée')
    }
  })
}

exports.list = (req, res) => {
  Category.find({}, (err, categories) => {
    var categoryMap = {}

    categories.forEach(category => {
      categoryMap[category._id] = category
    })

    res.send(categoryMap)
  })
}

exports.remove = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId, (err, category) => {
    if (err) return res.status(500).send(err)
    const response = {
      message: 'Catégorie supprimé',
      id: category._id
    }
    return res.status(200).send(response)
  })
}
