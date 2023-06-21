/**
 * The inner worikgs of the calculator 
 * - Makes use of a stack based doubly 
 *   linked list to store data
*/


import {
    dataNode
} from './dataNode.js';

import {
    Container
} from './Container.js'

const screen = document.getElementById("screen"); 
const button = document.getElementById("calc-buttons"); 

let dataStorage = new Container(); 
let runningTotal = 0;
let buffer = "0";

button.addEventListener('click', function(event) {
    let opt = event.target.innerText; 

    checkOpt(opt); 
    screen.innerText = buffer; 
}, false);

function checkOpt(input) {
    switch (input) {
        case 'Clear':
            runningTotal = 0;
            buffer = '0';
            break;
        case 'Del':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1); 
            }
            break; 
        case '↑':
            if (dataStorage.isEmpty()) {
                alert("There are no expression stored in calculator!"); 
                break; 
            } else if (dataStorage.isTail()) {
                dataStorage.goToFront(); 
            } 

            dataStorage.moveForward(); 
            buffer = dataStorage.getCurr().getExp(); 
            break;
        case '↓': 
            if (dataStorage.isEmpty()) {
                alert("There are no expression stored in calculator!"); 
                break; 
            } else if (dataStorage.isHead()) {
                dataStorage.goToBack(); 
            }

            dataStorage.moveBackward();
            buffer = dataStorage.getCurr().getExp(); 
            break;
        case '=':
            let expression = new dataNode(buffer, 100); 
            dataStorage.push(expression); 
                
            var answer = dataStorage.getCurr().getAns();
            buffer = answer; 
            runningTotal = 0; 
            break; 
        default:
            handleOperation(input);
            break;
    }
}

function handleOperation(inputStirng) {
    if (buffer === "0") {
        buffer = inputStirng;
    } else {
        buffer += inputStirng; 
    }
}

