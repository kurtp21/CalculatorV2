/* 
A unit test for the dataNode structure.
*/

import {
    dataNode
 } from './dataNode.js';

var passed = 0;
var totalTests = 5; 

// Testing the creation of an object dataNode()
var test1 = new dataNode()

if ((test1.expresion === null) 
&& (test1.answer === null) 
&& (test1.fwd === null) 
&& (test1.prev === null)) {
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

// Testing the fwd and prev pointers 
test1.fwd = test2;
test1.prev = null 
test2.prev = test1;
test2.fwd = null;  

if ((test1.fwd === test2) && (test1.prev == null)) {
    passed += 1;
    console.log("Passed Test 3");
} else {
    console.log("Failed Test 3");
}

if ((test2.prev === test1) && (test2.fwd === null)) {
    passed += 1;
    console.log("Passed Test 4");
} else {
    console.log("Failed Test 4");
}

// Testing to remove pointers
test1.fwd = null; 
test2.prev = null;

if ((test1.fwd === null) && (test2.prev === null)) {
    passed += 1;
    console.log("Passed Test 5");
} else {
    console.log("Failed Test 5"); 
}

// Report how many tests have been passed
console.log("Test passed: " + passed + "/" + totalTests);
