var through = require('through2');
var logger = require('./logger');

process.stdin
    .pipe(through.obj(function (chunk, encoding, done) {
        var data = chunk.toString()
        var lines = data.split('\n');
        lines.forEach(function(line) {
            this.push({ line: line });
        }, this);
        done();
    }))
    .pipe(logger());

