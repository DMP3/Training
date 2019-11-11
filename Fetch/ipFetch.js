const fetch = require('node-fetch')
const url = 'https://freegeoip.app/json/'
const getInfo = async () => {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}

getInfo()
