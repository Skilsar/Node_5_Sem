const sql = require('mssql/msnodesqlv8');

// const config = {
//     "driver":"msnodesqlv8",
//     "connectionString": "Driver={SQL Server Native Client 11.0};Server={DESKTOP-23I014S};Database={Node_13};Trusted_Connection={yes};"
// }

const config = {
    user: 'user',
    password: 'qwer1234',
    server: 'localhost',
    database: 'lr_14',
}


class DB {
    constructor() {
        this.connectionPool = new sql.ConnectionPool(config).connect().then(pool => {
            console.log('Connected to MSSQL server');
            return pool;
        }).catch(err => console.log('Connection failed: ', err));
    }

    getFaculties(req, res) {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM FACULTY'))
    }

    getPulpits(req, res) {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM PULPIT'))
    }

    getSubjects(req, res) {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM SUBJECT'))
    }

    getAuditoriumsTypes(req, res) {
        return this.connectionPool.then(pool => pool.request().query('select * from AUDITORIUM_TYPE;'))
    }

    getAuditoriums(req, res) {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM AUDITORIUM'))
    }

    getFacultyPulpit(req, res, faculty) {
        return this.connectionPool.then(pool => pool.request().query(`select FACULTY.FACULTY, PULPIT_NAME from PULPIT inner join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY where PULPIT.FACULTY = '${faculty}'`));
    }

    getAuditoriumtypesAuditoriums(req, res, auditorium_type) {
        return this.connectionPool.then(pool => pool.request().query(`select * from AUDITORIUM where AUDITORIUM.AUDITORIUM_TYPE = '${auditorium_type}';`));
    }

    /*select FACULTY.FACULTY, PULPIT_NAME from PULPIT
    inner join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY
    where PULPIT.FACULTY = 'ТОВ'*/

