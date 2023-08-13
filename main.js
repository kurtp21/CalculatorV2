/**
 * The inner worikgs of the calculator 
 * - Makes use of a stack based doubly linked list to store data
 * - Uses an extension: math.js for the use of its math expresion parser
 */

// Importing the required files for the calculator 
import { dataNode } from './dataNode.js';
import { Container } from './Container.js';

const screen = document.getElementById("screen"); 
const button = document.getElementById("calc-buttons"); 

let dataStorage = new Container();      // Create an instance of the stack container 
let defaultNode = new dataNode("0", null);      // Crate a deafult dataNode 

let newOp = false;      // A flag if an answer is diplayed: Will be used to clear the screen 
let sign = false;       // A flag if the +/- sign has been used 
let buffer = "0";       // Buffer for the text on the screen 

// Check if a button has been pressed 
button.addEventListener('click', function(event) {
    let opt = event.target.innerText;       // Get the text of the button pressed 

    checkOpt(opt);      // Then call opperation function 
    screen.innerText = buffer;      // Update the screen to current buffer after update
}, false);

/**
 * checkOpt(input): Checks the given input and applys the corresponding operation 
 *                  to be done
 * @param {*} input : The text input from the button pressed 
 */
function checkOpt(input) {
    // Check what case "input" is 
    switch (input) {
        case 'Clear':
            buffer = '0';
            break;
        case 'Del'  :
            if (buffer.length === 1) {      
                buffer = '0';
            } else {
                // Get a substring of the buffer that is one less of the original 
                // Then replace buffer with the substring 
                var newString = buffer.slice(0, -1); 
                buffer = newString;
            }

            break; 
        case '↑':
            if (dataStorage.isEmpty()) {    // Container is empty
                // Prompt an alert 
                alert("There are no expression stored in calculator!"); 
                break; 
            } else if (dataStorage.isTail()) {  // Pointer is at the end of the Container 
                // Move the pointer to the front
                dataStorage.goToFront(); 
            } else {  // Pointer is either at the front or somewhere in the middle of the Container 
                dataStorage.moveForward(); 
            }

            // Update the buffer with the new dataNode the pointer is pointing to  
            buffer = dataStorage.getCurr().getExp(); 
            break;
        case '↓': 
            if (dataStorage.isEmpty()) {    // Container is empty
                // Prompt an alert 
                alert("There are no expression stored in calculator!"); 
                break; 
            } else if (dataStorage.isHead()) {  // Pointer is at the front of the Container 
                // Move the pointer to the back
                dataStorage.goToBack(); 
            } else {    // Pointer is either at the back or somewhere in the middle of the Container 
                dataStorage.moveBackward();
            }

            // Update the buffer with the new dataNode the pointer is pointing to  
            buffer = dataStorage.getCurr().getExp(); 
            break;
        case '±':   
            // Update sign flag
            sign = true;    
            break;  
        case '=': 
            let error = errorCheck(buffer);     // An error flag for error checking 
            newOp = true;   // Update newOp flag: Answer has been displayed 

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

console.log(dataStorage);

