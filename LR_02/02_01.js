const http = require('http');
var fs = require('fs');
const host = 'localhost';
const port = 8080; 

http.createServer(function (request, response) {
        let html = fs.readFileSync('./02_01.html');
    let url = request.url;
    switch (url) {
        case "/html":
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(html);
            break;
    
        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end("<meta charset='UTF-8'><h1>Русурс не найден. Возможно вы искали <a href='http://localhost:8080/html'>http://localhost:8080/html</a></h1>");
            break;
    }

}).listen(port, host);
console.log('Server running on http://localhost:8080');