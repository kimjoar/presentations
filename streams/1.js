
process.stdin.on('readable', function() {
    var r = process.stdin.read();
    console.log(r);
});

