
var fs = require('fs');
var readable = fs.createReadStream(process.argv[2]);

readable.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

readable.on('end', function() {
    console.log('done');
});
