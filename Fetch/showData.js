const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('fuckinVarnaWeather.json')
const db = low(adapter)

const show = () => {
    let data = db.toJSON();
    console.log(`---${data.name} weather---\n
    Temp: ${data.main.temp}°C\n
    Min/Max temp: ${data.main.temp_min}°C/${data.main.temp_max}°C\n
    WindSpeed: ${data.wind.speed} km/h\n
    `);
    data = data.weather;
    data.map(el => {
        console.log(`Weather info: ${el.main} / ${el.description}\n`);
    })
    var ts = new Date();

    console.log(`Last update: ${ts.toLocaleString()}`);
}

show();