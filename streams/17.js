
var through = require('through2');
var logger = require('./logger')

process.stdin
    .pipe(through.obj(function(chunk, encoding, done) {
        var lines = chunk.toString().split("\n");
        lines.forEach(function(line) {
            this.push({ data: line.toUpperCase() });
        }, this);
        done()
    }))
    .pipe(logger());
