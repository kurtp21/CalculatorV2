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

let arrows = false;     // A flag for when the arrows have been pressed
let newOp = false;      // A flag if an answer/expression is diplayed: Will be used to clear the screen 
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
        case '↓':
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
            newOp = true;       // Update newOp flag: expression has been displayed 
            arrows = true;      // Update arrows flag: arrows have been pressed
            break;
        case '↑': 
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
            newOp = true;       // Update newOp flag: expression has been displayed 
            arrows = true;      // Update arrows flag: arrows have been pressed
            break;
        case '±':   
            // Update sign flag
            sign = true;    
            break;  
        case '=': 
            let error = errorCheck(buffer);     // An error flag for error checking 
            newOp = true;   // Update newOp flag: Answer has been displayed 

            if (arrows) {
                dataStorage.goToFront(); 
            }

            if (error) {    // Change buffer to prompt an error msg
                buffer = "ERROR"; 
                break; 
            } else {    // Call the arithmetic function and change buffer to answer 
                performArithmetic(buffer); 
                let answer = dataStorage.getNext().getAns(); 
                buffer = answer; 
                break; 
            }
        default:
            if (newOp) {    // Check if "=" has been pressed 
                // Change buffer to the default dataNode expression
                buffer = dataStorage.getHead().getExp(); 
                newOp = false;      // Update newOp flag 
            }

            // Perform expression calculations
            handleOperation(input, sign);
            sign = false;       // Update sign flag 
            break;
    }
}

/**
 * errorCHeck(expression): Checks the current buffer("expression") for any errors or illegal 
 *                          inputs that will cause problems 
 * @param {*} expression : The buffer to be checked for any errors 
 * @returns : true if there is an illegal input and false otherwise 
 */
function errorCheck(expression) {
    if ((expression.length === 1) && (isNaN(parseInt(expression)))) {   // First check if the length of the expression is 1 and if it is a non-integer number 
        return true; 
    } else if (expression.length > 1) {     // If the expression length > 1, so check the whole expression for an error 
        // Call the checkExpression(expression) function, to check the inputed expression 
        if (checkExpression(expression)) {
            return true;
        } else {    
            return false; 
        }        
    } else {    // Otherwise no error has occured 
        return false; 
    }
}

/**
 * checkExpression(expression): checks the given expression if and illegal input has been made 
 *                              - a helper method for errorCheck(expression)
 * @param {*} expression : The expression to be chacked for illegal moves
 * @returns : true if the function caught an error or false otherwise 
 */
function checkExpression(expression) {
    let len = expression.length;    
    let count = 0;  // A tally for how many errors that has occured
    let symCount = 0;   // A tally for how many operators/symbols has occured 

    // Loop through the whole expression 
    for (let i = 0; i < len; i += 1) {
        if (isNaN(expression[i])) { // Current char is not a number 
            symCount += 1;      // Update the symbol counter 

            /**
             * 3 Cases: 
             * Case 1: Next index in the expression is not a number and not a parenthesis 
             * Case 2: Current index is a parenthesis and it is at the end of the end of the string 
             * Case 3: Next index in the expression is a prenthesis
             */
            if (isNaN(expression[i + 1]) && (!isParen(expression[i + 1])) && (i < len - 1)) { 
                count += 1;  
            } else if (isParen(expression[i]) && (i === len - 1)) {
                count += 1; 
            } else if (isParen(expression[i + 1]) && (i + 1 < len - 1)) {
                count -= 1; 
            }
        } 
    }

    if (count > 0) {    // Error count > 0 return true 
        return true; 
    } else if ((count > 0) && (symCount === len)) {     // Error count > 0 and symCount == len return true 
        return true; 
    } else if (count <= 0) {  // Otherwise return false 
        return false; 
    }
}

/**
 * isParen(char): A helper function to check if the current character is a parenthesis or not 
 * @param {*} char : The character to be checked if it is a parenthesis 
 * @returns : true if the character is a parenthesis and false otherwise 
 */
function isParen(char) {
    if ((char === "(") || (char === ")")) {
        return true;
    } else {
        return false; 
    }
}

/**
 * performArithmetic(expression): Evaluates the given expression and updates the dataStorage 
 *                                  By inserting the new dataNode 
 * @param {*} expression : The expression to be solved 
 */
function performArithmetic(expression) {
    let result = math.evaluate(expression);     // Used math.js as the parse to solve the expression 
    // Create a new dataNode with the given expression and its answer 
    let newNode = new dataNode(expression, math.round(result, 10));     

    // Insert new dataNode into the dataStorage container 
    if (dataStorage.isEmpty()) {    // The dataStorage is empty 
        // Insert the newNode directly into the data 
        // Then insert the default dataNode to make it the head of the dataStorage
        dataStorage.push(newNode); 
        dataStorage.push(defaultNode); 
    } else {    // The dataStorage has items 
        // First pop off the head of the dataStorage, which will always be the defaultNode 
        let prevNode = dataStorage.pop(); 
        // Then insert the newNode onto the dataStorage
        // Then insert the prevNode(defaultNode) last 
        dataStorage.push(newNode); 
        dataStorage.push(prevNode); 
    }
}

/**
 * handleOperation(input, sign): Responsible for updating the buffer string and what the expression will look like  
 * @param {*} input : The button that was pressed on the calculator, that is not one of; =, Clear, Del, up & down arrows
 * @param {*} sign : A boolean that indicates if the +/- button has been pressed or not 
 */
function handleOperation(input, sign) {
    if (sign) {     // First check if the +/- button has been pressed 
        let newNum = (input * -1); 
        let newString = "( )";
        
        if (buffer === "0") {
            buffer = newString.replace(" ", newNum);
        } else {
            buffer += newString.replace(" ", newNum);
        }
    } else {    // Other buttons have been pressed and apply corresponding change to buffer 
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