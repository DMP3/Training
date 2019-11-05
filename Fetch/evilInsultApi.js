const fetch = require('node-fetch');
const fs = require('fs');

const URL = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';

const getEvilInsult = async() => {
    let response = await fetch(URL);
    let data = await response.json();

    return data.insult;
}

const createStaticInsultPage = async() => {
    let insultText = await getEvilInsult();
    console.log(insultText);
    let html = `
        <body style="display:flex; flex-direction:column; justify-content:center; min-height:100vh;">
            <h1 style="margin: 0 auto; background: rgb(235, 235, 235); text-align: center;">${insultText}</h1>
            <input style="width: 250px;" type="button" value="Refresh Page" onClick="location.href=location.href">
        </body>`;
    await fs.writeFile("table.html", html, (err) => {
        if (err) throw err;
        console.log('File saved!');
    });
}

function logEvery10Seconds(i) {
    setTimeout(() => {
        createStaticInsultPage();
        logEvery10Seconds(++i);
    }, 10000)
}

logEvery10Seconds(0);