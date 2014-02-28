
process.stdin.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

process.stdin.on('end', function() {
    console.log('done');
});
