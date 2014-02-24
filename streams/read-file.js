var fs = require('fs');

var readable = fs.createReadStream(process.argv[2]);

var i = 1;
readable.on('data', function(chunk) {
    console.log('%d - got %d bytes of data', i++, chunk.length);
});

readable.on('end', function() {
    console.log('done');
});
