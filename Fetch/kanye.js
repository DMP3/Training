const URL = 'https://api.kanye.rest?format=json';
const fetch = require('node-fetch');
const fs = require('fs');

const getKanye = async () => {
  const res = await fetch(URL);
  let data = null;
  if (res.ok) { // res.status >= 200 && res.status < 300
    data = await res.json();
    data = data.quote;
  } else {
    data = res.statusText;
    //throw MyCustomError(res.statusText);
  }
  console.log(data);
};

getKanye();