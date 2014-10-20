
process.stdin.on('readable', function() {
    var r = process.stdin.read();
    if (r == null) return;
    console.log('length', r.length);
});

process.stdin.on('end', function() {
    console.log('done');
});
