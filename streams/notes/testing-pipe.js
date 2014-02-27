var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    var readable = fs.createReadStream(process.argv[2]);
    readable.pipe(res);
});

server.listen(1337);
