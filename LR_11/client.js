var http = require('http');
var url = require('url');
var fs = require('fs');
var fs = require('ws');
const func = require('./funtions_cl');
console.log(`―――――――――――――――――――――――――`);
console.log(`   Client Control Panel`);
console.log(`―――――――――――――――――――――――――\n`);
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
            case 'ex5a': {
                console.log(`---START COMMAND---`);
                func.ex5a();
                break;
            }
            case 'ex5b': {
                console.log(`---START COMMAND---`);
                func.ex5b();
                break;
            }
            case 'ex5c': {
                console.log(`---START COMMAND---`);
                func.ex5c();
                break;
            }
            case 'ex6': {
                console.log(`---START COMMAND---`);
                func.ex6a();
                break;
            }
            case 'ex7': {
                console.log(`---START COMMAND---`);
                func.ex7();
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