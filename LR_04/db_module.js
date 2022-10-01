var util = require('util');
var EE = require('events');

var db_data = [
    {id: 0, name: "Bulavsi K.S.", bday: "2002-06-02"},
    {id: 1, name: "Dikun I.V.", bday: "2002-10-28"},
    {id: 2, name: "Yaskovich M.E.", bday: "2002-05-19"},
    {id: 3, name: "Khlystou G.G.", bday: "2022-09-18"}
];

function DB(){
    this.getElem = () => {
        return db_data.length;      //количество элементов
    };
    this.getLastElemID = () => {
        return db_data[db_data.length-1].id;
    }
    this.select = () => {
        return db_data;             //получение элементов
    }
    this.insert =(x) => {
        db_data.push(x);            //добавление элемента
    }
    this.update = (x) => {          //обновление элемента по ID
        let indexOfElem = db_data.findIndex(elem => elem.id == x.id);
        return db_data.splice(indexOfElem, 1, x);
    }
    this.delete = elemID => {       //удаление элемента по ID
        let IdOfElem;
        let IndexOfElemById;
        for(let i = 0; i < db_data.length; i++){
            if(db_data[i].id == elemID){
                IdOfElem = elemID;
                console.log(`Found element with id ${IdOfElem}`);
            }
        }
        IndexOfElemById = db_data.findIndex(elem => elem.id === elemID); //ищем индекл элемента массива по ID
        console.log(`Index of element with id ${IdOfElem} = ${IndexOfElemById}`);
        if(IndexOfElemById !== -1){     //проверяем есть ли индекс
            return db_data.splice(IndexOfElemById, 1);
        }
        else{
            console.log(`Element with id ${IdOfElem} not found`);
            return JSON.parse('{"error": "index not found"}');
        }
    }
}

util.inherits(DB, EE.EventEmitter);
exports.DB = DB;