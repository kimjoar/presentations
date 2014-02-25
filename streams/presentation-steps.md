process.stdin.on('data', function(chunk) {
    console.log(chunk);
});

---

process.stdin.on('data', function(chunk) {
    console.log(chunk);
});

process.stdin.on('end', function() {
    console.log('done');
});

---

process.stdin.on('data', function(chunk) {
    console.log(chunk.toString());
});

process.stdin.on('end', function() {
    console.log('done');
});

---

process.stdin.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

process.stdin.on('end', function() {
    console.log('done');
});

---

var readable = process.stdin;

readable.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

readable.on('end', function() {
    console.log('done');
});

---

var fs = require('fs');
var readable = fs.createReadStream(process.argv[2]);

readable.on('data', function(chunk) {
    console.log('chunk length', chunk.length);
});

readable.on('end', function() {
    console.log('done');
});

---

HOPP TIL NY FIL SOM INNEHOLDER:

var http = require('http');

var server = http.createServer(function (req, res) {
})

server.listen(1337);

---

var http = require('http');

var server = http.createServer(function (req, res) {
    var i = 1;
    req.on('data', function (chunk) {
        console.log(i++, 'chunk length', chunk.length);
    })

    req.on('end', function () {
        res.end('ok');
    })
})

server.listen(1337);

---

node read-server.js
curl -i -X POST localhost:1337 -H "Content-Type: image/png" -d "@examples/build.png"

SE PÅ: HTTP/1.1 100, Transfer-Encoding: chunked

---

HOPP TIL NY FIL SOM INNEHOLDER:

var http = require('http');

var server = http.createServer(function (req, res) {
  req.setEncoding('utf8');

  var body = '';
  req.on('data', function (chunk) {
    console.log(i++, 'chunk length', chunk.length);
    body += chunk;
  })

  req.on('end', function () {
    try {
      var data = JSON.parse(body);
    } catch (e) {
      res.statusCode = 400;
      return res.end('error: ' + e.message);
    }

    res.write(typeof data);
    res.end();
  })
})

server.listen(1337);

---

node input-type.js

curl localhost:1337 -d '{}'
curl localhost:1337 -d '"foo"'
curl localhost:1337 -d 'not json'
curl localhost:1337 -d '@examples/much.json'

---

OVER PÅ WRITABLE

HOPP TIL FIL SOM INNEHOLDER:

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var writable = fs.createWriteStream('some-file.png');

    var i = 1;
    req.on('data', function (chunk) {
        console.log('%d - got %d bytes of data', i++, chunk.length);
    })

    req.on('end', function () {
        res.end('ok');
    })
})

server.listen(1337);

---

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var writable = fs.createWriteStream('some-file.png');

    var i = 1;
    req.on('data', function (chunk) {
        console.log('%d - got %d bytes of data', i++, chunk.length);
        writable.write(chunk);
    })

    req.on('end', function () {
        writable.end();
        res.end('ok');
    })
})

server.listen(1337);

---

node write-server.js
curl -i -X POST localhost:1337 -H "Content-Type: image/png" --data-binary "@examples/build.png"

---

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    var writable = fs.createWriteStream('./some-other-file.png');

    req.pipe(writable);

    req.on('end', function () {
        res.end('ok');
    })
})

server.listen(1337);

---

node pipe-server.js
curl -i -X POST localhost:1337 -H "Content-Type: image/png" --data-binary "@examples/build.png"

---

PRAT OM PIPE

on data: skriv data
on end: end

src.pipe(dest)
src.pipe(transform).pipe(dest)

---

process.stdin.pipe(process.stdout);

---

LA OSS LAGE EN TRANSFORM SOM UPPERCASER:

var stream = require('stream')
var uppercase = new stream.Transform()

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString().toUpperCase();
     this.push(data);
     done()
}

process.stdin
    .pipe(uppercase)
    .pipe(process.stdout);

---

Kan vi sende objekter?

var stream = require('stream')
var uppercase = new stream.Transform()

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString().toUpperCase();
     this.push({ data: data });
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

---

var stream = require('stream')
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString().toUpperCase();
     this.push({ data: data });
     done()
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

var stream = require('stream')

module.exports = function() {
    var logger = new stream.Writable({ objectMode: true })

    logger._write = function(chunk, encoding, next) {
        console.log(chunk);
        next();
    };

    return logger;
}

---

var stream = require('stream')

module.exports = function() {
    var logger = new stream.Writable({ objectMode: true })

    logger._write = function (chunk, encoding, next) {
        console.log(chunk);
        next();
    };

    return logger;
}

---

Gå tilbake

var stream = require('stream')
var logger = require('./logger');
var uppercase = new stream.Transform({ objectMode: true })

uppercase._transform = function(chunk, encoding, done) {
     var data = chunk.toString().toUpperCase();
     this.push({ data: data });
     done()
}

process.stdin
    .pipe(uppercase)
    .pipe(logger());

---

Ikke helt som vi vil enda, split opp og send en push per linje

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

Kan gjøres uten å måtte lage en instans bare for å implementere `_transform`

THROUGH!

npm install through2

`through` vs `through.obj`

---

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

event-stream!

npm install event-stream

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
        done(null, { data: line });
    }))
    .pipe(logger());

---

Nå har vi sett på tre typer streams

Nevn duplex, e.g. socket, websocket

substack og domenictarr

---

GULP

Nytt byggesystem for Node.js

Stream-basert

Tidlig stadie, det skjer mye

---

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.src('./js/**/*.js')
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./build'));

readable
    .pipe(transform)
    .pipe(transform)
    .pipe(transform)
    .pipe(writable)

---

Nå kan du gulp

---

En gulp-plugin er en transform-stream.

THAT'S IT.

Det er en stream-plugin med `gulp-`-prefix

---

task, watch

byggescriptet ditt trenger ikke kjøre js-testene dine. `karma start`

---

Noen triks

Iblant er det smart å bruke andre streaming-hjelpere

---

es.concat
es.pipeline

---

Lage egen plugin, bruk rebase som eksempel

---

Re-iterer sentrale poeng

en stream er bare unix pipes

enkelt, kraftig

