const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const {
  PORT,
  MONGO_URI
} = require('./config.js')

app.set('view engine', 'ejs')

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
let db

client.connect(err => {
  if (err) return err
  db = client.db('test')
  app.listen(PORT, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/quotes', (req, res) => {
  db.collection('quotes').insertOne(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {
      quotes: result
    })
  })
})
