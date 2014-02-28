
var stream = require('stream');

module.exports = function() {
    var logger = new stream.Writable({ objectMode: true });

    logger._write = function (chunk, encoding, next) {
        console.log(chunk);
        next();
    };

    return logger;
};
