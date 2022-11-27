const url = require('url');
const http = require('http');
const fs = require('fs');

const Db = require('./db')
let DB = new Db();
module.exports = (req, res) => {
    let path = url.parse(req.url).pathname;
    let path_params = path.split('/');
    path_params.splice(0,1);
    if (path_params[0] == 'api'){
        path_params.splice(0,1);
    }
    console.log(`URL Obj: ${path_params};\n`);
    if (path_params[0] == 'faculty' && path_params[2] == 'pulpits'){
        let selInfo = path_params[1].toString();
        console.log(`In Progress: select faculty/${selInfo}/pulpits`);
        DB.getFacultyPulpit(req, res, selInfo).then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {
            write_error_400(res, error)
        });
    }
    else if (path_params[0] == 'auditoriumtypes' && path_params[2] == 'auditoriums') {
        let selInfo = path_params[1].toString();
        console.log(`In Progress: select auditoriumtypes/${selInfo}/auditoriums`);
        DB.getAuditoriumtypesAuditoriums(req, res, selInfo).then(records => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records.recordset))
        }).catch(error => {
            write_error_400(res, error)
        });
    }
    else{
        switch (true) {
            case path == '/':
                res.end(fs.readFileSync('./resourse/views/index.html'));
                break;
            case path == '/api/faculties':
                DB.getFaculties().then(records => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(records.recordset))
                }).catch(error => {
                    write_error_400(res, error)
                });
                break;
            case path == '/api/pulpits':
                DB.getPulpits().then(records => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(records.recordset))
                }).catch(error => {
                    write_error_400(res, error)
                });
                break;
            case path == '/api/subjects':
                DB.getSubjects().then(records => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(records.recordset))
                }).catch(error => {
                    write_error_400(res, error)
                });
                break;
            case path == '/api/auditoriumstypes':
                DB.getAuditoriumsTypes().then(records => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(records.recordset))
                }).catch(error => {
                    write_error_400(res, error)
                });
                break;
            case path == '/api/auditoriums':
                DB.getAuditoriums().then(records => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(records.recordset))
                }).catch(error => {
                    write_error_400(res, error)
                });
                break;
        }
    }
    
}