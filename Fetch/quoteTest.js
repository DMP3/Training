const fetch = require('node-fetch')
const fs = require('fs')

const URL = 'https://favqs.com/api/'

// console.log(`${URL}users`);

const Username = 'dimp3'
const Email = 'dimomilenov@gmail.com'
const Password = '084488105d'

const jsonBody = {
  user: {
    login: Username,
    email: Email,
    password: Password
  }
}

// console.log(JSON.stringify(jsonBody));

const createUser = async () => {
  const response = await fetch(`${URL}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(jsonBody)

  })
  const respData = await response.json()
  console.log(respData)
}

createUser()