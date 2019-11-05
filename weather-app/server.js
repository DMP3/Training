const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require('node-fetch');
const app = express()

const apiKey = '7b1a4064ff079e43861773552d747ffd';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index', { weather: null, error: null });
})

let getData = async(url) => {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return {
            cityName: data.name,
            temperature: data.main.temp,
            windspeed: data.wind.speed,
            weatherInfo: data.weather[0].main,
            weatherDesc: data.weather[0].description
        };
    } catch (error) {
        return error;
    }
};

app.post('/', async(req, res) => {

    let city = req.body.city;

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    let weather = await getData(url);

    console.log(weather);
    let weatherText = `It's ${weather.temperature} degrees in ${weather.cityName}. 
                        Windspeed is ${weather.windspeed} km/h. 
                        ${weather.weatherInfo} / ${weather.weatherDesc}`;
    await res.render('index', { weather: weatherText, error: null });
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})