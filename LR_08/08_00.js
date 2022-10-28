let http = require("http");
let fs = require("fs");
let url = require("url");
let qs = require('querystring');
const multiparty = require('multiparty');
const parseString = require('xml2js').parseString;
let fromXmlParser = require("fast-xml-parser");
let J2xParser = require("fast-xml-parser").j2xParser;
const querystring = require('querystring');
const {
    MIME,
    res200,
    res404,
    res405
} = require("./module");
const {
    sum,
    generateResult,
    generateResultXml
} = require("./functions");
const { Console } = require("console");

let port = 8000;
let host = `localhost`;
try {

    let httpServer = http.createServer((request, response) => {
        let reqPath = url.parse(request.url).pathname;
        let reqMethod = request.method;
        const path = url.parse(request.url, true);
        switch (reqMethod) { //выбор метода
            case "GET": { //если GET
                switch (reqPath) { //проверка пути 
                    case "/connection": {
                        console.log("GET: Connection");
                        let set = parseInt(path.query.set);
                        if (Number.isInteger(set)) {
                            console.log(`Set keepAliveTimeout: ${set}`);
                            response.writeHead(200, {
                                'Content-Type': 'text/html; charset=utf-8'
                            });
                            httpServer.keepAliveTimeout = set;
                            res200(response, `New KeepAliveTimeout value: ${httpServer.keepAliveTimeout}`, MIME.HTML);

                        } else {
                            res200(response, `Current KeepAliveTimeout value: ${httpServer.keepAliveTimeout}`, MIME.HTML);
                        }
                        break;
                    }
                    case "/headers": {
                        let result = '<h2>Request Headers</h2>';
                        Object.keys(request.headers).forEach(key => {
                            result += `${key} = ${request.headers[key]}<br>`
                        });
                        res200(response, result, MIME.HTML);
                        break;
                    }
                    case "/parameter": {
                        if (path.query?.x && path.query?.y) {

                            const x = +path.query.x;
                            const y = +path.query.y;

                            if (isNaN(x) || isNaN(y)) {
                                res405(request, response);
                            } else {
                                res404(response, generateResult(x, y), MIME.HTML);
                            }
                        } else {
                            res405(request, response);
                        }
                        break;
                    }
                    case "/close": {
                        const time = 10 * 1000;
                        setTimeout(() => {
                            httpServer.close();
                            process.exit();
                        }, time);
                        res200(response, `Сервер будет остановлен через ${time} мс`, MIME.HTML);
                        break;
                    }
                    case "/socket": {
                        res200(response,`
                        ServerAddress =  ${request.socket.localAddress}<br>
                        ServerPort = ${request.socket.localPort}<br>
                        ClientAddress = ${request.socket.remoteAddress}<br>
                        ClientPort = ${request.socket.remotePort}
                        `, MIME.HTML);
                        break;
                    }
                    case "/request-data": {
                        request.on('data', (data) => {
                            console.log('PART');
                            response.write(data)
                        });
                        request.on('end', () => {
                            response.end()
                        });
                        break;
                    }
                    case "/resp-status": { //resp-status?code=909&&mess=8
                        let statusCode = parseInt(url.parse(request.url, true).query.code);
                        let statusMessage = url.parse(request.url, true).query.mess;
                        let statusCodeMess = 'Is not fiended';
                        switch (statusCode) {
                            case 100: statusCodeMess = 'Continue'; break;
                            case 101: statusCodeMess = 'Switching Protocols'; break;
                            case 102: statusCodeMess = 'Processing';break;
                            case 200: statusCodeMess = 'OK';break;
                            case 201: statusCodeMess = 'Created';break;
                            case 202: statusCodeMess = 'Accepted';break;
                            case 203: statusCodeMess = 'Non-Authoritative Information';break;
                            case 204: statusCodeMess = 'No Content';break;
                            case 205: statusCodeMess = 'Reset Content';break;
                            case 206: statusCodeMess = 'Partial Content';break;
                            case 207: statusCodeMess = 'Multi-Status';break;
                            case 300: statusCodeMess = 'Multiple Choices';break;
                            case 301: statusCodeMess = 'Moved Permanently';break;
                            case 302: statusCodeMess = 'Moved Temporarily';break;
                            case 303: statusCodeMess = 'See Other';break;
                            case 304: statusCodeMess = 'Not Modified';break;
                            case 305: statusCodeMess = 'Use Proxy';break;
                            case 307: statusCodeMess = 'Temporary Redirect';break;
                            case 400: statusCodeMess = 'Bad Request';break;
                            case 401: statusCodeMess = 'Unauthorized';break;
                            case 402: statusCodeMess = 'Payment Required';break;
                            case 403: statusCodeMess = 'Forbidden';break;
                            case 404: statusCodeMess = 'Not Found';break;
                            case 405: statusCodeMess = 'Method Not Allowed';break;
                            case 406: statusCodeMess = 'Not Acceptable';break;
                            case 407: statusCodeMess = 'Proxy Authentication Required';break;
                            case 408: statusCodeMess = 'Request Time-out';break;
                            case 409: statusCodeMess = 'Conflict';break;
                            case 410: statusCodeMess = 'Gone';break;
                            case 411: statusCodeMess = 'Length Required';break;
                            case 412: statusCodeMess = 'Precondition Failed';break;
                            case 413: statusCodeMess = 'Request Entity Too Large';break;
                            case 414: statusCodeMess = 'Request-URI Too Large';break;
                            case 415: statusCodeMess = 'Unsupported Media Type';break;
                            case 416: statusCodeMess = 'Requested Range Not Satisfiable';break;
                            case 417: statusCodeMess = 'Expectation Failed';break;
                            case 418: statusCodeMess = 'I\'m a teapot';break;
                            case 422: statusCodeMess = 'Unprocessable Entity';break;
                            case 423: statusCodeMess = 'Locked';break;
                            case 424: statusCodeMess = 'Failed Dependency';break;
                            case 425: statusCodeMess = 'Unordered Collection';break;
                            case 426: statusCodeMess = 'Upgrade Required';break;
                            case 428: statusCodeMess = 'Precondition Required';break;
                            case 429: statusCodeMess = 'Too Many Requests';break;
                            case 431: statusCodeMess = 'Request Header Fields Too Large';break;
                            case 500: statusCodeMess = 'Internal Server Error';break;
                            case 501: statusCodeMess = 'Not Implemented';break;
                            case 502: statusCodeMess = 'Bad Gateway';break;
                            case 503: statusCodeMess = 'Service Unavailable';break;
                            case 504: statusCodeMess = 'Gateway Time-out';break;
                            case 505: statusCodeMess = 'HTTP Version Not Supported';break;
                            case 506: statusCodeMess = 'Variant Also Negotiates';break;
                            case 507: statusCodeMess = 'Insufficient Storage';break;
                            case 509: statusCodeMess = 'Bandwidth Limit Exceeded';break;
                            case 510: statusCodeMess = 'Not Extended';break;
                            case 511: statusCodeMess = 'Network Authentication Required';break;
                            default: statusCodeMess = statusMessage;
                        }
                        response.statusCode = statusCode;
                        response.statusMessage = statusCodeMess;
                        response.write(`Status code: ${response.statusCode}, Status message: ${response.statusMessage}`);
                        response.end();
                        break;
                    }
                    case "/files": {
                        fs.readdir("./static", (err, files) => {
                            response.setHeader("X-static-files-count", files.length);
                            response.writeHead(200, {
                                "Content-Type": "text/plain; charset=utf-8"
                            });
                            response.end(`Count of files: ${files.length}`);
                        });
                        break;
                    }
                    case "/upload": {
                         response.writeHead(200, {
                             "Content-Type": "text/html; charset=utf-8"
                         });
                         response.end(fs.readFileSync("upload.html"));
                         break;
                    } 
                    case "/formparameter": {
                        fs.createReadStream('./static/formparameter.html').pipe(response);
                        break;
                    }

                    default: { //написать обработчки для файлов 
                        const parameterPattern = new RegExp('^\\/parameter\\/(.+)\\/(.+)$');
                        if (parameterPattern.test(path.pathname)) {
                            const arrayPath = path.pathname.slice(1).split('/');
                            const x = +arrayPath[1],
                                y = +arrayPath[2];

                            res200(response, generateResult(x, y), MIME.HTML);
                            break;
                        }

                        if (path.pathname.slice(1).split("/")[0] === "files") {
                            let arrayPath = path.pathname.slice(1).split("/");
                            let fileName = arrayPath[1];
                            if (fs.existsSync(`./static/${fileName}`)) {
                                fs.access(`./static/${fileName}`, fs.constants.R_OK, () => {
                                    response.writeHead(200, {
                                        "Content-Type": "application/txt; charset=utf-8"
                                    });
                                    fs.createReadStream(`./static/${arrayPath[1]}`).pipe(response);
                                });
                            } else {
                                res404(response, request.url, MIME.HTML);
                            }
                            break;
                        }

                        console.log("GET: Not Found")
                        response.writeHead(404);
                        response.end("404: Not Found");
                        break;
                    }
                }
                break;
            }
            case "POST": { //если POST
                switch (reqPath) { //проверка пути
                    case "/formparameter": {
                        request.on('data', data => {
                            const params = querystring.parse(data.toString());
                            let body = '';
                            Object.keys(params).forEach(key => body += `${key} = ${params[key]}<br>`);
                            res200(response, body, MIME.HTML)
                        });
                        break;
                    }
                    case "/json": {
                        request.on('data', data => {
                            const params = JSON.parse(data);
                            const oBody = {
                                __comment: 'Ответ.' + params.__comment.substr(7, 100),
                                x_plus_y: sum(params.x, params.y),
                                Concatination_s_o: `${params.s}: ${params.o.surname}, ${params.o.name}`,
                                Lenght_m: params.m.length
                            };
                            res200(response, JSON.stringify(oBody), MIME.JSON);
                        });
                        break;
                    }
                    case "/xml": {
                         request.on('data', data => {
                             parseString(data, (err, result) => {
                                 res200(response, generateResultXml(result), MIME.XML);
                             })
                         });
                        break;
                    }
                    case "/upload": {
                        let form = new multiparty.Form({
                            uploadDir: "./static"
                        });
                        form.on("field", (name, value) => {

                        });
                        form.on("file", (name, file) => {
                            console.log(`name = ${name}; original filename: ${file.originalFilename}; path = ${file.path}`);
                        });
                        form.on("error", (err) => {
                            response.writeHead(200, {
                                "Content-Type": "text/plain; charset=utf-8"
                            });
                            response.end(`${err}`);
                        });
                        form.on("close", () => {
                            response.writeHead(200, {
                                "Content-Type": "text/plain; charset=utf-8"
                            });
                            response.end("Файл получен");
                        });
                        form.parse(request);
                        break;
                    }

                    default: { //если POST и такого пути нет (не можем и не должны обрабатывать)
                        response.statusCode = 404;
                        console.log(`${reqMethod}: ${response.statusCode}\n(Cannot parse path. The path is not correct.)\n${new Date().toLocaleString()}`)
                        response.writeHead(response.statusCode, {
                            'Content-Type': 'text; charset=utf-8'
                        })
                        response.end(`${reqMethod}: ${response.statusCode}\n(Cannot parse path. The path is not correct.)\n${new Date().toLocaleString()}`);
                        break;
                    }
                }
                break;
            }
            default: { //если метод не GET и POST
                console.log(`405: Invalid request method (${new Date().toLocaleString()})`);
                response.writeHead(405, {
                    'Content-Type': 'text; charset=utf-8'
                })
                response.end(`405: Invalid request method (${new Date().toLocaleString()})`);
                break;
            }
        }
    }).listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}/`)
    });
} catch (error) {
    console.log(error)
}