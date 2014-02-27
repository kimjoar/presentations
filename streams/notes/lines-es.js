var es = require('event-stream');
var logger = require('./logger');

process.stdin
    .pipe(es.split('\n'))
    .pipe(es.map(function(line, done) {
        done(null, { line: line });
    }))
    .pipe(logger());


