const MIME = {
    HTML: Symbol('text/html; charset=utf-8'),
    CSS: Symbol('text/css'),
    JS: Symbol('text/javascript'),
    PNG: Symbol('image/png'),
    DOCX: Symbol('application/msword'),
    JSON: Symbol('application/json'),
    XML: Symbol('application/xml'),
    MP4: Symbol('video/mp4')
};
exports.MIME = MIME;

function getHeader(mime) {
    return {
        'Content-Type': mime.description
    };
}
exports.getHeader = getHeader;

exports.res200 = (response, message, mime) => {
    const statusCode = 200;
    response.writeHead(statusCode, getHeader(mime));
    response.end(message);
}
exports.res405 = (request, response) => {
    const statusCode = 405;
    response.writeHead(statusCode, getHeader(MIME.HTML));
    response.end(`Error ${statusCode}<br>Request: ${request.method} ${request.url}`);
};
exports.res404 = (response, url, mime) => {
    const statusCode = 404;
    response.writeHead(statusCode, getHeader(mime));
    response.end(`Error ${statusCode}<br>Url: ${url}`);
}