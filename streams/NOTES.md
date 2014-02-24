Streams i Node.js
=================

```
ls | node echo.js

cat examples/build.html | node echo.js

cat examples/build.png | node echo.js

node read-file.js examples/build.png

node read-server.js
curl -i -X POST localhost:1337 -H "Content-Type: image/png" -d "@examples/build.png"

node input-type.js
curl localhost:1337 -d '{}'
curl localhost:1337 -d '"foo"'
curl localhost:1337 -d 'not json'

node write-server.js
curl -i -X POST localhost:1337 -H "Content-Type: image/png" --data-binary "@examples/build.png"

node pipe-server.js
curl -i -X POST localhost:1337 -H "Content-Type: image/png" --data-binary "@examples/build.png"

ls | node input-output.js

node readable.js | node echo.js

ls | node uppercase.js

ls | node transform.js // feiler, fiks objectMode writer
ls | node transform.js

ls | node through.js

ls | node lines-es.js
```

The amount of data that will potentially be buffered depends on the `highWaterMark` option which is passed into the constructor. Default 16k

Vi skal starte med å konsumere data.

"The two programs performing the commands may run in parallel with the only storage space being working buffers (Linux allows up to 64K buffering) plus whatever work space each command's processing requires."

Readable streams will emit data events each time they get a "chunk" of data and then they will emit end when they are all finished.

Different types of streams will have different ways of chunking up their data. For example, a library that reads CSVs might emit data every time it reads a new line whereas an HTTP request might emit data every few kilobytes during the download.

100 Continue
The client SHOULD continue with its request. This interim response is used to inform the client that the initial part of the request has been received and has not yet been rejected by the server.

Nå mottar vi data og prosesserer og er ferdig. Men ofte ønsker vi å gå
gjennom flere steg.

browserify. substack. (webrebels). Stream-adventure.

MASSE hjelpe-biblioteker

avoid explicit subclassing noise -> through2

objectMode

Fortsatt unstable. Det skjer endringer.

"nifty stream class called Transform for transforming data intended to be used when the inputs and outputs are causally related"

Whoa!  What is that { objectMode: true } I threw in there?  Well, we want the destination of our transformation to be able to handle the data line by line.  objectMode allows a consumer to get at each value that is pushed from the stream.  Without objectMode, the stream defaults to pushing out chunks of data.  As the name suggests, objectMode is not just for string values, like in our problem, but for any object in JavaScript ({ “my”: [ “json”, “record” ]}).

Iblant må vi samle opp. For eksempel sortering.

Ressurser
---------

- https://github.com/substack/stream-handbook
- http://maxogden.com/node-streams.html
- http://nodestreams.com/
- http://calv.info/an-introduction-to-nodes-new-streams/
- http://strongloop.com/strongblog/practical-examples-of-the-new-node-js-streams-api/
- http://howtonode.org/streams-explained
- http://bjouhier.wordpress.com/2013/12/17/easy-nodejs-streams/
- http://nodeschool.io/
- http://www.joyent.com/blog/streams-in-node
- https://nodejsmodules.org/tags/stream
- http://thlorenz.com/blog/event-stream
- http://www.slideshare.net/atcrabtree/functional-programming-with-streams-in-nodejs
- https://news.ycombinator.com/item?id=7239407

What is a stream?
-----------------

Streams are sequences of data made available over time. Streams can be visualized as a conveyor belt that makes data available in ordered chunks. Rather than waiting until the entire batch is produced, streams will emit a chunk of the sequence as soon as it is ready

Streams require less resources for storage, as they do not store the whole batch before moving on to the next processing step. In computer terms this means less memory usage, for example by chunking up a ﬁle and sending it in pieces as opposed to reading the entire ﬁle into memory. Latency is also reduced as the ﬁrst parts of the data is sent to consumers straight away. This also ﬁts well with modeling inﬁnite sequences and modeling data that might not yet be available, for example being able to send an inﬁnite sequence of measurements without having to wait for future measurements to be available

Streams as imple- mented in Unix and in node.js are super-composable and makes it easy to build complex applications out of smaller building blocks. The philosophy of streams is captured in the words of Doug McIlroy: "We should have some ways of connecting programs like garden hose-screw in another segment when it becomes necessary to massage data in another way. This is the way of IO also." Doug McIlroy. October 11, 1964

A suitable toy for playing with streams should generate a sequence of data, in real- time.

All streams are instances of EventEmitter


