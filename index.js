const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express(),
  router = require('./router'),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  Order = require('./Components/Orders')

io.on('connection', socket => {
  socket.on('clickOrderBtn', id => {
    Order.getStatusFinish(id).then(res => {
      console.log(res)
    })
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use(router)
mongoose.set('useCreateIndex', true)
mongoose.connect(
  'mongodb://localhost:27017/fastfood',
  { useNewUrlParser: true }
)

io.listen(8080)
app.listen(3000)
console.log('Your server is running on local:3000')
