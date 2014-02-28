
var es = require('event-stream');
var logger = require('./logger');

process.stdin
    .pipe(es.split())
    .pipe(es.map(function(line, done) {
        done(null, { data: line }); // VANLIG NODE, NULL ER ERROR
    }))
    .pipe(logger());
