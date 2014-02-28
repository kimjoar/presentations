
var through = require('through2');
var net = require('net');

var server = net.createServer(function(connect) {

    var uppercase = through(function(chunk, encoding, done) {
        this.push(chunk.toString().toUpperCase());
        done();
    })

    connect.pipe(uppercase).pipe(connect);

});

server.listen(7777);
