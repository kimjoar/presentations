var through = require('through2');
var stream = require('stream');
var net = require('net');

var server = net.createServer(function(connect) {

    connect.write('Say what now?\n');

    var uppercase = through(function(chunk, encoding, done) {
        this.push(chunk.toString().toUpperCase());
        done();
    })

    connect.pipe(uppercase).pipe(connect);

});

server.listen(7777, function() {
    console.log('running on 7777');
});
