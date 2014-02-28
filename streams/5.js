
var readable = process.stdin;

readable.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

readable.on('end', function() {
    console.log('done');
});
