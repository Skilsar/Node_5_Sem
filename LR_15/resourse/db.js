const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

class DB{
    constructor()
    {
        this.url = 'mongodb+srv://skilsar:0lOT1VNjUFR9qGFD@node.agl6pbv.mongodb.net/BSTU?retryWrites=true&w=majority';
        this.client = new MongoClient(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
        this.client = this.client.connect().then(connection => {
            return connection.db("BSTU")
        });
        console.log("Connected to MongoDB");
    }
    GetRecordsByTableName(tableName) {
        return this.client.then(db => {
            return db.collection(tableName).find({}).toArray();
        });
    }
    GetRecordsByFaculties(param) {
        return this.client.then(db => {
            return db.collection('faculty').find({faculty: `${param}`}).toArray();
        });
    }
    GetRecordsByPulpits(param) {
        return this.client.then(db => {
            return db.collection('pulpit').find({pulpit: param}).toArray();
        });
    }

    GetMoreRecordsByPulpits(param) {
        console.log(`GetMoreRecordsByPulpits: ${param}`)
        return this.client.then(db => {
            return db.collection('pulpit').find({
                pulpit: {
                    $in: ["ISIT", "PI"]
                }
            }).toArray();
        });
    }

    GetRecord(tableName, fields) {
        return this.client
            .then(db => {
                return db.collection(tableName).findOne(fields);
            })
            .then(record => {
                if (!record) throw 'No records';
                return record;
            });
    }
    InsertRecords(tableName,tableColumn,code, fields) {
        return this.client
            .then(async db => {
                let tableCol= JSON.parse('{"'+ tableColumn + '": "'+ code +'"}');
                console.log(code);
                await db.collection(tableName).findOne(tableCol).then(record => {
                    if (record) throw 'This doc exists';
                    return record;});
                db.collection(tableName).insertOne(fields, (err, r) =>{
                    if(err) console.log(err);
                    else {
                        console.log(r.insertedCount);
                    }
                });
                return this.GetRecord(tableName, tableCol);
            });
    }

    InsertManyRecords(fields){
        return this.client
            .then(async db => {
                const results = db.collection("pulpit").insertMany(fields).then(record => {
                    return record;
                });
                console.log(results);
                return result;
            });
    }

    UpdateRecordsFaculty(id, fields) {
        return this.client
            .then(async db => {
                console.log(id);
                if (!id) {
                    throw "Wrong ID";
                }
                let facultyField = fields.faculty;
                let facultyNameField = fields.faculty_name;
                const result = await db.collection('faculty').findOneAndUpdate({_id: id}, { $set: {faculty: facultyField, faculty_name: facultyNameField}});
                return(result);
            })
    }
    
    UpdateRecordsPulpit(id, fields) {
        return this.client
            .then(async db => {
                console.log(id);
                if (!id) {
                    throw "Wrong ID";
                }
                let pulpitField = fields.pulpit;
                let pulpitNameField = fields.pulpit_name;
                const result = await db.collection('pulpit').findOneAndUpdate({
                    _id: id
                }, {
                    $set: {
                        pulpit: pulpitField,
                        pulpit_name: pulpitNameField
                    }
                });
                return(result);
            })
    }
    

    IsFacultyExist(code) {
        let tableCol = JSON.parse('{"faculty": "'+ code +'"}');
        return this.client
            .then(db => {
                return db.collection('faculty').findOne(tableCol);
            })
            .then(record => {
                if (!record) return false;
                return true;
            });
    }

    DeleteRecord(tableName,tableColumn, code) {
        return this.client
            .then(async db => {
                if (!code) {
                    throw 'Wrong faculty';
                }
                console.log("DB delete");
                let tableCol= JSON.parse('{"'+ tableColumn + '": "'+ code +'"}');
                let removedRecord = await this.GetRecord(tableName, tableCol);
                await db.collection(tableName).deleteOne(tableCol);
                return removedRecord;
            });
    }
}

module.exports = DB;