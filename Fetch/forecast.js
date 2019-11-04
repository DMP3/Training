const fetch = require('node-fetch');

const APIKEY = '7b1a4064ff079e43861773552d747ffd';
let cityId = 726050; //VarnaID
let units = 'metric';

const forecastURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${APIKEY}&units=${units}`;

let showForecast = async(url) => {
    let response = await fetch(url);
    let data = await response.json();

    let {
        name: cityName // cityName = data.name
    } = data;

    let {
        temp: temperature, // temperature = data.main.temp
        temp_min,
        temp_max,
    } = data.main;

    let {
        speed: windSpeed // windSpeed = data.wind.speed
    } = data.wind;

    let {
        main: weatherInfo, // weatherInfo = data.weather[0].main
        description: weatherDescriprion // weatherDescriprion = data.weather[0].description
    } = data.weather[0];

    console.log(`
        ---${cityName} weather---\n
        Temp: ${temperature}°C\n
        Min/Max temp: ${temp_min}°C/${temp_max}°C\n
        Wind Speed: ${windSpeed} km/h\n
        Weather info: ${weatherInfo} / ${weatherDescriprion}\n
        `);

    var ts = new Date();
    console.log(`Last update: ${ts.toLocaleString()}`);
}

showForecast(forecastURL);