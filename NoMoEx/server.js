const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs')

const uri = "mongodb+srv://dmp3:084488105dA!A@swtest-y4wgc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect(err => {
    db = client.db("test");
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
});

app.use(bodyParser.urlencoded({ extended: true }));

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
        res.render('index.ejs', { quotes: result })
    })
})