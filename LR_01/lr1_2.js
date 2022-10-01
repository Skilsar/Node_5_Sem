const http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end('<title>01-02</title><h1>Hello World</h1>');
}).listen(8080);
console.log('Server running on 8080');