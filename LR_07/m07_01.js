let fs = require('fs');

function Static(sdir = './static') {
    this.sfolder = sdir;
    let fullStaticPath = (path) => `${this.sfolder}${path}`;

    let readFile = (req, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(fullStaticPath(req.url)).pipe(res);
    }

    this.sendFile = (req, res, headers) =>{
        fs.access(fullStaticPath(req.url), fs.constants.R_OK, error =>{
            error ? this.errorCode404(res) : readFile(req, res, headers);
        });
    }

    this.testStaticFile = (file_ext, allpath) =>{
        let extReg = new RegExp(`^\/.+\.${file_ext}$`);
        return extReg.test(allpath);
    }

    this.errorCode404 = (res) => {
        res.statusCode = 404;
        res.statusMess = 'Page not found';
        res.writeHead(res.statusCode, {
            'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(fs.readFileSync('./static/404.html'));
    }
}

module.exports = (parameter) => new Static(parameter);