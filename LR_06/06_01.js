const http = require('http');
const fs = require('fs');
const url = require('url');

const host = 'localhost';
const port = 5000; 

http.createServer(function (request, response) {
    if (url.parse(request.url).pathname === '/' && request.method === 'GET') {
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        });
         fs.readFile('./index.html', (err, data) => {
             response.end(data);
         });
         }
    if (url.parse(request.url).pathname === '/' && request.method === 'POST') {
        let body = '';
        request.on('data', (mes) => {
            body += mes.toString();
        });
        request.on('end', () => {
            let parm = JSON.parse(body);
            console.log(`Message sended. ${new Date().toLocaleString()} \nSender: ${parm.from}\nReceiver: ${parm.to}\nMessage: ${parm.message}`);
            response.end(`Message sended. ${new Date().toLocaleString()} \nSender: ${parm.from}\nReceiver: ${parm.to}\nMessage: ${parm.message}`);
        });
    }
}).listen(port, host);
console.log(`Server running on http://localhost:5000`);