const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
let data_json = '';
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    switch(true)
    {
        case path == '/api/faculties':
            req.on('data', chunk => {
                data_json += chunk;
            });
            req.on('end', () => {
                data_json = JSON.parse(data_json);
                res.writeHead(200, {'Content-Type': 'application/json'});
                DB.postFacultes(data_json.faculty, data_json.facultyName).then(records => {
                    res.end(JSON.stringify(data_json))
                }).catch(error => {write_error_400(res, error)});
            });
            break;
        case path == '/api/pulpits':
            req.on('data', chunk => {
                data_json = '';
                data_json += chunk;
            });
            req.on('end', ()=>{
                data_json = JSON.parse(data_json);
                console.log(`POST PULPIT DATA: ${JSON.stringify(data_json)}`)
                res.writeHead(200, {'Content-Type': 'application/json'});
                console.log(`POST PULPIT: ${data_json.PULPIT}, ${data_json.PULPIT_NAME}, ${data_json.FACULTY}\n`);

                DB.postPulpits(data_json.PULPIT, data_json.PULPIT_NAME, data_json.FACULTY).then(records => {
                    res.end(JSON.stringify(data_json));
                }).catch(error => {write_error_400(res, error)});
            })
            break;
        case path === '/api/subjects':
            req.on('data', chunk => {
                data_json = '';
                data_json += chunk;
            })
            req.on('end', () => 
            {
                data_json = JSON.parse(data_json);
                console.log(`POST SUBJECT DATA: ${JSON.stringify(data_json)}`)
                res.writeHead(200, {'Content-Type': 'application/json'});
                if (data_json.subject != undefined){
                    data_json.SUBJECT = data_json.subject;
                }
                if (data_json.subject_name != undefined) {
                    data_json.SUBJECT_NAME = data_json.subject_name;
                }
                if (data_json.pulpit != undefined) {
                    data_json.PULPIT = data_json.pulpit;
                }
                console.log(`POST SUBJECT: ${data_json.SUBJECT}, ${data_json.SUBJECT_NAME}, ${data_json.PULPIT}\n`);

                DB.postSubjects(data_json.SUBJECT, data_json.SUBJECT_NAME, data_json.PULPIT).then(records => {
                    res.end(JSON.stringify(data_json));
                }).catch(error => {
                    write_error_400(res, error)
                });
            })
            break;
        case path === '/api/auditoriumstypes':
            req.on('data', chunk => {
                data_json = '';
                data_json += chunk;
            })
            req.on('end', () => 
            {
                data_json = JSON.parse(data_json);
                console.log(`POST AUDITORIUM_TYPE DATA: ${JSON.stringify(data_json)}`)
                res.writeHead(200, {'Content-Type': 'application/json'});
                console.log(`POST AUDITORIUM_TYPE: ${data_json.AUDITORIUM_TYPE}, ${data_json.AUDITORIUM_TYPENAME}\n`);

                DB.postAuTypes(data_json.AUDITORIUM_TYPE, data_json.AUDITORIUM_TYPENAME).then(records => {
                    res.end(JSON.stringify(data_json));
                }).catch(error => {
                    write_error_400(res, error)
                });
            })
            break;
            case path === '/api/auditoriums':
                req.on('data', chunk => {
                    data_json += chunk;
                });
                req.on('end', () => {
                    data_json = JSON.parse(data_json);
                    console.log(`POST AUDITORIUM DATA: ${JSON.stringify(data_json)}`)
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    console.log(`POST AUDITORIUM: ${data_json.AUDITORIUM}, ${data_json.AUDITORIUM_NAME}, ${data_json.AUDITORIUM_CAPACITY}, ${data_json.AUDITORIUM_TYPE}\n`);

                    DB.postAuditoriums(data_json.AUDITORIUM, data_json.AUDITORIUM_NAME, data_json.AUDITORIUM_CAPACITY, data_json.AUDITORIUM_TYPE).then(records => {
                        res.end(JSON.stringify(data_json));
                    }).catch(error => {
                        write_error_400(res, error)
                    });
                });
                break;
    }
}
function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    res.writeHead(res.statusCode, res.statusMessage, {
        'Content-Type': 'application/json'
    })
    res.end(`Error: DataBaseError; Error message:${error}`);
    console.log(`Error: DataBaseError; Error message:${error}`);
}