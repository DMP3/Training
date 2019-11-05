const URL = 'https://api.kanye.rest?format=text';
const fetch = require('node-fetch');
const fs = require('fs');

const getKanye = async() => {
    const response = await fetch(URL);
    const data = await response.text();
    console.log(data);
}

getKanye();