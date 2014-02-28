
var stream = require('stream');

module.exports = function() {
    var logger = new stream.Writable();

    logger._write = function(chunk, encoding, next) {
    };

    return logger;
};
