const http = require('http');
var fs = require('fs');
const host = 'localhost';
const port = 5000; 

http.createServer(function (request, response) {
    let img = fs.readFileSync('pic.png');;
    let url = request.url;
    switch (url) {
        case "/png":
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.end(img);
            break;

        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end("<meta charset='UTF-8'><h1>Русурс не найден. Возможно вы искали <a href='http://localhost:5000/png'>http://localhost:5000/png</a></h1>");
            break;
    }

}).listen(port, host);
console.log('Server running on http://localhost:5000');