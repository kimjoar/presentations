var WebSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8123);

var wss = new WebSocketServer({ server: server });

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Received from client: %s', message);
    });

    setTimeout(function() {
        ws.send('a little later ...');
    }, 1000);

    ws.send('Server says hello');
});
