var es = require('event-stream');
var logger = require('./logger');
var combine = require('stream-combiner');

var lines = combine(
    es.split(),
    es.map(function(line, done) {
        done(null, { data: line }); // VANLIG NODE, NULL ER ERROR
    })
);

process.stdin
    .pipe(lines)
    .pipe(logger());

