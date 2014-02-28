
var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    // denne kalles hver gang vi har en request

    var readable = fs.createReadStream(process.argv[2]);

    readable.on('data', function(chunk) {
        console.log('chunk length', chunk.length);
        res.write(chunk);
    });

    readable.on('end', function() {
        console.log('done');
        res.end();
    });
});

server.listen(1337);
