const http = require('http');
const {
    param
} = require("express/lib/router");
const fs = require('fs');
const webSocket = require('ws');
const rpcWS = require('rpc-websockets').Server;
const readline = require('readline');
const { start } = require('repl');


module.exports.ex1 = function () {
    let webServer = new webSocket.Server({
        port: 4000,
        host: 'localhost'
    });

    let k = 1;

    webServer.on('connection', (clientSocket) => {
        const webSocketStream = webSocket.createWebSocketStream(clientSocket, {
            encoding: 'utf-8'
        });
        const file = fs.createWriteStream(__dirname + `\\upload\\file_${k++}.txt`);
        webSocketStream.pipe(file);
    });
}
module.exports.ex2 = function () {
let webServer = new webSocket.Server({
    port: 4000,
    host: 'localhost'
});

webServer.on('connection', (clientSocket) => {
    let webSocketStream = webSocket.createWebSocketStream(clientSocket, {
        encoding: 'utf-8'
    });
    let file = fs.createReadStream('./download/downld.txt');
    file.pipe(webSocketStream);
});
}

module.exports.ex3 = function () {
    const wss = new webSocket.Server({
        port: 4000,
        host: 'localhost'
    });

    let n = 0;

    wss.on('connection', (ws) => {
        wss.clients.forEach((client) => {
            setInterval(() => {
                client.send(`11-03-server: ${++n}\n`);
            }, 15000);
        });
        setInterval(() => {
            console.log(`server: ping, ${wss.clients.size} connected clients`);
            ws.ping('server: ping');
        }, 5000);
    });
}

module.exports.ex4 = function () {
    let ws_server = new webSocket.Server({
        port: 4000,
        host: 'localhost'
    });
    let messageCounter = 0;
    ws_server.on('connection', (clientSocket) => {
        clientSocket.on('message', (data) => {
            let clientMessage = JSON.parse(data);
            console.log('client message: ' + data);

            clientSocket.send(JSON.stringify({
                server: ++messageCounter,
                client: clientMessage.client,
                timestamp: clientMessage.timestamp
            }));
        });
    });
}

module.exports.ex5 = function () {
    let server = new rpcWS({
        port: 4000,
        host: 'localhost',
        path: '/'
    });
    server.setAuth(l => {
        return l.login == '1234' && l.password == '1234'
    });

    server.register('square', square).public();
    server.register('sum', params => params.reduce((a, b) => a + b, 0)).public();
    server.register('mul', params => params.reduce((a, b) => a * b, 1)).public();
    server.register('fib', fib).protected();
    server.register('fact', fact).protected();
    server.register('fibn', fibn).protected();

    function square(args) {
        if (args.length === 1) {
            return Math.PI * args[0] * args[0];
        } else if (args.length === 2) {
            return args[0] * args[1];
        } else {
            return 0;
        }
    }

    function fib(n) {
        let elems = [];
        for (let i = 1; i <= n; i++) {
            elems.push(fibn(i));
        }
        return elems;
    }

    function fibn(n) {
        return n < 2 ? n : fibn(n - 1) + fibn(n - 2);
    }

    function fact(n) {
        return n == 0 ? 1 : n * fact(n - 1);
    }
}

module.exports.ex6 = function () {
    console.log(`ЗАПУСТИ СЕРВЕР ИЗ ОТДЕЛЬНОГО ФАЙЛА!`);
}

module.exports.ex7 = function () {
    let server = new rpcWS({
        port: 4000,
        host: 'localhost'
    });

    server.register('A', () => {
        console.log('notify A')
    });
    server.register('B', () => {
        console.log('notify B')
    });
    server.register('C', () => {
        console.log('notify C')
    });
    // console.log(`ЗАПУСТИ СЕРВЕР ИЗ ОТДЕЛЬНОГО ФАЙЛА!`);
}

module.exports.wsclose = function () {
    webServer.Close();
}