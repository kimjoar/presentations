var through = require('through2');
var logger = require('./logger');

process.stdin
    .pipe(through.obj(function (chunk, encoding, done) {
        var data = chunk.toString()
        if (this._lastLineData) data = this._lastLineData + data;

        var lines = data.split('\n');
        this._lastLineData = lines.pop();

        lines.forEach(function(line) {
            this.push({ line: line });
        }, this);
        done();
    }, function() {
        if (this._lastLineData) this.push({ line: this._lastLineData });
        this._lastLineData = null
    }))
    .pipe(logger());

