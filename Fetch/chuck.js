const fetch = require('node-fetch');
const URL = 'https://api.chucknorris.io/jokes/random';

let getRandomChuck = async() => {
    let response = await fetch(URL);
    let data = await response.json();
    //console.log(data);
    let {
        created_at,
        url,
        value
    } = data;

    console.log(`${created_at}, url= ${url} \n ${value}`);
}

getRandomChuck();