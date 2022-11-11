var http = require('http');
var url = require('url');
var fs = require('fs');
const func = require('./funtions_srv');
console.log(`―――――――――――――――――――――――――`);
console.log(`   Server Control Panel`);
console.log(`―――――――――――――――――――――――――\n`);
console.log(`Enter the command`);
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', () => {
    let command = null;
    while ((command = process.stdin.read()) != null) {
        command = command.trim();
        switch (command) {
            case 'ex1': {
                func.ex1();
                break;
            }
            case 'ex2': {
                func.ex2();
                break;
            }
            case 'ex3': {
                func.ex3();
                break;
            }
            case 'ex4': {
                func.ex4();
                break;
            }
            case 'ex5': {
                func.ex5();
                break;
            }
            case 'ex6': {
                func.ex6();
                break;
            }
            case 'ex7': {
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
        console.log(`\nEnter the command`);
    }, 200);
});