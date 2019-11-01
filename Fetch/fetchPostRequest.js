const fetch = require('node-fetch');

const res = (url, data) =>  {
  return fetch(url, {
    method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
    body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(json => {
      console.log(json);
  })
  .catch(error => {
      console.log(error);
  })
}

res('https://appdividend.com/api/v1/users', {user: 'Krunal'});

// postRequest('https://appdividend.com/api/v1/users', {user: 'Krunal'})
//   .then(data => console.log(data)) // Result from the `response.json()` call
//   .catch(error => console.error(error))