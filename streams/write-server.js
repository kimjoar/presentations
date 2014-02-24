var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var writable = fs.createWriteStream('some-file.png');

    var i = 1;
    req.on('data', function (chunk) {
        console.log('%d - got %d bytes of data', i++, chunk.length);
        writable.write(chunk);
    })

    req.on('end', function () {
        console.log('done');
        writable.end();
        res.end('ok');
    })
})

server.listen(1337);
