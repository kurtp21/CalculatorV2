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

let error = false; 
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
            errorCheck(buffer);

            if (error) {
                buffer = "ERROR"; 
                break; 
            }

            performArithmetic(buffer); 
            var answer = dataStorage.getNext().getAns(); 
            buffer = answer; 
            break; 
        default:
            handleOperation(input, sign);
            sign = false;
            break;
    }
}

function errorCheck(expression) {
    if ((expression.length === 1) 
    && (isNaN(parseInt(expression)))) {
        error = true; 
    } else if (expression.length > 1) {
        if (checkExpression(expression)) {
            error = true; 
        }  else {
            error = false; 
        }
    } else {
        error = false; 
    }
}

function checkExpression(expression) {
    for (var i = 0; i < expression.length; i += 1) {
        var char = parseInt(expression[i]);
        if (isNaN(char)) {
            if ((expression[i]) != "(" || (expression[i] != ")")) {
                var nextChar = expression[i + 1]; 

                if ((isNaN(nextChar))
                && ((nextChar != "(") || (nextChar != ")"))) {
                    return true; 
                }
            }
        }
    }
    return false; 
}

function performArithmetic(expression) {
    console.log(expression);
    var result = math.evaluate(expression);
    // var result = performMath(expression);
    var newNode = new dataNode(expression, result); 

    if (dataStorage.isEmpty()) {
        dataStorage.push(newNode); 
        dataStorage.push(defaultNode); 
    } else {
        var prevNode = dataStorage.pop(); 
        dataStorage.push(newNode); 
        dataStorage.push(prevNode); 
    }
}

function handleOperation(input, sign) {
    if (sign) {
        var newNum = (input * -1); 
        var newString = "( )";
        
        if (buffer === "0") {
            buffer = newString.replace(" ", newNum);
        } else {
            buffer += newString.replace(" ", newNum);
        }

    } else {
        // if (input === "×") {
        //     buffer += "*";
        // } else if (input === "÷") {
        //     buffer += "/";
        // } else if (input === "−") {
        //     buffer += "-"; 
        // } else if (input === "+") {
        //     buffer += "+";
        // } else {
        //     if (buffer === "0") {
        //         buffer += input;
        //     } else {
        //         buffer += input; 
        //     }
        // }
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

