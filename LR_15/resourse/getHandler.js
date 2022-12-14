const { Console } = require('console');
const url = require('url');

module.exports = (req, res, Db) => {
    let path = url.parse(req.url).pathname;
    let pathQuery = url.parse(req.url).query;
    console.log(`pathname: ${path}`);
    console.log(`query: ${pathQuery}`);
    if(pathQuery != null){`lenght: ${pathQuery.length}`};

    let path_params = path.split('/');
    path_params.splice(0, 1);
    if (path_params[0] == 'api') {
        path_params.splice(0, 1);
    }

    console.log(`URL Obj: ${path_params};\n`);
    console.log(path.substring(0, 14));

    if (path.substring(0, 15) == '/api/faculties/') {
        console.log(`Search by faculties - ${path_params[1]}`)
        Db.GetRecordsByFaculties(path_params[1]).then(records => res.end(JSON.stringify(records)))
            .catch(error => {
                write_error_400(res, error);
            });
    }

    else if (path.substring(0, 13) == "/api/pulpits/") {
        console.log(`Search by pulpits - ${path_params[1]}`)
        Db.GetRecordsByPulpits(path_params[1]).then(records => res.end(JSON.stringify(records)))
            .catch(error => {
                write_error_400(res, error);
            });
    }

    else if ((path.substring(0, 12) == "/api/pulpits") && (pathQuery != null)){
        let findParams = pathQuery.substring(2).split(',');
        console.log(findParams);
        let sendParam = "";
        for(let i = 0; i < findParams.length; i++){
            sendParam += (findParams[i] + ',');
        }
        console.log(`sendParam ${sendParam}`);
        Db.GetMoreRecordsByPulpits(sendParam).then(records => res.end(JSON.stringify(records)))
            .catch(error => {
                write_error_400(res, error);
            });
    }
    
    if(pathQuery == null){
        switch (path) {
            case '/api/faculties':
                Db.GetRecordsByTableName('faculty').then(records => res.end(JSON.stringify(records)))
                    .catch(error => {
                        write_error_400(res, error);
                    });
                break;
            case '/api/pulpits':
                Db.GetRecordsByTableName('pulpit').then(records => res.end(JSON.stringify(records)))
                    .catch(error => {
                        write_error_400(res, error);
                    });
                break;
        }
    }
}
function write_error_400(res, error) {
    res.statusCode = 400;
    res.statusMessage = 'Invalid method';
    let htmlText = '<h1>Error 400</h1> </br> <h3>' + error + '</h3>';
    res.end(htmlText);
}