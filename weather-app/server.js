const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const fetch = require('node-fetch');
const app = express()

const apiKey = '7b1a4064ff079e43861773552d747ffd';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
  res.render('index', {
    weather: null,
    error: null
  });
})

let getData = async (url) => {
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

app.post('/', async (req, res) => {

  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    let fetchedData = await getData(url);
    if (fetchedData.temperature === undefined) {
      await res.render('index', {
        weather: null,
        error: "Try again"
      });
    } else {
      let weatherText = `It's ${fetchedData.temperature} degrees in ${fetchedData.cityName}.
                        Windspeed is ${fetchedData.windspeed} km/h.
                        ${fetchedData.weatherInfo} / ${fetchedData.weatherDesc}`;
      await res.render('index', {
        weather: weatherText,
        error: null
      });
    }

  } catch (error) {
    await res.render('index', {
      weather: null,
      error: "Try again"
    });
  }

})

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})