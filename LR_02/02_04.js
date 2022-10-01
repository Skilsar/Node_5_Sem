const http = require('http');
var fs = require('fs');
const host = 'localhost';
const port = 5000; 

http.createServer(function (request, response) {
    let xmlhttprequest = fs.readFileSync('./xmlhttprequest.html');
    let text = 'Хлыстов Глеб Георгиевич';
    let url = request.url;
    switch (url) {
        case "/api/name":
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            response.end(text);
            break;
        case "/xmlhttprequest":
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(xmlhttprequest);
            break;
        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end("<meta charset='UTF-8'><h1>Русурс не найден. Возможно вы искали <a href='http://localhost:5000/xmlhttprequest'>http://localhost:5000/xmlhttprequest</a></h1>");
            break;
    }

}).listen(port, host);
console.log('Server running on http://localhost:5000');