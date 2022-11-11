const http = require('http');
const {
    param
} = require("express/lib/router");
const fs = require('fs');
let webSocket = require('ws');
const { Console } = require('console');
const async = require('async');
const rpcWS = require('rpc-websockets').Client;

module.exports.ex1 = function () {
    const WebSocket = require('ws');
    const fs = require('fs');

    const webSocket = new WebSocket('ws://localhost:4000/');
    const webSocketStream = WebSocket.createWebSocketStream(webSocket, {
        encoding: 'utf-8'
    });
    const file = fs.createReadStream('./data_in.txt');
    file.pipe(webSocketStream);
    console.log(`**Completed**`);
}
module.exports.ex2 = function () {
    let WebSocket = require('ws');
    let fs = require('fs');

    let webSocket = new WebSocket('ws://localhost:4000/');
    let webSocketStream = WebSocket.createWebSocketStream(webSocket, {
        encoding: 'utf-8'
    });
    let file = fs.createWriteStream('./downld_11-2.txt');

    webSocketStream.pipe(file);
}

module.exports.ex3 = function () {
   const ws = new webSocket('ws://localhost:4000/');
   const duplex = webSocket.createWebSocketStream(ws, {
       encoding: 'utf-8'
   });

   duplex.pipe(process.stdout);
}

module.exports.ex4 = function () {
let ws_client = new webSocket('ws://localhost:4000/');

    ws_client.on('open', () => {
        setInterval(() => {
            ws_client.send(JSON.stringify({
                client: process.argv[2],
                timestamp: new Date().toString()
            }));
        }, 5000);

        ws_client.on('message', (inMessage) => {
            console.log('incomming message: ' + inMessage);
        });
    });
}

module.exports.ex5a = function () {
    const ws = new rpcWS('ws://localhost:4000');
    ws.on('open', () => {
        ws.call('square', [3]).then((r) => {
            console.log('square(3) = ', r);
        });
        ws.call('square', [5, 4]).then((r) => {
            console.log('square(5,4) = ', r);
        });
        ws.call('sum', [2]).then((r) => {
            console.log('sum(2) = ', r);
        });
        ws.call('sum', [2, 4, 6, 8, 10]).then((r) => {
            console.log('sum(2,4,6,8,10) = ', r);
        });
        ws.call('mul', [3]).then((r) => {
            console.log('mul(3) = ', r);
        });
        ws.call('mul', [3, 5, 7, 9, 11, 13]).then((r) => {
            console.log('mul(3,5,7,9,11,13) = ', r);
        });

        ws.login({
                login: '1234',
                password: '1234'
            })
            .then(() => {
                ws.call('fib', [1]).then((r) => {
                    console.log('fib(1) = ', r);
                });
                ws.call('fib', [2]).then((r) => {
                    console.log('fib(2) = ', r);
                });
                ws.call('fib', [7]).then((r) => {
                    console.log('fib(7) = ', r);
                });
                ws.call('fact', [0]).then((r) => {
                    console.log('fact(0) = ', r);
                });
                ws.call('fact', [5]).then((r) => {
                    console.log('fact(5) = ', r);
                });
                ws.call('fact', [10]).then((r) => {
                    console.log('fact(10) = ', r);
                });
            });
    });
}

module.exports.ex5b = function () {
    const ws = new rpcWS('ws://localhost:4000/');
    let paralell_functions = (x = ws) => async.parallel({
            square_3: cb => {
                ws.call('square', [3]).catch((e) => cb(e, null)).then((r) => {
                    cb(null, r)
                });
            },
            square_5_4: cb => {
                ws.call('square', [5, 4]).catch((e) => cb(e, null)).then((r) => {
                    cb(null, r)
                });
            },
            sum_2: cb => {
                ws.call('sum', [2]).catch((e) => cb(e, null)).then((r) => {
                    cb(null, r)
                });
            },
            sum_2_4_6_8_10: cb => {
                ws.call('sum', [2, 4, 6, 8, 10]).catch((e) => cb(e, null)).then((r) => {
                    cb(null, r)
                });
            },
            mul_3: cb => {
                ws.call('mul', [3]).catch((e) => cb(e, null)).then((r) => {
                    cb(null, r)
                });
            },
            mul_3_5_7_8_11: cb => {
                ws.call('mul', [3, 5, 7, 9, 11, 13]).catch((e) => cb(e, null)).then((r) => {
                    cb(null, r)
                });
            },

            fib_7: cb => {
                ws.login({
                        login: '1234',
                        password: '1234'
                    })
                    .then(() => {
                        ws.call('fib', [7]).catch((e) => cb(e, null)).then((r) => {
                            cb(null, r)
                        });
                    })
            },
            fact_10: cb => {
                ws.login({
                        login: '1234',
                        password: '1234'
                    })
                    .then(() => {
                        ws.call('fact', [10]).catch((e) => cb(e, null)).then((r) => {
                            cb(null, r)
                        });
                    })
            }
        },
        (e, r) => {
            if (e) console.log('e = ', e);
            else console.log('r = ', r);
            ws.close();
        });

    ws.on('open', paralell_functions);
}

module.exports.ex5c = function () {
    const ws = new rpcWS('ws://localhost:4000/');
    ws.on('open', () => {
        ws.login({
                login: '1234',
                password: '1234'
            })
            .then(async () => {
                console.log('result:',
                    await ws.call('sum', [
                        await ws.call('square', [3]),
                        await ws.call('square', [5, 4]),
                        await ws.call('mul', [3, 5, 7, 9, 11, 13])
                    ]) +
                    await ws.call('fibn', [7]) *
                    await ws.call('mul', [2, 4, 6])
                )
            });
    });
    ws.on('error', (e) => {
        console.log('error = ', e)
    });
}

module.exports.ex6 = function () {
    console.log(`ЗАПУСТИ КЛИЕНТ ИЗ ОТДЕЛЬНОГО ФАЙЛА!`);
}

module.exports.ex7 = function () {
    console.log(`ЗАПУСТИ КЛИЕНТ ИЗ ОТДЕЛЬНОГО ФАЙЛА!`);
}