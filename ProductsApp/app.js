const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const product = require('./routes/product.route'); // Imports routes for the products

//init express app
const app = express();
const port = 3000;

//setup mongoose connection
const dev_db_url = "mongodb+srv://dmp3:084488105dA!A@swtest-y4wgc.mongodb.net/test?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || dev_db_url;
const config = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
mongoose.connect(mongoDB, config);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', product);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});