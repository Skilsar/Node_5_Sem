const http = require('http');
const host = 'localhost';
const port = 8080; 

let h = (r) =>{
    let rc ='';
    for (key in r.headers) rc += '<h3>'+ key +':' + r.headers[key] +'</h3>';
    return rc;
}

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    let b='';
    request.on('data', str=>{b+=str; console.log('data', b);});
    request.on('end', ()=> response.end(
        '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>01-03</title></head>'+
        '<body>'+
        '<h1>Запрос</h1>'+
        '<h3>метод: '+  request.method  +'</h3>'+
        '<h3>uri:   '+  request.url  +'</h3>'+
        '<h3>версия'+  request.httpVersion  +'</h3>'+
        '<h2>Заголовки</h1>'+
        '<h3>'+ h(request)  +'</h3>'+
        '<h1>тело: '+ b +'</h1>'+
        '</body></html>'
    ))

}).listen(port);
console.log('Server running on 8080');