
var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    // denne kalles hver gang vi har en request,
    // uansett hvilken URL

    var readable = fs.createReadStream(process.argv[2]);

    readable.on('readable', function() {
        var r = readable.read();
        if (r == null) return;
        console.log('length', r.length);
        res.write(r);
    });

    readable.on('end', function() {
        console.log('done');
        res.end();
    });
});

server.listen(1337);
