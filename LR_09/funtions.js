const http = require('http');
const {
    param
} = require("express/lib/router");
const fs = require('fs');

module.exports.ex1 = function () {
    const req = http.get({
            hostname: 'localhost',
            port: 5000,
            path: '/09_01'
        },
        (res) => {
            console.log('Статус ответа:' + res.statusCode);
            console.log('Сообщение к статусу ответа:' + res.statusMessage);
            console.log('Ip-адрес удаленного сервера:' + req.connection.remoteAddress);
            console.log('Порт удаленного сервера:' + req.connection.remotePort);
            let buf = '';
            res.on('data', (data) => {
                buf += data;
            });
            res.on('end', () => {
                console.log('Данные:' + buf);
            });
        });
}
module.exports.ex2 = function () {
    const req = http.get({
            hostname: 'localhost',
            port: 5000,
            path: '/09_02?x=5&y=8'
        },
        (res) => {
            console.log('Статус ответа:' + res.statusCode);
            let buf = '';
            res.on('data', (data) => {
                buf += data;
            });
            res.on('end', () => {
                console.log('Данные:' + buf);
            });
        });
}

module.exports.ex3 = function () {
    const data = 'x=aaa&y=bbb&s=ccc';

    const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path: '/09_03',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        },
        (res) => {
            console.log('Статус ответа:' + res.statusCode);
            let buf = '';
            res.on('data', (data) => {
                buf += data.toString();
            });
            res.on('end', () => {
                console.log('Данные:' + buf);
            });
        });

    req.on('error', (error) => {
        console.error(error)
    })
    req.end(data);
}

module.exports.ex4 = function () {
    var data = `{
              "_comment": "Запрос.Лабораторная работа 8/10",
              "x": 3,
              "y": 2,
              "s": "Message",
              "m": ["a","b","c"],
              "o": {"surname": "Hlystov", "name": "Gleb"}
            }`;
    const req = http.request({
            hostname: 'localhost',
            path: '/09_04',
            port: 5000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        (res) => {
            console.log('Статус ответа:' + res.statusCode);
            let buf = '';
            res.on('data', (data) => {
                buf += data.toString();
            });
            res.on('end', () => {
                console.log('Данные:' + buf);
            });
        });

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data);
    req.end();
}

module.exports.ex5 = function () {
    var data = '<request id = "28">' +
        '<x value = "3"/>' +
        '<x value = "2"/>' +
        '<m value = "a"/>' +
        '<m value = "b"/>' +
        '<m value = "c"/>' +
        '</request>';

    const req = http.request({
            hostname: 'localhost',
            path: '/09_05',
            port: 5000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml'
            }
        },
        (res) => {
            console.log('Статус ответа:' + res.statusCode);
            let buf = '';
            res.on('data', (data) => {
                buf += data.toString();
            });
            res.on('end', () => {
                console.log('Данные:' + buf);
            });
        });

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data);
    req.end();
}

module.exports.ex6 = function () {
    let body = `--&\r\n`;
    body += 'Content-Disposition:form-data; name="file"; Filename="data_send.txt"\r\n';
    body += "Content-Type:text/plain\r\n\r\n";
    body += fs.readFileSync("data_send.txt");
    body += `\r\n--&--\r\n`;

    const req = http.request({
            hostname: 'localhost',
            path: '/file',
            port: 5000,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=&'
            }
        },
        (res) => {
            console.log('Статус ответа:' + res.statusCode);
            let buf = '';
            res.on('data', (data) => {
                buf += data.toString();
            });
            res.on('end', () => {
                console.log('Данные:' + buf);
            });
        });

    req.on('error', (error) => {
        console.error(error)
    })
    req.end(body);
}

module.exports.ex7 = function () {
let body = `--&\r\n`;
body += 'Content-Disposition:form-data; name="file"; Filename="png.png"\r\n';
body += `Content-Type:application/octet-stream\r\n\r\n`;

const req = http.request({
        hostname: 'localhost',
        path: '/file',
        port: 5000,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data; boundary=&'
        }
    },
    (res) => {
        console.log('Статус ответа:' + res.statusCode);
        let buf = '';
        res.on('data', (data) => {
            buf += data.toString();
        });
        res.on('end', () => {
            console.log('Данные:' + buf);
        });
    });

req.on('error', (error) => {
    console.error(error)
});
req.write(body);
let file = new fs.ReadStream('png.png');
file.on("data", (chunk) => {
    req.write(chunk);
});
file.on("end", () => {
    req.end(`\r\n--&--\r\n`);
});
}

module.exports.ex8 = function () {
const file = fs.createWriteStream("NewFile.txt");

const req = http.get({
        host: "localhost",
        path: "/09_08",
        port: 5000
    },
    (res) => {
        res.pipe(file);
    });
req.on("error", e => {
    console.log("Error: ", e.message)
});
req.end();
}