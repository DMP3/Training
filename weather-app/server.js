const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()
const {
  PORT,
  API_KEY
} = require('./config.js')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  await res.render('index', {
    weather: null,
    error: null
  })
})

const getData = async (url) => {
  try {
    const response = await fetch(url)
    const {
      status
    } = response

    console.info(status)
    const data = await response.json()
    return {
      cityName: data.name,
      temperature: data.main.temp,
      windspeed: data.wind.speed,
      weatherInfo: data.weather[0].main,
      weatherDesc: data.weather[0].description
    }
  } catch (error) {
    console.error(error)
    return error
  }
}

app.post('/', async (req, res) => {
  const city = req.body.city
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

  try {
    const fetchedData = await getData(url)
    if (fetchedData.temperature === undefined) {
      await res.render('index', {
        weather: null,
        error: 'Try again'
      })
    } else {
      const weatherText = `It's ${fetchedData.temperature} degrees in ${fetchedData.cityName}.
                        Windspeed is ${fetchedData.windspeed} km/h.
                        ${fetchedData.weatherInfo} / ${fetchedData.weatherDesc}`
      await res.render('index', {
        weather: weatherText,
        error: null
      })
    }
  } catch (error) {
    await res.render('index', {
      weather: null,
      error: 'Try again'
    })
  }
})

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!')
})
