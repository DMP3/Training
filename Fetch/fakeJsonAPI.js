const fetch = require('node-fetch');

const TOKEN = '_ZFGWNOL_V4kBYEMYCJtvg';
const ENDPOIT_URL = 'http://app.fakejson.com/q';

let configResponse = {
    token: TOKEN,
    data: {
        "cryptoUUID": "cryptoUUID",
        "cryptoMD5": "cryptoMD5",
        "cryptoSHA": "cryptoSHA",
        "cryptoSHA224": "cryptoSHA224",
        "cryptoSHA256": "cryptoSHA256",
        "cryptoSHA384": "cryptoSHA384",
        "cryptoSHA512": "cryptoSHA512",
        user: {
            "first_name": "nameFirst",
            "last_name": "nameLast",
            "email": "internetEmail",
            "nickname": "personNickname",
            "password": "personPassword",
            "avatar": "personAvatar"
        }
    }
};

let options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(configResponse)
};

const getData = async() => {
    let response = await fetch(ENDPOIT_URL, options);
    let data = await response.json();

    let userData = {
        first_name,
        last_name,
        nickname
    } = data.user;

    let {
        cryptoSHA512: key
    } = data;

    console.log(userData);
    console.log(`Some random SHA512 key: ${key}`);
}

getData();