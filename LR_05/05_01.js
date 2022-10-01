var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./db_module.js');

var db = new data.DB();
let countCommits = 0;
let countRequests = 0;
let sdCommandTime = null;
let sdStartControl = false;
let scCommandTime = null;
let ssCommandTime = null;
let startStat = new Date().toLocaleString();


db.on(
    'GET', (request, response) => {
        countRequests++;
        console.log(`DB.GET ${new Date().toLocaleString()}`);
        response.end(JSON.stringify(db.select()));
    }
);

db.on(
    'POST', (request, response) => {
        countRequests++;
        console.log(`DB.POST ${new Date().toLocaleString()}`);
        request.on('data', data => {
            let elem = JSON.parse(data);
            let lastElemID = db.getLastElemID();
            elem.id = lastElemID + 1;
            db.insert(elem);
            response.end(JSON.stringify(elem));
        });
    }
);

db.on('PUT', (request, response) => {
    countRequests++;
    console.log(`DB.PUT ${new Date().toLocaleString()}`);
    request.on('data', data => {
        let elem = JSON.parse(data);
        db.update(elem);
        response.end(JSON.stringify(elem));
    });
});

db.on('DELETE', (request, response) => {
    countRequests++;
    console.log(`DB.DELETE ${new Date().toLocaleString()}`);
    if (url.parse(request.url, true).query.id !== null) {
        let Id = +url.parse(request.url, true).query.id;
        if (Number.isInteger(Id)) {
            let delElem = db.delete(Id);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(delElem));
        }
    }
});

db.on('HEAD', () => {
    console.log(`DB.COMMIT ${new Date().toLocaleString()}`);
    countCommits++;
    db.commit();
});

/*проработать:
отдельно запуск старт. таймера +
потом ожидание, +
обнуление счетчиков при новом запуске, +
*/
function Statistics() {
    return 'Statistic started: ' + startStat + ',\nStatistic finished: ' + new Date().toLocaleString() + ',\nCount requests: ' + countRequests + ',\nCount commits: ' + countCommits + '\n';
}

let httpServer = http.createServer(function (req, res) {
    if (url.parse(req.url).pathname === '/') {
        let html = fs.readFileSync('./05_02.html');
        res.writeHead(200, {
            'contentType': 'text/html; charset=utf-8'
        });
        res.end(html);
    } else if (url.parse(req.url).pathname === '/api/db') {
        db.emit(req.method, req, res);
    } else if (req.url === '/api/ss') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(Statistics()));
    }
}).listen(5000, () => {
    console.log("Server running on http://localhost:5000/");
});

/* Work with cmd commands */

process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let command = null;

    while ((command = process.stdin.read()) != null) {
        command = command.trim();
        if (httpServer.listening) { //проверка на запущенный сервер
            let commandName = command.split(' ', 1)[0];
            let commandParam = command.slice(command.indexOf(' ') + 1);
            let commandParamVal = Number(commandParam);
            let commandParamTrue = false;
            /*for test console.log(`Name of command: ${commandName}; Command legth: ${commandName.length}`);*/
            if (commandName.length <= 2) { //проверка на длину комманды
                if (commandName == 'sd' || commandName == 'sc' || commandName == 'ss') { //проверка на комманду
                    if (command.length > 2) { //проверка задан ли параметр
                        commandParamTrue = true;
                    }
                    /*for test console.log(`Command parameter: ${commandParam}`);*/
                    switch (commandName) { //выполнение определенной комманды

                        //--------------SD----------------
                        case 'sd':
                            if (commandParamTrue) { //если есть параметр - проверяем параметр
                                if (commandParamVal) { //параметр правельный
                                    //for test console.log(`Parametr success`);
                                    sdStartControl = true;
                                    clearTimeout(sdCommandTime);
                                    sdCommandTime = setTimeout(() => {
                                        httpServer.close();
                                    }, commandParamVal * 1000).unref();
                                    process.stdin.unref();
                                    console.log(`The server will be stopped in ${commandParamVal} seconds`);
                                } else { //параметр неверен
                                    console.log(`Command parameter "${commandParam}" isn't corrected`)
                                }
                            } else { //если параметра нет, выполняем без параметра
                                //for test console.log(`Parameter isn't set! OK!`);
                                if (!sdStartControl) { //проверка был ли запущен сервер, есть ли что останавливать
                                    console.log(`Stopping the server is not set!`);
                                } else {
                                    sdStartControl = false;
                                    sdCommandTime.unref();
                                    clearTimeout(sdCommandTime);
                                    console.log(`Server stop cancelled!`);
                                }
                            }
                            break;

                            //--------------SC----------------
                        case 'sc':
                            if (commandParamTrue) {
                                if (commandParamVal) {
                                    countCommits = 0;
                                    countRequests = 0;
                                    clearInterval(scCommandTime);
                                    scCommandTime = setInterval(() => {
                                        db.emit('HEAD');
                                    }, commandParamVal * 1000);
                                    scCommandTime.unref();
                                    console.log(`Started commit at interval ${commandParamVal} seconds.`);
                                } else {
                                    console.log(`Command parameter "${commandParam}" isn't corrected!`)
                                }
                            } else {
                                clearInterval(scCommandTime);
                                console.log(`Commit cancelled`);
                            }
                            break;

                            //--------------SS----------------
                        case 'ss':
                            if (commandParamTrue) {
                                if (commandParamVal) {
                                    startStat = new Date().toLocaleString();
                                    clearTimeout(ssCommandTime);
                                    ssCommandTime = setTimeout(() => {
                                        console.log(Statistics());
                                    }, commandParamVal * 1000);
                                    ssCommandTime.unref();
                                    console.log(`Started collecting statistics for ${commandParamVal} seconds.`);
                                } else {
                                    console.log(`Command parameter "${commandParam}" isn't corrected`)
                                }
                            } else {
                                clearTimeout(ssCommandTime);
                                console.log(`Statistics collection canceled!`);
                            }
                            break;
                    }
                } else {
                    console.log(`Command "${command.trim(0,2)}" isn't found! Try again...`)
                }
            } else {
                console.log(`Command "${command.trim(0,2)}" isn't found! Try again...`)
            }
        } else {
            console.log(`Server isn't started!`)
        }
    }
});