const WebSocket = require('ws');

const ws = new WebSocket.Server({
    port: 5000,
    host: 'localhost',
    path: '/broadcast'
});
ws.on('connection', (wss) => {
    wss.on('message', (message) => {
        ws.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN)
                client.send('server: ' + message);
        });
    });
});
ws.on('error', (e) => {
    console.log('WS_Server error', e)
});
console.log(`WS_Server:\nHost:${ws.options.host};\nPort:${ws.options.port};\nPath:${ws.options.path};`);