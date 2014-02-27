var http = require('http');

var server = http.createServer(function (req, res) {
    var i = 1;
    req.on('data', function (chunk) {
        console.log('%d - got %d bytes of data', i++, chunk.length);
    })

    req.on('end', function () {
        console.log('done');
        res.end('ok');
    })
})

server.listen(1337);
