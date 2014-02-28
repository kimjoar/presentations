
var through = require('through2');
var es = require('event-stream');
var logger = require('./logger')

process.stdin
    .pipe(es.split())
    .pipe(through.obj(function(line, encoding, done) {
        this.push({ data: line.toUpperCase() });
        done()
    }))
    .pipe(logger());
