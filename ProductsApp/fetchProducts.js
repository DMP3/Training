const fetch = require('node-fetch');
var FormData = require('form-data');
var querystring = require('querystring');
var request = require('request');

const productsUrl = 'http://localhost:3000/products';
let ID = '5dc3f1dd5eceab71c4a9a8f1';

const getAllProducts = async(url) => {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
};
// getAllProducts(productsUrl);

const getProductById = async(url) => {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
};
// getProductById(`${productsUrl}/${ID}`);


/**Create a product */
var form = {
    name: 'takoata',
    price: 123214,
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

// request({
//     headers: {
//         'Content-Length': contentLength,
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     uri: `${productsUrl}/create`,
//     body: formData,
//     method: 'POST'
// }, function(err, res, body) {
//     console.log(res);
// });