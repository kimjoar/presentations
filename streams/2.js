
process.stdin.on('readable', function() {
    var r = process.stdin.read();
    if (r == null) return;
    console.log(r.toString());
});
