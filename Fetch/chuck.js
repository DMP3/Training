const fetch = require('node-fetch')
const URL = 'https://api.chucknorris.io/jokes/random'

const getRandomChuck = async () => {
  const response = await fetch(URL)
  const data = await response.json()
  // console.log(data);
  const {
    created_at,
    url,
    value
  } = data

  console.log(`${created_at}, url= ${url} \n ${value}`)
}

getRandomChuck()
