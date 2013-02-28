var http = require('http');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(8123);

app.get('/stream', function(req, res) {
    req.socket.setTimeout(Infinity);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');

    var messageCount = 0;
    setInterval(function() {
        messageCount++;
        res.write('id: ' + messageCount + '\n');
        res.write('data: msg ' + messageCount + '\n\n');
    }, 1000);
    setTimeout(function() {
        res.write('id: ' + messageCount + '\n');
        res.write('event: userlogon\n');
        res.write('data: kimjoar\n\n');
    }, 1500);
});

