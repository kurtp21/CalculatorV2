/* 
A unit test for the dataNode structure.
*/

import {
    dataNode
 } from './dataNode.js';

var passed = 0;
var totalTests = 2; 

// Testing the creation of an object dataNode()
var test1 = new dataNode()

if ((test1.expresion === null) 
&& (test1.answer === null)) {
    passed += 1;
    console.log("Passed Test 1");
} else {
    console.log("Failed Test 1");
}

// Testing the setting of the expresion and answer values 
var test2 = new dataNode();

test2.expresion = "(3 + 4) * 8 ";
test2.answer = 56; 

if ((test2.expresion === "(3 + 4) * 8 ") 
&& (test2.answer === 56)) {
    passed += 1; 
    console.log("Passed Test 2");
} else {
    console.log("Failed Test 2");
}

// Report how many tests have been passed
console.log("Test passed: " + passed + "/" + totalTests);
