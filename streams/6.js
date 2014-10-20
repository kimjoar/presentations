
var fs = require('fs');
var readable = fs.createReadStream(process.argv[2]);

readable.on('readable', function() {
    var r = readable.read();
    if (r == null) return;
    console.log('length', r.length);
});

readable.on('end', function() {
    console.log('done');
});
