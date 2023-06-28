/**
 * The inner worikgs of the calculator 
 * - Makes use of a stack based doubly 
 *   linked list to store data
*/
import { dataNode } from './dataNode.js';
import { Container } from './Container.js';

const screen = document.getElementById("screen"); 
const button = document.getElementById("calc-buttons"); 

let dataStorage = new Container(); 
let defaultNode = new dataNode("0", null); 

let sign = false; 
let buffer = "0";

button.addEventListener('click', function(event) {
    let opt = event.target.innerText; 

    checkOpt(opt); 
    screen.innerText = buffer; 
}, false);

function checkOpt(input) {
    switch (input) {
        case 'Clear':
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
            } else {  
                dataStorage.moveForward(); 
            }
            buffer = dataStorage.getCurr().getExp(); 
            break;
        case '↓': 
            if (dataStorage.isEmpty()) {
                alert("There are no expression stored in calculator!"); 
                break; 
            } else if (dataStorage.isHead()) {
                dataStorage.goToBack(); 
            } else {
                dataStorage.moveBackward();
            }
            buffer = dataStorage.getCurr().getExp(); 
            break;
        case '±':
            sign = true; 
            break;  
        case '=': 
            let error = errorCheck(buffer);
            console.log(error);

            if (error) {
                buffer = "ERROR"; 
                break; 
            } else {
                performArithmetic(buffer); 
                let answer = dataStorage.getNext().getAns(); 
                buffer = answer; 
                break; 
            }
        default:
            handleOperation(input, sign);
            sign = false;
            break;
    }
}

function errorCheck(expression) {
    if ((expression.length === 1) 
    && (isNaN(parseInt(expression)))) {
        return true; 
    } else if (expression.length > 1) {
        // console.log("GotHere");
        if (checkExpression(expression)) {
            console.log("GotHere");
            return true;
        } else {
            return false; 
        }        
    } else {
        return false; 
    }
}

function checkExpression(expression) {
    console.log(expression);
    let len = expression.length;

    for (let i = 0; i < len; i += 1) {
        for (let j = i + 1; j < len; j += 1) {
            let char1 = expression[i];
            let char2 = expression[j];

            console.log(char1, parseInt(char1));
            console.log(char2, parseInt(char2));

            if (isNaN(parseInt(char1)) && isNaN(parseInt(char2))) {
                console.log("Got Here");
                if (isParen(char1) && !isParen(char2)) {
                    return false; 
                } else if (!isParen(char1) && isParen(char2)) {
                    return false; 
                } else {
                    return true;
                }
            }
        }
    }
    return false;
}

function isParen(char) {
    if ((char === "(") || (char === ")")) {
        return true;
    } else {
        return false; 
    }
}

function performArithmetic(expression) {
    let result = math.evaluate(expression);
    let newNode = new dataNode(expression, math.round(result, 10)); 

    if (dataStorage.isEmpty()) {
        dataStorage.push(newNode); 
        dataStorage.push(defaultNode); 
    } else {
        let prevNode = dataStorage.pop(); 
        dataStorage.push(newNode); 
        dataStorage.push(prevNode); 
    }
}

function handleOperation(input, sign) {
    if (sign) {
        let newNum = (input * -1); 
        let newString = "( )";
        
        if (buffer === "0") {
            buffer = newString.replace(" ", newNum);
        } else {
            buffer += newString.replace(" ", newNum);
        }

    } else {
        if (buffer === "0"){
            switch (input) {
                case "×":
                buffer = "*";
                break; 
            case "÷":
                buffer = "/";
                break;
            case "+":
                buffer = "+";
                break;
            case "−":
                buffer = "-";
                break;
            default: 
                buffer = input;
                break;
            }
        } else {
            switch (input) {
                case "×":
                    buffer += "*"; 
                    break; 
                case "÷":
                    buffer += "/"; 
                    break;
                case "+":
                    buffer += "+"; 
                    break;
                case "−":
                    buffer += "-"; 
                    break;
                default: 
                    buffer += input; 
                    break;
            }
        }
    }
}

