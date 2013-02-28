var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8123 });

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Received from client: %s', message);
    });

    setTimeout(function() {
        ws.send('a little later ...');
    }, 1000);

    ws.send('Server says hello');
});
