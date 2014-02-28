# stdin

1.js

process.stdin.on('data', function(chunk) {
    console.log(chunk);
});

---

# toString chunk

2.js

process.stdin.on('data', function(chunk) {
    console.log(chunk.toString());
});

---

# lytt på end-event

3.js

process.stdin.on('data', function(chunk) {
    console.log(chunk.toString());
});

process.stdin.on('end', function() {
    console.log('done');
});

---

# skriv ut chunk lengde

4.js

process.stdin.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

process.stdin.on('end', function() {
    console.log('done');
});

---

# Refactor readable-variabel

Tenk på dette generisk som en readable stream

5.js

var readable = process.stdin;

readable.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

readable.on('end', function() {
    console.log('done');
});

---

# Bytt til createReadStream

6.js

var fs = require('fs');
var readable = fs.createReadStream(process.argv[2]);

readable.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

readable.on('end', function() {
    console.log('done');
});

---

# SLIDE

---

Litt info om readable streams

> data comes out of a Readable stream.

Readable streams have two "modes": a flowing mode and a non-flowing mode. When in flowing mode, data is read from the underlying system and provided to your program as fast as possible. In non-flowing mode, you must explicitly call stream.read() to get chunks of data out.

If you attach a data event listener, then it will switch the stream into flowing mode

Kan evt kalle #read selv hele veien

---

# Skriv til http-respons

7.js

var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    // denne kalles hver gang vi har en request

    var readable = fs.createReadStream(process.argv[2]);

    readable.on('data', function(chunk) {
        console.log('chunk length', chunk.length);
        res.write(chunk);
    });

    readable.on('end', function() {
        console.log('done');
        res.end();
    });
});

server.listen(1337);

---

node server.js

åpne localhost:1337

sjekk tab-en som viser server.js

---

Nå har vi sett en writable stream > HTTP Response

Når man ser on('data') + write, samt on('end') + end: pipe!

---

# Bruk pipe

8.js

var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
    var readable = fs.createReadStream(process.argv[2]);
    readable.pipe(res);
});

server.listen(1337);

---

node pipe-server.js
åpne nettleser på localhost:1337

---

PRAT OM PIPE

src.pipe(dest)
process.stdin.pipe(process.stdout);

Kan vi sette flere pipes sammen?

src.pipe(transform).pipe(dest)

---

en transform leser og skriver
det er en sammenheng mellom det som leses og det som skrives

---

LA OSS LAGE EN TRANSFORM SOM UPPERCASER:

GÅ TIL FIL MED:

9.js

var stream = require('stream')
var uppercase = new stream.Transform()

uppercase._transform = function(chunk, encoding, done) {
    var data = chunk.toString();
}

---

10.js

var stream = require('stream')
var uppercase = new stream.Transform()

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString();
     this.push(data.toUpperCase());
     done()
}

process.stdin
    .pipe(uppercase)
    .pipe(process.stdout);

---

Kan vi sende objekter?

Push et objekt

11.js

var stream = require('stream')
var uppercase = new stream.Transform()

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString();
     this.push({ data: data.toUpperCase() });
     done()
}

process.stdin
    .pipe(uppercase)
    .pipe(process.stdout);


FEILER HARDT!
TypeError: Invalid non-string/buffer chunk

---

En stream jobber default med kun strings eller buffers.

`objectMode`

What’s this objectMode? It’s a flag used to tell a stream that it should be dealing with objects instead of strings or buffers. Streams which deal only with text (which happens a lot in core) can do optimizations and more precise backpressure related to buffering.

As a general rule, whenever you want to read or write javascript objects which are not strings or buffers, you’ll need to put your stream into objectMode. This is really important as any stream not in objectMode will refuse to write, pipe, or read an object.

---

Legg til objectMode

12.js

var stream = require('stream')
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString();
     this.push({ data: data.toUpperCase(); });
     done();
}

process.stdin
    .pipe(uppercase)
    .pipe(process.stdout);


FEILER HARDT!
TypeError: invalid data

---

process.stdout godtar kun strings og buffers ...

Vi må lage en logger. En Writable stream.

Må implementere en `_write(chunk, encoding, next)`-metode

Åpne fil med:

13.js

var stream = require('stream');

module.exports = function() {
    var logger = new stream.Writable();

    logger._write = function(chunk, encoding, next) {
    };

    return logger;
};

---

legg til objectMode
console.log i _write

14.js

var stream = require('stream');

