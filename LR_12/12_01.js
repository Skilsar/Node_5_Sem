const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const rpcWS = require('rpc-websockets').Server;

const file_path = './StudentList.json';

http.createServer((request, response) => {
    switch (request.method) {
        case 'GET':
            get_method(request, response);
            break;
        case 'POST':
            post_method(request, response);
            break;
        case 'PUT':
            put_method(request, response);
            break;
        case 'DELETE':
            delete_method(request, response);
            break;
    }
}).listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});

let get_method = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            fs.readFile(file_path, (err, data) => {
                response.setHeader('Content-Type', 'application/json');
                response.end(data);
            });
            break;
        case '/backup':
            fs.readdir('./copy', (err, files) => {
                response.setHeader('Content-Type', 'application/json');
                let json = [];
                for (let i = 0; i < files.length; i++) {
                    json.push({id: i, name: files[i]});
                }
                response.end(JSON.stringify(json));
                console.log(files.length);
            });
            break;
        default: {
            if (/\/\d+/.test(path)) {
                fs.readFile(file_path, (err, data) => {
                    let json = JSON.parse(data.toString());
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].id === Number(path.match(/\d+/)[0])) {
                            response.setHeader('Content-Type', 'application/json; charset=utf-8');
                            response.write(JSON.stringify(json[i]));
                        }
                    }
                    if (!response.hasHeader('Content-Type')) {
                        response.setHeader('Content-Type', 'text/plain; charset=utf-8');
                        response.write(`Студент с ID ${Number(path.match(/\d+/)[0])} не найден!`);
                        console.log(`Студент с ID ${Number(path.match(/\d+/)[0])} не найден! (Date and time)`);
                    }
                    response.end();
                });
                break;
            }
            else console.log('Unhandled pathname');
            break;
        }
    }
};

let post_method = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch (path) {
        case '/': {
            let body = '';
            request.on('data', (data) => {
                body += data;
            });
            request.on('end', () => {
                let newStudent = JSON.parse(body);
                fs.readFile(file_path, (err, data) => {
                    let isStudentAlreadyInList = false;
                    let studentsList = JSON.parse(data.toString());
                    for (let i = 0; i < studentsList.length; i++) {
                        if (studentsList[i].id === newStudent.id) {
                            isStudentAlreadyInList = true;
                            break;
                        }
                    }

                    if (!isStudentAlreadyInList) {
                        studentsList.push(newStudent);
                        fs.writeFile(file_path, JSON.stringify(studentsList), (e) => {
                            if (e) {
                                console.log('Error');
                                response.end('Error');
                            } else {
                                console.log('Студент добавлен');
                                response.end(JSON.stringify(newStudent));
                            }
                        });
                    } else {
                        response.setHeader('Content-Type', 'text/plain');
                        response.end(`Студент с ID ${newStudent.id} уже есть`);
                    }
                });
            });
            rpc_server.emit('ListChangeEvent');
            break;
        }
        case '/backup': {
            let date = new Date();
            console.log(date);
            console.log(date.getDate());
            setTimeout(() => {
                fs.copyFile(file_path, `./copy/${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}_StudentList.json`, (err) => {
                    if (err) {
                        console.log('Error');
                        response.end('Error');
                    } else {
                        console.log('Backup completed successfully.');
                        response.end('Backup completed successfully.');
                    }
                });
            }, 2000);
            break;
        }
        default: {
            console.log('Unhandled pathname');
            break;
        }
    }
};

let put_method = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch (path) {
        case '/': {
            let body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                fs.readFile(file_path, (err, data) => {
                    let flag = false;
                    let json = JSON.parse(data.toString());
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].id === JSON.parse(body).id) {
                            json[i] = JSON.parse(body);
                            fs.writeFile(file_path, JSON.stringify(json), (e) => {
                                if (e) {
                                    console.log('Error');
                                    response.end('Error');
                                } else {
                                    console.log(`Студент с id ${JSON.parse(body).id} изменен`);
                                    response.end(JSON.stringify(JSON.parse(body)));
                                }
                            });
                            flag = true;
                        }
                    }
                    if (!flag) {
                        response.setHeader('Content-Type', 'text/plain');
                        response.end(`Студент с ID ${JSON.parse(body).id} не найден`);
                    }
                });
            });
            rpc_server.emit('ListChangeEvent');
            break;
        }
        default: {
            console.log('Unhandled pathname');
            break;
        }
    }
};

let delete_method = (request, response) => {
    let path = url.parse(request.url).pathname;
    switch (true) {
        case /\/backup\/\d+/.test(path): {
            let flag = false;
            fs.readdir('./copy', (err, files) => {
                for (let i = 0; i < files.length; i++) {
                    var date = Number(path.match(/\d+/)).toString().split(/[0-9]/);
                    if (files[i].match(/\d{8}/) > Number(path.match(/\d+/))) {
                        flag = true;
                        fs.unlink(`./copy/${files[i]}`, (e) => {
                            if (e) {
                                console.log('Error');
                                response.end('Error');
                            } else {
                                let year = (Number(path.match(/\d+/)) / 10000).toFixed(0);
                                let month = ((Number(path.match(/\d+/))-year*10000)/100).toFixed(0);
                                if(month < 10) {month = `0${month}`}
                                let day = ((Number(path.match(/\d+/)) - year * 10000) - month*100).toFixed(0);
                                if(day < 10) {day = `0${day}`}
                                console.log(`${date[0]}`);
                                console.log(`All backups after ${year}.${month}.${day} have been deleted.`);
                                response.end(`All backups after ${year}.${month}.${day} have been deleted.`);
                            }
                        });
                    }
                }
                if (!flag) {
                    response.setHeader('Content-Type', 'text/plain');
                    console.log(`File not found`);
                    response.end('Файл не найден');
                }
            });
            break;
        }

        case /\/\d+/.test(path): {
            fs.readFile(file_path, (err, data) => {
                let StudentFound = false;
                let json = JSON.parse(data.toString());
                let DeletedStudentId = Number(path.match(/\d+/)[0]);
                for (let i = 0; i < json.length; i++) {
                    if (json[i].id === DeletedStudentId) {
                        response.setHeader('Content-Type', 'application/json');
                        response.write(JSON.stringify(json[i]));
                        json.splice(i, 1);
                        StudentFound = true;
                        break;
                    }
                }
                if (StudentFound) {
                    fs.writeFile(file_path, JSON.stringify(json), (e) => {
                        if (e) {
                            console.log('Error');
                            response.write('Error');
                        } else {
                            console.log('Ok');
                            response.write('Ok');
                        }
                        response.end();
                    });
                } else {
                    response.end(`Студент с id ${DeletedStudentId} не найден`);
                }
            });
            break;
        }
        default: {
            console.log('Unhandled pathname');
            break;
        }
    }
};

let rpc_server = new rpcWS({port: 4000, host: 'localhost'});
rpc_server.event('ListChangeEvent');