var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
        var writable = fs.createWriteStream('image');
        req.pipe(writable);
        req.on('end', function() {
            res.end("ok");
        });
});

server.listen(1337);