module.exports = function() {
    var logger = new stream.Writable({ objectMode: true });

    logger._write = function (chunk, encoding, next) {
        console.log(chunk);
        next();
    };

    return logger;
};

---

Gå tilbake
require logger
pipe til logger()

15.js

var stream = require('stream');
var logger = require('./logger');
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString();
     this.push({ data: data.toUpperCase(); });
     done();
}

process.stdin
    .pipe(uppercase)
    .pipe(logger());

---

Ikke helt som vi vil enda, split opp og send en push per linje

split newline
lines.foreach

16.js

var stream = require('stream')
var logger = require('./logger')
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
    var lines = chunk.toString().split("\n");
    lines.forEach(function(line) {
        this.push({ data: line.toUpperCase() });
    }, this);
    done()
}

process.stdin
    .pipe(uppercase)
    .pipe(logger());

---

SLIDE

Hver input ender potensielt opp i mange output.

---

Kan gjøres uten å måtte lage en instans bare for å implementere `_transform`

THROUGH!

npm install through2

`through` vs `through.obj`

---

Bruk through. Husk objectMode.

17.js

var through = require('through2');
var logger = require('./logger')

process.stdin
    .pipe(through.obj(function(chunk, encoding, done) {
        var lines = chunk.toString().split("\n");
        lines.forEach(function(line) {
            this.push({ data: line.toUpperCase() });
        }, this);
        done()
    }))
    .pipe(logger());

---

meeeeen pass på. Hva skjer om det brytes midt i linja? Må holde på siste linje og konkatere med det som kommer.

PÅ EN SLIDE:

var through = require('through2');
var logger = require('./logger');

process.stdin
    .pipe(through.obj(function (chunk, encoding, done) {
        var data = chunk.toString();
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

---

BAH! Noen må jo ha håndtert split før?

SLIDE

event-stream!

npm install event-stream

18.js

var through = require('through2');
var es = require('event-stream');
var logger = require('./logger')

process.stdin
    .pipe(es.split())
    .pipe(through.obj(function(line, encoding, done) {
        this.push({ data: line.toUpperCase() });
        done()
    }))
    .pipe(logger());

---

es.map

var es = require('event-stream');
var logger = require('./logger');

process.stdin
    .pipe(es.split())
    .pipe(es.map(function(line, done) {
        done(null, { data: line }); // VANLIG NODE, NULL ER ERROR
    }))
    .pipe(logger());

Med async:

...

---

DUPLEX

---

Ny fil med:

20.js

var through = require('through2');

var uppercase = through(function(chunk, encoding, done) {
    this.push(chunk.toString().toUpperCase());
    done();
});

---

21.js

var through = require('through2');
var net = require('net');

var server = net.createServer(function(connect) {

    var uppercase = through(function(chunk, encoding, done) {
        this.push(chunk.toString().toUpperCase());
        done();
    })

    connect.pipe(uppercase).pipe(connect);

});

server.listen(7777);

---

Nå har vi sett på fire typer streams

- readable — data kommer ut
- writable — data går inn
- transform — data transformeres
- duplex — leser og skriver

substack og domenictarr

---

GULP

Nytt byggesystem for Node.js

Stream-basert

Tidlig stadie, det skjer mye

---

!!! Klargjør noen JavaScript-filer i en mappe og kjør npm install på
pluginene som trengs.

Gå til gulp-mappe

22.js

var gulp = require('gulp');

gulp.src('./js/**/*.js')
    .pipe('./build');

---

23.js

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.src('./js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./build'));

---

24.js

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./build'));

---

readable
    .pipe(transform)
    .pipe(transform)
    .pipe(transform)
    .pipe(writable)

---

Nå kan du gulp

---

task, så kjør fra cmd

---

En gulp-plugin er en transform-stream.

(recap: en transform stream ...)

THAT'S IT.

Det er en stream-plugin med `gulp-`-prefix

Den jobber på vinyl-objekter

---

watch

byggescriptet ditt trenger ikke kjøre js-testene dine. `karma start`

Da kan du også kalle karma med spesifikke parametre mye enklere

---

Gulp setter opp en stream av filer, som kan gradvis prosesseres

---

Noen triks

Iblant er det smart å bruke andre streaming-hjelpere

---

es.concat
es.pipeline

---

Lage egen plugin, bruk rebase som eksempel

---

Hvorfor streams?

Re-iterer sentrale poeng

en stream er bare unix pipes

enkelt, kraftig

