const fetch = require('node-fetch');
const fs = require('fs');

let URL = `https://favqs.com/api/`;

// console.log(`${URL}users`);

let Username = 'dimp3';
let Email = 'dimomilenov@gmail.com';
let Password = '084488105d';

let jsonBody = {
    user: {
        login: Username,
        email: Email,
        password: Password
    }
};

// console.log(JSON.stringify(jsonBody));

const createUser = async() => {
    let response = await fetch(`${URL}users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(jsonBody)

    });
    let respData = await response.json();
    console.log(respData);
}

createUser();