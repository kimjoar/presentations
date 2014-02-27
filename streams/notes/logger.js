var stream = require('stream')

module.exports = function() {
    var logger = new stream.Writable({ objectMode: true })

    var i = 1;
    logger._write = function (chunk, enc, next) {
        console.log(i++, chunk);
        next();
    };

    return logger;
}
