const url = require("url");
const {parse} = require("querystring");
const {parseString} = require("xml2js");
const xmlbuilder = require('xmlbuilder');
const fs = require("fs");
const http = require("http");
const multiparty = require("multiparty");

var infoS;
let Post_handler = (path, req, res) => {
    switch (path) {
        case '/09_03':
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let parm = parse(body);
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                res.end((parm.x + parm.y + parm.s).toString());
            });
            break;
        case '/09_04':
            let body1 = '';
            req.on('data', chunk => {
                body1 += chunk.toString();
            });
            req.on('end', () => {
                let parm = JSON.parse(body1);
                let answer = {
                    _comment: 'Ответ. ' + parm._comment.substr(7, 100),
                    x_plus_y: parm.x + parm.y,
                    Concatination_s_o: parm.s + ': ' + parm.o.surname + ' ' + parm.o.name,
                    Lenght_m: parm.m.length
                };
                res.writeHead(200, {
                    'Content-type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(answer));
            });
            break;
        case '/09_05':
            let obj = null;
            let buf = '';
            let id = 0;
            req.on('data', (data) => {
                buf += data;
            });
            req.on('end', () => {
                id += 1;
                var sum = 0;
                var str = '';
                var idreq = 0;
                parseString(buf, (err, result) => {
                    if (err) {
                        res.writeHead(400, {});
                        res.end('XML parse error');
                        return;
                    }
                    obj = result;
                    obj.request.x.map((e, i) => {
                        sum += parseInt(e.$.value);
                    });
                    obj.request.m.map((e, i) => {
                        str += e.$.value;
                    });
                    idreq = obj.request.$.id;
                });
                let xml = xmlbuilder.create('response').att('id', idreq);
                xml.ele('sum')
                    .att('element', 'x')
                    .att('result', sum)
                    .up()
                    .ele('concat')
                    .att('element', 'm')
                    .att('result', str);
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                res.write(xml.toString());
                res.end();
            });
            break;
        case '/file':
        const mform = new multiparty.Form({
            uploadDir: "./static"
        });
        mform.on("file", (name, file) => {
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end(`Файл = ${file.originalFilename} сохранен в ${file.path}`);
        });
        mform.on("error", (err) => {
            console.log(err);
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end("Error");
        });
        mform.parse(req);
        break;
    }
}

let Get_handler = (path, req, res) => {
    const {
        query
    } = url.parse(req.url, true);
    switch (path) {
        case '/09_01':
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.end('Строка из тела ответа');
            break;
        case '/09_02':
            let {
                x
            } = query;
            let {
                y
            } = query;

            if (Number.isInteger(parseInt(x)) && Number.isInteger(parseInt(y))) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                res.end((parseInt(x) + parseInt(y)).toString());
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=utf-8'
                });
                res.end('Некорректные данные');
            }
            break;
        case '/09_08':
            res.writeHead(200, {
                "Content-Type": "text/html"
            });
            res.end(fs.readFileSync("data_send.txt"));
            break;
    }
}

let http_handler = (req, res) => {
    const path = url.parse(req.url, true).pathname;
    switch (req.method) {
        case 'GET':
            Get_handler(path, req, res);
            break;
        case 'POST':
            Post_handler(path, req, res);
            break;
    }
}

let server = http.createServer();
server.listen(5000, (v) => {
        console.log('Server running at http://localhost:5000/')
    })
    .on('error', (e) => {
        console.log('Server running at http://localhost:5000/: error:', e.code)
    })
    .on('request', http_handler)
    .on('connection', (socket) => {
        infoS = `<h3>LocalAddress = ${socket.localAddress.replace('::ffff:', '')}</h3>`;
        infoS += `<h3>LocalPort = ${socket.localPort}</h3>`;
        infoS += `<h3>RemoteAddress = ${socket.remoteAddress.replace('::ffff:', '')}</h3>`;
        infoS += `<h3>RemotePort = ${socket.remotePort}</h3>`;
    });

function parametr(x, y, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.write(`<h3>Сумма = ${x+y}</h3>`);
    res.write(`<h3>Разность = ${x-y}</h3>`);
    res.write(`<h3>Произведение = ${x*y}</h3>`);
    res.end(`<h3>Частное = ${x/y}</h3>`);
};
