
var stream = require('stream');
var logger = require('./logger');
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString();
     this.push({ data: data.toUpperCase(); });
     done();
}

process.stdin
    .pipe(uppercase)
    .pipe(logger());
