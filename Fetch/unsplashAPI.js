const fetch = require('node-fetch');
const fs = require('fs');
const AUTH_KEY = 'd5ad5201ab38ae16d42c61cead67531c21249676c8cde052ec261e57f69d3900';

let query = 'something';
let page = 1;

const url = `https://api.unsplash.com/search/photos/?client_id=${AUTH_KEY}&page=${page}&query=${query}`

let writeToFile = async(fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log("file saved successfuly!");
    });
}

let searchPhtos = async() => {
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'content-type': 'application/json'
        }
    });
    let data = await response.json();
    data = data.results;
    let photos = [];
    data.map(element => {
        photos.push(element.urls.regular);
    });
    await writeToFile('resFromUnsplash.json', photos);
};

searchPhtos();