const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const fs = require('fs');
const AUTH_KEY = 'd5ad5201ab38ae16d42c61cead67531c21249676c8cde052ec261e57f69d3900';

//authenticate first
const unsplash = new Unsplash({accessKey: AUTH_KEY});

unsplash.search.photos('whatever', 1, 10, {orientation: 'portrait'})
.then(res => {
    return res.json();
}).then(json => {
    let data = JSON.stringify(json);
    fs.writeFile('resFromUnsplash.json' , data, (err) => {
        if(err) throw err;
        console.log(`The file was saved`);
    });
})

