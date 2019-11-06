const fetch = require('node-fetch');

const TOKEN = '_ZFGWNOL_V4kBYEMYCJtvg';
const ENDPOIT_URL = 'http://app.fakejson.com/q';

let options = {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({
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
    })
};

const getData = async() => {
    let response = await fetch(ENDPOIT_URL, options);
    let data = await response.json();

    console.log({
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        nickname: data.user.nickname,
        email: data.user.email,
        key: data.cryptoSHA512
    });
}

getData();