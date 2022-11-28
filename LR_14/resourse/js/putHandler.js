const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
let data_json = '';
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    switch (true) {
        case path === '/api/faculties':
            //v1
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                DB.getFaculty(data_json.FACULTY).
                then((res) => {
                    if (res.recordset.length == 0) throw 'No such faculty'
                }).
                catch(error => {
                    write_error_400(res, error)
                });
                console.log(`PUT FACULTY: ${data_json.FACULTY}, ${data_json.FACULTY_NAME}\n`);
                DB.putFaculties(data_json.FACULTY, data_json.FACULTY_NAME).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {
                    write_error_400(res, error)
                });
            });
            break;
        case path === '/api/pulpits':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                console.log(`PUT PULPIT: ${data_json.PULPIT}, ${data_json.PULPIT_NAME}, ${data_json.FACULTY}\n`);
                DB.getPulpit(data_json.PULPIT).
                then((res) => {
                    if (res.recordset.length == 0) throw 'No such pulpit'
                }).
                catch(error => {
                    write_error_400(res, error)
                });
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                DB.putPulpits(data_json.PULPIT, data_json.PULPIT_NAME, data_json.FACULTY).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {
                    write_error_400(res, error)
                });
            });
            break;
        case path === '/api/subjects':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                console.log(`PUT SUBJECT: ${data_json.SUBJECT}, ${data_json.SUBJECT_NAME}, ${data_json.PULPIT}\n`);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                DB.getSubject(data_json.SUBJECT).
                then((res) => {
                    if (res.recordset.length == 0) throw 'No such subject'
                }).
                catch(error => {
                    write_error_400(res, error)
                });
                DB.putSubjects(data_json.SUBJECT, data_json.SUBJECT_NAME, data_json.PULPIT).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {
                    write_error_400(res, error)
                });
            });
            break;
        case path === '/api/auditoriumstypes':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                console.log(`PUT AUDITORIUM_TYPE: ${data_json.AUDITORIUM_TYPE}, ${data_json.AUDITORIUM_TYPENAME}\n`);
                DB.putAuditoriums_Types(data_json.AUDITORIUM_TYPE, data_json.AUDITORIUM_TYPENAME).then(records => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(data_json));
                }).catch(error => {
                    write_error_400(res, error)
                });
            });
            break;
        case path === '/api/auditoriums':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                DB.getAuditorim(data_json.AUDITORIUM).
                then((res) => {
                    if (res.recordset.length == 0) throw 'No such auditorium'
                }).
                catch(error => {
                    write_error_400(res, error)
                });
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                DB.putAuditoriums(data_json.AUDITORIUM, data_json.AUDITORIUM_NAME, data_json.AUDITORIUM_CAPACITY, data_json.AUDITORIUM_TYPE).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {
                    write_error_400(res, error)
                });
            });
    }
}

function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.end('<h1>error</h1></br>' + '<h3>' + error + '</h3>');
}