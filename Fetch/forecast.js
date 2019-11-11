const fetch = require('node-fetch')

const APIKEY = '7b1a4064ff079e43861773552d747ffd'
const cityId = 726050 // VarnaID
const units = 'metric'

const forecastURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${APIKEY}&units=${units}`

const getData = async (url) => {
  const response = await fetch(url)
  const data = await response.json()

  const {
    name: cityName // cityName = data.name
  } = data

  const {
    temp: temperature, // temperature = data.main.temp
    temp_min,
    temp_max
  } = data.main

  const {
    speed: windSpeed // windSpeed = data.wind.speed
  } = data.wind

  const {
    main: weatherInfo, // weatherInfo = data.weather[0].main
    description: weatherDescriprion // weatherDescriprion = data.weather[0].description
  } = data.weather[0]

  return {
    cityName,
    temperature,
    temp_min,
    temp_max,
    windSpeed,
    weatherInfo,
    weatherDescriprion
  }
}

const show = async () => {
  const data = await getData(forecastURL)
  console.log(`
            ---Current ${data.cityName} weather---\n
            Temp: ${data.temperature}°C\n
            Min/Max temp: ${data.temp_min}°C/${data.temp_max}°C\n
            Wind Speed: ${data.windSpeed} km/h\n
            Weather info: ${data.weatherInfo} / ${data.weatherDescriprion}\n`)
}
show()