
var stream = require('stream')
var uppercase = new stream.Transform()

uppercase._transform = function(chunk, encoding, done) {
    var data = chunk.toString();
}
