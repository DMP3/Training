"use strict";
process.title = 'node-chat'; //sets the process name

const webSocketsServerPort = 1337; //port to run the websocket server

const webSocketServer = require('websocket').server;
const http = require('http');

let history = []; //latest 100 messages
let clients = []; //list of currently connected clients (users)

//helper function for escaping input strings
let htmlEntities = (str) => {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//array with some colors
let colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort((a, b) => {
  return Math.random() > 0.5;
}); //set it in random order

//HTTP server
let server = http.createServer((request, response) => {});

server.listen(webSocketsServerPort, () => {
  console.log(`${new Date()} Server is listening on port ${webSocketsServerPort}`);
});

//WebSocket server
let wsServer = new webSocketServer({
  // WebSocket server is tied to a HTTP server. WebSocket
  // request is just an enhanced HTTP request.
  httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', (request) => {
  console.log(`${new Date()} Connection from origin ${request.origin}.`);

  // accept connection - you should check 'request.origin' to
  // make sure that client is connecting from your website
  let connection = request.accept(null, request.origin);

  // we need to know client index to remove them on 'close' event
  let index = clients.push(connection) - 1;
  let userName = false;
  let userColor = false;

  console.log(`${new Date()} Connection accepted.`);

  // send back chat history
  if (history.length > 0) {
    connection.sendUTF(
      JSON.stringify({
        type: 'history',
        data: history
      }));
  }

  // user sent some message
  connection.on('message', (message) => {
    if (message.type === 'utf8') { // accept only text
      // first message sent by user is their name
      if (userName === false) {
        // remember user name
        userName = htmlEntities(message.utf8Data);
        // get random color and send it back to the user
        userColor = colors.shift();
        connection.sendUTF(JSON.stringify({
          type: 'color',
          data: userColor
        }));
        console.log(`${new Date()} User is known as: ${userName} with ${userColor} color`);
      } else { // log and broadcast the message
        console.log(`${new Date()} Received Message from ${userName} : ${message.utf8Data}`);

        // we want to keep history of all sent messages
        let obj = {
          time: (new Date()).getTime(),
          text: htmlEntities(message.utf8Data),
          author: userName,
          color: userColor
        };
        history.push(obj);
        history = history.slice(-100);
        // broadcast message to all connected clients
        let json = JSON.stringify({
          type: 'message',
          data: obj
        });
        for (var i = 0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
      }
    }
  });
  // user disconnected
  connection.on('close', (connection) => {
    if (userName !== false && userColor !== false) {
      console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected`);
      // remove user from the list of connected clients
      clients.splice(index, 1);
      // push back user's color to be reused by another user
      colors.push(userColor);
    }
  });
});