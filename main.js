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

const screen = document.getElementById("#screen"); 
const button = document.getElementById("#calc-buttons"); 

let dataStorage = new Container(); 
let runningTotal = 0;
let buffer = screen.innerText; 
