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
let newOp = false; 

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
            newOp = true; 

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
            if (newOp) {
                buffer = dataStorage.getHead().getExp(); 
                newOp = false;
            }

            handleOperation(input, sign);
            sign = false;
            break;
    }
}

function errorCheck(expression) {
    if ((expression.length === 1) && (isNaN(parseInt(expression)))) {
        return true; 
    } else if (expression.length > 1) {
        if (checkExpression(expression)) {
            return true;
        } else {
            return false; 
        }        
    } else {
        return false; 
    }
}

function checkExpression(expression) {
    let len = expression.length;
    let count = 0;
    let symCount = 0;

    for (let i = 0; i < len; i += 1) {
        if (isNaN(expression[i])) {
            symCount += 1; 

            if (isNaN(expression[i + 1]) && (!isParen(expression[i + 1])) && (i < len - 1)) { 
                count += 1;  
            } else if (isParen(expression[i]) && (i === len - 1)) {
                count += 1; 
            } else if (isParen(expression[i + 1]) && (i + 1 < len - 1)) {
                count -= 1; 
            }
        } 
    }

    if (count > 0) {
        return true; 
    } else if ((count > 0) && (symCount === len)) {
        return true; 
    } else if (count <= 0) {
        return false; 
    }
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

