const mongoose = require('mongoose')

module.exports = mongoose.model(
  'User',
  (UserSchema = mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        requried: true
      },
      password: {
        type: String,
        required: true
      },
      username:{
        type: String,
        required: true
      },
    },
    { timestamps: true }
  ))
)
