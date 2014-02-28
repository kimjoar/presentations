
var stream = require('stream')
var logger = require('./logger')
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
    var lines = chunk.toString().split("\n");
    lines.forEach(function(line) {
        this.push({ data: line.toUpperCase() });
    }, this);
    done()
}

process.stdin
    .pipe(uppercase)
    .pipe(logger());
