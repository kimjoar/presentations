var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var writable = fs.createWriteStream('./some-other-file.png');

    req.pipe(writable);

    req.on('end', function () {
        res.end('ok');
    })

    writable.on('error', function (err) {
        console.log(err);
    });
})

server.listen(1337);
