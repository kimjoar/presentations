var stream = require('stream')
var lines = new stream.Transform({ objectMode: true })

lines._transform = function (chunk, encoding, done) {
    var data = chunk.toString()
    var lines = data.split('\n');
    lines.forEach(function(line) {
        this.push({ line: line });
    }, this);
    done();
}

//process.stdin
//    .pipe(lines)
//    .pipe(process.stdout);


var w = new stream.Writable({ objectMode: true })

var i = 1;
w._write = function (chunk, enc, next) {
    console.log(i++, chunk);
    next();
};

process.stdin
    .pipe(lines)
    .pipe(w);
