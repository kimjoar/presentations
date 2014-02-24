var Readable = require('stream').Readable
var util = require('util')

function MyStream () {
  Readable.call(this)
  this.i = 1;
}

util.inherits(MyStream, Readable)

MyStream.prototype._read = function (size) {
    if (this.i > 1000) {
        this.push(null);
    } else {
        this.push('' + this.i++);
    }
}

var myStream = new MyStream();

myStream.pipe(process.stdout);