    postFacultes(faculty, facultyName) {
        return this.connectionPool.then(pool => {
            return pool.request().input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, facultyName)
                .query('INSERT FACULTY(FACULTY, FACULTY_NAME) values(@faculty , @faculty_name)');
        })
    }

    postPulpits(pulpit, pulpitName, faculty) {
        //1
        // return this.connectionPool.then(pool => {
        //     const req = pool.request();
        //     let command = `insert into PULPIT(`;
        //     let values = ' values ('
        //     Object.keys(obj).forEach(field => {
        //         command += `${field},`;
        //         values += Number.isInteger(obj[field]) ? ` ${obj[field]},` : ` '${obj[field]}',`;
        //     });
        //     command = command.replace(/.$/, ")");
        //     values = values.replace(/.$/, ")");
        //     command += values;
        //     req.query(command);
        // });
        //2
        // console.log(`PRE-QUERY TEST: ${pulpit}, ${pulpitName}, ${faculty}`);
        // return this.connectionPool.then(pool => pool.request().query(`INSERT INTO PULPIT(PULPIT, PULPIT_NAME, FACULTY) VALUES(${pulpit}, ${pulpitName}, ${faculty});`));
        //3
        // return this.connectionPool.then(pool => {
        //     return pool.request().input('PULPIT', sql.Char(10), pulpit)
        //         .input('PULPIT_NAME', sql.VarChar(100), pulpitName)
        //         .input('FACULTY', sql.Char(10), faculty)
        //         .query('INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) VALUES(@pulpit, @pulpit_name, @faculty)');
        // })
        //4
        console.log(`PRE-QUERY TEST: ${pulpit}, ${pulpitName}, ${faculty}`);
        return this.connectionPool.then(pool => pool.request().input('PULPIT', sql.Char(10), pulpit).input('PULPIT_NAME', sql.VarChar(100), pulpitName).input('FACULTY', sql.Char(10), faculty).query('INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) VALUES(@pulpit, @pulpit_name, @faculty)'));
    }

    postSubjects(subject, subject_name, pulpit) {
        console.log(`PRE-QUERY TEST: ${subject}, ${subject_name}, ${pulpit}`);
        return this.connectionPool.then(pool => pool.request().input('SUBJECT', sql.Char(10), subject).input('SUBJECT_NAME', sql.VarChar(50), subject_name).input('PULPIT', sql.Char(10), pulpit).query('INSERT INTO SUBJECT (SUBJECT, SUBJECT_NAME, PULPIT) VALUES(@subject, @subject_name, @pulpit);'));
    }
    
    postAuTypes(auditorium_type, auditorium_typename) {
        console.log(`PRE-QUERY TEST: ${auditorium_type}, ${auditorium_typename}`);
        return this.connectionPool.then(pool => pool.request().input('AUDITORIUM_TYPE', sql.Char(10), auditorium_type).input('AUDITORIUM_TYPENAME', sql.VarChar(50), auditorium_typename).query('INSERT INTO AUDITORIUM_TYPE (AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES(@auditorium_type, @auditorium_typename);'));
    }
    postAuditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type) {
        console.log(`PRE-QUERY TEST: ${auditorium}, ${auditorium_name}, ${auditorium_capacity}, ${auditorium_type}`);
        return this.connectionPool.then(pool => pool.request()
        .input('AUDITORIUM', sql.Char(10), auditorium)
        .input('AUDITORIUM_NAME', sql.VarChar(200), auditorium_name)
        .input('AUDITORIUM_CAPACITY', sql.Int(), auditorium_capacity)
        .input('AUDITORIUM_TYPE', sql.Char(10), auditorium_type)
        .query('INSERT INTO AUDITORIUM (AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE) VALUES(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type);'));
    }

    putFaculties(faculty, faculty_name) {
        console.log(`PUT FACULTY PRE-QUERY: ${faculty}, ${faculty_name}`);
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('FACULTY', sql.Char(10), faculty)
                .input('FACULTY_NAME', sql.VarChar(50), faculty_name)
                .query('UPDATE FACULTY SET FACULTY_NAME = @FACULTY_NAME WHERE FACULTY = @FACULTY');
        });
    }
    getFaculty(faculty) {
        console.log(`GetFaculty: ${faculty}`);
        return this.connectionPool.then(pool => {
            return pool.request().input('faculty', sql.Char(10), faculty).query('Select * from FACULTY where faculty = @faculty')
        });
    }

    putPulpits(pulpit, pulpit_name, faculty) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('UPDATE PULPIT SET PULPIT_NAME = @pulpit_name, FACULTY = @faculty WHERE PULPIT = @pulpit');
        });
    }
    getPulpit(pulpit) {
        return this.connectionPool.then(pool => {
            return pool.request().input('pulp', sql.NVarChar, pulpit).query('Select * from PULPIT where pulpit = @pulp')
        });
    }

    putSubjects(subject, subject_name, pulpit) {
        return this.connectionPool.then(pool => {

            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('UPDATE SUBJECT SET SUBJECT_NAME = @subject_name, PULPIT = @pulpit WHERE SUBJECT = @subject');
        });
    }
    getSubject(subject) {
        console.log(subject);
        return this.connectionPool.then(pool => {
            return pool.request().input('sub', sql.VarChar, subject).query('Select * from Subject where subject = @sub')
        });
    }

    putAuditoriums_Types(auditorium_type, auditorium_typename) {
        console.log(`PUT AUDITORIUM_TYPE PRE-QUERY: ${auditorium_type}, ${auditorium_typename}`);
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('AUDITORIUM_TYPE', sql.Char(10), auditorium_type)
                .input('AUDITORIUM_TYPENAME', sql.VarChar(30), auditorium_typename)
                .query('UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = @AUDITORIUM_TYPENAME WHERE AUDITORIUM_TYPE = @AUDITORIUM_TYPE');
        });
    }

    putAuditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.Char(10), auditorium)
                .input('auditorium_name', sql.VarChar(200), auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.Char(10), auditorium_type)
                .query('UPDATE AUDITORIUM SET AUDITORIUM_NAME = @auditorium_name, AUDITORIUM_CAPACITY = @auditorium_capacity, AUDITORIUM_TYPE =  @auditorium_type' +
                    ' WHERE AUDITORIUM = @auditorium');
        });
    }
    getAuditorim(audit) {
        return this.connectionPool.then(pool => {
            return pool.request().input('audit', sql.Char(10), audit).query('Select * from AUDITORIUM where AUDITORIUM = @audit')
        });
    }
    deleteFaculties(faculty) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .query('DELETE FROM FACULTY WHERE FACULTY = @faculty');
        });
    }

    deletePulpits(pulpit) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .query('DELETE FROM PULPIT WHERE PULPIT = @pulpit');
        });
    }

    deleteSubjects(subject) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .query('DELETE FROM SUBJECT WHERE SUBJECT = @subject');
        });
    }

    deleteAuditoriums_Types(auditorium_type) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = @auditorium_type');
        });
    }

    deleteAuditoriums(auditorium) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .query('DELETE FROM AUDITORIUM WHERE AUDITORIUM = @auditorium');
        });
    }
}

module.exports = DB