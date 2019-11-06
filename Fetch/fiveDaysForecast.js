const fetch = require('node-fetch');
const fs = require('fs');

const APIKEY = '7b1a4064ff079e43861773552d747ffd';
let cityId = 726050; //VarnaID
let units = 'metric';

const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&mode=json&units=${units}&APPID=${APIKEY}`;

let getData = async(url) => {
    let response = await fetch(url);
    let data = await response.json();

    //cityName = data.city.name
    let {
        name: cityName
    } = data.city;

    //daily forecast
    let forecastList = data.list;
    let filteredDailyForecast = [];

    //loops through results and filters them
    forecastList.forEach(element => {
        filteredDailyForecast.push({
            temperature: element.main.temp,
            humidity: element.main.humidity,
            windSpeed: element.wind.speed,
            weather: element.weather[0].main,
            weatherDescriprion: element.weather[0].description,
            date: element.dt_txt
        });
    });
    return { cityName, filteredDailyForecast };
};

let writeToFile = async(fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        if (err) throw err;
        console.log("file saved successfuly!");
    });
}

const buildHTML = async() => {
    let data = await getData(forecastURL);

    let forecastList = data.filteredDailyForecast;
    let strHTML = `<h1 style="text-align: center;">${data.cityName} weather forecast for 5 days</h1>
                    <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 10px;">
                    <div class="main" style="display: flex;justify-content: center;align-items: center;flex-flow: row wrap;margin: 10px;">`;
    forecastList.forEach(element => {
        strHTML += `<div class="box" style="height: 250px;width: 250px;margin: 10px;display: flex;align-items: center;justify-content: center;flex-direction: column;">
                <div class="date">
                    <span><b>Date:</b> ${element.date}</span>
                </div>
                <div class="temp">
                    <span><b>Temperature:</b> ${element.temperature}°C</span>
                </div>
                <div class="humid">
                    <span><b>Humidity:</b> ${element.humidity}%</span>
                </div>
                <div class="wind">
                    <span><b>Wind speed:</b> ${element.windSpeed}km/h</span>
                </div>
                <div class="weather">
                    <span><i>${element.weather} / ${element.weatherDescriprion}</i></span>
                </div>
            </div>`;
    });
    strHTML += `</div>
            </div>`;

    writeToFile("frcstTable.html", strHTML);
}

buildHTML();