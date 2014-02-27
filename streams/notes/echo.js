var readable = process.stdin;

var i = 1;
readable.on('data', function(chunk) {
    console.log('%d - got %d bytes of data', i++, chunk.length);
    // console.log(chunk.toString())
})

readable.on('end', function() {
    console.log('done');
});
