const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const product = require('./routes/product.route') // Imports routes for the products
const {
  PORT,
  MONGODB_URI
} = require('./config.js')
// init express app
const app = express()

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}
mongoose.connect(MONGODB_URI, config)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use('/products', product)

app.listen(PORT, async () => {
  console.log(`Server is up and running on port number ${PORT}`)
})