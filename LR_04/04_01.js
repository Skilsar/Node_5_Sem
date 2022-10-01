var http = require('http');
var url = require('url');
var fs = require('fs');
var data = require('./db_module.js');
const {
    time
} = require('console');

var db = new data.DB();

db.on(
    'GET', (request, response) => {
        console.log(`DB.GET ${new Date().toLocaleString()}`);
        response.end(JSON.stringify(db.select()));
    }
);

db.on(
    'POST', (request, response) => {
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
    console.log(`DB.PUT ${new Date().toLocaleString()}`);
    request.on('data', data => {
        let elem = JSON.parse(data);
        db.update(elem);
        response.end(JSON.stringify(elem));
    });
});

db.on('DELETE', (request, response) => {
    console.log(`DB.DELETE ${new Date().toLocaleString()}`);
    if (url.parse(request.url, true).query.id !== null) {
        let Id = +url.parse(request.url, true).query.id;
        if (Number.isInteger(Id)) {
            let  delElem = db.delete(Id);
            response.writeHead(200, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(delElem));
        }
    }
});

http.createServer(function (req, res) {
    if (url.parse(req.url).pathname === '/') {
        let html = fs.readFileSync('./04_02.html');
        res.writeHead(200, {
            'contentType': 'text/html; charset=utf-8'
        });
        res.end(html);
    } else if (url.parse(req.url).pathname === '/api/db') {
        db.emit(req.method, req, res);
    }
}).listen(5000);

console.log("Server running on http://localhost:5000/");