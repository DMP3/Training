const fetch = require('node-fetch');

const APIKEY = '7b1a4064ff079e43861773552d747ffd';
let cityId = 726050; //VarnaID
let units = 'metric';

const forecastURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${APIKEY}&units=${units}`;

let getData = async(url) => {
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

    return {
        cityName,
        temperature,
        temp_min,
        temp_max,
        windSpeed,
        weatherInfo,
        weatherDescriprion
    }
};

const show = async() => {
    let data = await getData(forecastURL);
    console.log(`
            ---Current ${data.cityName} weather---\n
            Temp: ${data.temperature}°C\n
            Min/Max temp: ${data.temp_min}°C/${data.temp_max}°C\n
            Wind Speed: ${data.windSpeed} km/h\n
            Weather info: ${data.weatherInfo} / ${data.weatherDescriprion}\n`);
}
show();