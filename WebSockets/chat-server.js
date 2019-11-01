"use strict";
process.title = 'node-chat';

let webSocketsServerPort = 1337;
let webSocketServer = require('websocket').server;
let http = require('http');

let history = [ ];
let clients = [ ];

let htmlEntities = (str) => {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

let colors = [ 'red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange' ];
colors.sort((a,b) => { return Math.random() > 0.5; });

let server = http.createServer( (request, response) => { });

server.listen(webSocketsServerPort, () => {
    console.log(`${new Date()} Server is listening on port ${webSocketsServerPort}`);
});

let wsServer = new webSocketServer({
    httpServer: server
});

wsServer.on('request', (request) => {
    console.log(`${new Date()} Connection from origin ${request.origin}.`);
    let connection = request.accept(null, request.origin); 

    let index = clients.push(connection) - 1;
    let userName = false;
    let userColor = false;
    console.log(`${new Date()} Connection accepted.`);

    if (history.length > 0) {
        connection.sendUTF(
        JSON.stringify({ type: 'history', data: history} ));
    }

    connection.on('message', (message) => {
        if (message.type === 'utf8') {
            if (userName === false) {
                userName = htmlEntities(message.utf8Data);
                // get random color and send it back to the user
                userColor = colors.shift();
                connection.sendUTF(JSON.stringify({ type:'color', data: userColor }));
                console.log(`${new Date()} User is known as: ${userName} with ${userColor} color`);
            }
            else {
                console.log(`${new Date()} Received Message from ${userName} : ${message.utf8Data}`);
                let obj = {
                    time: (new Date()).getTime(),
                    text: htmlEntities(message.utf8Data),
                    author: userName,
                    color: userColor
                };
                history.push(obj);
                history = history.slice(-100);
                let json = JSON.stringify({ type:'message', data: obj });
                for (var i=0; i < clients.length; i++) {
                    clients[i].sendUTF(json);
                }
            }
        }
    });
    
    connection.on('close', (connection) => {
        if (userName !== false && userColor !== false) {
            console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected`);
            clients.splice(index, 1);
            colors.push(userColor);
        }
    });
});