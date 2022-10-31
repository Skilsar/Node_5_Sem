let http = require('http');
let fs = require('fs');
let webSocket = require('ws');

http.createServer((req, res) => {
    if (req.method == 'GET' && req.url == '/start') {
        res.end(fs.readFileSync('10-01.html'));
    } else {
        res.statusCode = 404;
        res.statusMess = 'Page not found';
        res.writeHead(res.statusCode, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(fs.readFileSync('./404.html'));
    }
}).listen(3000, () => {
    console.log('HTTP_Server running at http://localhost:3000/start')
});

let wsServer = new webSocket.Server({
    path: '/wsserver',
    port: 4000,
    host: 'localhost'
}, () => {});

wsServer.on('connection', (clientSocket) => {
    let serverNumber = 1;
    let clientNumber = -1;
    console.log(`WS_Server: Set new connection`);

    clientSocket.on('message', (msg) => {
        console.log(`message by client: ${msg}`);
        clientNumber = parseInt(msg.toString()[msg.length - 1]);
    });

    const intervalId = setInterval(() => {
        clientSocket.send(`10-01-server: ${clientNumber}->${serverNumber++}`);
    }, 5000);

    clientSocket.on('Close socket', () => clearInterval(intervalId));
});