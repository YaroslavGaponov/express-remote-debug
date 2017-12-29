Express-remote-debug
===================
Express middleware for sending debug information via UDP broadcast channel


## Express server with remote debug middleware
```
var express = require('express');
var debug = require('express-remote-debug');

var app = express();

app.use(debug(['method', 'path', 'query']));

app.use('/', (req, res) => {
    res.send('Hello world');
});

app.listen(12345);
```

## client

run netcat tool as UDP server on same port
```
nc -kluw 0  12345
```

result
```
Fri Dec 29 2017 08:22:22 GMT-0500 (EST)	method: GET, path: /, query: {}
Fri Dec 29 2017 08:22:30 GMT-0500 (EST)	method: GET, path: /hello, query: {}
Fri Dec 29 2017 08:22:36 GMT-0500 (EST)	method: GET, path: /hello, query: {"a":"123"}
```



