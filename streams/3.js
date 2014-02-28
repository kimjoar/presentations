
process.stdin.on('data', function(chunk) {
    console.log(chunk.toString());
});

process.stdin.on('end', function() {
    console.log('done');
});

