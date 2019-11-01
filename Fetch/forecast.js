const fetch = require('node-fetch');
const fs = require('fs');

const outputFile = 'fuckinVarnaWeather.json';

const APIKEY = '7b1a4064ff079e43861773552d747ffd';
let cityId = 726050;
let queryUnits = 'metric';

const forecastURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${APIKEY}&units=${queryUnits}`;

let getData = async (url) => {
    fetch(url)
    .then(res => res.json())
    .then(json => {
        fs.writeFile(outputFile, JSON.stringify(json), (err) => { if(err) throw err; })
    })
}

getData(forecastURL);