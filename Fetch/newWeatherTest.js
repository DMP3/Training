const unirest = require("unirest");
const fs = require('fs');

const outputFile = 'newWeatherDb.json';
var req = unirest("GET", "http://api.openweathermap.org/data/2.5/weather");

req.query({
	"units": "metric",
	"q": "Varna,bg",
    "id": "726050",
    "APPID": "7b1a4064ff079e43861773552d747ffd"
});

req.end(function (res) {
	console.log(res.body);
    fs.writeFile(outputFile, JSON.stringify(res.body), (err) => {
        if(err) throw err;
        console.log('File has been saved!');
    })
});