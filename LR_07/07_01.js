let http = require('http');
let fs = require('fs');
let stat = require('./m07_01')('./static');

let port = 5000;
let host = `localhost`;

let http_answer = (req, res) => {
    if (req.method === 'GET') { //проверка на запрос GET или другой
        if (stat.testStaticFile('html', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'text/html; charset=utf-8'
            });
        else if (stat.testStaticFile('css', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'text/css; charset=utf-8'
            });
        else if (stat.testStaticFile('js', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'text/javascript; charset=utf-8'
            });
        else if (stat.testStaticFile('png', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'image/png; charset=utf-8'
            });
        else if (stat.testStaticFile('docx', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'application/msword; charset=utf-8'
            });
        else if (stat.testStaticFile('json', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'application/json; charset=utf-8'
            });
        else if (stat.testStaticFile('xml', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'application/xml; charset=utf-8'
            });
        else if (stat.testStaticFile('mp4', req.url))
            stat.sendFile(req, res, {
                'Content-Type': 'video/mp4; charset=utf-8'
            });
            else stat.errorCode404(res);
    } else { //отдаем страницу с кодом 405
        res.statusCode = 405;
        res.statusMess = 'Invalid method';
        res.writeHead(res.statusCode, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(fs.readFileSync('./static/405.html'));
    }
};

let httpServer = http.createServer();
httpServer.listen(port, host, ()=>{
    console.log(`Server running on http://${host}:${port}`)}).on('error', (err) => {
        console.log(`Server running on http://${host}:${port} with error : `, err.code);
    }).on('request', http_answer);