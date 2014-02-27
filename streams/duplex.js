var through = require('through2');
var stream = require('stream');
var http = require('http');
var sockjs = require('sockjs');

var ws = sockjs.createServer();

ws.on('connection', function(conn) {

    var r = new stream.Duplex();

    r._read = function(size) {
        var that = this;
        conn.on('data', function(data) {
            that.push(data);
        });
    };

    r._write = function(chunk, encoding, callback) {
        conn.write(chunk.toString());
        callback();
    };

    r.pipe(through(function(chunk, enconding, done) {
        this.push('a' + chunk.toString());
        done();
    })).pipe(r);

});

var server = http.createServer();
ws.installHandlers(server);
server.listen(9999);

