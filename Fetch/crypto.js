const fetch = require('node-fetch');
const URL = 'https://api.coinranking.com/v1/public/coins';

const getData = async(url) => {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.data.coins[0].name);
    console.log(data.data.coins[0].allTimeHigh.price);

    // const coins = data.data.coins;
    // coins.forEach(element => {
    //     console.log(element.slug);
    //     console.log(element.price);
    //     console.log(`\n`);
    // });
    // const coins = data.coins[0];
    // coins.forEach(element => {
    //     console.log(element.id);
    // });
}

function logEvery1Seconds(i) {
    setTimeout(() => {
        getData(URL);
        logEvery1Seconds(++i);
    }, 1000)
}

logEvery1Seconds(0);