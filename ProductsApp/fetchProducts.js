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
//getProductById(`${productsUrl}/${ID}`);

const upd = async() => {
    const res = await fetch(`http://localhost:3000/products/5dc3ebf3539b096cd1f9811d/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'das',
            price: 22.2
        })
    });
    const data = await res.json();

    console.log(data);
};
//upd();

const create = async() => {
    const res = await fetch('http://localhost:3000/products/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "asfnkqgngqnkl",
            price: 333.3212
        })
    });
    const data = await res.text();
    console.log(data);
};
create();