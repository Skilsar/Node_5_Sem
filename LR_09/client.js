var http = require('http');
var url = require('url');
var fs = require('fs');
const func = require('./funtions');
console.log(`Enter the command`);
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let command = null;
    while ((command = process.stdin.read()) != null) {
        command = command.trim();
        switch (command) {
            case 'ex1': {
                console.log(`---START COMMAND---`);
                func.ex1();
                break;
            }
            case 'ex2': {
                console.log(`---START COMMAND---`);
                func.ex2();
                break;
            }
            case 'ex3': {
                console.log(`---START COMMAND---`);
                func.ex3();
                break;
            }
            case 'ex4': {
                console.log(`---START COMMAND---`);
                func.ex4();
                break;
            }
            case 'ex5': {
                console.log(`---START COMMAND---`);
                func.ex5();
                break;
            }
            case 'ex6': {
                console.log(`---START COMMAND---`);
                func.ex6();
                break;
            }
            case 'ex7': {
                console.log(`---START COMMAND---`);
                func.ex7();
                break;
            }
            case 'ex8': {
                console.log(`---START COMMAND---`);
                func.ex8();
                break;
            }
            case 'exit': {
                console.log(`--- CLIENT IS OFF---`);
                process.exit();
            }
            default: {
                console.log(`Invalid command: ${command}`);
            }
            break;
        }
    }
     setTimeout(() => {
        console.log(`---END COMMAND---\n`);
        console.log(`Enter the command`);
     }, 200);
});