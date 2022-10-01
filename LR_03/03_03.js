const http = require('http');
const fs = require('fs');
const url = require('url');

const host = 'localhost';
const port = 5000; 

var stateApp = 'Normal';

function fact(n) {
    let result = (n != 1) ? n * fact(n - 1) : 1;
    return result;
}

http.createServer(function (request, response) {

    if (url.parse(request.url).pathname === '/fact') {
        if (typeof url.parse(request.url, true).query.k != 'undefined' ) {
            let k = parseInt(url.parse(request.url, true).query.k);
            if (Number.isInteger(k)) {
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(JSON.stringify({ k:k, fact: fact(k)}));
            }
        }
    }
    else if (url.parse(request.url).pathname === '/') {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(fs.readFileSync('index.html'));
    }
}).listen(port, host);
console.log(`Server running on http://localhost:5000`);