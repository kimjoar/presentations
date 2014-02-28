
var through = require('through2');

var uppercase = through(function(chunk, encoding, done) {
    this.push(chunk.toString().toUpperCase());
    done();
});
