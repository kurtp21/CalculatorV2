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

    if (isNaN(opt)) {
        handleOpt(opt);
    } else {
        handleNumber(opt); 
    }

    screen.innerText = buffer;
}, false);

function handleOpt(option) {
    switch (option) {
        case 'Clear':
            buffer = "0";
            runningTotal = 0; 
            break; 
        case 'Del':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            alert("Error in handleOpt()"); 
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString; 
    }
}
