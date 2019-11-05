const fetch = require('node-fetch');
const url = `https://freegeoip.app/json/`;
let getInfo = async() => {
    let response = await fetch(url);
    let data = await response.json()
    console.log(data);
}

getInfo();