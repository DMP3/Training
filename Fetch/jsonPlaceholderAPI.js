const fetch = require('node-fetch');

// #1 Get
const getPostsList = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
};
// getPostsList()
// #1


// #2 POST
let postParams = {
    method: "POST",
    body: JSON.stringify({
        title: 'fckthisshit',
        body: 'someBody',
        userId: 5
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
};
const createPost = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', postParams);
    const data = await response.json();
    console.log(data);
};
//createPost();
// #2

// #3 PUT
let putParams = {
    method: 'PUT',
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
        id: 1,
        title: 'fckin Update',
        body: 'somes Random Sht',
        userId: 1
    })
};
const udpatePostWithPUT = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', putParams);
    const data = await response.json();
    console.log(data);
};
//udpatePostWithPUT();
// #3


// #4 DELETE
const deletePost = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' });
    const data = await response.json();

    console.log(data);
};
//deletePost();
// #4


// #5 Get random shit and parase the response
const getUserAlbums = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1/albums', { method: 'GET' });
    const data = await response.json();

    data.forEach(element => {
        console.log(`User Id: ${element.userId}\nTitle: ${element.title}`);
    });
};

getUserAlbums();
// #5